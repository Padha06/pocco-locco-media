import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CraftScatter } from './CraftDecor';

// The globe video has an off-white background. CSS blend modes can't hide it on iOS Safari
// (it ignores mix-blend-mode on <video>), so each frame is drawn to a canvas and the white is
// converted to real transparency ("colour to alpha"). Works the same in every browser.
const WHITE_POINT = 238; // the video's background sits around rgb(236-247)
const CANVAS_W = 640;
const CANVAS_H = 360;

function keyOutWhite(ctx) {
  const frame = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
  const d = frame.data;
  const lift = 255 / WHITE_POINT;
  for (let i = 0; i < d.length; i += 4) {
    const r = Math.min(255, d[i] * lift);
    const g = Math.min(255, d[i + 1] * lift);
    const b = Math.min(255, d[i + 2] * lift);
    const m = Math.min(r, g, b);
    const a = 255 - m;
    if (a < 4) {
      d[i + 3] = 0;
      continue;
    }
    // Un-mix the white so the colour stays true once it is see-through
    const k = 255 / a;
    d[i] = (r - m) * k;
    d[i + 1] = (g - m) * k;
    d[i + 2] = (b - m) * k;
    d[i + 3] = a;
  }
  ctx.putImageData(frame, 0, 0);
}

function KeyedGlobe() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let raf = 0;
    let lastTime = -1;
    let onScreen = true;

    const paint = (source) => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.drawImage(source, 0, 0, CANVAS_W, CANVAS_H);
      keyOutWhite(ctx);
    };

    // Still frame first, so there is a clean globe even if autoplay is blocked (e.g. iOS Low Power Mode)
    const poster = new Image();
    poster.onload = () => {
      if (lastTime < 0) paint(poster);
    };
    poster.src = '/assets/globe-poster.webp';

    const tick = () => {
      if (onScreen && video.readyState >= 2 && video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        paint(video);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Only decode and key frames while the globe is on screen
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* Source video: kept in the layout (iOS only autoplays visible videos) but fully transparent */}
      <video
        ref={videoRef}
        src="/assets/rotating-globe.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain opacity-[0.01] pointer-events-none"
      />
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        role="img"
        aria-label="Rotating globe"
        className="relative w-full h-full object-contain pointer-events-none select-none"
      />
    </>
  );
}

export default function GlobalMetrics() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const globeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.98]);

  const metrics = [
    { value: '250+', label: 'ADVERTISERS', color: 'text-[#00C2FF]' },
    { value: '10K+', label: 'PUBLISHERS', color: 'text-[#7C3AED]' },
    { value: '12.5M+', label: 'LEADS DELIVERED', color: 'text-[#FF1493]' },
    { value: '120+', label: 'COUNTRIES', color: 'text-[#0070F3]' },
    { value: '99.9%', label: 'UPTIME', color: 'text-[#7C3AED]' },
  ];

  return (
    <section ref={containerRef} className="pt-6 sm:pt-8 pb-6 sm:pb-8 relative overflow-hidden select-none">
      <CraftScatter
        items={[
          { shape: 'Splat', className: 'top-6 left-[1.5%] w-16', props: { color: '#FF1493' } },
          { shape: 'Squiggle', className: 'bottom-16 left-[1.5%] w-20', props: { color: '#0099FF' } },
          { shape: 'Dots', className: 'top-10 right-[2%] w-14' },
          { shape: 'Sparkle', className: 'top-[48%] right-[2.5%] w-8' },
          { shape: 'Spiral', className: 'top-10 left-[44%] w-12' },
          { shape: 'Star', className: 'bottom-6 right-[5%] w-7', props: { fill: '#FF1493' } },
          { shape: 'Zigzag', className: 'bottom-2 left-[42%] w-24', props: { color: '#FFD600' } },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Row with Rotating Globe Video & Global Opportunities Tag */}
        <div className="grid grid-cols-12 gap-2 lg:gap-8 items-center mb-2">
          
          {/* Left: Heading & Description */}
          <div className="col-span-7 lg:col-span-6">
            <h2 className="font-display text-[26px] sm:text-5xl lg:text-[64px] text-black uppercase leading-[1.05] mb-2 sm:mb-4">
              TRUSTED TO <br />
              PERFORM <span className="text-[#FF1493]">GLOBALLY</span>
            </h2>
            <p className="text-gray-700 text-[10px] sm:text-base font-semibold max-w-lg leading-snug sm:leading-relaxed">
              We work with leading brands across multiple industries and geographies,
              delivering measurable results through innovative performance solutions.
            </p>
          </div>

          {/* Right: Rotating Globe Video + Exact Positioned Global Opportunities Tag */}
          <div className="col-span-5 lg:col-span-6 relative flex items-center justify-end">
            
            <motion.div
              style={{ scale: globeScale }}
              className="relative flex items-center"
            >
              {/* Rotating Globe Video (Seamless Pure White Blend with NO gray box) */}
              <div className="relative w-[96px] sm:w-[260px] lg:w-[290px] aspect-square shrink-0 flex items-center justify-center">
                <KeyedGlobe />
              </div>

              {/* Tilted Doodle Tag: GLOBAL OPPORTUNITIES (Positioned directly beside globe splatter) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{
                  y: [-3, 4, -3],
                  rotate: [0, 1.5, 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                }}
                className="relative -ml-6 sm:-ml-16 lg:-ml-20 w-[70px] sm:w-[200px] lg:w-[230px] shrink-0 pointer-events-none select-none z-10"
              >
                <img
                  src="/assets/global-opportunities-tag.webp"
                  alt="Global Opportunities"
                  className="w-full h-auto object-contain filter"
                />
              </motion.div>
            </motion.div>

          </div>

        </div>

        {/* 5 Big Metrics Counter Bar (No divider line, tight spacing matching client design) */}
        <div className="grid grid-cols-5 gap-1 sm:gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0.7, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex flex-col items-start text-left p-0.5 sm:p-2.5 rounded-2xl hover:bg-gray-50/80 transition-all cursor-default"
            >
              <span className={`text-[15px] sm:text-4xl lg:text-5xl font-black ${m.color} tracking-tight drop-shadow-sm`}>
                {m.value}
              </span>
              <span className="text-[7px] sm:text-sm font-black text-gray-800 tracking-normal sm:tracking-wider uppercase mt-0.5 sm:mt-1.5">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
