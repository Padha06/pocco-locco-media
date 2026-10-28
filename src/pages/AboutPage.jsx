import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Rocket, MapPin } from 'lucide-react';
import { PageHero, StatStrip, SectionHeading } from '../components/PageBlocks';
import { CraftScatter, Tape } from '../components/CraftDecor';
import ContactAndCta from '../components/ContactAndCta';

const values = [
  { title: 'Transparent', text: 'Clear communication and honest reporting. You always see where results come from.', img: '/assets/about-transparent.png', color: '#0099FF' },
  { title: 'Performance', text: 'We optimise every step, because the only thing that matters is the outcome.', img: '/assets/about-performance.png', color: '#FF1493' },
  { title: 'Innovative', text: 'Smart tracking and our own optimisation engine keep campaigns a step ahead.', img: '/assets/about-innovative.png', color: '#0099FF' },
  { title: 'Dedicated', text: 'A team that treats your targets like its own and picks up the phone.', img: '/assets/about-dedicated.png', color: '#FF1493' },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Pocco Locco Media';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About us"
        plain="More than"
        highlight="marketing"
        accent="#FF1493"
        splat="#FFD600"
        text="Pocco Locco Media is a global performance marketing network based in Amsterdam. We connect advertisers with high-quality publishers and make every click, lead and sale count."
        mascot="/assets/about-laptop-hd.webp"
        mascotAlt="Pocco Locco team member at a laptop"
        primary={{ label: 'Work with us', href: '#contact' }}
        secondary={{ label: 'Our story', href: '#story' }}
      />

      {/* OUR STORY + mission / vision */}
      <section id="story" className="relative py-6 sm:py-12 overflow-hidden">
        <CraftScatter
          items={[
            { shape: 'Splat', className: 'top-6 right-[1%] w-14', props: { color: '#0099FF' } },
            { shape: 'Squiggle', className: 'bottom-10 left-[1%] w-20', props: { color: '#FF1493' } },
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-12 gap-3 sm:gap-10 items-start">
          <div className="col-span-7">
            <SectionHeading plain="Our" highlight="story" />
            <div className="space-y-2 sm:space-y-4 text-[10px] sm:text-base lg:text-lg text-gray-800 font-medium leading-snug sm:leading-relaxed">
              <p>
                Performance marketing should be simple: a brand pays for real results, and the partners who
                deliver them get paid fairly and on time. Too often it is anything but. Traffic sources are
                unclear, reports do not add up and payments arrive late.
              </p>
              <p>
                Pocco Locco was built to fix that. We run a network that is transparent for brands, fair for
                publishers and, as our name says, a little bit crazy about results. Brands Go Crazy.
              </p>
            </div>
          </div>
          <div className="col-span-5 space-y-3 sm:space-y-6">
            {[
              { icon: Target, color: '#FF1493', title: 'Our mission', text: 'Connect the right brands with the right audience through the right partners, and prove it with data.' },
              { icon: Rocket, color: '#0099FF', title: 'Our vision', text: 'Be the performance network brands and publishers trust first, in every market we enter.' },
            ].map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-white rounded-xl border border-gray-200 p-3 sm:p-6 shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
              >
                <Tape color={i ? '#7CD3FF' : '#FFD600'} className={`absolute -top-3 right-5 w-10 sm:w-14 ${i ? 'rotate-6' : '-rotate-6'}`} />
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <span style={{ backgroundColor: m.color }} className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white">
                    <m.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </span>
                  <h3 className="font-display text-base sm:text-3xl uppercase leading-none">{m.title}</h3>
                </div>
                <p className="text-[9px] sm:text-base text-gray-700 font-medium leading-snug">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatStrip
        stats={[
          { value: '250+', label: 'Advertisers', color: '#00C2FF' },
          { value: '10K+', label: 'Publishers', color: '#7C3AED' },
          { value: '12.5M+', label: 'Leads delivered', color: '#FF1493' },
          { value: '120+', label: 'Countries', color: '#0070F3' },
          { value: '99.9%', label: 'Uptime', color: '#7C3AED' },
        ]}
      />

      {/* VALUES */}
      <section className="relative py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading plain="What we" highlight="stand for" center />
          <div className="grid grid-cols-4 gap-2 sm:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-xl border border-gray-200 p-2 sm:p-6 text-center shadow-[0_4px_18px_rgba(0,0,0,0.05)]"
              >
                <img src={v.img} alt="" className="h-8 sm:h-16 mx-auto object-contain mb-1.5 sm:mb-4" />
                <h3 style={{ color: v.color }} className="text-[9px] sm:text-lg font-black uppercase tracking-normal sm:tracking-wider mb-1 sm:mb-2">
                  {v.title}
                </h3>
                <p className="text-[8px] sm:text-sm text-gray-700 font-medium leading-tight sm:leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE TO FIND US */}
      <section className="relative pb-8 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-black text-white rounded-2xl px-4 sm:px-10 py-5 sm:py-10 grid grid-cols-12 gap-3 items-center overflow-hidden">
            <Tape color="#FF8DC7" className="absolute -top-1 left-10 w-14 sm:w-20 -rotate-3" />
            <div className="col-span-8">
              <h2 className="font-display text-2xl sm:text-5xl uppercase leading-none mb-2 sm:mb-3">
                Based in <span className="text-[#FFD600]">Amsterdam</span>
              </h2>
              <p className="text-[10px] sm:text-base text-gray-300 font-medium leading-snug">
                Working with brands and publishers in over 120 countries, from our home on the Leidsestraat.
              </p>
            </div>
            <div className="col-span-4 flex items-start gap-2 sm:gap-3 text-[9px] sm:text-base font-semibold">
              <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-[#FF1493] shrink-0" />
              <span>
                Leidsestraat 104
                <br />
                1017 DE Amsterdam
                <br />
                The Netherlands
              </span>
            </div>
          </div>
        </div>
      </section>

      <ContactAndCta />
    </>
  );
}
