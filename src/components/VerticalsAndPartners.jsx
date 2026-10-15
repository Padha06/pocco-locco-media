import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { DoodleCurlyArrow, DoodleCrown } from './Doodles';

export default function VerticalsAndPartners() {
  const verticals = [
    {
      category: 'NUTRA',
      categoryColor: 'bg-[#FF1B7A] text-white',
      title: 'Boosting Conversions with Smart Targeting',
      stat: '+320%',
      statLabel: 'ROI Increase',
      statColor: 'text-[#FF1B7A]',
      img: '/assets/vertical-nutra.png',
    },
    {
      category: 'TRAVEL',
      categoryColor: 'bg-[#00B4D8] text-white',
      title: 'Scaling Global Reach for a Leading Travel Brand',
      stat: '1.5M+',
      statLabel: 'Leads Generated',
      statColor: 'text-[#00B4D8]',
      img: '/assets/vertical-travel.png',
    },
    {
      category: 'GAMING',
      categoryColor: 'bg-[#FFD600] text-black',
      title: 'High-Performing User Acquisition',
      stat: '2.8X',
      statLabel: 'Conversion Rate',
      statColor: 'text-amber-500',
      img: '/assets/vertical-gaming.png',
    },
    {
      category: 'FINANCE',
      categoryColor: 'bg-[#FF1B7A] text-white',
      title: 'Driving Quality Leads in Competitive Markets',
      stat: '45%',
      statLabel: 'Lower CPA',
      statColor: 'text-[#FF1B7A]',
      img: '/assets/vertical-finance.png',
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

  const partners = [
    { name: 'amazon', font: 'font-bold tracking-tight lowercase' },
    { name: 'SAMSUNS', font: 'font-black tracking-widest' },
    { name: 'Expedia', font: 'font-black' },
    { name: 'Spotify', font: 'font-black' },
    { name: 'eToro', font: 'font-black italic' },
    { name: 'Uber', font: 'font-black' },
    { name: 'adidas', font: 'font-black lowercase' },
    { name: 'Coca-Cola', font: 'font-serif italic font-black' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Verticals Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              VERTICALS <span className="text-[#FF1B7A]">CAMPAIGNS</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wider mt-2">
              A selection of successful campaigns across various verticals.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-xs font-black text-black hover:text-[#FF1B7A] uppercase tracking-wider transition-colors"
          >
            <span>VIEW ALL CASE STUDIES</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4 Verticals Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {verticals.map((v, idx) => (
            <motion.div
              key={v.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail Container with Category Pill */}
              <div className="relative h-44 overflow-hidden bg-black">
                <img
                  src={v.img}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span
                  className={`absolute bottom-3 left-3 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${v.categoryColor}`}
                >
                  {v.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-gray-900 leading-snug mb-4 group-hover:text-[#FF1B7A] transition-colors">
                    {v.title}
                  </h3>
                  <div className="mb-4">
                    <span className={`text-2xl font-black ${v.statColor} block`}>
                      {v.stat}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      {v.statLabel}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-black text-gray-900 group-hover:text-[#FF1B7A]">
                  <span>VIEW CASE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WHAT OUR PARTNERS SAY */}
        <div className="relative mb-24">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              WHAT OUR PARTNERS <span className="text-[#FF1B7A]">SAY</span>
            </h2>

            {/* Scribble "REAL PEOPLE. REAL RESULTS." callout */}
            <div className="hidden lg:flex items-center gap-3">
              <DoodleCurlyArrow className="w-14 h-14 text-black rotate-[-20deg]" />
              <div className="text-right">
                <span className="text-xs font-black tracking-widest uppercase block text-black">
                  REAL PEOPLE.
                </span>
                <span className="text-xs font-black tracking-widest uppercase block text-[#FF1B7A]">
                  REAL RESULTS.
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-7 h-7 text-[#FF1B7A] mb-3 fill-[#FF1B7A]/10" />
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                    <div>
                      <h4 className="text-xs font-black text-gray-900">{t.name}</h4>
                      <p className="text-[10px] font-bold text-gray-500">{t.role}</p>
                    </div>
                  </div>

                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* OUR PARTNERS Infinite Marquee */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-sm font-black text-gray-900 tracking-wider uppercase">
              OUR PARTNERS
            </h3>
            <DoodleCrown className="w-6 h-6 text-black" />
          </div>

          <div className="relative overflow-hidden py-4 bg-gray-50/70 rounded-2xl border border-gray-100">
            <div className="animate-marquee flex items-center gap-16 px-4">
              {[...partners, ...partners].map((p, i) => (
                <span
                  key={i}
                  className={`text-xl sm:text-2xl text-gray-700 hover:text-black transition-colors select-none ${p.font}`}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
