export {};

chrome.storage.local.get('tabLocks', (data) => {
  const tabLocks = data.tabLocks || {};

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete' && tabLocks[tabId]) {
      blurAndPrompt(tabId);
    }
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    chrome.storage.local.get('tabLocks', (data) => {
      const tabLocks = data.tabLocks || {};
      if (tabLocks[tabId]) {
        blurAndPrompt(tabId);
      } else {
        chrome.scripting.executeScript({
          target: { tabId },
          func: () => {
            document.body.style.filter = 'none';
          }
        });
      }
    });
  });
});

function blurAndPrompt(tabId: number) {
  chrome.storage.local.get('appPassword', (data) => {
    const storedPassword = data.appPassword;

    chrome.scripting.executeScript({
      target: { tabId },
      func: (storedPassword) => {
        const cancelAlerts = () => {
          window.alert = () => {};
        };

        cancelAlerts();
        document.body.style.filter = 'blur(8px)';
        
        setTimeout(() => {
          let password;
          do {
            password = prompt('This tab is locked. Enter password:');
            if (password === null) {
              document.body.style.filter = 'blur(8px)';
              return;
            }
            if (password !== storedPassword) {
              alert('Incorrect password! Please try again.');
            }
          } while (password !== storedPassword);
          document.body.style.filter = 'none';
        }, 100);
      },
      args: [storedPassword]
    });
  });
}
