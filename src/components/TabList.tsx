import React, { useEffect, useState } from 'react';

interface Tab {
  id: number;
  title: string;
  url: string;
}

const TabList: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        // Get all the open tabs
        const fetchedTabs = await chrome.tabs.query({ currentWindow: true });
        const formattedTabs = fetchedTabs.map(tab => ({
          id: tab.id!,
          title: tab.title || 'Untitled Tab',
          url: tab.url || '',
        }));
        setTabs(formattedTabs);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };

    fetchTabs();
  }, []);

  return (
    <div className="tab-list">
      <ul>
        {tabs.map(tab => (
          <li key={tab.id}>
            <a href={tab.url} target="_blank" rel="noopener noreferrer">
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TabList;
