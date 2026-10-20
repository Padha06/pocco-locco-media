import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';

// Paint-brushed yellow "sun" that sits behind the mascot's head in the client design
function PaintSun({ className }) {
  return (
    <svg viewBox="0 0 260 260" className={className} aria-hidden="true">
      <defs>
        {/* Wobbly outline so the disc reads as hand-painted */}
        <filter id="sunRough" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="4" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
        {/* Dry-brush bristle streaks: stretched noise used as an alpha mask, then roughened */}
        <filter id="sunDry" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.55" numOctaves="2" seed="4" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.1" result="streaks" />
          <feComposite in="SourceGraphic" in2="streaks" operator="in" result="dry" />
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="9" result="warp" />
          <feDisplacementMap in="dry" in2="warp" scale="14" />
        </filter>
        <filter id="sunSoft">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <radialGradient id="sunFill" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#FFD24A" />
          <stop offset="70%" stopColor="#F9BD2F" />
          <stop offset="100%" stopColor="#F3AA22" />
        </radialGradient>
      </defs>

      {/* Main painted disc */}
      <g filter="url(#sunRough)">
        <circle cx="130" cy="130" r="98" fill="url(#sunFill)" />
        {/* Deeper orange pooling and lighter highlights inside the paint */}
        <ellipse cx="168" cy="160" rx="46" ry="36" fill="#EE9F1C" opacity="0.45" filter="url(#sunSoft)" />
        <ellipse cx="96" cy="92" rx="40" ry="28" fill="#FFE07A" opacity="0.55" filter="url(#sunSoft)" />
      </g>

      {/* Bristle streaks dragging past the edge */}
      <g filter="url(#sunDry)">
        <circle cx="130" cy="130" r="104" fill="none" stroke="#F7B829" strokeWidth="22" />
        <path d="M40 120 C 60 50, 190 30, 232 110" fill="none" stroke="#FFD25A" strokeWidth="16" />
        <path d="M52 190 C 100 236, 196 226, 226 170" fill="none" stroke="#F3AA22" strokeWidth="14" />
      </g>

      {/* Flicked paint drops */}
      <circle cx="246" cy="84" r="5" fill="#F9BD2F" />
      <circle cx="238" cy="62" r="3" fill="#F9BD2F" />
      <circle cx="252" cy="120" r="2.4" fill="#F9BD2F" />
      <circle cx="16" cy="170" r="3.5" fill="#F9BD2F" />
      <circle cx="26" cy="196" r="2" fill="#F9BD2F" />
    </svg>
  );
}

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

const cardClass =
  'bg-white/90 backdrop-blur-sm rounded-md sm:rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white';

export default function Hero() {
  const containerRef = useRef(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [hasCrashed, setHasCrashed] = useState(false);
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

  // Mascot drifts down slightly and the cards float up as you scroll
  const mascotY = useTransform(smoothProgress, [0, 1], [0, 60]);
  const sunY = useTransform(smoothProgress, [0, 1], [0, 30]);
  const stat1Y = useTransform(smoothProgress, [0, 1], [0, -40]);
  const stat2Y = useTransform(smoothProgress, [0, 1], [0, -20]);
  const stat3Y = useTransform(smoothProgress, [0, 1], [0, -55]);

  // Cart crash into the paint balloon on load
  useEffect(() => {
    setHasCrashed(false);
    setBalloonPopped(false);

    const popTimer = setTimeout(() => {
      setBalloonPopped(true);
      setHasCrashed(true);
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

  const statAnim = (delay) => ({
    initial: { opacity: 0, x: 30, scale: 0.85 },
    animate: hasCrashed ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.85 },
    transition: { type: 'spring', stiffness: 220, damping: 18, delay },
  });

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
              <img
                src="/assets/hero-title-complete.webp"
                alt="Performance Marketing Network - We Turn Traffic Into Results"
                className="w-full h-auto object-contain"
              />
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
                href="#advertisers"
                onClick={fireCtaConfetti}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2 sm:gap-4 bg-[#FF1493] text-white text-[10px] sm:text-sm font-black tracking-wide uppercase pl-3.5 sm:pl-6 pr-3 sm:pr-5 py-2.5 sm:py-3.5 rounded-full whitespace-nowrap hover:bg-pink-600 transition-all shadow-md shadow-pink-500/25"
              >
                <span>I'M AN ADVERTISER</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#publishers"
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

      {/* RIGHT ARTWORK: sun, mascot (with its own splashes + soot ball), stat cards.
          On desktop it is pinned to the section's bottom-right like the client mockup. */}
      <div
        key={animationKey}
        className="absolute right-0 top-[92px] w-[56%] sm:right-0 sm:top-28 sm:w-[52%] lg:top-auto lg:bottom-0 lg:w-[55%] max-w-[820px] aspect-[1024/762] z-10"
      >
        {/* Yellow sun behind the head */}
        <motion.div
          style={{ y: sunY }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="absolute left-[35%] -top-[5%] w-[44%] pointer-events-none"
        >
          <PaintSun className="w-full h-auto" />
        </motion.div>

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
            src="/assets/pocco-locco-master-hero.webp"
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

        {/* STAT CARD 1: Leads Generated + green trend arrow + play button */}
        <motion.div
          style={{ y: stat1Y }}
          {...statAnim(0.15)}
          className={`absolute left-[46%] sm:left-[54%] top-[9%] z-20 ${cardClass} px-1.5 py-1 sm:pl-3 sm:pr-2 sm:py-1.5 lg:pl-4 lg:pr-3 lg:py-2.5 flex items-center gap-1.5 sm:gap-3`}
        >
          <div className="flex flex-col">
            <span className="text-[7px] sm:text-[10px] lg:text-xs font-semibold text-gray-500 whitespace-nowrap">Leads Generated</span>
            <span className="text-[13px] sm:text-xl lg:text-[28px] font-black text-[#10B981] leading-tight">12.5M+</span>
          </div>
          <svg viewBox="0 0 60 40" fill="none" className="w-4 sm:w-8 lg:w-14 h-auto">
            <path d="M3 34 L18 20 L28 28 L50 8" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 6 L52 6 L52 20" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <motion.button
          type="button"
          style={{ y: stat1Y }}
          {...statAnim(0.2)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-[88%] top-[24%] sm:left-[86%] sm:top-[19%] z-20 flex w-6 h-6 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-full bg-[#FF1493] items-center justify-center text-white shadow-lg shadow-pink-500/40"
          title="Watch video"
        >
          <Play className="w-3 h-3 sm:w-5 sm:h-5 fill-white ml-0.5" />
        </motion.button>

        {/* STAT CARD 2: Countries */}
        <motion.div
          style={{ y: stat2Y }}
          {...statAnim(0.25)}
          className={`absolute left-[54%] sm:left-[60%] top-[33%] z-20 ${cardClass} px-1.5 py-1 sm:pl-2 sm:pr-4 sm:py-1.5 lg:pl-3 lg:pr-6 lg:py-2.5 flex items-center gap-1.5 sm:gap-3`}
        >
          <div className="w-4 h-4 sm:w-8 sm:h-8 lg:w-11 lg:h-11 rounded-full bg-[#1E88E5] flex items-center justify-center text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3 h-3 sm:w-5 sm:h-5 lg:w-7 lg:h-7">
              <circle cx="12" cy="12" r="9.5" />
              <ellipse cx="12" cy="12" rx="4.2" ry="9.5" />
              <path d="M2.5 12h19M4 7h16M4 17h16" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] sm:text-[10px] lg:text-xs font-semibold text-gray-500 whitespace-nowrap">Countries</span>
            <span className="text-[13px] sm:text-xl lg:text-[28px] font-black text-black leading-tight">120+</span>
          </div>
        </motion.div>

        {/* STAT CARD 3: Payouts Processed */}
        <motion.div
          style={{ y: stat3Y }}
          {...statAnim(0.35)}
          className={`absolute left-[50%] sm:left-[59%] top-[55%] z-20 ${cardClass} px-1.5 py-1 sm:pl-3 sm:pr-2 sm:py-1.5 lg:pl-4 lg:pr-3 lg:py-2.5 flex items-center gap-1.5 sm:gap-4`}
        >
          <div className="flex flex-col">
            <span className="text-[7px] sm:text-[10px] lg:text-xs font-semibold text-gray-500 whitespace-nowrap">Payouts Processed</span>
            <span className="text-[13px] sm:text-xl lg:text-[28px] font-black text-[#FF1493] leading-tight">$8.7M+</span>
          </div>
          <Sun className="w-3.5 h-3.5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-[#FFC22E] fill-[#FFD95A] stroke-[2.2]" />
        </motion.div>
      </div>
    </section>
  );
}
