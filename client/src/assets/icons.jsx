import React from 'react';

// Loom Logo SVG
export const LoomLogo = ({ className = 'h-6' }) => (
  <svg className={className} viewBox="0 0 120 32" fill="currentColor">
    {/* Asterisk / flower icon */}
    <g transform="translate(4, 2) scale(0.9)">
      <circle cx="14" cy="14" r="3.5" fill="#1e293b" />
      <circle cx="14" cy="4" r="2.8" fill="#1e293b" />
      <circle cx="21" cy="7" r="2.8" fill="#1e293b" />
      <circle cx="24" cy="14" r="2.8" fill="#1e293b" />
      <circle cx="21" cy="21" r="2.8" fill="#1e293b" />
      <circle cx="14" cy="24" r="2.8" fill="#1e293b" />
      <circle cx="7" cy="21" r="2.8" fill="#1e293b" />
      <circle cx="4" cy="14" r="2.8" fill="#1e293b" />
      <circle cx="7" cy="7" r="2.8" fill="#1e293b" />
    </g>
    <text x="36" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="19" fontWeight="700" letterSpacing="-0.5px" fill="#1e293b">
      loom
    </text>
  </svg>
);

// HubSpot Logo SVG
export const HubSpotLogo = ({ className = 'h-6' }) => (
  <svg className={className} viewBox="0 0 130 32" fill="currentColor">
    <text x="0" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="19" fontWeight="700" letterSpacing="-0.5px" fill="#1e293b">
      HubSp
    </text>
    {/* Sprocket 'o' */}
    <circle cx="72" cy="16" r="6" stroke="#1e293b" strokeWidth="3" fill="none" />
    <circle cx="72" cy="7" r="2.2" fill="#1e293b" />
    <line x1="72" y1="9" x2="72" y2="12" stroke="#1e293b" strokeWidth="2.5" />
    <circle cx="80" cy="14" r="1.8" fill="#1e293b" />
    <line x1="77" y1="15" x2="79" y2="14.5" stroke="#1e293b" strokeWidth="2" />
    <text x="82" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="19" fontWeight="700" letterSpacing="-0.5px" fill="#1e293b">
      t
    </text>
  </svg>
);

// Ramp Logo SVG
export const RampLogo = ({ className = 'h-6' }) => (
  <svg className={className} viewBox="0 0 110 32" fill="currentColor">
    <text x="0" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="19" fontWeight="700" letterSpacing="-0.5px" fill="#1e293b">
      ramp
    </text>
    {/* Minimalist ramp angle icon */}
    <g transform="translate(68, 8)">
      <path d="M 0 14 C 8 14, 15 10, 18 0" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M 7 14 C 13 14, 18 11, 21 4" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" fill="none" opacity="0.8" />
    </g>
  </svg>
);

// Star Icon for Reviews
export const StarIcon = ({ fill = '#f59e0b', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={fill} strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Verified Checkmark Badge (Blue circle with white tick)
export const VerifiedCheck = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#3b82f6" />
    <path d="M8 12.2l2.6 2.6L16 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Notification Bell Icon with ring and badge
export const BellBadge = () => (
  <div className="bell-badge-container">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
    <span className="bell-indicator"></span>
  </div>
);
