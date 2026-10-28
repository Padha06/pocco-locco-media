import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CraftScatter } from './CraftDecor';
import confetti from 'canvas-confetti';

export default function AboutSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const laptopGuyY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  // 4 Features with user-provided extracted assets and alternating client colors
  const features = [
    {
      title: 'TRANSPARENT',
      desc: 'Clear communication and honest reporting.',
      img: '/assets/about-transparent.png',
      titleColor: 'text-[#0099FF]',
    },
    {
      title: 'PERFORMANCE',
      desc: 'We optimise every step for better results.',
      img: '/assets/about-performance.png',
      titleColor: 'text-[#FF1493]',
    },
    {
      title: 'INNOVATIVE',
      desc: 'Advanced tracking and smart technology.',
      img: '/assets/about-innovative.png',
      titleColor: 'text-[#0099FF]',
    },
    {
      title: 'DEDICATED',
      desc: 'A team that cares about your success.',
      img: '/assets/about-dedicated.png',
      titleColor: 'text-[#FF1493]',
    },
  ];

  return (
    <section id="about" ref={containerRef} className="pt-6 sm:pt-8 pb-8 sm:pb-10 relative overflow-hidden select-none">
      <CraftScatter
        items={[
          { shape: 'Splat', className: 'top-8 right-[1.5%] w-16', props: { color: '#0099FF' } },
          { shape: 'Squiggle', className: 'top-[26%] left-[1%] w-20', props: { color: '#FF1493' } },
          { shape: 'Sparkle', className: 'top-[52%] right-[3%] w-9' },
          { shape: 'Dots', className: 'top-[60%] left-[2%] w-14' },
          { shape: 'Crown', className: 'bottom-10 right-[2.5%] w-10', props: { fill: '#FFD600' } },
          { shape: 'Star', className: 'bottom-6 left-[2.5%] w-8', props: { fill: '#0099FF' } },
          { shape: 'Scribble', className: 'bottom-2 left-[36%] w-44', still: true },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            TOP BLOCK: Character with Yellow Backdrop + Copy + "MORE THAN MARKETING"
           ========================================================================= */}
        <div className="grid grid-cols-12 gap-3 lg:gap-12 items-center mb-5 sm:mb-10">
          
          {/* Left Column: 3D Guy with Laptop + Yellow Paint Splatter Backdrop + Doodles */}
          <div className="col-span-5 lg:col-span-6 relative flex justify-center items-center">
            
            {/* Custom Golden-Yellow Paint Circle Backdrop with Splatters */}
            <div className="absolute w-[140px] h-[140px] sm:w-[360px] sm:h-[360px] lg:w-[410px] lg:h-[410px] top-1/2 left-1/2 -translate-x-[52%] -translate-y-[52%] z-0 pointer-events-none select-none">
              <img
                src="/assets/about-yellow-backdrop.svg"
                alt="Yellow Splatter Backdrop"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Client Doodle 1: Black 5-pointed doodle star on the left of yellow circle */}
            <motion.div
              animate={{ rotate: [-6, 6, -6], scale: [0.96, 1.04, 0.96] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute top-[48%] -left-1 sm:left-4 -translate-y-1/2 z-20 pointer-events-none select-none"
            >
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none" className="drop-shadow-sm">
                <path
                  d="M20 4 L23.5 14 L34 14.5 L25.5 21 L28.5 32 L20 25.5 L11.5 32 L14.5 21 L6 14.5 L16.5 14 Z"
                  stroke="#111111"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="#FFFFFF"
                />
              </svg>
            </motion.div>

            {/* Client Doodle 2: Yellow Star Doodle above soot monster / character */}
            <motion.div
              animate={{ rotate: [10, -10, 10], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute top-2 sm:top-5 right-6 sm:right-14 z-20 pointer-events-none select-none"
            >
              <svg width="38" height="38" viewBox="0 0 40 40" fill="none" className="drop-shadow-sm">
                <path
                  d="M20 3 L24.5 13.5 L36 14.5 L27 22 L29.5 33.5 L20 27 L10.5 33.5 L13 22 L4 14.5 L15.5 13.5 Z"
                  fill="#FFD600"
                  stroke="#1A1A1A"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="18" r="1.5" fill="#1A1A1A" />
              </svg>
            </motion.div>

            {/* Laptop Guy Mascot Image (Extracted by user with stickers & soot creatures) */}
            <motion.div
              style={{ y: laptopGuyY }}
              whileHover={{ scale: 1.02 }}
              className="relative z-10 max-w-[150px] sm:max-w-[380px] lg:max-w-[420px] w-full cursor-pointer"
            >
              <img
                src="/assets/about-laptop-hd.webp"
                alt="Pocco Locco Media Creator with Laptop"
                className="w-full h-auto object-contain filter drop-shadow-[0_18px_36px_rgba(0,0,0,0.14)]"
              />
            </motion.div>

          </div>

          {/* Right Column: Copy, CTA & Tilted "MORE THAN MARKETING" */}
          <div className="col-span-7 lg:col-span-6 relative">
            
            {/* Tilted "MORE THAN MARKETING" Doodle Graphic from user asset */}
            <motion.div
              animate={{ y: [-3, 3, -3], rotate: [-1, 2, -1] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -top-2 lg:top-6 right-0 lg:-right-4 w-12 sm:w-32 lg:w-36 pointer-events-none select-none z-20"
            >
              <img
                src="/assets/more-than-marketing.webp"
                alt="More Than Marketing"
                className="w-full h-auto object-contain filter drop-shadow-sm"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pt-0 pr-10 sm:pr-32 lg:pr-28"
            >
              <h2 className="font-display text-2xl sm:text-5xl lg:text-[54px] text-black uppercase leading-[1.05] mb-2 sm:mb-4 lg:whitespace-nowrap">
                ABOUT <br />
                POCCO LOCCO <span className="text-[#FF1493]">MEDIA</span>
              </h2>

              {/* Paragraph with matched generous gap below as per client mockup */}
              <p className="text-[10px] sm:text-base lg:text-[17px] text-gray-700 font-medium leading-snug sm:leading-relaxed mb-3 sm:mb-6 max-w-xl">
                Pocco Locco Media is a global performance marketing network. We
                connect advertisers with high-quality publishers to drive real
                business growth through data-driven strategies, innovative
                technology, and a passionate team.
              </p>

              {/* Action Button: Black Pill + Pink Circle Arrow with Confetti */}
              <motion.a
                href="/about"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: {
                      x: (rect.left + rect.width / 2) / window.innerWidth,
                      y: (rect.top + rect.height / 2) / window.innerHeight,
                    },
                    colors: ['#FF1493', '#0099FF', '#FFD600'],
                  });
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center justify-between bg-black text-white text-[9px] sm:text-sm font-black tracking-wide sm:tracking-wider uppercase pl-3 sm:pl-6 pr-1.5 sm:pr-2.5 py-1.5 sm:py-3 rounded-full hover:bg-neutral-900 transition-all shadow-xl w-fit cursor-pointer"
              >
                <span>OUR STORY</span>
                <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#FF1493] flex items-center justify-center text-white ml-2 sm:ml-4 transition-transform group-hover:translate-x-1 shadow-sm">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
              </motion.a>
            </motion.div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM BLOCK: "WHY WORK WITH POCCO LOCCO?" + 4 Value Propositions
           ========================================================================= */}
        <div className="relative">
          
          {/* Section Header with Doodle Arrow on Left & Crown on Right */}
          <div className="relative flex items-center justify-center mb-6 sm:mb-8">
            
            {/* Doodle Curved Arrow from bottom-left (under character) pointing to title */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -left-2 sm:left-4 lg:left-20 w-10 sm:w-auto top-1/2 -translate-y-1/2 pointer-events-none select-none"
            >
              <svg viewBox="0 0 120 50" fill="none" className="text-black w-10 sm:w-[120px] h-auto">
                <path
                  d="M8 42 C 32 10, 80 10, 112 36"
                  stroke="#111111"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <path
                  d="M96 36 L114 36 L108 20"
                  stroke="#111111"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Centered Heading */}
            <h2 className="font-display text-xl sm:text-5xl text-black uppercase text-center">
              WHY WORK WITH <span className="text-[#FF1493]">POCCO LOCCO?</span>
            </h2>

            {/* Crown Doodle on right side (exact white doodle crown from client design) */}
            <motion.div
              animate={{ rotate: [12, 16, 12], y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute right-0 sm:right-6 lg:right-16 top-1/2 -translate-y-[52%] pointer-events-none select-none"
            >
              <img
                src="/assets/crown-white.svg"
                alt="White Crown Doodle"
                className="w-7 h-7 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain drop-shadow-sm"
              />
            </motion.div>

          </div>

          {/* 4 Feature Value Pillars (Direct Minimalist Layout matching client design without boxed cards) */}
          <div className="grid grid-cols-4 gap-2 lg:gap-6">
            {features.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                {/* User Extracted Icon */}
                <div className="h-9 sm:h-20 flex items-center justify-center mb-1.5 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="max-h-full max-w-[40px] sm:max-w-[95px] object-contain drop-shadow-sm"
                  />
                </div>

                {/* Title with exact alternating color (#0099FF / #FF1493) */}
                <h3 className={`text-[8px] sm:text-base font-black tracking-normal sm:tracking-wider uppercase mb-0.5 sm:mb-2 ${item.titleColor}`}>
                  {item.title}
                </h3>

                {/* Description Text */}
                <p className="text-[8px] sm:text-sm text-gray-700 font-medium leading-tight sm:leading-relaxed max-w-[210px]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
