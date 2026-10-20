import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, MapPin, Mail } from 'lucide-react';
import { DoodleStar } from './Doodles';
import { SocialRow } from './SocialIcons';
import confetti from 'canvas-confetti';

const inputClass =
  'w-full bg-white border border-white rounded-md px-3.5 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF1493] shadow-sm';

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
        <section id="contact" className="relative pt-8 sm:pt-10 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">

              {/* Left Column: Form */}
              <div className="lg:col-span-5">
                <h2 className="font-display text-4xl sm:text-5xl text-black uppercase leading-none mb-5">
                  CONTACT <span className="text-[#FF1493]">US</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input type="text" required placeholder="Your Name *" value={formData.name} onChange={update('name')} className={inputClass} />
                    <input type="email" required placeholder="Your Email Address *" value={formData.email} onChange={update('email')} className={inputClass} />
                  </div>
                  <input type="tel" placeholder="Your Phone Number" value={formData.phone} onChange={update('phone')} className={inputClass} />
                  <input type="text" required placeholder="What's the Subject?" value={formData.subject} onChange={update('subject')} className={inputClass} />
                  <textarea rows="2" required placeholder="Your Message..." value={formData.message} onChange={update('message')} className={`${inputClass} resize-none`} />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group !mt-5 inline-flex items-center gap-4 bg-[#FFD600] text-black text-sm font-black tracking-wide uppercase pl-7 pr-1.5 py-1.5 rounded-full hover:bg-[#ffcc00] transition-all shadow-md"
                  >
                    <span>{submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}</span>
                    <span className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </motion.button>
                </form>
              </div>

              {/* Middle Column: Get In Touch, Newsletter, Social */}
              <div className="lg:col-span-4 lg:pl-2">
                <h3 className="font-display text-3xl sm:text-4xl text-black uppercase leading-none mb-4">
                  GET IN TOUCH
                </h3>
                <div className="space-y-3 text-sm font-semibold text-gray-900 mb-5">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-black fill-black/10 shrink-0 mt-0.5" />
                    <span>
                      Leidsestraat 104<br />
                      1017 DE Amsterdam<br />
                      The Netherlands
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-black shrink-0" />
                    <a href="mailto:info@poccoloccomedia.com" className="hover:text-[#FF1493]">
                      info@poccoloccomedia.com
                    </a>
                  </p>
                </div>

                <h4 className="font-display text-xl sm:text-2xl text-black uppercase leading-none mb-2.5">
                  SUBSCRIBE TO OUR NEWSLETTER
                </h4>
                <div className="flex gap-2 max-w-sm mb-5">
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
                    className="bg-[#FF1493] text-white text-sm font-black px-3.5 rounded-md hover:bg-pink-600 transition-colors uppercase shadow-sm"
                  >
                    OK
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-display text-xl sm:text-2xl text-black uppercase leading-none">
                    FOLLOW US
                  </span>
                  <SocialRow variant="dark" />
                </div>
              </div>

              {/* Right Column: Let's Talk mascot */}
              <div className="md:col-span-2 lg:col-span-3 flex justify-center lg:justify-end lg:-mr-6">
                <motion.img
                  src="/assets/contact-woman.png"
                  alt="Pocco Locco Let's Talk Mascot"
                  whileHover={{ scale: 1.04, rotate: -1 }}
                  className="mask-feather w-full max-w-[340px] lg:max-w-[380px] h-auto object-contain lg:-mt-4"
                />
              </div>

            </div>
          </div>
        </section>

        {/* READY TO GROW WITH POCCO LOCCO? */}
        <section ref={ctaRef} className="relative pt-2 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">

            {/* Left Text */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] text-black uppercase leading-[1.02] mb-3">
                READY TO GROW <br />
                WITH <span className="text-[#FF1493]">POCCO LOCCO?</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-900 font-semibold mb-5 leading-snug">
                Let’s build something amazing together.<br />
                More traffic. More conversions. More growth.
              </p>

              <motion.a
                href="#contact"
                onClick={() => confetti({ particleCount: 60, colors: ['#FF1493', '#FFD600', '#0099FF'] })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-10 bg-black text-white text-sm font-black tracking-wide uppercase pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-900 transition-all shadow-xl"
              >
                <span className="inline-flex items-center gap-2">LET’S TALK <ArrowRight className="w-4 h-4 stroke-[2.5]" /></span>
                <span className="w-9 h-9 rounded-full bg-[#FF1493] flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </motion.a>
            </div>

            {/* Center: Rocket Brain Mascot */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.img
                src="/assets/cta-rocket.png"
                alt="Pocco Locco Rocket Brain Mascot"
                style={{ x: rocketX, y: rocketY }}
                whileHover={{ scale: 1.06 }}
                className="mask-feather w-full max-w-[460px] h-auto object-contain"
              />
            </div>

            {/* Right: hand-drawn "THE SKY IS JUST THE START" */}
            <div className="hidden lg:flex lg:col-span-3 justify-center relative select-none pointer-events-none">
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
      <footer className="bg-black text-white pt-8 pb-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-6 lg:gap-4 mb-6">

            {/* Logo column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <img
                src="/assets/logo.webp"
                alt="Pocco Locco Media"
                className="h-16 w-auto object-contain mb-2"
              />
              <p className="text-xs text-gray-300 font-semibold leading-snug max-w-[220px]">
                Your success is our mission. Brands go crazy, results go further.
              </p>
            </div>

            {[
              { title: 'COMPANY', links: [['About Us', '#about'], ['Our Team', '#team'], ['Careers', '#jobs'], ['News & Resources', '#news']] },
              { title: 'ADVERTISERS', links: [['Overview', '#advertisers'], ['Solutions', '#advertisers'], ['Case Studies', '#cases'], ['Contact Us', '#contact']] },
              { title: 'PUBLISHERS', links: [['Overview', '#publishers'], ['How It Works', '#how-it-works'], ['FAQ', '#faq'], ['Contact Us', '#contact']] },
              { title: 'LET’S TALK', links: [['Support', '#contact'], ['Events', '#contact'], ['Partnerships', '#contact'], ['Let’s Talk', '#contact']] },
            ].map((col) => (
              <div key={col.title} className="lg:col-span-2">
                <h4 className="text-sm font-black text-white uppercase tracking-wide mb-2">
                  {col.title}
                </h4>
                <ul className="space-y-1 text-[13px] font-medium text-gray-300">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="hover:text-[#FF1493] transition-colors">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-2">
              <h4 className="text-sm font-black text-white mb-2 whitespace-nowrap">Follow Us</h4>
              <div>
                <SocialRow variant="light" size="w-7 h-7" />
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-gray-300 gap-3">
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
