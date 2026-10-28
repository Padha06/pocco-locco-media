import React from 'react';
import { motion } from 'motion/react';

// Hand-made "craft" doodles used to fill the empty gutters between sections,
// so no part of the page reads as plain white background.

const INK = '#111111';

export function Splat({ color = '#FF1493', className = '' }) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
      <path
        fill={color}
        d="M58 14c9-6 14 8 22 6 9-2 12-14 19-8 6 6-6 14-2 21 4 8 18 6 18 15 0 9-14 8-16 16-2 9 10 17 3 23-7 6-14-6-22-4-9 2-11 15-20 13-9-2-6-15-14-19-8-4-19 4-23-4-4-8 9-12 7-21-2-8-15-10-12-18 3-8 15-1 21-7 6-7 6-19 13-22 3-1 4 6 6 9z"
      />
      <circle cx="108" cy="16" r="5" fill={color} />
      <circle cx="12" cy="92" r="4" fill={color} />
      <circle cx="98" cy="100" r="3" fill={color} />
      <circle cx="22" cy="14" r="2.5" fill={color} />
    </svg>
  );
}

export function Squiggle({ color = INK, className = '' }) {
  return (
    <svg viewBox="0 0 140 30" fill="none" className={className} aria-hidden="true">
      <path d="M4 16c10-14 20 14 30 0s20 14 30 0 20 14 30 0 20 14 30 0 6-6 10-4" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function Spiral({ color = INK, className = '' }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M40 40c0-4 6-4 6 0 0 8-12 8-12 0 0-12 18-12 18 0 0 16-24 16-24 0 0-20 30-20 30 0 0 24-36 24-36 0"
        stroke={color} strokeWidth="2.6" strokeLinecap="round"
      />
    </svg>
  );
}

export function Zigzag({ color = INK, className = '' }) {
  return (
    <svg viewBox="0 0 120 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 18 15 6l12 12 12-12 12 12 12-12 12 12 12-12 12 12 12-12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Dots({ color = INK, className = '' }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      {[[6, 8], [22, 4], [38, 10], [54, 6], [12, 24], [30, 22], [48, 28], [20, 36], [40, 36]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 2} fill={color} />
      ))}
    </svg>
  );
}

export function Sparkle({ color = '#FFD600', className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 2c2 11 7 16 18 18-11 2-16 7-18 18-2-11-7-16-18-18 11-2 16-7 18-18z" fill={color} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Star({ fill = '#FFD600', className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 3 L24.5 13.5 L36 14.5 L27 22 L29.5 33.5 L20 27 L10.5 33.5 L13 22 L4 14.5 L15.5 13.5 Z"
        fill={fill} stroke={INK} strokeWidth="2.4" strokeLinejoin="round"
      />
    </svg>
  );
}

export function Crown({ fill = 'none', className = '' }) {
  return (
    <svg viewBox="0 0 60 44" fill="none" className={className} aria-hidden="true">
      <path d="M6 38 L4 10 L18 22 L28 4 L38 22 L54 8 L52 38 Z" fill={fill} stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Swoosh({ color = INK, className = '' }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} aria-hidden="true">
      <path d="M6 50C30 10 74 6 106 26" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M92 16l16 10-14 10" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Scribble({ color = '#9ca3af', className = '' }) {
  return (
    <svg viewBox="0 0 200 60" fill="none" className={className} aria-hidden="true">
      <path d="M4 40C40 10 80 50 120 24s60 6 76-12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 52c34-18 70 6 104-10s56-4 80-16" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// Strip of washi tape "sticking" a card to the page
export function Tape({ color = '#FFD600', className = '' }) {
  return (
    <svg viewBox="0 0 90 26" className={className} aria-hidden="true">
      <path
        d="M3 4l4 2 3-3 4 3 3-2 3 2h56l3-2 3 2 3-3 4 3V22l-4 2-3-3-3 2-3-2H17l-3 2-4-3-3 3-4-2z"
        fill={color} opacity="0.82"
      />
      <path d="M12 9h66M12 17h66" stroke="#fff" strokeWidth="1.2" opacity="0.35" />
    </svg>
  );
}

// Round push-pin seen from slightly above: glossy head, rim, short needle and a soft shadow
export function PushPin({ color = '#FF1493', className = '' }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden="true">
      <ellipse cx="24" cy="40" rx="9" ry="3.2" fill="#000" opacity="0.18" />
      <path d="M20 26 L23 42" stroke="#8a8f98" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="20" cy="17" r="13" fill={color} />
      <circle cx="20" cy="17" r="13" fill="url(#pinShade)" />
      <ellipse cx="15.5" cy="12" rx="4.5" ry="3" fill="#fff" opacity="0.65" transform="rotate(-30 15.5 12)" />
      <circle cx="20" cy="17" r="13" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1.2" />
      <defs>
        <radialGradient id="pinShade" cx="35%" cy="30%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const SHAPES = { Splat, Squiggle, Spiral, Zigzag, Dots, Sparkle, Star, Crown, Swoosh, Scribble, Tape };

// Scatter of absolutely-positioned doodles; each item gently bobs so the page feels alive.
// items: [{ shape: 'Splat', className: 'top-4 left-2 w-16', props: { color } , spin }]
export function CraftScatter({ items, className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`} aria-hidden="true">
      {items.map((it, i) => {
        const Shape = SHAPES[it.shape];
        return (
          <motion.div
            key={i}
            className={`absolute max-md:scale-50 max-md:opacity-70 ${it.className}`}
            animate={it.still ? undefined : { y: [0, i % 2 ? -5 : 5, 0], rotate: [0, it.spin ?? (i % 2 ? 6 : -6), 0] }}
            transition={{ repeat: Infinity, duration: 4 + (i % 4), ease: 'easeInOut' }}
          >
            <Shape {...(it.props || {})} className="w-full h-auto" />
          </motion.div>
        );
      })}
    </div>
  );
}
