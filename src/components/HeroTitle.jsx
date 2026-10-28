import React from 'react';

// "We Turn Traffic Into Results" rebuilt as vector art. The original was a 642px image,
// which went soft on phones and Retina screens; SVG text stays sharp at any size.
// Coordinates follow the client artwork (642 x 335) so the layout matches it exactly.

const PINK = '#F05B93';
const YELLOW = '#FCD226';

function StarShape({ cx, cy, r, rotate = 0 }) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.47;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return (
    <polygon
      points={pts.join(' ')}
      fill={YELLOW}
      stroke="#111"
      strokeWidth="3"
      strokeLinejoin="round"
      transform={`rotate(${rotate} ${cx} ${cy})`}
    />
  );
}

export default function HeroTitle({ className = '' }) {
  const heavy = { fontFamily: "'Montserrat', 'Arial Black', sans-serif", fontWeight: 900 };

  return (
    <h1 aria-label="Performance marketing network. We turn traffic into results." className={className}>
      <svg viewBox="0 0 642 335" className="w-full h-auto overflow-visible" aria-hidden="true">
        {/* Doodles */}
        <StarShape cx={35} cy={72} r={23} rotate={-8} />
        <StarShape cx={30} cy={181} r={30} rotate={12} />
        <path
          d="M512 70 L506 22 L532 44 L552 8 L566 46 L598 26 L590 74 Z"
          fill="none"
          stroke={PINK}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          transform="rotate(-6 552 45)"
        />
        <g fill="none" stroke="#111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M518 196 L634 134" />
          <path d="M618 130 L636 133 L628 150" />
          <path d="M600 158 C 572 172, 590 186, 566 196 C 548 204, 560 216, 528 222" />
          <path d="M540 212 L524 223 L540 230" />
        </g>

        {/* Yellow highlighter behind RESULTS */}
        <path d="M304 238 L636 232 L632 330 L300 334 Z" fill={YELLOW} />

        {/* Copy */}
        <text x="92" y="58" textLength="378" lengthAdjust="spacingAndGlyphs" fontSize="25" fill="#111" style={heavy}>
          PERFORMANCE MARKETING NETWORK
        </text>
        <text x="92" y="142" textLength="340" lengthAdjust="spacingAndGlyphs" fontSize="94" fill="#111" style={heavy}>
          WE TURN
        </text>
        <text x="94" y="236" textLength="378" lengthAdjust="spacingAndGlyphs" fontSize="94" fill={PINK} style={heavy}>
          TRAFFIC
        </text>
        <text x="98" y="322" textLength="201" lengthAdjust="spacingAndGlyphs" fontSize="90" fill="#111" style={heavy}>
          INTO
        </text>
        <text x="318" y="318" textLength="304" lengthAdjust="spacingAndGlyphs" fontSize="86" fill="#111" style={heavy}>
          RESULTS
        </text>
      </svg>
    </h1>
  );
}
