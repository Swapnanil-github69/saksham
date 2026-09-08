import React from 'react';

export default function Navbar({ onOpenAuth, onBookDemo }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <a href="/" className="brand-logo">
            Saksham
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <ul className="nav-list">
            <li><a href="#jobs" className="nav-link active">Find Jobs</a></li>
            <li><a href="#companies" className="nav-link">Companies</a></li>
            <li><a href="#how-it-works" className="nav-link">How it works</a></li>
            <li><a href="#employers" className="nav-link">For Employers</a></li>
          </ul>
        </nav>

        {/* Right CTA Actions */}
        <div className="navbar-actions">
          <button 
            type="button" 
            className="btn-signin"
            onClick={() => onOpenAuth && onOpenAuth('login')}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className="btn-pill-dark"
            onClick={() => onBookDemo ? onBookDemo() : (onOpenAuth && onOpenAuth('register'))}
          >
            Post a Job
          </button>
        </div>
      </div>
    </header>
  );
}
