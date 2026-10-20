import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when scrolling past 80px (moving from hero into page body)
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerConfetti = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#FF1B7A', '#FFD600', '#00B4D8', '#111827'],
    });
  };

  const navLinks = [
    { name: 'HOME', href: '#home', active: true },
    { name: 'ABOUT US', href: '#about' },
    { name: 'ADVERTISERS', href: '#advertisers' },
    { name: 'PUBLISHERS', href: '#publishers' },
    { name: 'OUR TEAM', href: '#team' },
    { name: 'JOBS', href: '#jobs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-1.5 sm:py-2'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo: Big on landing/hero (h-24), sleek & compact when scrolled (h-11) */}
          <motion.a
            href="#home"
            className="flex items-center cursor-pointer group py-0.5"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src="/assets/logo.webp"
              alt="Pocco Locco Media - Brands G Crazy"
              className={`w-auto object-contain filter drop-shadow-sm transition-all duration-300 ease-in-out group-hover:drop-shadow-md ${
                scrolled
                  ? 'h-9 sm:h-11 lg:h-12'
                  : 'h-16 sm:h-20 lg:h-24'
              }`}
            />
          </motion.a>

          {/* Desktop Nav Links: Smoothly adjusts size & gap on scroll */}
          <nav
            className={`hidden lg:flex items-center tracking-wider uppercase font-['Montserrat',sans-serif] font-black transition-all duration-300 ${
              scrolled
                ? 'gap-6 text-xs'
                : 'gap-7 xl:gap-9 text-xs sm:text-sm'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1.5 transition-colors duration-200 ${
                  link.active
                    ? 'text-[#FF1B7A]'
                    : 'text-black hover:text-[#FF1B7A]'
                }`}
              >
                <span>{link.name}</span>
                {link.active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-[#FF1B7A] rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Button: Sleek and compact when scrolled */}
          <div className="hidden sm:flex items-center">
            <motion.a
              href="#contact"
              onClick={triggerConfetti}
              className={`group flex items-center bg-black text-white font-black tracking-wider uppercase rounded-full hover:bg-neutral-900 transition-all duration-300 shadow-md hover:shadow-pink-500/25 cursor-pointer ${
                scrolled
                  ? 'text-xs pl-4 pr-1.5 py-1.5 gap-2'
                  : 'text-xs sm:text-sm pl-6 pr-2 py-2 gap-3'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>LET'S TALK</span>
              <span
                className={`rounded-full bg-[#FF1B7A] flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-[-10deg] shadow-sm shadow-pink-500/40 ${
                  scrolled ? 'w-6 h-6' : 'w-8 h-8'
                }`}
              >
                <ArrowRight className={`${scrolled ? 'w-3 h-3' : 'w-4 h-4'} stroke-[2.5]`} />
              </span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-gray-200 px-6 py-5 shadow-xl"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-black uppercase tracking-wider py-1 ${
                  link.active ? 'text-[#FF1B7A]' : 'text-black hover:text-[#FF1B7A]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                triggerConfetti(e);
              }}
              className="flex items-center justify-between bg-black text-white text-xs font-black tracking-wider uppercase px-5 py-3 rounded-full mt-2"
            >
              <span>LET'S TALK</span>
              <span className="w-7 h-7 rounded-full bg-[#FF1B7A] flex items-center justify-center text-white">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
