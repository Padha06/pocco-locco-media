import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowWeMakeItLoco from './components/HowWeMakeItLoco';
import GlobalMetrics from './components/GlobalMetrics';
import AboutSection from './components/AboutSection';
import VerticalsAndPartners from './components/VerticalsAndPartners';
import ContactAndCta from './components/ContactAndCta';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-gray-900 selection:bg-[#FF1B7A] selection:text-white relative">
      <Navbar />
      <main>
        <Hero />
        <HowWeMakeItLoco />
        <GlobalMetrics />
        <AboutSection />
        <VerticalsAndPartners />
        <ContactAndCta />
      </main>
    </div>
  );
}
