import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

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

  // Mascot scroll transforms (cart accelerates forward & tilts as you scroll)
  const mascotY = useTransform(smoothProgress, [0, 1], [0, 110]);
  const mascotRotate = useTransform(smoothProgress, [0, 1], [0, -6]);
  const mascotScale = useTransform(smoothProgress, [0, 1], [1, 1.04]);

  // Parallax for floating stat badges
  const stat1Y = useTransform(smoothProgress, [0, 1], [0, -50]);
  const stat2Y = useTransform(smoothProgress, [0, 1], [0, -25]);
  const stat3Y = useTransform(smoothProgress, [0, 1], [0, -75]);

  // Handle the Cart Crash into the Paint Balloon on load sequence
  useEffect(() => {
    setHasCrashed(false);
    setBalloonPopped(false);

    // Balloon pop at 800ms when cart collides
    const popTimer = setTimeout(() => {
      setBalloonPopped(true);
      setHasCrashed(true);

      // Trigger colorful paint splash confetti explosion
      confetti({
        particleCount: 65,
        spread: 90,
        origin: { x: 0.72, y: 0.55 },
        colors: ['#00B4D8', '#FF1B7A', '#FFD600', '#10B981'],
      });
    }, 800);

    return () => clearTimeout(popTimer);
  }, [animationKey]);

  const triggerReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const fireCtaConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF1B7A', '#FFD600', '#00B4D8'],
    });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[680px] lg:min-h-[780px] lg:max-h-[920px] lg:h-[92vh] pt-28 sm:pt-32 pb-12 flex items-center overflow-hidden bg-white select-none"
    >
      {/* Top Black Paint Splatter / Drip along border matching client mockup */}
      <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none opacity-90 z-10 overflow-hidden flex">
        <svg viewBox="0 0 1200 40" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path d="M0 0 L1200 0 L1200 12 Q 1050 25, 900 10 T 600 22 T 300 8 T 0 16 Z" fill="#000000" />
          <circle cx="150" cy="24" r="5" fill="#000000" />
          <circle cx="155" cy="33" r="3" fill="#000000" />
          <circle cx="420" cy="28" r="4.5" fill="#000000" />
          <circle cx="780" cy="22" r="4" fill="#000000" />
          <circle cx="1020" cy="26" r="5.5" fill="#000000" />
          <path d="M280 0 L340 0 L330 18 Q 310 26, 290 14 Z" fill="#FF1B7A" />
          <circle cx="310" cy="28" r="4" fill="#FF1B7A" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: User's Exact Tilted Caption Image with Crown, Stars & Yellow Tag */}
          <div className="lg:col-span-6 relative z-20">
            
            {/* The Master Caption Image created by the user with exact tilt & details */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[560px] w-full mb-6 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/assets/hero-title-complete.webp"
                alt="Performance Marketing Network - We Turn Traffic Into Results"
                className="w-full h-auto object-contain filter drop-shadow-sm transition-transform duration-300"
              />
            </motion.div>

            {/* Description Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-800 font-semibold max-w-lg mb-8 leading-relaxed pl-1"
            >
              Pocco Locco Media is a performance marketing network connecting the
              right brands with the right audience through the right partners.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pl-1"
            >
              {/* I'M AN ADVERTISER BUTTON */}
              <motion.a
                href="#advertisers"
                onClick={fireCtaConfetti}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center justify-between gap-3 bg-[#FF1B7A] text-white text-xs sm:text-sm font-black tracking-wider uppercase pl-6 pr-2.5 py-3 rounded-full hover:bg-pink-600 transition-all shadow-md shadow-pink-500/25"
              >
                <span>I'M AN ADVERTISER</span>
                <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </motion.a>

              {/* I'M A PUBLISHER BUTTON */}
              <motion.a
                href="#publishers"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center justify-between gap-3 bg-white text-black border-2 border-black text-xs sm:text-sm font-black tracking-wider uppercase pl-6 pr-2.5 py-2.5 rounded-full hover:bg-gray-50 transition-all shadow-sm"
              >
                <span>I'M A PUBLISHER</span>
                <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center text-black transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </motion.a>

              {/* Replay Crash & Splash interactive button */}
              <motion.button
                onClick={triggerReplay}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-500 hover:text-[#FF1B7A] bg-gray-50 hover:bg-pink-50 px-3.5 py-2 rounded-full border border-gray-200 transition-all ml-1 shadow-sm"
                title="Watch cart crash & paint balloon pop again"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Crash & Splash</span>
              </motion.button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: User's Master Pocco Locco Cart + Exact Paint Splatter + Balloon Crash */}
          <div key={animationKey} className="lg:col-span-6 relative flex justify-center items-center select-none pt-4 lg:pt-0 min-h-[500px]">
            
            {/* THE WATER BALLOON (Floats in place, then POPS on cart impact) */}
            <AnimatePresence>
              {!balloonPopped && (
                <motion.div
                  initial={{ scale: 0, y: -20, opacity: 0 }}
                  animate={{
                    scale: [0, 1.25, 1],
                    y: [0, -10, 0],
                    rotate: [-5, 5, -5],
                    opacity: 1,
                  }}
                  exit={{
                    scale: 2.2,
                    opacity: 0,
                    filter: 'blur(8px)',
                    transition: { duration: 0.15 },
                  }}
                  transition={{
                    scale: { duration: 0.4 },
                    y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute z-30 w-28 h-32 bottom-8 left-16 sm:left-24 pointer-events-none"
                >
                  <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-xl">
                    <defs>
                      <radialGradient id="balloonGrad" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#7dd3fc" />
                        <stop offset="40%" stopColor="#00B4D8" />
                        <stop offset="85%" stopColor="#FF1B7A" />
                        <stop offset="100%" stopColor="#991b1b" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M50 10 C20 10, 10 40, 10 70 C10 100, 35 115, 48 118 L46 122 L54 122 L52 118 C65 115, 90 100, 90 70 C90 40, 80 10, 50 10 Z"
                      fill="url(#balloonGrad)"
                    />
                    <ellipse cx="32" cy="38" rx="14" ry="22" fill="#ffffff" opacity="0.6" transform="rotate(-25 32 38)" />
                    <circle cx="24" cy="65" r="4" fill="#ffffff" opacity="0.4" />
                  </svg>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-white bg-black/75 px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                    Paint Balloon
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* THE MASTER POCCO LOCCO HERO MASCOT & AUTHENTIC PAINT SPLATTER (Shared by user) */}
            <motion.div
              style={{
                y: mascotY,
                rotate: mascotRotate,
                scale: mascotScale,
              }}
              className="relative z-10 max-w-[500px] sm:max-w-[560px] w-full"
            >
              <motion.div
                initial={{
                  x: 320,
                  y: -120,
                  rotate: 20,
                  scale: 0.65,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  rotate: [20, -7, 2, 0],
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="animate-float-slow cursor-grab active:cursor-grabbing"
                onClick={triggerReplay}
                title="Click to trigger cart crash again!"
              >
                <img
                  src="/assets/pocco-locco-master-hero.webp"
                  alt="Pocco Locco Brain Mascot in Shopping Cart with Paint Splatter and Soot Monster"
                  className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.14)] hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </motion.div>

            {/* FLOATING STAT CARD 1: Leads Generated (Top Right) */}
            <motion.div
              style={{ y: stat1Y }}
              initial={{ opacity: 0, x: 40, scale: 0.8 }}
              animate={hasCrashed ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.15 }}
              className="absolute -top-2 sm:top-2 right-0 sm:right-2 z-20 flex items-center gap-2"
            >
              <div className="bg-white px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100/80 flex flex-col hover:scale-105 transition-transform cursor-pointer">
                <span className="text-[11px] font-bold text-gray-500">
                  Leads Generated
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-[#10B981]">
                    12.5M+
                  </span>
                  <svg viewBox="0 0 40 24" fill="none" className="w-7 h-4">
                    <path d="M2 20 Q 15 18, 25 8 T 36 3" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M26 3 L37 3 L36 14" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Hot Pink Play Video Circle Button */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-[#FF1B7A] flex items-center justify-center text-white shadow-lg shadow-pink-500/40 cursor-pointer shrink-0 animate-pulse"
                title="Watch video"
              >
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </motion.div>
            </motion.div>

            {/* FLOATING STAT CARD 2: Countries (Middle Right) */}
            <motion.div
              style={{ y: stat2Y }}
              initial={{ opacity: 0, x: 40, scale: 0.8 }}
              animate={hasCrashed ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.25 }}
              className="absolute top-36 sm:top-38 -right-2 sm:right-4 z-20 bg-white px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100/80 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-[#00B4D8] flex items-center justify-center text-white shadow-sm shadow-cyan-500/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400">
                  Countries
                </span>
                <span className="text-xl sm:text-2xl font-black text-black leading-none">
                  120+
                </span>
              </div>
            </motion.div>

            {/* FLOATING STAT CARD 3: Payouts Processed (Bottom Right) */}
            <motion.div
              style={{ y: stat3Y }}
              initial={{ opacity: 0, x: 35, scale: 0.8 }}
              animate={hasCrashed ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 35, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.35 }}
              className="absolute top-64 sm:top-66 right-2 sm:right-6 z-20 bg-white px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100/80 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-[#FFD600]/20 flex items-center justify-center text-amber-500 shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-500">
                  <circle cx="12" cy="9" r="6" />
                  <polygon points="12,15 9,22 12,20 15,22" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400">
                  Payouts Processed
                </span>
                <span className="text-xl sm:text-2xl font-black text-black leading-none">
                  $8.7M+
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
