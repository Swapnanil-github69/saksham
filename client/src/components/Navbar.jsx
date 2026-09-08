import React from 'react';

export default function Navbar({ onOpenAuth, onBookDemo }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="brand-logo">
            Saksham
          </a>
        </div>

        <nav className="navbar-nav">
          <ul className="nav-list">
            <li><button type="button" onClick={onBookDemo} className="nav-link active">Find Jobs</button></li>
            <li><button type="button" onClick={onBookDemo} className="nav-link">Companies</button></li>
            <li><a href="#how-it-works" className="nav-link">How it works</a></li>
            <li><button type="button" onClick={() => onOpenAuth && onOpenAuth('register')} className="nav-link">For Employers</button></li>
          </ul>
        </nav>

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
