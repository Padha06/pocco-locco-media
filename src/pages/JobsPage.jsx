import React, { useEffect, useRef, useState } from 'react';
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
  X,
} from 'lucide-react';
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

// Marker-drawn frame for the openings panel: a rounded rectangle traced with small,
// repeatable wobbles (seeded, so it doesn't change between renders) plus a fainter second
// pass slightly off the first, the way a hand-drawn box looks.
function wobblyRectPath(w, h, r, seed, amp) {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
  const pts = [];
  const push = (x, y) => pts.push([x + rnd() * amp, y + rnd() * amp]);
  const edge = (x1, y1, x2, y2) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(2, Math.round(len / 60));
    for (let i = 0; i < n; i++) push(x1 + ((x2 - x1) * i) / n, y1 + ((y2 - y1) * i) / n);
  };
  const corner = (cx, cy, a0) => {
    for (let i = 0; i < 4; i++) {
      const a = a0 + (Math.PI / 2) * (i / 4);
      push(cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
  };
  edge(r, 0, w - r, 0);
  corner(w - r, r, -Math.PI / 2);
  edge(w, r, w, h - r);
  corner(w - r, h - r, 0);
  edge(w - r, h, r, h);
  corner(r, h - r, Math.PI / 2);
  edge(0, h - r, 0, r);
  corner(r, r, Math.PI);
  // smooth curve through the jittered points (Catmull-Rom -> cubic Bezier)
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - 1 + pts.length) % pts.length];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    const p3 = pts[(i + 2) % pts.length];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

function SketchFrame() {
  const ref = useRef(null);
  const [size, setSize] = useState(null);
  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pad = 4;
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
      {size && (
        <svg width={size.w} height={size.h} className="absolute inset-0 overflow-visible">
          <g transform={`translate(${pad} ${pad})`} fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round">
            <path d={wobblyRectPath(size.w - pad * 2, size.h - pad * 2, 26, 7, 3)} strokeWidth="3.2" />
            <path d={wobblyRectPath(size.w - pad * 2, size.h - pad * 2, 28, 31, 4)} strokeWidth="1.2" opacity="0.45" />
          </g>
        </svg>
      )}
    </div>
  );
}

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
      whileHover={{ y: -4 }}
      style={{ backgroundColor: t.bg }}
      className="group relative flex flex-col rounded-xl px-3 pt-3 pb-3.5 sm:px-5 sm:pt-4 sm:pb-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-2 sm:gap-3 mb-1.5 sm:mb-2">
        {/* numbered dot like the design */}
        <span
          style={{ backgroundColor: t.accent, color: t.pillText }}
          className="shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm sm:text-lg font-black leading-none"
        >
          {index + 1}
        </span>
        <h3 className="flex-1 text-[13px] sm:text-[15px] lg:text-base font-extrabold text-black leading-tight pt-1">{role.title}</h3>
        {/* doodle icon: black outline with a colour fill, like the client's illustrations */}
        <Icon
          stroke="#111"
          fill={t.accent}
          fillOpacity={0.55}
          className="shrink-0 w-7 h-7 sm:w-9 sm:h-9 stroke-[1.9] -mt-0.5"
        />
      </div>
      <p className="text-xs sm:text-sm text-gray-800 leading-snug mb-3 sm:mb-4 flex-1">{role.text}</p>
      <span
        style={{ backgroundColor: t.accent, color: t.pillText }}
        className="self-center inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wide px-5 sm:px-7 py-1.5 rounded"
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
      <section id="openings" className="relative pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-14">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
          {/* The whole openings board sits in one cream panel with a hand-drawn black frame, like the design */}
          <div className="relative bg-[#FFFCF5] rounded-[26px] sm:rounded-[30px] px-3 pt-4 pb-0 sm:px-7 sm:pt-6 lg:px-9 overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
            <SketchFrame />
            {/* round close button, top-right, takes you back home */}
            <a
              href="/"
              aria-label="Close and go back home"
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF1493] transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
            </a>

            {/* Header: megaphone (left), OPENINGS (centre), yellow brush note (right) */}
            <div className="grid grid-cols-12 items-center gap-1 sm:gap-4 mb-4 sm:mb-6 pr-8 sm:pr-10">
              <div className="col-span-3 sm:col-span-2 relative">
                <motion.img
                  src="/assets/jobs-mic-v2.webp"
                  alt=""
                  aria-hidden="true"
                  initial={{ rotate: -14, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 12 }}
                  className="w-full max-w-[230px] h-auto"
                />
              </div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.05 }}
                className="col-span-6 sm:col-span-7 flex justify-center"
              >
                <img src="/assets/jobs-openings-v3.webp" alt="Openings" className="w-full max-w-[680px] h-auto" />
              </motion.h1>

              <motion.img
                src="/assets/jobs-learn-note.webp"
                alt="Learn, execute, make an impact"
                initial={{ rotate: 12, opacity: 0, y: -10 }}
                animate={{ rotate: 0, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.2 }}
                className="col-span-3 w-full max-w-[250px] justify-self-end h-auto"
              />
            </div>

            {/* 3 x 3 openings grid (2 columns on phones) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
              {ROLES.map((role, i) => (
                <RoleCard key={role.title} role={role} index={i} />
              ))}
            </div>

            {/* Bottom: character (bottom-left corner), CTA (centre), brush note (right) */}
            <div className="relative mt-3 sm:mt-5 grid grid-cols-12 items-end gap-2">
              <motion.img
                src="/assets/jobs-guy-v2.webp"
                alt="Pocco Locco team member working on a laptop"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                // multiply: the leftover white in the cut-out takes on the panel colour, so no box shows
                className="col-span-6 sm:col-span-3 w-full max-w-[360px] h-auto self-end mix-blend-multiply"
              />
              <div className="col-span-12 sm:col-span-6 order-3 sm:order-2 flex justify-center pb-4 sm:pb-8">
                <motion.a
                  href={applyLink('Internship (general)')}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center gap-2 sm:gap-4 bg-[#FF1493] text-white text-sm sm:text-lg lg:text-xl font-black uppercase tracking-wide px-7 sm:px-10 py-3 sm:py-4 rounded-full shadow-[0_10px_24px_rgba(255,20,147,0.35)] whitespace-nowrap"
                >
                  Explore all internships
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.6] transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>
              <div className="col-span-6 sm:col-span-3 order-2 sm:order-3 flex justify-end pb-2 sm:pb-4">
                <motion.img
                  src="/assets/jobs-crazier-v2.webp"
                  alt="Be part of something crazier!"
                  animate={{ rotate: [-3, 2, -3] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="w-full max-w-[230px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactAndCta />
    </>
  );
}
