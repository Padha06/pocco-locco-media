import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, MapPin, Mail } from 'lucide-react';
import { DoodleStar } from './Doodles';
import { SocialRow } from './SocialIcons';
import confetti from 'canvas-confetti';

const inputClass =
  'w-full bg-white border border-white rounded sm:rounded-md px-2 sm:px-3.5 py-1 sm:py-2.5 text-[10px] sm:text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF1493] shadow-sm';

export default function ContactAndCta() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ctaRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });

  // Rocket drifts up and across on scroll
  const rocketX = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const rocketY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#FFD600', '#0099FF'],
    });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      {/* CONTACT US + READY TO GROW share one continuous sky backdrop */}
      <div className="bg-sky relative overflow-hidden">

        {/* Scattered doodle stars across the sky (desktop only, they crowd the stacked mobile layout) */}
        <div className="hidden lg:block">
        <DoodleStar className="absolute top-[30%] left-[2%] w-5 h-5 text-black fill-[#FFD600] stroke-[5]" />
        <DoodleStar className="absolute top-[56%] left-[1%] w-4 h-4 text-black fill-[#FF1493] stroke-[5]" />
        <DoodleStar className="absolute bottom-[8%] left-[3%] w-5 h-5 text-black fill-[#FFD600] stroke-[5]" />
        <DoodleStar className="absolute bottom-[22%] left-[44%] w-7 h-7 text-black fill-[#FFD600] stroke-[5]" />
        <DoodleStar className="absolute bottom-[6%] left-[40%] w-4 h-4 text-black fill-[#FFD600] stroke-[5]" />
        <DoodleStar className="absolute top-[4%] right-[3%] w-6 h-6 text-black fill-[#FFD600] stroke-[5]" />
        </div>

        {/* CONTACT US SECTION */}
        <section id="contact" className="relative pt-4 sm:pt-10 pb-1 sm:pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-x-3 gap-y-1 lg:gap-10 items-start relative z-10">

              {/* Left Column: Form */}
              <div className="order-1 col-span-7 row-span-2 lg:row-span-1 lg:col-span-5">
                <h2 className="font-display text-2xl sm:text-5xl text-black uppercase leading-none mb-2 sm:mb-5">
                  CONTACT <span className="text-[#FF1493]">US</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-1 sm:space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2.5">
                    <input type="text" required placeholder="Your Name *" value={formData.name} onChange={update('name')} className={inputClass} />
                    <input type="email" required placeholder="Your Email Address *" value={formData.email} onChange={update('email')} className={inputClass} />
                  </div>
                  <input type="tel" placeholder="Your Phone Number" value={formData.phone} onChange={update('phone')} className={inputClass} />
                  <input type="text" required placeholder="What's the Subject?" value={formData.subject} onChange={update('subject')} className={inputClass} />
                  <textarea rows="2" required placeholder="Your Message..." value={formData.message} onChange={update('message')} className={`${inputClass} resize-none h-10 sm:h-auto`} />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group !mt-2 sm:!mt-5 inline-flex items-center gap-2 sm:gap-4 bg-[#FFD600] text-black text-[10px] sm:text-sm font-black tracking-wide uppercase pl-3.5 sm:pl-7 pr-1 sm:pr-1.5 py-1 sm:py-1.5 rounded-full hover:bg-[#ffcc00] transition-all shadow-md"
                  >
                    <span>{submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}</span>
                    <span className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
                    </span>
                  </motion.button>
                </form>
              </div>

              {/* Middle Column: Get In Touch, Newsletter, Social */}
              <div className="order-3 lg:order-2 col-span-5 lg:col-span-4 lg:pl-2">
                <h3 className="font-display text-base sm:text-4xl text-black uppercase leading-none mb-1.5 sm:mb-4">
                  GET IN TOUCH
                </h3>
                <div className="space-y-1 sm:space-y-3 text-[9px] sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-5">
                  <p className="flex items-start gap-1.5 sm:gap-3">
                    <MapPin className="w-3 h-3 sm:w-5 sm:h-5 text-black fill-black/10 shrink-0 mt-0.5" />
                    <span>
                      Leidsestraat 104<br />
                      1017 DE Amsterdam<br />
                      The Netherlands
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5 sm:gap-3 text-[8px] sm:text-sm whitespace-nowrap">
                    <Mail className="w-3 h-3 sm:w-5 sm:h-5 text-black shrink-0" />
                    <a href="mailto:info@poccoloccomedia.com" className="hover:text-[#FF1493]">
                      info@poccoloccomedia.com
                    </a>
                  </p>
                </div>

                <h4 className="font-display text-[11px] sm:text-2xl text-black uppercase leading-none mb-1.5 sm:mb-2.5">
                  SUBSCRIBE TO OUR NEWSLETTER
                </h4>
                <div className="flex gap-1 sm:gap-2 max-w-sm mb-2 sm:mb-5">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newsletterEmail) {
                        confetti({ particleCount: 30 });
                        setNewsletterEmail('');
                      }
                    }}
                    className="bg-[#FF1493] text-white text-[10px] sm:text-sm font-black px-2 sm:px-3.5 rounded-md hover:bg-pink-600 transition-colors uppercase shadow-sm"
                  >
                    OK
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                  <span className="font-display text-[11px] sm:text-2xl text-black uppercase leading-none">
                    FOLLOW US
                  </span>
                  <SocialRow variant="dark" size="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
              </div>

              {/* Right Column: Let's Talk mascot */}
              <div className="order-2 lg:order-3 col-span-5 lg:col-span-3 flex justify-center lg:justify-end lg:-mr-6">
                <motion.div whileHover={{ scale: 1.04, rotate: -1 }} className="relative w-full max-w-[110px] sm:max-w-[340px] lg:max-w-[380px]">
                  <img
                    src="/assets/contact-girl-hd.webp"
                    alt="Pocco Locco Let's Talk Mascot"
                    className="w-full h-auto object-contain"
                  />
                  {/* "LET'S TALK!" speech bubble, drawn as vector so it stays crisp */}
                  <div className="absolute -top-[6%] -left-[10%] w-[40%] -rotate-6">
                    <svg viewBox="0 0 120 100" className="w-full h-auto overflow-visible" aria-hidden="true">
                      <path
                        d="M58 6 C 94 6, 114 26, 114 48 C 114 72, 92 86, 60 86 C 54 86, 48 85, 42 83 L 30 98 L 30 79 C 14 72, 4 61, 4 48 C 4 26, 24 6, 58 6 Z"
                        fill="#fff"
                        stroke="#111"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                      <text x="59" y="44" textAnchor="middle" fontSize="27" fontWeight="900" fill="#111" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                        LET&apos;S
                      </text>
                      <text x="59" y="72" textAnchor="middle" fontSize="27" fontWeight="900" fill="#111" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                        TALK!
                      </text>
                    </svg>
                  </div>
                  <DoodleStar className="absolute top-[2%] left-[38%] w-[9%] text-black fill-[#FFD600] stroke-[5]" />
                  <DoodleStar className="absolute top-[18%] right-[2%] w-[8%] text-black fill-[#FFD600] stroke-[5]" />
                  <DoodleStar className="absolute top-[40%] -left-[4%] w-[6%] text-black fill-[#FF1493] stroke-[5]" />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* READY TO GROW WITH POCCO LOCCO? */}
        <section ref={ctaRef} className="relative pt-2 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-2 lg:gap-6 items-center relative z-10">

            {/* Left Text */}
            <div className="col-span-7 lg:col-span-5 text-left">
              <h2 className="font-display text-2xl sm:text-5xl lg:text-[56px] text-black uppercase leading-[1.02] mb-2 sm:mb-3">
                READY TO GROW <br />
                WITH <span className="text-[#FF1493]">POCCO LOCCO?</span>
              </h2>
              <p className="text-[10px] sm:text-base text-gray-900 font-semibold mb-3 sm:mb-5 leading-snug">
                Let’s build something amazing together.<br />
                More traffic. More conversions. More growth.
              </p>

              <motion.a
                href="#contact"
                onClick={() => confetti({ particleCount: 60, colors: ['#FF1493', '#FFD600', '#0099FF'] })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-4 sm:gap-10 bg-black text-white text-[10px] sm:text-sm font-black tracking-wide uppercase pl-3.5 sm:pl-7 pr-1 sm:pr-1.5 py-1 sm:py-1.5 rounded-full hover:bg-neutral-900 transition-all shadow-xl"
              >
                <span className="inline-flex items-center gap-1 sm:gap-2">LET’S TALK <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" /></span>
                <span className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-[#FF1493] flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
              </motion.a>
            </div>

            {/* Center: Rocket Brain Mascot */}
            <div className="col-span-5 lg:col-span-4 flex justify-center">
              <motion.img
                src="/assets/cta-rocket-hd.webp"
                alt="Pocco Locco Rocket Brain Mascot"
                style={{ x: rocketX, y: rocketY }}
                whileHover={{ scale: 1.06 }}
                className="w-full max-w-[150px] sm:max-w-[400px] h-auto object-contain"
              />
            </div>

            {/* Right: hand-drawn "THE SKY IS JUST THE START" */}
            <div className="flex absolute right-2 -top-8 scale-[0.36] origin-top-right lg:static lg:scale-100 lg:col-span-3 justify-center select-none pointer-events-none">
              <DoodleStar className="absolute top-0 right-6 w-5 h-5 text-black fill-[#FF1493] stroke-[5]" />
              <DoodleStar className="absolute bottom-0 right-2 w-7 h-7 text-black fill-[#FFD600] stroke-[5]" />
              <DoodleStar className="absolute top-1/2 left-0 w-4 h-4 text-black fill-[#FF1493] stroke-[5]" />
              <div className="font-marker text-black text-center -rotate-6 leading-[0.95]">
                <span className="block text-[44px]">THE</span>
                <span className="block text-[52px]">SKY</span>
                <span className="block text-[30px]">IS JUST</span>
                <span className="block text-[34px]">THE START</span>
                <svg viewBox="0 0 160 14" className="w-40 h-3.5 mx-auto" fill="none">
                  <path d="M4 10 Q 80 0, 156 6" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white pt-6 sm:pt-8 pb-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-4 lg:grid-cols-12 gap-x-2 gap-y-4 lg:gap-4 mb-5 sm:mb-6">

            {/* Logo column */}
            <div className="col-span-4 lg:col-span-2 flex lg:block items-center gap-3">
              <img
                src="/assets/logo.webp"
                alt="Pocco Locco Media"
                className="h-12 sm:h-16 w-auto object-contain lg:mb-2"
              />
              <p className="text-[10px] sm:text-xs text-gray-300 font-semibold leading-snug max-w-[220px]">
                Your success is our mission. Brands go crazy, results go further.
              </p>
            </div>

            {[
              { title: 'COMPANY', links: [['About Us', '/about'], ['Meet the Team', '/team'], ['Careers', '#jobs'], ['News & Resources', '#news']] },
              { title: 'ADVERTISERS', links: [['Overview', '/advertisers'], ['Solutions', '/advertisers#how'], ['Case Studies', '/#cases'], ['Contact Us', '#contact']] },
              { title: 'PUBLISHERS', links: [['Overview', '/publishers'], ['How It Works', '/publishers#how'], ['FAQ', '#faq'], ['Contact Us', '#contact']] },
              { title: 'LET’S TALK', links: [['Support', '#contact'], ['Events', '#contact'], ['Partnerships', '#contact'], ['Let’s Talk', '#contact']] },
            ].map((col) => (
              <div key={col.title} className="col-span-1 lg:col-span-2">
                <h4 className="text-[9px] sm:text-sm font-black text-white uppercase tracking-wide mb-1 sm:mb-2">
                  {col.title}
                </h4>
                <ul className="space-y-0.5 sm:space-y-1 text-[9px] sm:text-[13px] font-medium text-gray-300">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="hover:text-[#FF1493] transition-colors">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-4 lg:col-span-2 flex lg:block items-center gap-3">
              <h4 className="text-[10px] sm:text-sm font-black text-white lg:mb-2 whitespace-nowrap">Follow Us</h4>
              <div>
                <SocialRow variant="light" size="w-7 h-7" />
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs font-medium text-gray-300 gap-2 sm:gap-3">
            <p>© {new Date().getFullYear()} Pocco Locco Media. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <a href="#privacy" className="hover:text-white">Privacy Policy</a>
              <span>|</span>
              <a href="#terms" className="hover:text-white">Terms &amp; Conditions</a>
              <span>|</span>
              <a href="#cookies" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
