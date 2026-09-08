import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import AuthModal from './components/AuthModal';
import './App.css';

export default function App() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  return (
    <div className="virtu-landing-page">
      {/* Top Navigation */}
      <Navbar 
        onOpenAuth={(mode) => handleOpenAuth(mode)} 
        onBookDemo={() => handleOpenAuth('register')}
      />

      {/* Main Hero & Stage Showcase */}
      <main className="main-content">
        <Hero 
          onGetStarted={() => handleOpenAuth('register')} 
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
  );
}
