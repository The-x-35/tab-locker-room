import React, { useEffect, useState } from 'react';
import './TabList.css';
import openIcon from '../../public/open.svg';
import closeIcon from '../../public/close.svg';

interface Tab {
  id: number;
  title: string;
  url: string;
  favIconUrl: string;
  locked: boolean;
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
          locked: false,
        }));
        setTabs(formattedTabs);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };

    fetchTabs();
  }, []);

  const toggleLock = (tabId: number) => {
    setTabs(prevTabs =>
      prevTabs.map(tab =>
        tab.id === tabId ? { ...tab, locked: !tab.locked } : tab
      )
    );
  };

  const handleTabClick = (tabId: number) => {
    const tab = tabs.find(t => t.id === tabId);

    if (tab && tab.locked) {
      const password = prompt("Enter password:");
      if (password === "123") {
        chrome.tabs.update(tabId, { active: true });
      } else {
        alert("Incorrect password!");
      }
    } else {
      chrome.tabs.update(tabId, { active: true });
    }
  };

  return (
    <div className="tab-list">
      <ul>
        {tabs.map(tab => (
          <li key={tab.id} onClick={() => handleTabClick(tab.id)}>
            <img 
              src={tab.favIconUrl} 
              style={{ width: '16px', height: '16px', marginRight: '8px' }} 
            />
            <span>
              {tab.title.length > 30 ? `${tab.title.slice(0, 30)}...` : tab.title}
            </span>
            <img 
              src={tab.locked ? closeIcon : openIcon} 
              alt={tab.locked ? "Unlock" : "Lock"} 
              onClick={(e) => {
                e.stopPropagation();
                toggleLock(tab.id);
              }} 
              className='svg-icon'
              style={{ position: 'absolute', right: '8px', cursor: 'pointer', width: '25px', height: '25px' }} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TabList;
