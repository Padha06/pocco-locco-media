import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star as StarIcon } from 'lucide-react';
import { CraftScatter, Splat, Sparkle, Star, Tape } from './CraftDecor';

// Shared sections for the inner pages (Advertisers, Publishers, About),
// built in the same paper + doodle style as the home page.

const TAPES = ['#FFD600', '#FF8DC7', '#7CD3FF'];

function PillLink({ href, children, variant = 'dark', accent = '#FF1493' }) {
  const base =
    'group inline-flex items-center gap-2 sm:gap-4 text-[10px] sm:text-sm font-black tracking-wide uppercase rounded-full whitespace-nowrap transition-all';
  if (variant === 'outline') {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`${base} bg-white text-black border-2 border-black pl-3.5 sm:pl-6 pr-3 sm:pr-5 py-2 sm:py-3 hover:bg-gray-50`}
      >
        <span>{children}</span>
        <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5] transition-transform group-hover:translate-x-1" />
      </motion.a>
    );
  }
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`${base} bg-black text-white pl-3.5 sm:pl-6 pr-1 sm:pr-1.5 py-1 sm:py-1.5 shadow-xl`}
    >
      <span>{children}</span>
      <span
        style={{ backgroundColor: accent }}
        className="w-6 h-6 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white transition-transform group-hover:translate-x-1"
      >
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
      </span>
    </motion.a>
  );
}

export function SectionHeading({ plain, highlight, accent = '#FF1493', sub, center = false }) {
  return (
    <div className={`mb-4 sm:mb-8 ${center ? 'text-center' : ''}`}>
      <h2 className="font-display text-2xl sm:text-5xl text-black uppercase leading-none">
        {plain} <span style={{ color: accent }}>{highlight}</span>
      </h2>
      {sub && (
        <p className={`text-[10px] sm:text-base text-gray-700 font-semibold mt-1.5 sm:mt-3 max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

// Big page opener: copy on the left, mascot on a paint splat on the right
// mascotLeft puts the artwork in the left column (used on the Advertisers page)
export function PageHero({ eyebrow, plain, highlight, accent, text, mascot, mascotAlt, primary, secondary, splat = accent, mascotLeft = false }) {
  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-6 sm:pb-12 overflow-hidden">
      <CraftScatter
        items={[
          { shape: 'Squiggle', className: 'top-28 left-[1.5%] w-20', props: { color: accent } },
          { shape: 'Dots', className: 'bottom-8 left-[3%] w-14' },
          { shape: 'Sparkle', className: 'top-32 right-[3%] w-9' },
          { shape: 'Spiral', className: 'bottom-6 right-[2%] w-12' },
          { shape: 'Scribble', className: 'bottom-2 left-[30%] w-48', still: true },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-12 gap-3 lg:gap-10 items-center">
        <div className={`col-span-7 ${mascotLeft ? 'order-2' : ''}`}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ backgroundColor: accent }}
            className="inline-block text-white text-[9px] sm:text-xs font-black tracking-widest uppercase px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full -rotate-2 mb-2 sm:mb-4"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-[30px] sm:text-6xl lg:text-[84px] text-black uppercase leading-[0.98] mb-2 sm:mb-5"
          >
            {plain}
            <br />
            <span style={{ color: accent }}>{highlight}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[11px] sm:text-base lg:text-lg text-gray-800 font-medium leading-snug sm:leading-relaxed max-w-xl mb-4 sm:mb-7"
          >
            {text}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center gap-2 sm:gap-4"
          >
            {primary && <PillLink href={primary.href} accent={accent}>{primary.label}</PillLink>}
            {secondary && <PillLink href={secondary.href} variant="outline">{secondary.label}</PillLink>}
          </motion.div>
        </div>

        <div className={`col-span-5 relative flex items-center justify-center ${mascotLeft ? 'order-1' : ''}`}>
          {splat && <Splat color={splat} className="absolute w-[110%] h-auto opacity-90 -rotate-6" />}
          <Star fill="#FFD600" className="absolute -top-2 left-[6%] w-6 sm:w-12 h-auto z-20" />
          <Sparkle color={accent} className="absolute bottom-[8%] right-[2%] w-5 sm:w-10 h-auto z-20" />
          <motion.img
            src={mascot}
            alt={mascotAlt}
            initial={{ opacity: 0, scale: 0.4, y: 40, rotate: -12 }}
            animate={{ opacity: 1, scale: [0.4, 1.1, 1], y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05, rotate: -3 }}
            className="relative z-10 w-full max-w-[460px] h-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>
    </section>
  );
}

// Row of headline numbers
export function StatStrip({ stats }) {
  return (
    <section className="relative py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid gap-2 sm:gap-6 bg-white rounded-2xl border border-gray-200 shadow-[0_6px_24px_rgba(0,0,0,0.06)] px-3 sm:px-8 py-3 sm:py-6 relative"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
          <Tape color="#FFD600" className="absolute -top-3 left-8 w-14 sm:w-20 -rotate-3" />
          <Tape color="#7CD3FF" className="absolute -top-3 right-8 w-14 sm:w-20 rotate-3" />
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col"
            >
              <span style={{ color: s.color }} className="text-[15px] sm:text-4xl lg:text-5xl font-black tracking-tight leading-none">
                {s.value}
              </span>
              <span className="text-[7px] sm:text-sm font-black text-gray-800 uppercase tracking-normal sm:tracking-wider mt-1 sm:mt-2 leading-tight">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Grid of benefit cards with an icon badge
export function FeatureGrid({ id, heading, items }) {
  return (
    <section id={id} className="relative py-6 sm:py-12 overflow-hidden">
      <CraftScatter
        items={[
          { shape: 'Splat', className: 'top-10 right-[1%] w-14', props: { color: '#FFD600' } },
          { shape: 'Zigzag', className: 'top-1/2 left-[1%] w-20', props: { color: '#0099FF' } },
          { shape: 'Star', className: 'bottom-8 right-[3%] w-8', props: { fill: '#FF1493' } },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading {...heading} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {items.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative bg-white rounded-xl border border-gray-200 p-3 sm:p-6 shadow-[0_4px_18px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow"
              >
                {i % 2 === 0 && (
                  <Tape color={TAPES[i % 3]} className={`absolute -top-3 right-4 w-10 sm:w-14 ${i % 4 ? 'rotate-6' : '-rotate-6'}`} />
                )}
                <span
                  style={{ backgroundColor: f.color }}
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white mb-2 sm:mb-4 shadow-md"
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </span>
                <h3 className="text-[11px] sm:text-lg font-black text-gray-900 uppercase leading-tight mb-1 sm:mb-2">{f.title}</h3>
                <p className="text-[9px] sm:text-sm text-gray-700 font-medium leading-snug sm:leading-relaxed">{f.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Numbered "how it works" steps joined by doodle arrows
export function StepsRow({ id, heading, steps, accent = '#FF1493' }) {
  return (
    <section id={id} className="relative py-6 sm:py-12 bg-[#0c0d11] text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{ backgroundImage: "url('/assets/bg-how-we-make-it-locco.webp')", backgroundSize: '100% 100%' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-5 sm:mb-10">
          <h2 className="font-display text-2xl sm:text-5xl uppercase leading-none">
            {heading.plain} <span style={{ color: '#FFD600' }}>{heading.highlight}</span>
          </h2>
          {heading.sub && <p className="text-[10px] sm:text-base text-gray-300 font-medium mt-1.5 sm:mt-3">{heading.sub}</p>}
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative text-center"
            >
              <span
                className="font-display block text-3xl sm:text-7xl leading-none mb-1 sm:mb-3"
                style={{ color: 'transparent', WebkitTextStroke: `1.5px ${i % 2 ? '#0099FF' : accent}` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[9px] sm:text-lg font-black uppercase leading-tight mb-1 sm:mb-2">{s.title}</h3>
              <p className="text-[8px] sm:text-sm text-gray-300 font-medium leading-snug">{s.text}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute top-3 sm:top-8 -right-2.5 sm:-right-5 w-3 h-3 sm:w-7 sm:h-7 text-[#FFD600]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Tag cloud of pills (verticals, traffic types, ...)
export function ChipCloud({ heading, chips }) {
  return (
    <section className="relative py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading {...heading} />
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {chips.map((c, i) => (
            <motion.span
              key={c.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ rotate: i % 2 ? 3 : -3, scale: 1.06 }}
              style={{ backgroundColor: c.color, color: c.dark ? '#111' : '#fff' }}
              className={`text-[10px] sm:text-base font-black uppercase tracking-wide px-3 sm:px-6 py-1.5 sm:py-3 rounded-full shadow-md ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
            >
              {c.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial pull-quotes
export function QuoteRow({ heading, quotes }) {
  return (
    <section className="relative py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading {...heading} />
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative bg-white rounded-xl border border-gray-200 p-3 sm:p-7 shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
            >
              <Tape color={TAPES[i % 3]} className={`absolute -top-3 left-6 w-12 sm:w-16 ${i ? 'rotate-3' : '-rotate-3'}`} />
              <span className="font-display text-3xl sm:text-6xl leading-none text-[#FF1493]">“</span>
              <blockquote className="text-[10px] sm:text-lg text-gray-800 font-medium leading-snug sm:leading-relaxed -mt-2 sm:-mt-4 mb-3 sm:mb-5">
                {q.quote}
              </blockquote>
              <figcaption className="flex items-center gap-2 sm:gap-3">
                <img src={q.avatar} alt={q.name} className="w-7 h-7 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200" />
                <div className="flex-1">
                  <div className="text-[10px] sm:text-sm font-black text-gray-900">{q.name}</div>
                  <div className="text-[8px] sm:text-xs font-semibold text-gray-600">{q.role}</div>
                </div>
                <div className="hidden sm:flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <StarIcon key={s} className="w-4 h-4 text-[#FFC800] fill-[#FFC800]" />
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
