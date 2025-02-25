import { useState } from "react";

const TabbedSections = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabbed-section">
      <div className="tab-buttons">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={activeTab === i ? "active" : ""}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabbedSections;
