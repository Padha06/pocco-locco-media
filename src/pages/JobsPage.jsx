import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Megaphone,
  Settings,
  Users,
  ChartColumnIncreasing,
  Lightbulb,
  ChartPie,
  Target,
  Handshake,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { Splat, Star, Crown, Sparkle } from '../components/CraftDecor';
import ContactAndCta from '../components/ContactAndCta';

const PINK = '#FF1493';
const BLUE = '#1E9BF0';
const YELLOW = '#FFD600';

// Card colour themes from the client's "Openings" artwork
const THEMES = {
  pink: { bg: '#FFE3F0', accent: PINK, pillText: '#fff' },
  blue: { bg: '#DDF0FF', accent: BLUE, pillText: '#fff' },
  yellow: { bg: '#FFF6C7', accent: YELLOW, pillText: '#111' },
};

const CAREERS_EMAIL = 'info@poccoloccomedia.com';

const ROLES = [
  { title: 'Campaign Management Intern', text: 'Plan, execute & optimize CPL/CPA campaigns.', icon: Megaphone, theme: 'pink' },
  { title: 'Advertiser Operations Intern', text: 'Support advertiser onboarding, campaign setup & coordination.', icon: Settings, theme: 'blue' },
  { title: 'Publisher Management Intern', text: 'Onboard & manage publishers, drive growth and engagement.', icon: Users, theme: 'yellow' },
  { title: 'Performance Marketing Intern', text: 'Analyze performance, prepare reports & insights.', icon: ChartColumnIncreasing, theme: 'blue' },
  { title: 'Content & Creative Intern', text: 'Support ad creatives, content strategy & brand communication.', icon: Lightbulb, theme: 'yellow' },
  { title: 'Data & Analytics Intern', text: 'Work with campaign data, dashboards & insights.', icon: ChartPie, theme: 'pink' },
  { title: 'Strategy & Business Development', text: 'Market research, competitor analysis & growth strategy.', icon: Target, theme: 'yellow' },
  { title: 'Client Success Intern', text: 'Support client communication, reporting & account management.', icon: Handshake, theme: 'pink' },
  { title: 'HR & Operations Intern', text: 'Assist in HR, recruitment, operations & internal processes.', icon: FileText, theme: 'blue' },
];

const applyLink = (role) =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${role}`)}`;

function RoleCard({ role, index }) {
  const t = THEMES[role.theme];
  const Icon = role.icon;
  return (
    <motion.a
      href={applyLink(role.title)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6, rotate: index % 2 ? 0.6 : -0.6 }}
      style={{ backgroundColor: t.bg }}
      className="group relative flex flex-col rounded-2xl p-3.5 sm:p-5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
        <span
          style={{ backgroundColor: t.accent, color: t.pillText }}
          className="shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-display text-base sm:text-xl leading-none"
        >
          {index + 1}
        </span>
        <h3 className="flex-1 text-[13px] sm:text-base lg:text-lg font-black text-black leading-tight pt-0.5">{role.title}</h3>
        <Icon style={{ color: t.accent }} className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 stroke-[2.2]" />
      </div>
      <p className="text-xs sm:text-sm text-gray-800 font-medium leading-snug mb-3 sm:mb-4 flex-1">{role.text}</p>
      <span
        style={{ backgroundColor: t.accent, color: t.pillText }}
        className="self-center inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wide px-4 sm:px-6 py-1.5 sm:py-2 rounded-md"
      >
        <span className="group-hover:hidden">1 Opening</span>
        <span className="hidden group-hover:inline-flex items-center gap-1">
          Apply <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
        </span>
      </span>
    </motion.a>
  );
}

export default function JobsPage() {
  useEffect(() => {
    document.title = 'Openings | Pocco Locco Media';
  }, []);

  return (
    <>
      <section id="openings" className="relative pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 overflow-hidden">
        <Splat color={PINK} className="hidden sm:block absolute -left-20 top-40 w-72 opacity-90 pointer-events-none" />
        <Splat color={YELLOW} className="hidden sm:block absolute -right-16 top-72 w-64 opacity-90 rotate-45 pointer-events-none" />
        <Splat color={BLUE} className="hidden sm:block absolute -right-24 bottom-40 w-72 opacity-80 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header: megaphone doodle, OPENINGS title, yellow sticky note */}
          <div className="relative text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
              animate={{ rotate: -12, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 12 }}
              className="absolute left-0 sm:left-4 top-12 sm:top-2 w-11 sm:w-24 lg:w-28 text-black"
            >
              <svg viewBox="0 0 120 90" fill="none" aria-hidden="true" className="w-full h-auto">
                <path d="M14 40 L60 18 L66 72 L20 58 Z" fill={PINK} stroke="#111" strokeWidth="4" strokeLinejoin="round" />
                <rect x="4" y="38" width="16" height="22" rx="5" fill="#fff" stroke="#111" strokeWidth="4" />
                <path d="M26 58 L32 80 L42 78 L38 62" fill={PINK} stroke="#111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M78 26 L92 16 M80 44 L98 44 M78 62 L92 72" stroke="#111" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </motion.div>
            <Star fill={YELLOW} className="hidden sm:block absolute left-10 top-28 w-10" />

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="block w-fit mx-auto bg-black text-white text-[11px] sm:text-sm font-black uppercase tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-md -rotate-1 mb-2 sm:mb-3"
            >
              Internships at Pocco Locco
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.05 }}
              className="relative inline-block font-display uppercase leading-none text-6xl sm:text-8xl lg:text-[124px] text-[#FF1493] [-webkit-text-stroke:3px_#111] [paint-order:stroke_fill]"
            >
              Openings
              <Crown fill={YELLOW} className="absolute -right-8 sm:-right-14 -bottom-1 w-8 sm:w-14 rotate-12" />
            </motion.h1>
            <svg viewBox="0 0 300 16" className="w-48 sm:w-72 mx-auto mt-1" fill="none" aria-hidden="true">
              <path d="M4 12 Q 150 0, 296 8" stroke="#111" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* Yellow sticky note */}
            <motion.div
              initial={{ rotate: 20, opacity: 0, y: -10 }}
              animate={{ rotate: 8, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.2 }}
              className="hidden sm:block absolute right-2 top-0 w-40 lg:w-44"
            >
              <svg viewBox="0 0 160 130" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <path d="M6 14 C 50 2, 120 4, 154 10 L 150 120 C 110 128, 40 126, 10 118 Z" fill={YELLOW} />
              </svg>
              <p className="relative font-marker uppercase text-center text-black leading-[1.05] text-xs sm:text-lg lg:text-xl px-2 py-3 sm:py-5">
                Learn
                <br />
                Execute
                <br />
                Make
                <br />
                an impact
              </p>
            </motion.div>
          </div>

          {/* 3 x 3 openings grid (2 columns on phones) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {ROLES.map((role, i) => (
              <RoleCard key={role.title} role={role} index={i} />
            ))}
          </div>

          {/* Bottom: character, CTA, badge */}
          <div className="relative mt-6 sm:mt-10 grid grid-cols-12 items-end gap-2">
            <motion.img
              src="/assets/jobs-guy.webp"
              alt="Pocco Locco team member working on a laptop"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-6 sm:col-span-4 w-full max-w-[360px] h-auto"
            />
            <div className="col-span-12 sm:col-span-5 order-3 sm:order-2 flex justify-center pb-2 sm:pb-10">
              <motion.a
                href={applyLink('Internship (general)')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-2 sm:gap-4 bg-[#FF1493] text-white text-sm sm:text-base lg:text-lg font-black uppercase tracking-wide px-6 sm:px-9 py-3 sm:py-4 rounded-full shadow-[0_10px_24px_rgba(255,20,147,0.35)] whitespace-nowrap"
              >
                Explore all internships
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.6] transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
            <div className="col-span-6 sm:col-span-3 order-2 sm:order-3 flex justify-end pb-2 sm:pb-6">
              <motion.div
                animate={{ rotate: [-8, -4, -8] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="relative w-32 sm:w-40"
              >
                <svg viewBox="0 0 160 130" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <path d="M10 8 L 150 18 L 146 122 L 4 112 Z" fill={YELLOW} stroke="#111" strokeWidth="3" />
                </svg>
                <p className="relative font-marker uppercase text-center text-black leading-[1.05] text-sm sm:text-lg px-2 py-3 sm:py-5">
                  Be part of
                  <br />
                  something
                  <br />
                  crazier!
                </p>
                <Sparkle color={PINK} className="absolute -top-3 -left-3 w-6 sm:w-8" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ContactAndCta />
    </>
  );
}
