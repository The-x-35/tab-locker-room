export {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get(['tabLocks', 'appPassword'], (data) => {
      const tabLocks = data.tabLocks || {};
      const storedPassword = data.appPassword;

      if (tabLocks[tabId]) {
        blurAndPrompt(tabId, storedPassword);
      }
    });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  const { tabId } = activeInfo;
  chrome.storage.local.get(['tabLocks', 'appPassword'], (data) => {
    const tabLocks = data.tabLocks || {};
    const storedPassword = data.appPassword;

    if (tabLocks[tabId]) {
      blurAndPrompt(tabId, storedPassword);
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

function blurAndPrompt(tabId: number, storedPassword: string) {
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
}
