import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowWeMakeItLoco from './components/HowWeMakeItLoco';
import GlobalMetrics from './components/GlobalMetrics';
import AboutSection from './components/AboutSection';
import VerticalsAndPartners from './components/VerticalsAndPartners';
import ContactAndCta from './components/ContactAndCta';
import AdvertisersPage from './pages/AdvertisersPage';
import PublishersPage from './pages/PublishersPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import JobsPage from './pages/JobsPage';
import { useLocation } from './router';

function HomePage() {
  useEffect(() => {
    document.title = 'Pocco Locco Media | Brands G Crazy - Performance Marketing Network';
  }, []);

  return (
    <>
      <Hero />
      <HowWeMakeItLoco />
      <GlobalMetrics />
      <AboutSection />
      <VerticalsAndPartners />
      <ContactAndCta />
    </>
  );
}

const PAGES = {
  '/advertisers': AdvertisersPage,
  '/publishers': PublishersPage,
  '/about': AboutPage,
  '/team': TeamPage,
  '/jobs': JobsPage,
};

export default function App() {
  const { path } = useLocation();
  const Page = PAGES[path.replace(/\/+$/, '')] || HomePage;

  return (
    <div className="min-h-screen bg-paper text-gray-900 selection:bg-[#FF1B7A] selection:text-white relative">
      <Navbar path={path} />
      <main key={path}>
        <Page />
      </main>
    </div>
  );
}
