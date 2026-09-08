import React from 'react';

export default function JobList({
  companiesData,
  savedJobIds = [],
  onToggleSave,
  onOpenApply
}) {
  return (
    <div className="js-job-list-container">
      {companiesData.map((company) => (
        <div key={company.id} className="js-company-group-card">
          {/* Company Header */}
          <div className="company-group-header">
            <div className="company-info-row">
              {/* Logo */}
              <div className="company-logo-frame">
                {company.logoSvg ? (
                  company.logoSvg
                ) : (
                  <div className="company-default-logo" style={{ backgroundColor: company.logoBg || '#0f172a' }}>
                    {company.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Title & Badge */}
              <div className="company-title-wrap">
                <div className="name-and-badge">
                  <h4 className="company-name">{company.name}</h4>
                  {company.activelyHiring && (
                    <span className="badge-actively-hiring">ACTIVELY HIRING</span>
                  )}
                </div>
                <p className="company-tagline">{company.description}</p>
              </div>

              {/* Company Meta on Right */}
              <div className="company-meta-right">
                <span className="company-type-size">
                  {company.category} • {company.size}
                </span>
                <button type="button" className="btn-more-options" title="More options">
                  •••
                </button>
              </div>
            </div>
          </div>

          {/* Job Rows under this Company */}
          <div className="company-jobs-list">
            {company.jobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);

              return (
                <div key={job.id} className="js-job-card-row">
                  {/* Left: Title & Metadata */}
                  <div className="job-details-left">
                    <h5 className="job-role-title">{job.title}</h5>

                    <div className="job-tags-meta">
                      {/* Location */}
                      <span className="job-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        {job.location}
                      </span>

                      {/* Remote badge */}
                      {job.isRemote && (
                        <span className="job-meta-item remote-badge">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.93 4.93a10 10 0 0 1 14.14 0"/>
                            <path d="M7.76 7.76a6 6 0 0 1 8.48 0"/>
                            <circle cx="12" cy="12" r="2"/>
                          </svg>
                          Remote only
                        </span>
                      )}

                      {/* Salary */}
                      {job.salary && (
                        <span className="job-meta-item salary-badge">
                          <span className="salary-pill-icon">$</span>
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Posted time, Bookmark, Apply Button */}
                  <div className="job-actions-right">
                    <span className="job-posted-time">{job.postedTime}</span>

                    <button
                      type="button"
                      className={`btn-bookmark-job ${isSaved ? 'saved' : ''}`}
                      onClick={() => onToggleSave && onToggleSave(job.id)}
                      title={isSaved ? 'Remove from saved' : 'Save job'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? '#09090b' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="btn-apply-job"
                      onClick={() => onOpenApply && onOpenApply(job, company)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
