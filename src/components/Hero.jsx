import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import HeroTitle from './HeroTitle';

// Text that circles the hero's play button; change it once the client's video is decided
const VIDEO_LABEL = 'Watch how we work';

// Loose pencil sketches + outline star that fill the hero's bottom-left corner
function LeftSketches({ className }) {
  return (
    <svg viewBox="0 0 160 260" fill="none" className={className} aria-hidden="true">
      {/* outline star */}
      <path
        d="M78 22 L86 42 L107 43 L90 56 L96 77 L78 65 L60 77 L66 56 L49 43 L70 42 Z"
        stroke="#111" strokeWidth="2.6" strokeLinejoin="round" fill="#fff"
      />
      {/* curly tail running down-left */}
      <path
        d="M62 80 C 40 96, 64 116, 44 130 C 24 144, 52 168, 30 182 C 12 194, 34 214, 14 232"
        stroke="#111" strokeWidth="2.2" strokeLinecap="round"
      />
      {/* faint pencil scribbles */}
      <path d="M6 150 C 30 140, 56 160, 84 146 S 130 150, 150 136" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M2 196 C 26 186, 48 204, 76 194 S 118 196, 138 186" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
      <path d="M10 246 C 40 226, 70 250, 104 230" stroke="#FF1493" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
      <path d="M120 210 l10 -8 M126 222 l12 -6 M112 236 l9 -9" stroke="#111" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <circle cx="140" cy="244" r="2.2" fill="#111" opacity="0.6" />
      <circle cx="150" cy="232" r="1.4" fill="#111" opacity="0.6" />
    </svg>
  );
}

// Outlined yellow crown doodle next to the leads card
function YellowCrown({ className }) {
  return (
    <svg viewBox="0 0 60 44" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 38 L4 10 L18 22 L28 4 L38 22 L54 8 L52 38 Z"
        fill="#FFD600" stroke="#111" strokeWidth="2.6" strokeLinejoin="round"
      />
      <circle cx="28" cy="2.5" r="2.2" fill="#111" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [balloonPopped, setBalloonPopped] = useState(false);

  // Scroll parallax linking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const mascotY = useTransform(smoothProgress, [0, 1], [0, 60]);

  // Cart crash into the paint balloon on load
  useEffect(() => {
    setBalloonPopped(false);

    const popTimer = setTimeout(() => {
      setBalloonPopped(true);
      confetti({
        particleCount: 65,
        spread: 90,
        origin: { x: 0.68, y: 0.6 },
        colors: ['#00B4D8', '#FF1493', '#FFD600', '#10B981'],
      });
    }, 800);

    return () => clearTimeout(popTimer);
  }, [animationKey]);

  const triggerReplay = () => setAnimationKey((prev) => prev + 1);

  const fireCtaConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#FFD600', '#00B4D8'],
    });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative lg:h-[720px] lg:min-h-[680px] pt-24 sm:pt-32 lg:pt-0 pb-6 sm:pb-10 lg:pb-0 overflow-hidden select-none"
    >
      {/* Bottom-left sketches + outline star */}
      <LeftSketches className="hidden md:block absolute -left-3 bottom-0 w-[110px] lg:w-[135px] h-auto pointer-events-none z-0" />

      {/* Faint top-left pencil scribble behind the logo */}
      <svg viewBox="0 0 200 60" fill="none" className="hidden lg:block absolute top-24 left-2 w-44 opacity-40 pointer-events-none" aria-hidden="true">
        <path d="M4 40 C 40 10, 80 50, 120 24 S 180 30, 196 12" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative z-20 lg:z-10">
        <div className="lg:h-full flex items-center lg:pt-24">

          {/* LEFT COLUMN: Title artwork, copy, CTAs */}
          <div className="w-[52%] sm:w-[50%] lg:w-[46%] relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[580px] w-full mb-2 sm:mb-5 -ml-1 sm:-ml-2"
              whileHover={{ scale: 1.02 }}
            >
              <HeroTitle className="w-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[11px] sm:text-base lg:text-[17px] text-gray-900 font-medium max-w-[470px] mb-4 sm:mb-7 leading-snug sm:leading-relaxed"
            >
              Pocco Locco Media is a performance marketing network connecting the
              right brands with the right audience through the right partners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-30 flex flex-nowrap lg:flex-wrap items-center gap-2 sm:gap-4 w-[190%] sm:w-[200%] lg:w-auto"
            >
              <motion.a
                href="/advertisers"
                onClick={fireCtaConfetti}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2 sm:gap-4 bg-[#FF1493] text-white text-[10px] sm:text-sm font-black tracking-wide uppercase pl-3.5 sm:pl-6 pr-3 sm:pr-5 py-2.5 sm:py-3.5 rounded-full whitespace-nowrap hover:bg-pink-600 transition-all shadow-md shadow-pink-500/25"
              >
                <span>I'M AN ADVERTISER</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="/publishers"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2 sm:gap-4 bg-white text-black border-2 border-black text-[10px] sm:text-sm font-black tracking-wide uppercase pl-3.5 sm:pl-6 pr-3 sm:pr-5 py-2 sm:py-3 rounded-full whitespace-nowrap hover:bg-gray-50 transition-all"
              >
                <span>I'M A PUBLISHER</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* RIGHT ARTWORK: the client's banner (mascot, sun, splashes, soot ball).
          On desktop it is pinned to the section's bottom-right like the client mockup. */}
      <div
        key={animationKey}
        className="absolute right-0 top-[92px] w-[56%] sm:right-0 sm:top-28 sm:w-[52%] lg:top-auto lg:bottom-0 lg:w-[55%] max-w-[820px] aspect-[1120/928] z-10"
      >

        {/* Paint balloon that pops when the cart lands */}
        <AnimatePresence>
          {!balloonPopped && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              exit={{ scale: 2.2, opacity: 0, filter: 'blur(8px)', transition: { duration: 0.15 } }}
              transition={{ duration: 0.4 }}
              className="absolute z-30 w-[11%] bottom-[18%] left-[4%] pointer-events-none"
            >
              <svg viewBox="0 0 100 120" className="w-full h-auto drop-shadow-xl">
                <defs>
                  <radialGradient id="balloonGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="40%" stopColor="#00B4D8" />
                    <stop offset="85%" stopColor="#FF1493" />
                  </radialGradient>
                </defs>
                <path
                  d="M50 10 C20 10, 10 40, 10 70 C10 100, 35 115, 48 118 L46 122 L54 122 L52 118 C65 115, 90 100, 90 70 C90 40, 80 10, 50 10 Z"
                  fill="url(#balloonGrad)"
                />
                <ellipse cx="32" cy="38" rx="14" ry="22" fill="#ffffff" opacity="0.6" transform="rotate(-25 32 38)" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot in cart (transparent PNG with blue/pink/yellow splashes and soot ball) */}
        <motion.div style={{ y: mascotY }} className="absolute inset-0">
          <motion.img
            src="/assets/hero-banner-v4.webp"
            alt="Pocco Locco Brain Mascot in Shopping Cart with Paint Splatter and Soot Monster"
            initial={{ x: 260, y: -100, rotate: 18, scale: 0.7, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: [18, -6, 2, 0], scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={triggerReplay}
            title="Click to replay the cart crash!"
            className="w-full h-full object-contain cursor-pointer"
          />
        </motion.div>

        {/* Yellow crown doodle */}
        <motion.div
          animate={{ rotate: [12, 20, 12], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="hidden sm:block absolute left-[84%] top-[2%] w-[7%] pointer-events-none z-20"
        >
          <YellowCrown className="w-full h-auto" />
        </motion.div>

        {/* Pink play button just past the sun's right edge (the artwork ends at ~84% across here),
            with "WATCH THE VIDEO" curving round its OUTER side only, over plain paper, so no
            text sits on the artwork */}
        <div className="absolute left-[84%] sm:left-[87.5%] lg:left-[88%] xl:left-[90%] top-[26%] -translate-x-1/2 -translate-y-1/2 z-20 w-[60px] h-[60px] sm:w-[84px] sm:h-[84px] lg:w-[116px] lg:h-[116px] flex items-center justify-center">
          <motion.svg
            viewBox="0 0 100 100"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="hidden sm:block absolute inset-0 w-full h-full overflow-visible pointer-events-none select-none"
            aria-hidden="true"
          >
            <defs>
              {/* right-hand arc of the circle, from just past the top (-100deg) round to just past the bottom (+100deg) */}
              <path id="videoArc" d="M43.06 10.61 A40 40 0 1 1 43.06 89.39" />
            </defs>
            <text
              fontSize="11"
              fontWeight="900"
              fill="#111"
              letterSpacing="0"
              style={{ fontFamily: "'Montserrat', 'Arial Black', sans-serif", textTransform: 'uppercase' }}
            >
              <textPath href="#videoArc" startOffset="50%" textAnchor="middle" textLength="136" lengthAdjust="spacingAndGlyphs">
                {VIDEO_LABEL}
              </textPath>
            </text>
          </motion.svg>

          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.9 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            title={VIDEO_LABEL}
            aria-label={VIDEO_LABEL}
            className="relative flex w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#FF1493] items-center justify-center text-white shadow-lg shadow-pink-500/40"
          >
            {/* small pulse ring (kept tight so it doesn't spread onto the artwork) */}
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-[#FF1493]"
            />
            <Play className="relative w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 fill-white ml-0.5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
