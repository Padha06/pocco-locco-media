import React from 'react';

// Scalable Graffiti & Doodle SVGs matching the design mockup

export function DoodleCrown({ className = "w-8 h-8 text-pink-500", ...props }) {
  return (
    <svg 
      viewBox="0 0 100 80" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="7" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <path d="M10 65 L20 20 L45 45 L50 15 L55 45 L80 20 L90 65 Z" />
    </svg>
  );
}

export function DoodleStar({ className = "w-7 h-7 text-yellow-400 fill-yellow-400", ...props }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <polygon points="50,5 64,36 98,38 72,61 80,95 50,76 20,95 28,61 2,38 36,36" />
    </svg>
  );
}

export function DoodleArrow({ className = "w-12 h-12 text-black", ...props }) {
  return (
    <svg 
      viewBox="0 0 100 60" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <path d="M10 50 Q 50 10, 85 25" />
      <path d="M70 15 L88 25 L75 40" />
    </svg>
  );
}

export function DoodleCurlyArrow({ className = "w-16 h-16 text-black", ...props }) {
  return (
    <svg 
      viewBox="0 0 120 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <path d="M20 80 Q 50 100, 70 75 T 60 40 T 90 20" />
      <path d="M75 15 L95 20 L88 38" />
    </svg>
  );
}

export function DoodleSparkle({ className = "w-6 h-6 text-pink-400", ...props }) {
  return (
    <svg 
      viewBox="0 0 60 60" 
      fill="currentColor" 
      className={className} 
      {...props}
    >
      <path d="M30 0 Q 30 30, 60 30 Q 30 30, 30 60 Q 30 30, 0 30 Q 30 30, 30 0 Z" />
    </svg>
  );
}

export function PaintSplatter({ color = "#FF1B7A", className = "w-24 h-24", ...props }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill={color} 
      className={className} 
      {...props}
    >
      <circle cx="60" cy="60" r="32" opacity="0.9" />
      <circle cx="95" cy="45" r="12" />
      <circle cx="30" cy="85" r="14" />
      <circle cx="85" cy="85" r="10" />
      <circle cx="35" cy="35" r="16" />
      <circle cx="65" cy="18" r="8" />
      <circle cx="60" cy="102" r="9" />
      <circle cx="105" cy="70" r="5" />
      <circle cx="15" cy="55" r="6" />
    </svg>
  );
}
