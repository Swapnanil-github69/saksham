import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import AuthModal from './components/AuthModal';
import JobSeekerDashboard from './components/JobSeeker/JobSeekerDashboard';
import './App.css';

export default function App() {
  // 'job-seeker' or 'landing'
  const [currentView, setCurrentView] = useState('job-seeker');
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  return (
    <div className="saksham-app-root">
      {/* Floating Quick View Switcher Toggle for paired exploration */}
      <aside className="global-view-switcher" aria-label="View Switcher">
        <button
          type="button"
          className={`switcher-pill ${currentView === 'job-seeker' ? 'active' : ''}`}
          onClick={() => setCurrentView('job-seeker')}
        >
          🌸 Job Seeker Portal
        </button>
        <button
          type="button"
          className={`switcher-pill ${currentView === 'landing' ? 'active' : ''}`}
          onClick={() => setCurrentView('landing')}
        >
          ✨ Public Landing
        </button>
      </aside>

      {/* View 1: Job Seeker Dashboard */}
      {currentView === 'job-seeker' ? (
        <JobSeekerDashboard 
          onSwitchToLanding={() => setCurrentView('landing')} 
        />
      ) : (
        /* View 2: Public Landing Page */
        <div className="virtu-landing-page">
          {/* Top Navigation */}
          <Navbar 
            onOpenAuth={(mode) => handleOpenAuth(mode)} 
            onBookDemo={() => setCurrentView('job-seeker')}
          />

          {/* Main Hero & Stage Showcase */}
          <main className="main-content">
            <Hero 
              onGetStarted={() => setCurrentView('job-seeker')} 
            />

            {/* Bottom Social Proof Bar */}
            <div className="social-proof-container">
              <SocialProof />
            </div>
          </main>

          {/* Auth / Demo Modal */}
          <AuthModal
            isOpen={authModal.isOpen}
            mode={authModal.mode}
            onClose={handleCloseAuth}
          />
        </div>
      )}
    </div>
  );
}
