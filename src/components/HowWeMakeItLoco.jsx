import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { DoodleCrown } from './Doodles';
import confetti from 'canvas-confetti';

// Gesture beats for each mascot. The artwork is a single image, so a gesture is a
// lean/shake toward the raised fingers with comic flash lines, not moving fingers.
const GESTURES = {
  // Blue publisher: lean toward the two-finger victory sign
  peace: { rotate: [0, -12, -9, -12, 0], scale: [1, 1.08, 1.04, 1.08, 1], x: [0, -6, -4, -6, 0] },
  // Pink advertiser: rock-on headbang shake
  rock: { rotate: [0, 10, -8, 10, -6, 0], scale: [1, 1.08, 1.05, 1.08, 1.05, 1], y: [0, -6, 0, -6, 0, 0] },
};

// Mascot that bursts out of the card's background, then repeats its hand gesture
function PopMascot({ src, alt, glow, shadow, gesture, flashClass }) {
  const [peaceKey, setPeaceKey] = useState(0);

  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
      onHoverStart={() => setPeaceKey((k) => k + 1)}
      className="relative cursor-pointer max-w-[200px] w-full"
    >
      {/* Glow + splash ring that opens up first, like a portal in the background */}
      <motion.div
        variants={{
          hidden: { scale: 0, opacity: 0 },
          shown: { scale: [0, 1.25, 1], opacity: [0, 0.9, 0.55], transition: { duration: 0.6 } },
        }}
        style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
        className="absolute inset-[12%] rounded-full pointer-events-none"
      />

      {/* Emerges from depth: tiny, blurred and low, then overshoots forward and settles */}
      <motion.div
        variants={{
          hidden: { scale: 0.25, y: 70, rotate: -18, opacity: 0, filter: 'blur(10px)' },
          shown: {
            scale: [0.25, 1.18, 0.94, 1],
            y: [70, -12, 4, 0],
            rotate: [-18, 6, -3, 0],
            opacity: [0, 1, 1, 1],
            filter: ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
            transition: { duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        {/* Idle float once it has landed */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 2.2 }}
        >
          {/* Hand gesture beat, repeats every few seconds */}
          <motion.div
            key={peaceKey}
            animate={GESTURES[gesture]}
            transition={{
              duration: 1.1,
              delay: peaceKey === 0 ? 1.3 : 0,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '50% 85%' }}
            className="relative"
          >
            <img
              src={src}
              alt={alt}
              style={{ filter: `drop-shadow(0 12px 24px ${shadow})` }}
              className="w-full h-auto object-contain"
            />

            {/* Comic flash lines around the raised fingers, timed with the gesture */}
            <motion.svg
              key={`flash-${peaceKey}`}
              viewBox="0 0 60 60"
              fill="none"
              animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1.1, 1, 0.8] }}
              transition={{
                duration: 1.1,
                delay: peaceKey === 0 ? 1.3 : 0,
                repeat: Infinity,
                repeatDelay: 3,
                times: [0, 0.2, 0.4, 0.75, 1],
              }}
              className={`absolute w-[30%] pointer-events-none ${flashClass}`}
            >
              <path d="M30 4 L30 16" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
              <path d="M10 14 L18 23" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
              <path d="M50 14 L42 23" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
              <path d="M30 4 L30 16 M10 14 L18 23 M50 14 L42 23" stroke="#111" strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HowWeMakeItLoco() {
  const steps = [
    {
      title: 'ADVERTISERS',
      titleColor: 'text-[#FF1493]',
      desc: 'You bring the goals, we bring the audience.',
      img: '/assets/step-advertisers.webp',
      arrowColor: 'text-[#FF1493]',
    },
    {
      title: 'CAMPAGINS',
      titleColor: 'text-[#FF1493]',
      desc: 'We promote through our global partner network.',
      img: '/assets/step-campaigns.webp',
      arrowColor: 'text-[#FF1493]',
    },
    {
      title: 'POCCO LOCCO ENGINE',
      titleColor: 'text-[#FF1493]',
      desc: 'Smart optimization, Real time tracking.',
      img: '/assets/step-engine.webp',
      arrowColor: 'text-white',
    },
    {
      title: 'PUBLISHERS',
      titleColor: 'text-[#0099FF]',
      desc: 'Partners and quality traffic that converts.',
      img: '/assets/step-publishers.webp',
      arrowColor: 'text-[#0099FF]',
    },
    {
      title: 'RESULTS',
      titleColor: 'text-[#FFD600]',
      desc: 'More leads, more sales, more growth.',
      img: '/assets/step-results.webp',
    },
  ];

  // 3D Card tilt state for Advertisers Card
  const [advTilt, setAdvTilt] = useState({ x: 0, y: 0 });
  const handleAdvMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setAdvTilt({ x, y });
  };
  const handleAdvLeave = () => setAdvTilt({ x: 0, y: 0 });

  // 3D Card tilt state for Publishers Card
  const [pubTilt, setPubTilt] = useState({ x: 0, y: 0 });
  const handlePubMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setPubTilt({ x, y });
  };
  const handlePubLeave = () => setPubTilt({ x: 0, y: 0 });

  const triggerAction = (e, color) => {
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: color === 'pink' ? ['#FF1493', '#FFD600', '#FFFFFF'] : ['#0099FF', '#FFD600', '#FFFFFF'],
    });
  };

  return (
    <section id="how-it-works" className="relative w-full bg-white select-none">
      
      {/* 1. BLACK BANNER FOR 5 STEPS WITH EXACT CLIENT BACKGROUND (NOT OVER-ZOOMED) */}
      <div
        className="relative w-full bg-[#0c0d11] text-white pt-10 pb-28 sm:pt-12 sm:pb-32 lg:pt-12 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/bg-how-we-make-it-locco.webp')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header with Crowns Nestled Exactly Around Title */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative inline-flex items-center justify-center px-6 sm:px-12 lg:px-16"
            >
              {/* Left Crown from Client Asset */}
              <motion.img
                src="/assets/crown-left.webp"
                alt="Crown Left"
                animate={{ rotate: [-2, 2, -2], y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -left-7 sm:-left-12 lg:-left-14 top-1/2 -translate-y-[48%] w-11 h-11 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(255,214,0,0.25)]"
              />

              {/* Centered Heading with distinct space between each word */}
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[56px] uppercase drop-shadow-md text-center inline-flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-4.5">
                <span className="text-white">HOW</span>
                <span className="text-white">WE</span>
                <span className="text-white">MAKE</span>
                <span className="text-white">IT</span>
                <span className="text-[#FFD600]">LOCCO</span>
              </h2>

              {/* Right Crown from Client Asset */}
              <motion.img
                src="/assets/crown-right.webp"
                alt="Crown Right"
                animate={{ rotate: [2, -2, 2], y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -right-7 sm:-right-12 lg:-right-14 top-1/2 -translate-y-[48%] w-11 h-11 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(255,214,0,0.25)]"
              />
            </motion.div>
          </div>

          {/* 5-Step Process Flow Track */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-2 relative">
            {steps.map((step, idx) => (
              <React.Fragment key={step.title}>
                <motion.div
                  initial={{ opacity: 0.8, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex-1 flex flex-col items-center text-center group cursor-pointer max-w-[200px]"
                >
                  {/* Step Image Badge */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mb-3 flex items-center justify-center"
                  >
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] transition-transform duration-300"
                    />
                  </motion.div>

                  {/* Step Title with exact client color */}
                  <h3 className={`text-xs sm:text-sm font-black tracking-wider uppercase mb-1 drop-shadow ${step.titleColor} transition-colors`}>
                    {step.title}
                  </h3>

                  {/* Step Subtext */}
                  <p className="text-[11px] sm:text-xs text-gray-300 leading-snug font-medium">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Animated Flow Arrow between steps with exact colors */}
                {idx < steps.length - 1 && (
                  <div className={`hidden md:flex items-center justify-center shrink-0 pt-10 sm:pt-12 ${step.arrowColor}`}>
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      className="w-7 h-5 sm:w-8 sm:h-6"
                      viewBox="0 0 36 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 2 9 L 30 9" />
                      <path d="M 22 2 L 30 9 L 22 16" />
                    </motion.svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>

      {/* 2. THE 2 CARDS (OVERLAPPING THE BANNER ON CLEAN WHITE BACKGROUND) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 lg:-mt-24 relative z-20 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: FOR ADVERTISERS */}
          <motion.div
            id="advertisers"
            onMouseMove={handleAdvMove}
            onMouseLeave={handleAdvLeave}
            animate={{
              rotateY: advTilt.x,
              rotateX: advTilt.y,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            style={{ perspective: 1000 }}
            className="bg-white text-black rounded-[28px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden border border-gray-100 flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Left Column: Mascot Pink Rock Hand */}
              <div className="sm:col-span-5 flex justify-center">
                <PopMascot
                  src="/assets/mascot-pink-hand.webp"
                  alt="Pocco Locco Advertisers Mascot"
                  glow="rgba(255,20,147,0.4)"
                  shadow="rgba(255,20,147,0.25)"
                  gesture="rock"
                  flashClass="-top-[8%] left-[22%]"
                />
              </div>

              {/* Right Column: Advertisers Content */}
              <div className="sm:col-span-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-3xl lg:text-[40px] leading-none uppercase text-[#FF1493] mb-2">
                    FOR ADVERTISERS
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold mb-5 leading-snug">
                    High quality leads. Scalable campaigns. Transparent performance.
                  </p>

                  <ul className="space-y-2.5 mb-7">
                    {[
                      'Verified & Genuine Traffic',
                      'Real Time Reporting',
                      'Dedicated Account Managers',
                      'Global Reach',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-900">
                        <span className="w-5 h-5 rounded-full bg-[#FF1493] flex items-center justify-center text-white shrink-0 shadow-sm">
                          <Check className="w-3 h-3 stroke-[3.5]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  onClick={(e) => triggerAction(e, 'pink')}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center justify-between bg-black text-white text-xs sm:text-sm font-black tracking-wider uppercase pl-6 pr-2.5 py-3 rounded-full hover:bg-neutral-900 transition-all shadow-xl w-fit cursor-pointer"
                >
                  <span>EXPLORE MORE</span>
                  <span className="w-7 h-7 rounded-full bg-[#FF1493] flex items-center justify-center text-white ml-4 transition-transform group-hover:translate-x-1 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: FOR PUBLISHERS */}
          <motion.div
            id="publishers"
            onMouseMove={handlePubMove}
            onMouseLeave={handlePubLeave}
            animate={{
              rotateY: pubTilt.x,
              rotateX: pubTilt.y,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            style={{ perspective: 1000 }}
            className="bg-white text-black rounded-[28px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden border border-gray-100 flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Left Column: Publishers Content */}
              <div className="sm:col-span-7 flex flex-col justify-between order-2 sm:order-1">
                <div>
                  <h3 className="font-display text-3xl lg:text-[40px] leading-none uppercase text-[#0099FF] mb-2">
                    FOR PUBLISHERS
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold mb-5 leading-snug">
                    Better campaigns. Higher payouts. Long term partnerships.
                  </p>

                  <ul className="space-y-2.5 mb-7">
                    {[
                      'High Converting Offers',
                      'On-time Payments',
                      'Weekly Payouts',
                      '24/7 Support',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-900">
                        <span className="w-5 h-5 rounded-full bg-[#0099FF] flex items-center justify-center text-white shrink-0 shadow-sm">
                          <Check className="w-3 h-3 stroke-[3.5]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  onClick={(e) => triggerAction(e, 'blue')}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center justify-between bg-black text-white text-xs sm:text-sm font-black tracking-wider uppercase pl-6 pr-2.5 py-3 rounded-full hover:bg-neutral-900 transition-all shadow-xl w-fit cursor-pointer"
                >
                  <span>START EARNING</span>
                  <span className="w-7 h-7 rounded-full bg-[#0099FF] flex items-center justify-center text-white ml-4 transition-transform group-hover:translate-x-1 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </div>

              {/* Right Column: Mascot Blue Peace Hand */}
              <div className="sm:col-span-5 flex justify-center order-1 sm:order-2">
                <PopMascot
                  src="/assets/mascot-blue-hand.webp"
                  alt="Pocco Locco Publishers Mascot"
                  glow="rgba(0,153,255,0.45)"
                  shadow="rgba(0,153,255,0.25)"
                  gesture="peace"
                  flashClass="-top-[6%] left-[2%]"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
