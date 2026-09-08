import React, { useState } from 'react';
import { AVATARS } from '../../assets/avatars';

export default function TopHeader({ onSwitchToLanding }) {
  const [status, setStatus] = useState('READY TO INTERVIEW');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statuses = [
    { label: 'READY TO INTERVIEW', color: '#10b981' },
    { label: 'OPEN TO OFFERS', color: '#f59e0b' },
    { label: 'NOT ACTIVELY LOOKING', color: '#64748b' }
  ];

  const currentStatusObj = statuses.find(s => s.label === status) || statuses[0];

  return (
    <header className="js-top-header">
      {/* Left: Date & Status Pill */}
      <div className="js-header-left">
        <span className="js-header-date">Friday, 23 August</span>

        <div className="js-status-dropdown-wrapper">
          <button
            type="button"
            className="js-status-pill-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span 
              className="status-dot-indicator" 
              style={{ backgroundColor: currentStatusObj.color }}
            />
            <span className="status-label-text">{status}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="js-status-dropdown-menu">
              {statuses.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`js-status-dropdown-item ${status === item.label ? 'selected' : ''}`}
                  onClick={() => {
                    setStatus(item.label);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className="status-dot-indicator" style={{ backgroundColor: item.color }} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Landing toggle, Notifications, User Avatar */}
      <div className="js-header-right">
        {onSwitchToLanding && (
          <button
            type="button"
            className="btn-back-landing"
            onClick={onSwitchToLanding}
            title="View Public Landing Page"
          >
            ← View Landing Page
          </button>
        )}

        <button type="button" className="js-notifications-btn">
          <span className="notification-bell-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="bell-glow-star">🌸</span>
          </span>
          <span className="notification-label">Notifications</span>
        </button>

        <div className="js-user-avatar-frame" title="Jane Seeker">
          <img src={AVATARS.olivia} alt="User Avatar" className="js-user-avatar-img" />
        </div>
      </div>
    </header>
  );
}
