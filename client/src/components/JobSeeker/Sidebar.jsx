import React from 'react';

export default function Sidebar({ activeNav = 'jobs', onNavClick }) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      id: 'jobs',
      label: 'Jobs',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      )
    },
    {
      id: 'history',
      label: 'History',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <text x="8.5" y="18" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">17</text>
        </svg>
      )
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
        </svg>
      )
    }
  ];

  return (
    <aside className="js-sidebar">
      {/* Brand Logo */}
      <div className="js-sidebar-brand">
        <div className="js-brand-icon">
          <span className="flower-icon">🌸</span>
        </div>
        <span className="js-brand-text">S.Jobs</span>
      </div>

      {/* Navigation List */}
      <nav className="js-sidebar-nav">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`js-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavClick && onNavClick(item.id)}
            >
              <span className="js-nav-icon">{item.icon}</span>
              <span className="js-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Promo / Workshop Widget */}
      <div className="js-sidebar-workshop-card">
        <div className="workshop-header">
          <h5>Elevated Figma Prototyping</h5>
        </div>
        <div className="workshop-art-row">
          <div className="art-box box-purple">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#a855f7">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"/>
            </svg>
          </div>
          <div className="art-box box-mint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#10b981">
              <rect x="4" y="4" width="16" height="16" rx="3"/>
            </svg>
          </div>
          <div className="art-box box-globe">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
          </div>
        </div>
        <button type="button" className="btn-workshop">
          Join to Workshop
        </button>
      </div>
    </aside>
  );
}
