import React, { useEffect } from 'react';
import { ShieldCheck, ChartColumn, Headset, Globe, Coins, Cpu } from 'lucide-react';
import { PageHero, StatStrip, FeatureGrid, StepsRow, ChipCloud, QuoteRow } from '../components/PageBlocks';
import ContactAndCta from '../components/ContactAndCta';

export default function AdvertisersPage() {
  useEffect(() => {
    document.title = 'For Advertisers | Pocco Locco Media';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="For Advertisers"
        plain="Pay for results,"
        highlight="not promises"
        accent="#FF1493"
        text="Pocco Locco connects your brand with a vetted network of publishers who only earn when they deliver: leads, sales or sign-ups. You set the goal. We bring the audience, the tracking and the optimisation."
        mascot="/assets/mascot-pink-v2.webp"
        splat={null}
        mascotAlt="Pocco Locco advertiser mascot"
        mascotLeft
        primary={{ label: 'Start a campaign', href: '#contact' }}
        secondary={{ label: 'See case studies', href: '/#cases' }}
      />

      <StatStrip
        stats={[
          { value: '150+', label: 'Brands running campaigns', color: '#FF1493' },
          { value: '5K+', label: 'Vetted publishers', color: '#7C3AED' },
          { value: '125K+', label: 'Leads delivered', color: '#0099FF' },
          { value: '15+', label: 'Countries reached', color: '#10B981' },
        ]}
      />

      <FeatureGrid
        heading={{
          plain: 'Why brands grow with',
          highlight: 'Pocco Locco',
          sub: 'Less guessing, fewer wasted clicks, and a team that answers the phone.',
        }}
        items={[
          {
            icon: ShieldCheck,
            color: '#FF1493',
            title: 'Verified, genuine traffic',
            text: 'Every publisher is reviewed before they join and watched after. Suspicious clicks and leads are filtered out before they ever reach you.',
          },
          {
            icon: ChartColumn,
            color: '#0099FF',
            title: 'Real-time reporting',
            text: 'See clicks, conversions and spend as they happen, broken down by publisher, country and device.',
          },
          {
            icon: Headset,
            color: '#FFC22E',
            title: 'A dedicated account manager',
            text: 'One person who knows your offer, your targets and your budget, and who replies fast when something needs to change.',
          },
          {
            icon: Globe,
            color: '#10B981',
            title: 'Many markets, one partner',
            text: 'Run the same offer across 15+ countries from one brief, one report and one point of contact.',
          },
          {
            icon: Coins,
            color: '#7C3AED',
            title: 'Pay per outcome',
            text: 'Choose the model that fits your business: cost per lead, cost per sale or revenue share. No outcome, no cost.',
          },
          {
            icon: Cpu,
            color: '#FF1493',
            title: 'The Pocco Locco engine',
            text: 'Our optimisation keeps moving budget toward the placements and partners that convert best for you.',
          },
        ]}
      />

      <StepsRow
        id="how"
        heading={{ plain: 'From brief to', highlight: 'results', sub: 'Four steps, no guesswork.' }}
        steps={[
          { title: 'Share your goal', text: 'Tell us the offer, target cost per result, markets and budget.' },
          { title: 'We build it', text: 'We match the right publishers and set up tracking end to end.' },
          { title: 'Go live', text: 'Traffic starts flowing and you watch every result in real time.' },
          { title: 'Scale up', text: 'We double down on what converts and cut what does not.' },
        ]}
      />

      <ChipCloud
        heading={{ plain: 'Verticals we', highlight: 'know inside out' }}
        chips={[
          { label: 'Nutra', color: '#FF1493' },
          { label: 'Travel', color: '#0099FF' },
          { label: 'Gaming', color: '#FFD600', dark: true },
          { label: 'Finance', color: '#FF1493' },
          { label: 'E-commerce', color: '#10B981' },
          { label: 'Lead generation', color: '#7C3AED' },
          { label: 'Apps & installs', color: '#0099FF' },
        ]}
      />

      <QuoteRow
        heading={{ plain: 'What brands', highlight: 'say' }}
        quotes={[
          {
            quote: 'Pocco loco has been a game changer for our lead generation. Their traffic quality and support are top notch!',
            name: 'Alex R.',
            role: 'E-Commerce Brand',
            avatar: '/assets/avatar-alex.png',
          },
          {
            quote: 'A reliable partner that truly understands performance marketing. We’ve scaled our campaigns globally with amazing results.',
            name: 'Daniel M.',
            role: 'Travel Brand',
            avatar: '/assets/avatar-daniel.png',
          },
        ]}
      />

      <ContactAndCta />
    </>
  );
}
