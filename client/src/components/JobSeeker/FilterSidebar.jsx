import React, { useState } from 'react';

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters
}) {
  const [activeTab, setActiveTab] = useState('Filter'); // 'Filter' | 'Sort'
  const [toolSearch, setToolSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  const [openSections, setOpenSections] = useState({
    sortingTags: true,
    tools: true,
    keySkills: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const availableTools = [
    { id: 'figma', label: 'Figma', iconColor: '#a259ff', icon: '🎨' },
    { id: 'chatgbt', label: 'Chat GBT', iconColor: '#10a37f', icon: '🤖' },
    { id: 'midjourney', label: 'Midjourney', iconColor: '#1e293b', icon: '⛵' },
    { id: 'webflow', label: 'Webflow', iconColor: '#146ef5', icon: '🌐' },
    { id: 'framer', label: 'Framer', iconColor: '#0055ff', icon: '⚡' },
    { id: 'react', label: 'React / Node.js', iconColor: '#61dafb', icon: '⚛️' }
  ];

  const filteredTools = availableTools.filter(t => 
    t.label.toLowerCase().includes(toolSearch.toLowerCase())
  );

  return (
    <div className="js-filter-column">
      {/* Top Filter / Sort Tabs */}
      <div className="js-filter-tabs">
        <button
          type="button"
          className={`filter-tab-btn ${activeTab === 'Filter' ? 'active' : ''}`}
          onClick={() => setActiveTab('Filter')}
        >
          Filter
        </button>
        <button
          type="button"
          className={`filter-tab-btn ${activeTab === 'Sort' ? 'active' : ''}`}
          onClick={() => setActiveTab('Sort')}
        >
          Sort
        </button>
      </div>

      {/* Section 1: Sorting Tags */}
      <div className="filter-group-card">
        <button 
          type="button" 
          className="filter-group-header"
          onClick={() => toggleSection('sortingTags')}
        >
          <div className="group-title-wrap">
            <span className="group-title">Sorting Tags</span>
            <span className="pink-asterisk">*</span>
          </div>
          <svg 
            className={`chevron-icon ${openSections.sortingTags ? 'rotated' : ''}`} 
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        {openSections.sortingTags && (
          <div className="filter-group-content">
            <label className="checkbox-row">
              <span className="checkbox-label-text">Remote only</span>
              <input
                type="checkbox"
                checked={filters.remoteOnly}
                onChange={(e) => onFilterChange('remoteOnly', e.target.checked)}
                className="custom-checkbox"
              />
              <span className="checkbox-mark">✓</span>
            </label>

            <label className="checkbox-row">
              <span className="checkbox-label-text">Actively hiring</span>
              <input
                type="checkbox"
                checked={filters.activelyHiring}
                onChange={(e) => onFilterChange('activelyHiring', e.target.checked)}
                className="custom-checkbox"
              />
              <span className="checkbox-mark">✓</span>
            </label>
          </div>
        )}
      </div>

      {/* Section 2: Tools */}
      <div className="filter-group-card">
        <button 
          type="button" 
          className="filter-group-header"
          onClick={() => toggleSection('tools')}
        >
          <div className="group-title-wrap">
            <span className="group-title">Tools</span>
            <span className="pink-asterisk">*</span>
          </div>
          <svg 
            className={`chevron-icon ${openSections.tools ? 'rotated-down' : ''}`} 
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>

        {openSections.tools && (
          <div className="filter-group-content">
            {/* Search Tool Input */}
            <div className="filter-search-input-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Find a tool"
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
              />
            </div>

            <div className="tools-checkbox-list">
              {filteredTools.map((tool) => {
                const isChecked = filters.tools?.includes(tool.id);
                return (
                  <label key={tool.id} className="checkbox-row tool-row">
                    <div className="tool-info-left">
                      <span className="tool-icon-badge" style={{ backgroundColor: `${tool.iconColor}15` }}>
                        {tool.icon}
                      </span>
                      <span className="checkbox-label-text">{tool.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const nextTools = isChecked
                          ? filters.tools.filter(id => id !== tool.id)
                          : [...filters.tools, tool.id];
                        onFilterChange('tools', nextTools);
                      }}
                      className="custom-checkbox"
                    />
                    <span className="checkbox-mark">✓</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Key Skills */}
      <div className="filter-group-card">
        <button 
          type="button" 
          className="filter-group-header"
          onClick={() => toggleSection('keySkills')}
        >
          <div className="group-title-wrap">
            <span className="group-title">Key Skills</span>
            <span className="pink-asterisk">*</span>
          </div>
          <svg 
            className={`chevron-icon ${openSections.keySkills ? 'rotated-down' : ''}`} 
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>

        {openSections.keySkills && (
          <div className="filter-group-content">
            <div className="filter-search-input-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Choose your key hard skills"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
              />
            </div>

            <div className="selected-skills-tags">
              {filters.skills?.map((skill, idx) => (
                <span key={idx} className="skill-pill-tag">
                  {skill}
                  <button
                    type="button"
                    className="btn-remove-skill"
                    onClick={() => {
                      onFilterChange('skills', filters.skills.filter(s => s !== skill));
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
