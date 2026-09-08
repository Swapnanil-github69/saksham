import React from 'react';
import {
  PipelineCard,
  ContractorCursor,
  RecruiterCursor,
  ReferralChatCard,
  CandidateCenterpiece,
  EmployeesPill,
  DepartmentCard,
  PaymentsCard
} from './FloatingCards';

export default function Hero({ onGetStarted }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-backdrop-curve"></div>

      <div className="hero-content-wrapper">
        <div className="hero-header-text">
          <h1 className="hero-headline">
            Swift <span className="recruitment-badge">recruitment</span> for
            <br />
            current pace of work
          </h1>

          <p className="hero-subtitle">
            An intelligent hiring platform connecting ambitious talent with leading employers.
            <br />
            Empowering careers, accelerating hiring, and scaling high-impact teams.
          </p>

          <div className="hero-cta-wrap">
            <button 
              type="button" 
              className="btn-get-started"
              onClick={() => onGetStarted && onGetStarted()}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="hero-interactive-stage">
          <div className="stage-element stage-pipeline">
            <PipelineCard />
          </div>

          <div className="stage-element stage-cursor-alex">
            <ContractorCursor />
          </div>

          <div className="stage-element stage-cursor-malik">
            <RecruiterCursor />
          </div>

          <div className="stage-element stage-chat">
            <ReferralChatCard />
          </div>

          <div className="stage-element stage-employees">
            <EmployeesPill />
          </div>

          <div className="stage-element stage-department">
            <DepartmentCard />
          </div>

          <div className="stage-element stage-payments">
            <PaymentsCard />
          </div>

          <div className="stage-element stage-centerpiece">
            <CandidateCenterpiece />
          </div>
        </div>
      </div>
    </section>
  );
}
