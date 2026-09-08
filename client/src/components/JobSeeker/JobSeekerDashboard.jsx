import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import FilterSidebar from './FilterSidebar';
import CategoryTabs from './CategoryTabs';
import JobList from './JobList';
import ApplyModal from './ApplyModal';
import '../../styles/jobseeker.css';

// SVG Logos matching reference mockup
const CatalogLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#09090b" />
    <path d="M26 14C23.5 12 17 12 14.5 16C12 20 13 25 17 27C21 29 25.5 26.5 26.5 24.5" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round"/>
  </svg>
);

const HeightLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    {/* Colorful isometric folded ribbon */}
    <g transform="translate(6, 4) scale(0.9)">
      <path d="M16 2L28 14L16 26L4 14Z" fill="url(#height-grad1)" />
      <path d="M4 14L16 26L16 34L4 22Z" fill="#a855f7" />
      <path d="M16 26L28 14L28 22L16 34Z" fill="#3b82f6" />
    </g>
    <defs>
      <linearGradient id="height-grad1" x1="4" y1="2" x2="28" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f43f5e" />
        <stop offset="0.5" stopColor="#a855f7" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

const TechCorpLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="#0284c7" />
    <path d="M12 20L20 12L28 20L20 28Z" fill="#ffffff" />
    <circle cx="20" cy="20" r="3" fill="#0284c7" />
  </svg>
);

export default function JobSeekerDashboard({ onSwitchToLanding }) {
  const [activeNav, setActiveNav] = useState('jobs');
  const [activeCategory, setActiveCategory] = useState('ideal');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobIds, setSavedJobIds] = useState(['job-catalog-1', 'job-height-1']);

  const [applyModal, setApplyModal] = useState({
    isOpen: false,
    job: null,
    company: null
  });

  const [filters, setFilters] = useState({
    remoteOnly: true,
    activelyHiring: true,
    tools: ['figma', 'chatgbt', 'midjourney', 'webflow', 'framer'],
    skills: ['User Interface']
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleToggleSave = (jobId) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId]
    );
  };

  const handleOpenApply = (job, company) => {
    setApplyModal({ isOpen: true, job, company });
  };

  // Job data matching screenshot layout & backend models
  const initialCompanies = [
    {
      id: 'comp-catalog',
      name: 'Catalog',
      logoSvg: <CatalogLogo />,
      activelyHiring: true,
      category: 'DESIGN AGENCY',
      size: '1-10 EMPLOYEES',
      description: 'Unlimited design services for early stage startups',
      jobs: [
        {
          id: 'job-catalog-1',
          title: 'Brand Designer',
          location: 'Toronto',
          isRemote: true,
          salary: '50k - 80k',
          postedTime: 'POSTED 1 HOUR AGO',
          tags: ['Figma', 'Brand Design']
        },
        {
          id: 'job-catalog-2',
          title: 'Design Director',
          location: 'New York',
          isRemote: true,
          salary: '150k - 180k',
          postedTime: 'POSTED 1 HOUR AGO',
          tags: ['Creative Direction', 'Figma']
        }
      ]
    },
    {
      id: 'comp-height',
      name: 'Height',
      logoSvg: <HeightLogo />,
      activelyHiring: true,
      category: 'PRODUCT COMPANY',
      size: '51-200 EMPLOYEES',
      description: 'All-in-one project management tool',
      jobs: [
        {
          id: 'job-height-1',
          title: 'Pre PMF-Product Designer',
          location: 'Los Angeles',
          isRemote: true,
          salary: '180k - 250k',
          postedTime: 'POSTED 1 HOUR AGO',
          tags: ['Product Design', 'Prototyping']
        },
        {
          id: 'job-height-2',
          title: 'Senior Frontend Engineer',
          location: 'San Francisco',
          isRemote: true,
          salary: '160k - 210k',
          postedTime: 'POSTED 3 HOURS AGO',
          tags: ['React', 'TypeScript', 'Tailwind']
        }
      ]
    },
    {
      id: 'comp-techcorp',
      name: 'TechCorp Solutions',
      logoSvg: <TechCorpLogo />,
      activelyHiring: true,
      category: 'ENTERPRISE TECH',
      size: '500+ EMPLOYEES',
      description: 'Next-generation cloud infrastructure and hiring software',
      jobs: [
        {
          id: 'job-techcorp-1',
          title: 'Lead Full-Stack Architect',
          location: 'New York',
          isRemote: true,
          salary: '190k - 240k',
          postedTime: 'POSTED 4 HOURS AGO',
          tags: ['Node.js', 'React', 'MongoDB']
        }
      ]
    }
  ];

  // Filter jobs based on category tab & search query
  const filteredCompanies = initialCompanies.map(comp => {
    const matchingJobs = comp.jobs.filter(job => {
      // Filter by category
      if (activeCategory === 'saved' && !savedJobIds.includes(job.id)) {
        return false;
      }
      if (activeCategory === 'hidden') {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesComp = comp.name.toLowerCase().includes(q);
        const matchesLoc = job.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesComp && !matchesLoc) return false;
      }
      // Filter by remote
      if (filters.remoteOnly && !job.isRemote) {
        return false;
      }
      return true;
    });

    return { ...comp, jobs: matchingJobs };
  }).filter(comp => comp.jobs.length > 0);

  return (
    <div className="js-ambient-canvas">
      {/* Elevated Master Frame with Rounded Corners */}
      <div className="js-master-frame">
        {/* Left Sidebar */}
        <Sidebar 
          activeNav={activeNav} 
          onNavClick={(navId) => setActiveNav(navId)} 
        />

        {/* Main Content Area */}
        <div className="js-main-area">
          {/* Top Header */}
          <TopHeader onSwitchToLanding={onSwitchToLanding} />

          {/* Search Header Bar */}
          <div className="js-search-header-container">
            <div className="search-title-and-bar">
              <h2 className="js-page-title">Search for jobs</h2>
              <div className="js-quick-search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="btn-clear-search" 
                    onClick={() => setSearchQuery('')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Two-Column Body: Filter on Left, Jobs on Right */}
          <div className="js-body-grid">
            {/* Left Filter & Sort Column */}
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={() => setFilters({
                remoteOnly: false,
                activelyHiring: false,
                tools: [],
                skills: []
              })}
            />

            {/* Right Job Content Column */}
            <div className="js-content-column">
              {/* Top 4 Horizontal Category Cards */}
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={(catId) => setActiveCategory(catId)}
                counts={{
                  all: 1245,
                  ideal: 132,
                  saved: savedJobIds.length,
                  hidden: 1
                }}
                viewMode={viewMode}
                onViewModeChange={(mode) => setViewMode(mode)}
              />

              {/* Job Listings List */}
              <JobList
                companiesData={filteredCompanies}
                savedJobIds={savedJobIds}
                onToggleSave={handleToggleSave}
                onOpenApply={handleOpenApply}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Apply to Job Modal */}
      <ApplyModal
        isOpen={applyModal.isOpen}
        job={applyModal.job}
        company={applyModal.company}
        onClose={() => setApplyModal({ isOpen: false, job: null, company: null })}
      />
    </div>
  );
}
