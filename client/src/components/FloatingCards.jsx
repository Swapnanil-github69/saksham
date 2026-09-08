import React from 'react';
import { AVATARS } from '../assets/avatars';
import { BellBadge, VerifiedCheck } from '../assets/icons';

export const PipelineCard = () => (
  <div className="floating-card pipeline-card">
    <div className="pipeline-header">
      <div className="pipeline-user">
        <div className="avatar-ring-sm">
          <img src={AVATARS.olivia} alt="Olivia Wouters" className="avatar-img-sm" />
        </div>
        <div className="pipeline-meta">
          <h4>Olivia Wouters</h4>
          <span>Product Designer</span>
        </div>
      </div>
      <span className="badge-in-progress">In Review</span>
    </div>

    <div className="pipeline-stepper">
      <div className="stepper-track">
        <div className="stepper-fill"></div>
      </div>
      <div className="stepper-nodes">
        <div className="stepper-node completed">
          <span className="node-dot"></span>
          <div className="node-label">
            <strong>Applied</strong>
            <small>Jul 12</small>
          </div>
        </div>
        <div className="stepper-node completed">
          <span className="node-dot"></span>
          <div className="node-label">
            <strong>Reviewing</strong>
            <small>Jul 14</small>
          </div>
        </div>
        <div className="stepper-node upcoming">
          <span className="node-dot"></span>
          <div className="node-label">
            <span>Shortlist</span>
          </div>
        </div>
        <div className="stepper-node upcoming">
          <span className="node-dot"></span>
          <div className="node-label">
            <span>Offered</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ContractorCursor = () => (
  <div className="cursor-tag-wrapper cursor-alex">
    <div className="cursor-tag-box cyan-tag">
      <div className="cursor-text">
        <span className="cursor-name">Alex Jhordan</span>
        <span className="cursor-role">Job Seeker</span>
      </div>
      <div className="cursor-pointer-triangle cyan-triangle"></div>
    </div>
    <div className="cursor-avatar-wrap">
      <img src={AVATARS.alex} alt="Alex Jhordan" className="cursor-avatar-img" />
    </div>
  </div>
);

export const RecruiterCursor = () => (
  <div className="cursor-tag-wrapper cursor-malik">
    <div className="cursor-avatar-wrap">
      <img src={AVATARS.malik} alt="Malik Grotesk" className="cursor-avatar-img" />
    </div>
    <div className="cursor-tag-box coral-tag">
      <div className="cursor-text">
        <span className="cursor-name">Malik Grotesk</span>
        <span className="cursor-role">Recruiter</span>
      </div>
      <div className="cursor-pointer-triangle coral-triangle"></div>
    </div>
  </div>
);

export const ReferralChatCard = () => (
  <div className="floating-card chat-referral-card">
    <div className="chat-avatar-wrap">
      <img src={AVATARS.natalie} alt="Natalie Monet" className="chat-avatar-img" />
    </div>
    <div className="chat-body">
      <h5 className="chat-sender">Natalie Monet</h5>
      <p className="chat-message">
        Hey, we matched 3 top candidates for your open role!
      </p>
      <span className="chat-time">11:26 AM</span>
    </div>
  </div>
);

export const CandidateCenterpiece = () => (
  <div className="floating-card candidate-modal-card">
    <div className="bell-badge-floating">
      <BellBadge />
    </div>

    <div className="candidate-header">
      <div className="candidate-avatar-frame">
        <img src={AVATARS.olivia} alt="Olivia Wouters" className="candidate-avatar-img" />
      </div>
      <div className="candidate-info">
        <h3 className="candidate-name">Olivia Wouters</h3>
        <p className="candidate-title">Senior Product Designer</p>
      </div>
      <div className="referral-pill">
        <span className="flame-emoji">🔥</span>
        <div className="referral-text">
          <span className="referral-strong">98% Match</span>
          <span className="referral-sub">Saksham AI</span>
        </div>
      </div>
    </div>

    <div className="candidate-tags-row">
      <span className="meta-tag">Full Time</span>
      <span className="meta-tag">Senior Level</span>
      <span className="meta-tag">Remote / Hybrid</span>
    </div>

    <div className="candidate-description-box">
      <span className="desc-label">Candidate Bio</span>
      <p className="desc-content">
        Product Designer with 6+ years building design systems, intuitive UI architectures, and enterprise user experiences.
      </p>
    </div>
  </div>
);

export const EmployeesPill = () => (
  <div className="floating-card employees-stat-pill">
    <div className="employee-icon-wrap">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    </div>
    <div className="employees-meta">
      <div className="emp-count"><strong>1,250+</strong> Active Jobs</div>
      <span className="emp-sub">+48 posted today</span>
    </div>
  </div>
);

export const DepartmentCard = () => (
  <div className="floating-card department-card">
    <h5 className="department-title">Top Sectors</h5>
    <div className="donut-chart-wrap">
      <svg width="68" height="68" viewBox="0 0 36 36" className="donut-chart-svg">
        <circle cx="18" cy="18" r="13" fill="transparent" stroke="#f1f5f9" strokeWidth="5.5" />
        <circle cx="18" cy="18" r="13" fill="transparent" stroke="#2563eb" strokeWidth="5.5"
          strokeDasharray="45 100" strokeDashoffset="25" />
        <circle cx="18" cy="18" r="13" fill="transparent" stroke="#f97316" strokeWidth="5.5"
          strokeDasharray="25 100" strokeDashoffset="80" />
        <circle cx="18" cy="18" r="13" fill="transparent" stroke="#06b6d4" strokeWidth="5.5"
          strokeDasharray="15 100" strokeDashoffset="55" />
      </svg>
    </div>
  </div>
);

export const PaymentsCard = () => {
  const placementRows = [
    { name: 'Olivia Wouters', role: 'Product Designer', amount: '$120,000', avatar: AVATARS.olivia },
    { name: 'Patrícia Costa', role: 'Copywriter Lead', amount: '$75,000', avatar: AVATARS.patricia },
    { name: 'Samantha Fox', role: 'Growth Marketer', amount: '$95,000', avatar: AVATARS.samantha },
    { name: 'Alberto Gil', role: 'Full Stack Dev', amount: '$140,000', avatar: AVATARS.alberto },
  ];

  return (
    <div className="floating-card payments-table-card">
      <div className="payments-header">
        <span className="payments-title">Recent Placements</span>
        <button type="button" className="btn-view-all">View all</button>
      </div>
      <div className="payments-list">
        {placementRows.map((row, i) => (
          <div key={i} className="payment-row">
            <div className="row-user-info">
              <img src={row.avatar} alt={row.name} className="row-avatar" />
              <div className="row-names">
                <span className="row-name">{row.name}</span>
                <span className="row-role">{row.role}</span>
              </div>
            </div>
            <div className="row-amount-wrap">
              <span className="row-amount">{row.amount}</span>
              <VerifiedCheck size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
