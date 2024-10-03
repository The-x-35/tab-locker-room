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
        const { tabLocks } = await chrome.storage.local.get('tabLocks') || {};
        const formattedTabs = fetchedTabs
          .filter(tab => tab.url && !tab.url.startsWith('chrome://'))
          .map(tab => ({
            id: tab.id!,
            title: tab.title || 'Untitled Tab',
            url: tab.url || '',
            favIconUrl: tab.favIconUrl || '',
            locked: tabLocks?.[tab.id!] || false,
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

    chrome.storage.local.get('tabLocks', (data) => {
      const tabLocks = data.tabLocks || {};
      tabLocks[tabId] = !tabLocks[tabId];
      chrome.storage.local.set({ tabLocks });
    });
  };

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
