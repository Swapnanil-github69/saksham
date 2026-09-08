import React from 'react';
import { LoomLogo, HubSpotLogo, RampLogo, StarIcon } from '../assets/icons';
import { AVATARS } from '../assets/avatars';

export default function SocialProof() {
  return (
    <div className="social-proof-bar">
      <div className="trusted-by-group">
        <span className="trusted-label">Trusted by fast-growing companies</span>
        <div className="trusted-logos">
          <div className="logo-item" title="Loom">
            <LoomLogo className="brand-svg" />
          </div>
          <div className="logo-item" title="HubSpot">
            <HubSpotLogo className="brand-svg" />
          </div>
          <div className="logo-item" title="Ramp">
            <RampLogo className="brand-svg" />
          </div>
        </div>
      </div>

      <div className="rating-proof-group">
        <div className="avatar-stack">
          {AVATARS.reviews.map((url, idx) => (
            <img 
              key={idx} 
              src={url} 
              alt="Reviewer avatar" 
              className="stack-avatar-img" 
              style={{ zIndex: 10 - idx }} 
            />
          ))}
        </div>

        <div className="rating-info">
          <div className="stars-row">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <span className="rating-score">4.9</span>
          </div>
          <span className="rating-count">from 500+ verified reviews</span>
        </div>
      </div>
    </div>
  );
}
