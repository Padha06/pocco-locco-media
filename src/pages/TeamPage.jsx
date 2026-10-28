import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, GraduationCap, BriefcaseBusiness, Target, ChartLine, Megaphone, Check } from 'lucide-react';
import { Splat, Star, Crown, Sparkle } from '../components/CraftDecor';
import ContactAndCta from '../components/ContactAndCta';

const PINK = '#FF1493';
const BLUE = '#1E9BF0';
const YELLOW = '#FFD600';

// Founding team, from the client's "Meet the Team" artwork.
// Photos are cut from that artwork; swap the three team-*.webp files for originals when available.
const TEAM = [
  {
    name: 'Manoj',
    role: 'Founder & CEO',
    title: 'Driving Vision and Growth',
    accent: PINK,
    photo: '/assets/team-manoj.webp',
    bubble: ['Big', 'Ideas', 'Bigger', 'Results'],
    bubbleAccent: 3,
    about:
      'Leads the overall vision, strategy and growth of Pocco Locco Media. Focuses on CPL vertical, advertiser relationships and scaling the business globally.',
    facts: [
      { icon: MapPin, text: 'Bangalore, India' },
      { icon: GraduationCap, text: 'BE Mechanical | PGDM Finance' },
      { icon: BriefcaseBusiness, text: '5+ Years in Banking & Finance' },
    ],
    badge: Target,
    focus: ['CPL Strategy & Operations', 'Advertiser Relationships', 'Business Growth & Revenue', 'Team Leadership'],
    focusStyle: 'light',
  },
  {
    name: 'Prabhu',
    role: 'Co-Founder & CFO',
    title: 'Finance, Compliance & Operations',
    accent: BLUE,
    photo: '/assets/team-prabhu.webp',
    bubble: ['Numbers', 'People', 'Progress'],
    bubbleAccent: -1,
    about:
      'Handles finance, compliance, audit and HR. Manages publisher onboarding, advertiser payments, publisher payouts and overall company financial operations.',
    facts: [
      { icon: MapPin, text: 'Bangalore, India' },
      { icon: GraduationCap, text: 'B.Com | Finance & Compliance' },
      { icon: BriefcaseBusiness, text: 'Expertise in Finance, Audit & Operations' },
    ],
    badge: ChartLine,
    focus: ['Finance, Audit & Compliance', 'Publisher Onboarding & Payouts', 'HR & Team Management', 'Company Operations'],
    focusStyle: 'solid',
  },
  {
    name: 'Vartika',
    role: 'Director & COO',
    title: 'Campaigns, Publishers & Partnerships',
    accent: PINK,
    photo: '/assets/team-vartika.webp',
    bubble: ['Campaigns', 'People', 'Partnerships'],
    bubbleAccent: -1,
    about:
      'Leads CPA campaigns and publisher management. Drives campaign execution, publisher partnerships and overall operational excellence across CPL & CPA campaigns.',
    facts: [
      { icon: MapPin, text: 'Bangalore, India' },
      { icon: GraduationCap, text: 'MBA | Marketing & Strategy' },
      { icon: BriefcaseBusiness, text: 'Expertise in Campaigns & Publisher Management' },
    ],
    badge: Megaphone,
    focus: ['CPA Strategy & Campaign Management', 'Publisher Growth & Engagement', 'Partnerships & Communication', 'Operational Efficiency'],
    focusStyle: 'light',
  },
];

// Hand-drawn speech bubble; first letters are tinted blue like the client art,
// or one whole word is pink when bubbleAccent points at it
function SpeechBubble({ words, accentIndex, className = 'relative' }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 120 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
        <path
          d="M60 6 C 96 6, 114 24, 114 46 C 114 70, 92 84, 62 84 C 52 84, 44 83, 36 80 L 14 94 L 22 74 C 12 66, 6 56, 6 46 C 6 24, 26 6, 60 6 Z"
          fill="#fff"
          stroke="#111"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative font-marker uppercase leading-[0.95] text-center text-[12px] sm:text-[13px] xl:text-[15px] pl-4 pr-3 pt-4 pb-7">
        {words.map((w, i) => (
          <span key={w} className="block" style={i === accentIndex ? { color: PINK } : undefined}>
            {accentIndex === -1 ? (
              <>
                <span style={{ color: BLUE }}>{w[0]}</span>
                {w.slice(1)}
              </>
            ) : (
              w
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function MemberCard({ m, index }) {
  const solid = m.focusStyle === 'solid';
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-2xl border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.07)] flex flex-col"
    >
      {/* Photo on its paint splash, with the bubble and role tag drawn on top */}
      <div className="relative h-[230px] sm:h-[250px] lg:h-[230px] xl:h-[250px]">
        <img
          src={m.photo}
          alt={`${m.name}, ${m.role}`}
          className="team-photo absolute bottom-0 left-0 h-full w-[76%] object-cover object-top rounded-tl-2xl"
        />
        <SpeechBubble
          words={m.bubble}
          accentIndex={m.bubbleAccent}
          className="absolute top-6 right-2 w-[46%] max-w-[180px]"
        />
        <span
          className="absolute -bottom-3 left-4 bg-[#FFD600] text-black text-xs sm:text-sm font-black uppercase tracking-wide px-3.5 py-1.5 rounded-md shadow-[2px_2px_0_#111] border-2 border-black"
        >
          {m.role}
        </span>
      </div>

      <div className="px-5 sm:px-6 pt-7 pb-6 flex-1 flex flex-col">
        <h2 className="font-display text-4xl sm:text-5xl uppercase leading-none text-black">{m.name}</h2>
        <p style={{ color: m.accent }} className="text-sm sm:text-base font-black mt-1.5 mb-3">
          {m.title}
        </p>
        <p className="text-sm text-gray-700 font-medium leading-relaxed mb-4">{m.about}</p>

        <div className="flex items-start gap-3 mb-5">
          <ul className="flex-1 space-y-2">
            {m.facts.map((f) => (
              <li key={f.text} className="flex items-start gap-2.5 text-sm font-semibold text-gray-900">
                <f.icon className="w-4 h-4 mt-0.5 shrink-0 text-black" />
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
          <span
            style={{ color: m.accent }}
            className="shrink-0 w-14 h-14 rounded-full border-[3px] border-current flex items-center justify-center rotate-[-8deg]"
          >
            <m.badge className="w-7 h-7 stroke-[2.4]" />
          </span>
        </div>

        {/* Areas of focus */}
        <div
          style={solid ? { backgroundColor: m.accent } : { backgroundColor: `${m.accent}1f` }}
          className="relative mt-auto rounded-xl px-4 pt-6 pb-4"
        >
          <span
            style={{ backgroundColor: solid ? '#0b5fa8' : m.accent }}
            className="absolute -top-3 left-4 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md"
          >
            Areas of focus
          </span>
          <ul className="space-y-2">
            {m.focus.map((f) => (
              <li key={f} className={`flex items-center gap-2.5 text-sm font-semibold ${solid ? 'text-white' : 'text-gray-900'}`}>
                <span
                  style={solid ? undefined : { backgroundColor: m.accent }}
                  className={`w-5 h-5 shrink-0 flex items-center justify-center ${solid ? 'rounded bg-white text-[#0b5fa8]' : 'rounded-full text-white'}`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export default function TeamPage() {
  useEffect(() => {
    document.title = 'Meet the Team | Pocco Locco Media';
  }, []);

  return (
    <>
      <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 overflow-hidden">
        {/* Paint splashes around the edges */}
        <Splat color={PINK} className="absolute -left-16 bottom-24 w-56 sm:w-80 opacity-90 pointer-events-none" />
        <Splat color={BLUE} className="absolute -right-20 bottom-10 w-56 sm:w-80 opacity-90 rotate-45 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with doodle callouts either side */}
          <div className="relative text-center mb-10 sm:mb-14">
            <div className="hidden md:block absolute left-0 top-2 w-52 lg:w-60 text-left pointer-events-none select-none">
              <p className="font-marker text-xl lg:text-2xl leading-[1.05] -rotate-[10deg] text-black">
                Building
                <br />
                brands
                <br />
                growth <span className="text-[#FF1493]">together</span>
              </p>
              <Crown className="absolute -top-2 right-6 w-12 rotate-12" />
              <svg viewBox="0 0 120 60" fill="none" className="w-24 mt-2 ml-2 text-black" aria-hidden="true">
                <path d="M8 10 C 0 40, 40 56, 96 44" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M84 34 L98 44 L84 54" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="hidden md:block absolute right-0 top-0 w-52 lg:w-60 pointer-events-none select-none">
              <Splat color={YELLOW} className="absolute inset-0 w-full h-auto scale-110" />
              <p className="relative font-marker text-xl lg:text-2xl leading-[1.05] rotate-[10deg] text-black pt-6">
                Ideas
                <br />
                People
                <br />
                Performance
                <br />
                Impact
              </p>
              <Star fill={YELLOW} className="absolute -bottom-6 right-2 w-10" />
            </div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-[#FFD600] text-black text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-md -rotate-2 mb-3"
            >
              The founding team
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-5xl sm:text-7xl lg:text-[96px] uppercase leading-none text-black"
            >
              Meet the <span className="text-[#FF1493]">Team</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-gray-800 font-semibold max-w-2xl mx-auto mt-3"
            >
              Three minds. One crazy vision. Building a global performance marketing network that connects the right
              brands with the right audience.
            </motion.p>
            <svg viewBox="0 0 300 16" className="w-56 sm:w-72 mx-auto mt-2" fill="none" aria-hidden="true">
              <path d="M4 12 Q 150 0, 296 8" stroke={PINK} strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 lg:gap-7">
            {TEAM.map((m, i) => (
              <MemberCard key={m.name} m={m} index={i} />
            ))}
          </div>

          {/* Closing banner with the mascot */}
          <div className="relative mt-12 sm:mt-16 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative -rotate-1"
            >
              <svg viewBox="0 0 700 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <path d="M10 18 C 120 4, 580 2, 690 14 L 684 78 C 560 90, 140 88, 14 76 Z" fill={YELLOW} />
              </svg>
              <p className="relative font-display uppercase text-2xl sm:text-4xl lg:text-5xl text-black px-6 sm:px-12 py-3 sm:py-4 text-center">
                Different strengths. One <span className="text-[#FF1493]">Locco</span> vision.
              </p>
              <Sparkle color={PINK} className="absolute -left-6 -top-4 w-8 sm:w-10" />
            </motion.div>
            <motion.img
              src="/assets/hero-brain-cart.png"
              alt=""
              initial={{ opacity: 0, x: 40, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 14 }}
              className="hidden sm:block absolute right-0 -bottom-8 w-28 lg:w-36 h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      <ContactAndCta />
    </>
  );
}
