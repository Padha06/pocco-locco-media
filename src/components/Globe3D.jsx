import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Interactive 3D globe (client's 360-degree Meshy model, optimised to ~630 KB).
// - spins slowly on its own
// - tilts toward the mouse anywhere on the page (desktop)
// - can be flicked/dragged sideways with a finger or mouse; spin carries on with momentum
// - only renders while on screen; respects "reduce motion"

const MODEL_URL = '/assets/globe-360.glb';
const AUTO_SPIN = 0.32; // radians per second
const PITCH_DEG = 40; // forward lean so the pins face the viewer
const MAX_TILT_X = 0.35; // look up/down toward cursor
const MAX_TILT_Y = 0.55; // look left/right toward cursor
const EASE = 0.06;

export default function Globe3D({ className = '', onReady }) {
  const hostRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return undefined; // no WebGL: the paint ring behind still shows
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Neutral tone mapping keeps the texture's saturated blues/yellows (ACES bleached them)
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.domElement.style.touchAction = 'pan-y'; // vertical swipes still scroll the page
    renderer.domElement.style.cursor = 'grab';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // Lit like the client artwork: strong light from the top-left, so the globe rounds off
    // into deeper blue toward the bottom-right edge
    const key = new THREE.DirectionalLight(0xfff6e8, 2.6);
    key.position.set(-3, 3.5, 4);
    const fill = new THREE.DirectionalLight(0xbfd8ff, 0.35);
    fill.position.set(3, -1, 2);
    scene.add(key, fill, new THREE.AmbientLight(0xffffff, 0.12));

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    // Close enough that the globe fills its box (the pins just fit at the top)
    // Close enough that the globe fills the paint's hole at rest (no paper gap round the edge)
    camera.position.set(0, 0, 3.95);

    // tilt (cursor) -> pitch (fixed forward lean) -> spin (auto + drag, around the globe's own pole) -> model
    // The model's two map pins sit at ~65-72 deg N on either side; leaning the globe 40 deg toward
    // the viewer puts them on the upper front face like the client artwork, and spinning around the
    // leaned pole keeps them on the visible side the whole way round.
    const tilt = new THREE.Group();
    const pitch = new THREE.Group();
    pitch.rotation.x = THREE.MathUtils.degToRad(PITCH_DEG);
    const spin = new THREE.Group();
    pitch.add(spin);
    tilt.add(pitch);
    scene.add(tilt);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load(MODEL_URL, (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      // Centre the model and fit it to a 2-unit box
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const scale = 2 / Math.max(size.x, size.y, size.z);
      const wrap = new THREE.Group();
      wrap.add(model);
      wrap.scale.setScalar(scale);
      model.traverse((o) => {
        if (o.isMesh && o.material) {
          // Meshy exports metalness 1.0, which reads dark and chrome-like; keep it matte and toy-like
          o.material.metalness = 0.05;
          o.material.roughness = 0.55; // soft glossy highlight like the artwork
          o.material.envMapIntensity = 0.45; // just a touch of reflection; heavier env flattened the shading
        }
      });
      spin.add(wrap);
      setReady(true);
      onReady?.();
    });

    // Sizing
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // Cursor tilt: track the pointer anywhere on the page relative to the globe's centre
    const target = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      const r = host.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      target.y = THREE.MathUtils.clamp(nx, -1, 1) * MAX_TILT_Y;
      target.x = THREE.MathUtils.clamp(ny, -1, 1) * MAX_TILT_X;
    };
    const onPointerLeaveWindow = () => {
      target.x = 0;
      target.y = 0;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeaveWindow);

    // Drag / flick to spin
    let dragging = false;
    let lastX = 0;
    let velocity = 0;
    const canvas = renderer.domElement;
    const onDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      canvas.style.cursor = 'grabbing';
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      // dragging across the full globe width turns it about a third of the way round
      const delta = (dx / Math.max(1, canvas.clientWidth)) * Math.PI * 0.7;
      spin.rotation.y += delta;
      velocity = delta * 60; // rad/s
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = 'grab';
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    // Hover: small "pop"
    let hoverScale = 1;
    let hoverTarget = 1;
    const onEnter = () => (hoverTarget = 1.03);
    const onLeave = () => (hoverTarget = 1);
    canvas.addEventListener('pointerenter', onEnter);
    canvas.addEventListener('pointerleave', onLeave);

    // Only animate while visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;

      if (!dragging) {
        // momentum from a flick fades back into the gentle auto-spin
        velocity *= Math.pow(0.04, dt);
        spin.rotation.y += ((reduceMotion ? 0 : AUTO_SPIN) + velocity) * dt;
      }
      tilt.rotation.x += (target.x - tilt.rotation.x) * EASE;
      tilt.rotation.y += (target.y - tilt.rotation.y) * EASE;
      hoverScale += (hoverTarget - hoverScale) * 0.12;
      tilt.scale.setScalar(hoverScale);

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeaveWindow);
      scene.traverse((o) => {
        if (o.isMesh) {
          o.geometry?.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            Object.values(m).forEach((v) => v?.isTexture && v.dispose());
            m.dispose();
          });
        }
      });
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [onReady]);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Interactive 3D globe"
      className={`transition-opacity duration-700 drop-shadow-[0_16px_22px_rgba(20,30,80,0.22)] ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
