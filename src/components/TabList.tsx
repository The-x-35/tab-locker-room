import React, { useEffect, useState } from 'react';
import './TabList.css'; 

interface Tab {
  id: number;
  title: string;
  url: string;
  favIconUrl: string; 
}

const TabList: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const fetchedTabs = await chrome.tabs.query({ currentWindow: true });
        const formattedTabs = fetchedTabs.map(tab => ({
          id: tab.id!,
          title: tab.title || 'Untitled Tab',
          url: tab.url || '',
          favIconUrl: tab.favIconUrl || '', 
        }));
        setTabs(formattedTabs);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };

    fetchTabs();
  }, []);

  const handleTabClick = (tabId: number) => {
    chrome.tabs.update(tabId, { active: true });
  };

  return (
    <div className="tab-list">
      <ul>
        {tabs.map(tab => (
          <li key={tab.id} onClick={() => handleTabClick(tab.id)}>
            <img 
              src={tab.favIconUrl} 
              alt={`${tab.title} favicon`} 
              style={{ width: '16px', height: '16px', marginRight: '8px' }} 
            />
            <span>
              {tab.title.length > 30 ? `${tab.title.slice(0, 30)}...` : tab.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TabList;
