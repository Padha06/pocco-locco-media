import React, { useEffect } from 'react';
import { Flame, Wallet, Eye, UserRound, Link, LifeBuoy } from 'lucide-react';
import { PageHero, StatStrip, FeatureGrid, StepsRow, ChipCloud, QuoteRow } from '../components/PageBlocks';
import ContactAndCta from '../components/ContactAndCta';

export default function PublishersPage() {
  useEffect(() => {
    document.title = 'For Publishers | Pocco Locco Media';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="For Publishers"
        plain="Turn your traffic"
        highlight="into income"
        accent="#0099FF"
        text="Whether you run a content site, a social following, an app or a media-buying team, Pocco Locco gives you high-converting offers from trusted brands, honest tracking and payouts that arrive on time, every week."
        mascot="/assets/mascot-blue-v2.webp"
        splat={null}
        mascotAlt="Pocco Locco publisher mascot"
        primary={{ label: 'Join as a publisher', href: '#contact' }}
        secondary={{ label: 'How it works', href: '#how' }}
      />

      <StatStrip
        stats={[
          { value: '$8.7M+', label: 'Paid to publishers', color: '#FF1493' },
          { value: '250+', label: 'Brands to promote', color: '#0099FF' },
          { value: 'Weekly', label: 'Payouts', color: '#10B981' },
          { value: '24/7', label: 'Support', color: '#7C3AED' },
        ]}
      />

      <FeatureGrid
        heading={{
          plain: 'Built for people who',
          highlight: 'bring the traffic',
          accent: '#0099FF',
          sub: 'You focus on your audience. We make sure every conversion counts and gets paid.',
        }}
        items={[
          {
            icon: Flame,
            color: '#FF1493',
            title: 'High-converting offers',
            text: 'Hand-picked campaigns from brands that already convert, so your traffic earns more per click.',
          },
          {
            icon: Wallet,
            color: '#10B981',
            title: 'Weekly, on-time payouts',
            text: 'No chasing invoices. Earnings are paid every week, on schedule, with a clear breakdown.',
          },
          {
            icon: Eye,
            color: '#0099FF',
            title: 'Tracking you can trust',
            text: 'Every click and conversion is visible in your dashboard, so you always know what you have earned and why.',
          },
          {
            icon: UserRound,
            color: '#FFC22E',
            title: 'Your own affiliate manager',
            text: 'A real person who suggests the best offers for your traffic and helps you scale what works.',
          },
          {
            icon: Link,
            color: '#7C3AED',
            title: 'Links in one click',
            text: 'Grab tracking links for any approved offer and start promoting in minutes, not days.',
          },
          {
            icon: LifeBuoy,
            color: '#FF1493',
            title: 'Support around the clock',
            text: 'Questions about an offer, a payment or a postback? Our team is on hand 24/7.',
          },
        ]}
      />

      <StepsRow
        id="how"
        accent="#0099FF"
        heading={{ plain: 'Start earning in', highlight: 'four steps', sub: 'From sign-up to first payout.' }}
        steps={[
          { title: 'Apply', text: 'Tell us about your site, channel or traffic source.' },
          { title: 'Get approved', text: 'A quick review, then you meet your affiliate manager.' },
          { title: 'Promote offers', text: 'Pick the campaigns that fit your audience and go live.' },
          { title: 'Get paid weekly', text: 'Conversions are tracked and paid out every week.' },
        ]}
      />

      <ChipCloud
        heading={{ plain: 'Who we', highlight: 'work with', accent: '#0099FF' }}
        chips={[
          { label: 'Content & review sites', color: '#0099FF' },
          { label: 'Social creators', color: '#FF1493' },
          { label: 'Media buyers', color: '#FFD600', dark: true },
          { label: 'Email & push', color: '#10B981' },
          { label: 'Apps', color: '#7C3AED' },
          { label: 'Coupon & cashback', color: '#FF1493' },
          { label: 'Comparison sites', color: '#0099FF' },
        ]}
      />

      <QuoteRow
        heading={{ plain: 'What publishers', highlight: 'say', accent: '#0099FF' }}
        quotes={[
          {
            quote: 'Fast payouts, great communication and high-converting offers. One of the best networks we’ve worked with!',
            name: 'Sophie K.',
            role: 'Affiliate Publisher',
            avatar: '/assets/avatar-sophie.png',
          },
          {
            quote: 'Pocco loco has been a game changer for our lead generation. Their traffic quality and support are top notch!',
            name: 'Alex R.',
            role: 'E-Commerce Brand',
            avatar: '/assets/avatar-alex.png',
          },
        ]}
      />

      <ContactAndCta />
    </>
  );
}
