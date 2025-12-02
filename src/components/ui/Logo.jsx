import React from 'react';

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
        {/* Bottle shape */}
        <svg viewBox="0 0 48 48" className="w-full h-full">
          {/* Bottle body */}
          <path
            d="M18 8h12v4h2c1 0 2 1 2 2v4c0 1-1 2-2 2h-1l2 20c.5 3-1 6-4 6H21c-3 0-4.5-3-4-6l2-20h-1c-1 0-2-1-2-2v-4c0-1 1-2 2-2h2V8z"
            fill="#00C2D1"
            opacity="0.8"
          />
          {/* Bottle neck */}
          <rect x="20" y="4" width="8" height="6" rx="1" fill="#0A0A0A" />
          {/* Bubbles */}
          <circle cx="22" cy="28" r="2" fill="white" opacity="0.6" />
          <circle cx="28" cy="24" r="1.5" fill="white" opacity="0.5" />
          <circle cx="25" cy="32" r="1" fill="white" opacity="0.4" />
          {/* Cute fish */}
          <g transform="translate(20, 20) rotate(-15)">
            <ellipse cx="6" cy="6" rx="5" ry="3.5" fill="#FF6F61" />
            <path d="M0 6 L-3 3 L-3 9 Z" fill="#FF6F61" />
            <circle cx="8" cy="5" r="1" fill="#0A0A0A" />
            <path d="M4 7 Q6 8 8 7" stroke="#0A0A0A" strokeWidth="0.5" fill="none" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg sm:text-xl tracking-tight" style={{ fontFamily: "'Fredoka', sans-serif", color: '#0A0A0A' }}>
          Tipsy Tank
        </span>
        <span className="text-[10px] sm:text-xs text-gray-500 -mt-1 tracking-wider">BOTTLE AQUARIUMS</span>
      </div>
    </div>
  );
}