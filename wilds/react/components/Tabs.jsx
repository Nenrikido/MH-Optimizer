import React, { useState } from 'react';
import ResultsTab from './ResultsTab';
import AmuletBadgeList from './AmuletBadgeList';
import AddAmuletButton from './AddAmuletButton';
import TemplatesTab from './TemplatesTab';

function Tabs({ results, amulets, setAmulets, availableSkills }) {
  const [activeTab, setActiveTab] = useState('results');

  const handleAddAmulet = () => {
    setAmulets([
      ...amulets,
      { skills: [], slots: '' }
    ]);
  };

  return (
    <aside className="container p-3" style={{ minWidth: '40vw' }}>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className={`nav-link${activeTab === 'results' ? ' active' : ''}`}
            id="nav-results-tab"
            type="button"
            role="tab"
            aria-controls="nav-results"
            aria-selected={activeTab === 'results'}
            onClick={() => setActiveTab('results')}
          >
            Results
          </button>
          <button
            className={`nav-link${activeTab === 'filters' ? ' active' : ''}`}
            id="nav-filters-tab"
            type="button"
            role="tab"
            aria-controls="nav-filters"
            aria-selected={activeTab === 'filters'}
            onClick={() => setActiveTab('filters')}
          >
            Filters
          </button>
          <button
            className="nav-link"
            id="nav-templates-tab"
            type="button"
            role="tab"
            aria-controls="nav-templates"
            aria-selected="false"
            disabled
          >
            Templates (WIP)
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className={`tab-pane card card-body${activeTab === 'results' ? ' show active' : ''}`}
          id="nav-results"
          role="tabpanel"
          aria-labelledby="nav-results-tab"
          tabIndex={0}
        >
          <ResultsTab results={results} />
        </div>
        <div
          className={`tab-pane card card-body${activeTab === 'filters' ? ' show active' : ''}`}
          id="nav-filters"
          role="tabpanel"
          aria-labelledby="nav-filters-tab"
          tabIndex={0}
        >
          <h4>Amulets</h4>
          <AmuletBadgeList amulets={amulets} setAmulets={setAmulets} availableSkills={availableSkills} />
          <AddAmuletButton onAdd={handleAddAmulet} />
        </div>
        <div
          className="tab-pane card card-body"
          id="nav-templates"
          role="tabpanel"
          aria-labelledby="nav-templates-tab"
          tabIndex={0}
        >
          <TemplatesTab />
        </div>
      </div>
    </aside>
  );
}

export default Tabs;
