import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

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
    <section ref={containerRef} className="pt-2 sm:pt-4 pb-14 sm:pb-16 bg-white relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row with Rotating Globe Video & Global Opportunities Tag */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8 sm:mb-10">
          
          {/* Left: Heading & Description */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-black tracking-tight uppercase leading-[1.08] mb-4 sm:mb-5">
              TRUSTED TO <br />
              PERFORM <span className="text-[#FF1493]">GLOBALLY</span>
            </h2>
            <p className="text-gray-700 text-sm sm:text-base font-semibold max-w-lg leading-relaxed">
              We work with leading brands across multiple industries and geographies,
              delivering measurable results through innovative performance solutions.
            </p>
          </div>

          {/* Right: Rotating Globe Video + Exact Positioned Global Opportunities Tag */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            <motion.div
              style={{ scale: globeScale }}
              className="relative flex items-center"
            >
              {/* Rotating Globe Video (Seamless Pure White Blend with NO gray box) */}
              <div className="relative w-[240px] sm:w-[290px] lg:w-[320px] aspect-square shrink-0 flex items-center justify-center">
                <video
                  src="/assets/rotating-globe.mp4"
                  poster="/assets/globe-poster.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    filter: 'contrast(1.14) brightness(1.08)',
                    mixBlendMode: 'multiply',
                  }}
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
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
                className="relative -ml-12 sm:-ml-16 lg:-ml-20 w-[160px] sm:w-[200px] lg:w-[230px] shrink-0 pointer-events-none select-none z-10"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pt-4">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0.7, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex flex-col items-center sm:items-start text-center sm:text-left p-2.5 rounded-2xl hover:bg-gray-50/80 transition-all cursor-default"
            >
              <span className={`text-3xl sm:text-4xl lg:text-5xl font-black ${m.color} tracking-tight drop-shadow-sm`}>
                {m.value}
              </span>
              <span className="text-xs sm:text-sm font-black text-gray-800 tracking-wider uppercase mt-1.5">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
