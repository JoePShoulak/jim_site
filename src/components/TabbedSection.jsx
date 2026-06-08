import { useState } from "react";
import Modal from "./Modal";

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

const TabContent = ({ content, img, imgAlt, className }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const ModalLink = ({ item }) => (
    <p>
      <a onClick={() => setSelectedItem(item)} className={className}>
        {item.title}
      </a>
    </p>
  );

  return (
    <div className="two-column-content">
      <div className="column">
        {content.map((item, i) => (
          <ModalLink key={i} item={item} />
        ))}
      </div>
      <div className="column">
        <img src={img} alt={imgAlt} />
      </div>
      {selectedItem && (
        <Modal title={selectedItem.title} onClose={() => setSelectedItem(null)}>
          <p>{selectedItem.content}</p>
        </Modal>
      )}
    </div>
  );
};

export { TabbedSections, TabContent };
