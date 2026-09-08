import React from 'react';

export default function CategoryTabs({
  activeCategory,
  onCategoryChange,
  counts = { all: 1245, ideal: 132, saved: 13, hidden: 1 },
  viewMode = 'list',
  onViewModeChange
}) {
  const categories = [
    {
      id: 'all',
      title: 'Browse all',
      count: counts.all,
      label: `${counts.all} JOBS`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      )
    },
    {
      id: 'ideal',
      title: 'Ideal Matches',
      count: counts.ideal,
      label: `${counts.ideal} JOBS`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    },
    {
      id: 'saved',
      title: 'Saved',
      count: counts.saved,
      label: `${counts.saved} JOBS`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    {
      id: 'hidden',
      title: 'Hidden',
      count: counts.hidden,
      label: `${counts.hidden} JOB`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </svg>
      )
    }
  ];

  const currentCategoryObj = categories.find(c => c.id === activeCategory) || categories[1];

  return (
    <div className="js-categories-section">
      {/* 4 Category Cards */}
      <div className="js-category-cards-row">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`js-category-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onCategoryChange && onCategoryChange(cat.id)}
            >
              <div className="category-card-header">
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-title">{cat.title}</span>
              </div>
              <span className="cat-count-sub">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Title & View Mode Toggle Row */}
      <div className="js-list-header-row">
        <h3 className="js-active-category-heading">{currentCategoryObj.title}</h3>

        <div className="js-view-mode-toggles">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange && onViewModeChange('list')}
            title="List view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange && onViewModeChange('grid')}
            title="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
