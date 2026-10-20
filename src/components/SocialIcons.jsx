import React from 'react';

// Brand glyphs for the contact + footer "Follow Us" rows (lucide no longer ships brand icons)

const icons = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM.5 8h4v16h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.17V24h-4V8z" fill="currentColor" />
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" />
    </g>
  ),
  twitter: (
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" fill="currentColor" />
  ),
  facebook: (
    <path d="M14 8h3V3.5h-3.2C10.2 3.5 9 5.7 9 8.6V11H6.5v4H9v9h4.2v-9h3.1l.5-4h-3.6V9.1c0-.7.3-1.1.8-1.1z" fill="currentColor" />
  ),
  youtube: (
    <path
      fillRule="evenodd"
      fill="currentColor"
      d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.3 15.5 12 9.75 8.7z"
    />
  ),
};

export const SOCIAL_NETWORKS = ['linkedin', 'instagram', 'twitter', 'facebook', 'youtube'];

export function SocialIcon({ name, className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

// Row of round social buttons; `variant` flips between black-on-sky and white-on-black
export function SocialRow({ variant = 'dark', size = 'w-8 h-8' }) {
  const styles =
    variant === 'dark'
      ? 'bg-black text-white hover:bg-[#FF1493]'
      : 'bg-white text-black hover:bg-[#FF1493] hover:text-white';
  return (
    <div className="flex items-center gap-2">
      {SOCIAL_NETWORKS.map((name) => (
        <a
          key={name}
          href="#contact"
          aria-label={name}
          className={`${size} rounded-full flex items-center justify-center transition-colors ${styles}`}
        >
          <SocialIcon name={name} />
        </a>
      ))}
    </div>
  );
}
