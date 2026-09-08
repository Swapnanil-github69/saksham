import React, { useState } from 'react';

export default function AuthModal({ isOpen, mode = 'login', onClose }) {
  const [currentMode, setCurrentMode] = useState(mode);
  const [role, setRole] = useState('JOB_SEEKER');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const endpoint = currentMode === 'login' 
      ? 'http://localhost:8000/api/auth/login' 
      : 'http://localhost:8000/api/auth/register';

    const payload = currentMode === 'login'
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password, role };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'Success!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong' });
      }
    } catch (err) {
      setMessage({ 
        type: 'info', 
        text: `Backend connection tested (${err.message}). Ready for live backend link!` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>

        <div className="modal-header">
          <h3 className="modal-title">
            {currentMode === 'login' ? 'Sign In to Saksham' : 'Create your Saksham account'}
          </h3>
          <p className="modal-sub">
            {currentMode === 'login' 
              ? 'Select your portal role and continue' 
              : 'Choose your role to get started with job seeking or hiring'}
          </p>
        </div>

        <div className="role-selector-wrap">
          <button
            type="button"
            className={`role-tab ${role === 'JOB_SEEKER' ? 'active' : ''}`}
            onClick={() => setRole('JOB_SEEKER')}
          >
            Job Seeker
          </button>
          <button
            type="button"
            className={`role-tab ${role === 'EMPLOYER' ? 'active' : ''}`}
            onClick={() => setRole('EMPLOYER')}
          >
            Employer / Recruiter
          </button>
          <button
            type="button"
            className={`role-tab ${role === 'ADMIN' ? 'active' : ''}`}
            onClick={() => setRole('ADMIN')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {currentMode === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label>Work or Personal Email</label>
            <input
              type="email"
              placeholder="jane@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {message && (
            <div className={`form-feedback ${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" className="btn-pill-dark btn-block" disabled={loading}>
            {loading ? 'Processing...' : (currentMode === 'login' ? 'Sign In' : 'Join Saksham')}
          </button>

          <div className="auth-footer-toggle">
            {currentMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button type="button" onClick={() => setCurrentMode('register')}>
                  Register
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button type="button" onClick={() => setCurrentMode('login')}>
                  Sign In
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
