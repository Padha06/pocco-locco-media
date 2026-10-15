import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, MapPin, Mail, Send } from 'lucide-react';
import { DoodleCrown, DoodleStar } from './Doodles';
import confetti from 'canvas-confetti';

export default function ContactAndCta() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  // Rocket moves up and across on scroll
  const rocketX = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const rocketY = useTransform(scrollYProgress, [0, 1], [30, -40]);
  const rocketRotate = useTransform(scrollYProgress, [0, 1], [5, -12]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF1B7A', '#FFD600', '#00B4D8'],
    });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      {/* CONTACT US SECTION */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Vibrant Cyan Card */}
          <div className="bg-[#a5f3fc]/60 border-2 border-[#67e8f9] rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl backdrop-blur-sm">
            
            {/* Background floating doodle stars */}
            <div className="absolute top-8 left-8">
              <DoodleStar className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="absolute bottom-8 left-12">
              <DoodleStar className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="absolute top-12 right-1/3">
              <DoodleCrown className="w-10 h-10 text-yellow-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-6">
                <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase mb-8">
                  CONTACT <span className="text-[#FF1B7A]">US</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/95 border border-cyan-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/95 border border-cyan-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
                    />
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="What's the Subject?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/95 border border-cyan-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
                  />

                  <textarea
                    rows="4"
                    required
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/95 border border-cyan-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm resize-none"
                  />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-3 bg-[#FFD600] text-black text-xs font-black tracking-wider uppercase pl-6 pr-2.5 py-3 rounded-full hover:bg-yellow-400 transition-all shadow-md shadow-yellow-500/20"
                  >
                    <span>{submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}</span>
                    <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </motion.button>
                </form>
              </div>

              {/* Right Column: Info & Cool Woman Mascot */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-black tracking-wider uppercase mb-3">
                      GET IN TOUCH
                    </h3>
                    <div className="space-y-2.5 text-xs font-bold text-gray-800">
                      <p className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                        <span>Leidsestraat 104, 1017 DE Amsterdam, The Netherlands</span>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-black shrink-0" />
                        <a href="mailto:info@poccoloccomedia.com" className="hover:text-pink-600 underline">
                          info@poccoloccomedia.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div>
                    <h4 className="text-xs font-black text-black tracking-wider uppercase mb-2">
                      SUBSCRIBE TO OUR NEWSLETTER
                    </h4>
                    <div className="flex gap-2 max-w-sm">
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 bg-white/95 border border-cyan-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newsletterEmail) {
                            confetti({ particleCount: 30 });
                            setNewsletterEmail('');
                          }
                        }}
                        className="bg-[#FF1B7A] text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-pink-600 transition-colors uppercase shadow-sm"
                      >
                        OK
                      </button>
                    </div>
                  </div>

                  {/* Social links */}
                  <div>
                    <span className="text-[11px] font-black text-black tracking-wider uppercase block mb-2">
                      FOLLOW US
                    </span>
                    <div className="flex items-center gap-2">
                      {['in', 'ig', 'tw', 'fb', 'yt'].map((platform, idx) => (
                        <a
                          key={idx}
                          href="#contact"
                          className="w-8 h-8 rounded-full bg-black text-white text-[11px] font-black flex items-center justify-center hover:bg-[#FF1B7A] transition-colors uppercase"
                        >
                          {platform}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3D Cool Woman Mascot with finger guns */}
                <div className="relative mt-6 flex justify-end">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="max-w-[280px] w-full relative cursor-pointer"
                  >
                    <img
                      src="/assets/mascot-cool-woman.png"
                      alt="Pocco Locco Let's Talk Mascot"
                      className="w-full h-auto object-contain filter drop-shadow-xl"
                    />
                  </motion.div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* READY TO GROW WITH POCCO LOCCO? FOOTER BANNER */}
      <section
        ref={ctaRef}
        className="relative bg-gradient-to-r from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left Text */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-2">
              <DoodleStar className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
                READY TO GROW <br />
                WITH <span className="text-[#FF1B7A]">POCCO LOCCO?</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-800 font-bold max-w-md mb-6 leading-relaxed">
              Let's build something amazing together. More traffic. More conversions. More growth.
            </p>

            <motion.a
              href="#contact"
              onClick={() => confetti({ particleCount: 60 })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 bg-black text-white text-xs font-black tracking-wider uppercase pl-6 pr-2.5 py-3 rounded-full hover:bg-neutral-900 transition-all shadow-xl"
            >
              <span>LET'S TALK</span>
              <span className="w-6 h-6 rounded-full bg-[#FF1B7A] flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.a>
          </div>

          {/* Right: Blasting Rocket Brain Astronaut Mascot */}
          <div className="relative flex items-center justify-center">
            
            <motion.div
              style={{
                x: rocketX,
                y: rocketY,
                rotate: rocketRotate,
              }}
              className="max-w-[340px] w-full cursor-pointer select-none"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src="/assets/mascot-rocket-brain.png"
                alt="Pocco Locco Rocket Brain Mascot"
                className="w-full h-auto object-contain filter drop-shadow-2xl"
              />
            </motion.div>

            {/* Scribble "THE SKY IS JUST THE START" */}
            <div className="absolute -top-4 right-2 text-right hidden sm:block pointer-events-none">
              <span className="text-sm font-black uppercase tracking-tight block text-black">
                THE SKY
              </span>
              <span className="text-sm font-black uppercase tracking-tight block text-black">
                IS JUST
              </span>
              <span className="text-sm font-black uppercase tracking-tight block text-[#FF1B7A]">
                THE START
              </span>
              <DoodleStar className="w-5 h-5 text-yellow-400 fill-yellow-400 ml-auto mt-1" />
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b0b0e] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            {/* Logo column */}
            <div className="col-span-2 md:col-span-1">
              <img
                src="/assets/logo.png"
                alt="Pocco Locco Media"
                className="h-12 w-auto object-contain mb-4 filter brightness-110"
              />
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                Brands G Crazy.
              </p>
            </div>

            {/* Links columns */}
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
                COMPANY
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#jobs" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#news" className="hover:text-white transition-colors">News & Resources</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
                ADVERTISERS
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#advertisers" className="hover:text-white transition-colors">Overview</a></li>
                <li><a href="#advertisers" className="hover:text-white transition-colors">Solutions</a></li>
                <li><a href="#cases" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
                PUBLISHERS
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#publishers" className="hover:text-white transition-colors">Overview</a></li>
                <li><a href="#publishers" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
                LET'S TALK
              </h4>
              <ul className="space-y-2 text-xs font-semibold mb-4">
                <li><a href="#contact" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Partnerships</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Let's Talk</a></li>
              </ul>
              <div className="flex items-center gap-2">
                {['in', 'tw', 'fb', 'yt'].map((platform, idx) => (
                  <a
                    key={idx}
                    href="#contact"
                    className="w-7 h-7 rounded-full bg-white/10 text-white text-[10px] font-black flex items-center justify-center hover:bg-[#FF1B7A] transition-colors uppercase"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-gray-500 gap-4">
            <p>© 2026 Pocco Locco Media. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a>
              <a href="#terms" className="hover:text-gray-400">Terms & Conditions</a>
              <a href="#cookies" className="hover:text-gray-400">Cookie Policy</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
