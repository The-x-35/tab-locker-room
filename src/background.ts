export {};

// Log every 5 seconds
setInterval(() => {
  console.log('Background service is running...');
}, 5000);

chrome.storage.local.get('tabLocks', (data) => {
  const tabLocks = data.tabLocks || {};

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    // Only prompt for password when the tab is fully loaded
    if (changeInfo.status === 'complete' && tabLocks[tabId]) {
      console.log(`Locked tab opened: ${tabId}`);
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          const password = prompt('This tab is locked. Enter password:');
          if (password !== '123') {
            chrome.tabs.update(tabId, { active: false });
            alert('Incorrect password! Tab will remain locked.');
          }
        }
      });
    }
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;

    if (tabLocks[tabId]) {
      console.log(`Locked tab activated: ${tabId}`);
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          const password = prompt('This tab is locked. Enter password:');
          if (password !== '123') {
            chrome.tabs.update(tabId, { active: false });
            alert('Incorrect password! Tab will remain locked.');
          }
        }
      });
    }
  });
});
