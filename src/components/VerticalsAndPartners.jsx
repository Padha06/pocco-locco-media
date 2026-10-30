import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { CraftScatter, Tape, PushPin } from './CraftDecor';

const TAPE_COLORS = ['#FFD600', '#FF8DC7', '#7CD3FF', '#FFD600'];
const PIN_COLORS = ['#FF1493', '#0099FF', '#FFC800', '#FF1493'];
const PIN_TILTS = [-2.5, 1.8, -1.6, 2.2];

// Partner wordmarks drawn in type + small glyphs so the row stays crisp at any size
function PartnerLogo({ name }) {
  switch (name) {
    case 'amazon':
      return (
        <span className="relative inline-block text-[26px] font-bold tracking-tight leading-none lowercase font-['Outfit',sans-serif]">
          amazon
          <svg viewBox="0 0 80 14" className="absolute left-1 -bottom-2.5 w-[78%] h-3" fill="none">
            <path d="M2 3 Q 38 14, 70 4" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
            <path d="M64 2 L72 4 L68 10" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    case 'samsung':
      return <span className="text-[22px] font-black tracking-[0.12em] leading-none">SAMSUNG</span>;
    case 'expedia':
      return (
        <span className="inline-flex items-center gap-1.5 text-[24px] font-bold leading-none">
          <span className="w-7 h-7 rounded-md bg-[#FFC72C] flex items-center justify-center">
            <ArrowRight className="w-4 h-4 -rotate-45 stroke-[3] text-black" />
          </span>
          Expedia
        </span>
      );
    case 'spotify':
      return (
        <span className="inline-flex items-center gap-1.5 text-[24px] font-black leading-none tracking-tight">
          <svg viewBox="0 0 24 24" className="w-7 h-7">
            <circle cx="12" cy="12" r="12" fill="#000" />
            <path d="M6 9.2c4-1.2 8.5-.9 12 1.1M6.6 12.4c3.3-.9 7-.6 9.8 1M7.3 15.4c2.6-.7 5.4-.4 7.6.8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" fill="none" />
          </svg>
          Spotify
        </span>
      );
    case 'etoro':
      return <span className="text-[26px] font-semibold italic leading-none tracking-tight">ᵉtoro</span>;
    case 'uber':
      return <span className="text-[28px] font-medium leading-none tracking-tight">Uber</span>;
    case 'adidas':
      return (
        <span className="inline-flex flex-col items-center leading-none">
          <svg viewBox="0 0 40 26" className="w-10 h-6" fill="#000">
            <path d="M2 24 L8 20 L12 26 L4 26 Z" />
            <path d="M11 24 L20 12 L26 26 L15 26 Z" transform="translate(-2 0)" />
            <path d="M22 26 L30 4 L38 26 Z" />
          </svg>
          <span className="text-[17px] font-black lowercase tracking-tight -mt-0.5">adidas</span>
        </span>
      );
    case 'cocacola':
      return <span className="font-['Lobster',cursive] text-[30px] leading-none text-[#E4002B] -rotate-3 inline-block whitespace-nowrap">Coca-Cola</span>;
    default:
      return null;
  }
}

export default function VerticalsAndPartners() {
  const verticals = [
    {
      category: 'NUTRA',
      categoryColor: 'bg-[#FF1493] text-white',
      title: 'Boosting Conversions with Smart Targeting',
      stat: '+320%',
      statLabel: 'ROI Increase',
      statColor: 'text-[#FF1493]',
      img: '/assets/vertical-nutra.jpg',
    },
    {
      category: 'TRAVEL',
      categoryColor: 'bg-[#0099FF] text-white',
      title: 'Scaling Global Reach for a Leading Travel Brand',
      stat: '1.5M+',
      statLabel: 'Leads Generated',
      statColor: 'text-[#0099FF]',
      img: '/assets/vertical-travel.jpg',
    },
    {
      category: 'GAMING',
      categoryColor: 'bg-[#FFD600] text-black',
      title: 'High-Performing User Acquisition',
      stat: '2.8X',
      statLabel: 'Conversion Rate',
      statColor: 'text-[#FFC800]',
      img: '/assets/vertical-gaming.jpg',
    },
    {
      category: 'FINANCE',
      categoryColor: 'bg-[#FF1493] text-white',
      title: 'Driving Quality Leads in Competitive Markets',
      stat: '45%',
      statLabel: 'Lower CPA',
      statColor: 'text-[#FF1493]',
      img: '/assets/vertical-finance.jpg',
    },
  ];

  const testimonials = [
    {
      quote:
        'Pocco loco has been a game changer for our lead generation. Their traffic quality and support are top notch!',
      name: 'Alex R.',
      role: 'E-Commerce Brand',
      avatar: '/assets/avatar-alex.png',
    },
    {
      quote:
        'Fast payouts, great communication and high-converting offers. One of the best networks we’ve worked with!',
      name: 'Sophie K.',
      role: 'Affiliate Publisher',
      avatar: '/assets/avatar-sophie.png',
    },
    {
      quote:
        'A reliable partner that truly understands performance marketing. We’ve scaled our campaigns globally with amazing results.',
      name: 'Daniel M.',
      role: 'Travel Brand',
      avatar: '/assets/avatar-daniel.png',
    },
  ];

  const partners = ['amazon', 'samsung', 'expedia', 'spotify', 'etoro', 'uber', 'adidas', 'cocacola'];

  return (
    <section id="cases" className="pt-6 sm:pt-8 pb-10 sm:pb-12 relative overflow-hidden">
      <CraftScatter
        items={[
          { shape: 'Splat', className: 'top-4 right-[1%] w-16', props: { color: '#FFD600' } },
          { shape: 'Spiral', className: 'top-[7%] left-[1.5%] w-12' },
          { shape: 'Star', className: 'top-[28%] right-[2.5%] w-8', props: { fill: '#0099FF' } },
          { shape: 'Zigzag', className: 'top-[44%] left-[1%] w-20', props: { color: '#FF1493' } },
          { shape: 'Dots', className: 'top-[58%] right-[2%] w-14' },
          { shape: 'Sparkle', className: 'top-[72%] left-[2.5%] w-9', props: { color: '#FF1493' } },
          { shape: 'Splat', className: 'bottom-4 left-[1%] w-14', props: { color: '#FF1493' } },
          { shape: 'Squiggle', className: 'bottom-12 right-[1.5%] w-20', props: { color: '#0099FF' } },
          { shape: 'Scribble', className: 'top-[52%] left-[38%] w-44', still: true },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Verticals Section Header */}
        <div className="flex flex-row items-end justify-between mb-4 sm:mb-5 gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-5xl text-black uppercase leading-none">
              VERTICALS <span className="text-[#FF1493]">CAMPAIGNS</span>
            </h2>
            <p className="text-[10px] sm:text-base text-gray-800 font-semibold mt-1 sm:mt-2">
              A selection of successful campaigns across various verticals.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-sm font-black text-black hover:text-[#FF1493] uppercase tracking-wide transition-colors whitespace-nowrap shrink-0"
          >
            <span>VIEW ALL CASE STUDIES</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4 Verticals Cards Grid */}
        {/* Each campaign is a sheet of paper pinned to the board: slight tilt, push-pin on top,
            and it straightens up when hovered */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7 sm:gap-6 mb-8 sm:mb-12 pt-3">
          {verticals.map((v, idx) => (
            <motion.div
              key={v.category}
              initial={{ opacity: 0, y: 20, rotate: PIN_TILTS[idx] }}
              whileInView={{ opacity: 1, y: 0, rotate: PIN_TILTS[idx] }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6, rotate: 0 }}
              style={{ transformOrigin: '50% 0%' }}
              className="group relative bg-[#fffdf8] rounded-md border border-gray-200/80 shadow-[2px_8px_18px_rgba(0,0,0,0.12)] hover:shadow-2xl transition-shadow duration-300 flex flex-col p-2 sm:p-2.5"
            >
              {/* pin drops in, then presses flat into the paper just below the top edge */}
              <motion.div
                initial={{ y: -24, opacity: 0, scale: 1.5 }}
                whileInView={{ y: 0, opacity: 1, scale: [1.5, 0.92, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 + idx * 0.1 }}
                className="absolute -top-1 sm:-top-1.5 left-1/2 -translate-x-1/2 z-20 w-6 sm:w-8"
              >
                <PushPin color={PIN_COLORS[idx]} className="w-full h-auto" />
              </motion.div>
              {/* Thumbnail with category pill straddling the bottom edge */}
              <div className="relative">
                <div className="aspect-[2.3/1] overflow-hidden bg-black rounded-sm">
                  <img
                    src={v.img}
                    alt={v.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span
                  className={`absolute -bottom-2.5 sm:-bottom-3.5 left-2 sm:left-4 min-w-[64px] sm:min-w-[104px] text-center text-[8px] sm:text-xs font-black uppercase tracking-wide px-2 sm:px-4 py-1 sm:py-1.5 rounded-md shadow-md ${v.categoryColor}`}
                >
                  {v.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="px-2.5 sm:px-5 pt-5 sm:pt-7 pb-3 sm:pb-4 flex-1 flex flex-col">
                <h3 className="text-[11px] sm:text-[15px] font-extrabold text-gray-900 leading-snug mb-1 sm:mb-2 group-hover:text-[#FF1493] transition-colors">
                  {v.title}
                </h3>
                <span className={`text-2xl sm:text-[34px] font-black leading-none tracking-tight ${v.statColor}`}>
                  {v.stat}
                </span>
                <span className="text-[10px] sm:text-sm font-semibold text-gray-800 mt-1">
                  {v.statLabel}
                </span>

                <a
                  href="#contact"
                  className="mt-2 sm:mt-4 self-center inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-sm font-black text-gray-900 uppercase group-hover:text-[#FF1493] transition-colors"
                >
                  <span>VIEW CASE</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WHAT OUR PARTNERS SAY */}
        <div id="testimonials" className="relative mb-8 sm:mb-10">
          <h2 className="font-display text-2xl sm:text-5xl text-black uppercase leading-none mb-2 sm:mb-5">
            WHAT OUR PARTNERS <span className="text-[#FF1493]">SAY</span>
          </h2>

          <div className="flex lg:grid lg:grid-cols-[1fr_1fr_1fr_150px] gap-3 sm:gap-5 items-stretch overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 pt-3 pb-2 lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative shrink-0 w-[78%] sm:w-[45%] lg:w-auto snap-start bg-white px-4 sm:px-5 pt-4 pb-4 sm:pb-5 rounded-xl border border-gray-200 shadow-[0_4px_18px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <Tape
                  color={TAPE_COLORS[(idx + 1) % 4]}
                  className={`absolute -top-3 right-6 w-14 ${idx % 2 ? '-rotate-6' : 'rotate-6'}`}
                />
                <div className="flex gap-2.5">
                  <span className="font-display text-4xl leading-none text-[#FF1493] -mt-0.5">“</span>
                  <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed pt-1.5">
                    {t.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 pl-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-black text-gray-900">{t.name}</h4>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-[#FFC800] fill-[#FFC800]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-600">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Hand-drawn "REAL PEOPLE. REAL RESULTS." callout */}
            <div className="flex shrink-0 w-[32%] lg:w-auto snap-start relative items-center justify-center pointer-events-none select-none">
              <svg viewBox="0 0 120 60" fill="none" className="hidden lg:block absolute -top-14 -left-6 w-32 h-16 text-black">
                <path d="M112 30 C 100 4, 70 0, 62 18 C 56 32, 74 34, 72 20 C 70 8, 40 6, 12 40" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M8 28 L11 42 L24 38" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="font-marker text-lg sm:text-[26px] leading-[1.05] text-black -rotate-12 text-center">
                REAL<br />PEOPLE.<br />REAL<br />RESULTS.
                <svg viewBox="0 0 120 14" className="w-20 sm:w-28 h-3.5 mx-auto -mt-0.5" fill="none">
                  <path d="M4 10 Q 60 2, 116 6" stroke="#FF1493" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* OUR PARTNERS logo row */}
        <div id="partners">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl sm:text-5xl text-black uppercase leading-none">
                OUR PARTNERS
              </h2>
              <svg viewBox="0 0 90 40" fill="none" className="hidden sm:block w-20 h-9 mt-3 text-black">
                <path d="M4 10 C 30 0, 56 4, 80 26" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M68 26 L82 28 L80 14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <img src="/assets/crown-white.svg" alt="" className="w-8 h-8 sm:w-12 sm:h-12 object-contain rotate-6" />
          </div>

          {/* Logos slide right-to-left forever. The list is rendered twice and the track moves by
              exactly half its width, so the second copy lands where the first started (no jump).
              Spacing is padding on each item rather than flex gap, so both halves are equal. */}
          <div
            className="relative overflow-hidden py-2 sm:py-3 text-black"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
            }}
          >
            <div className="animate-marquee partners-marquee items-center">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={`${p}-${i}`}
                  aria-hidden={i >= partners.length}
                  className="shrink-0 px-6 sm:px-10 lg:px-12 flex items-center select-none cursor-default transition-transform duration-300 hover:scale-110"
                >
                  <div className="max-sm:scale-[0.75]">
                    <PartnerLogo name={p} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
