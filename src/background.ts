export {};

chrome.storage.local.get('tabLocks', (data) => {
  const tabLocks = data.tabLocks || {};

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete' && tabLocks[tabId]) {
      askForPassword(tabId);
    }
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;

    chrome.storage.local.get('tabLocks', (data) => {
      const tabLocks = data.tabLocks || {};
      if (tabLocks[tabId]) {
        askForPassword(tabId);
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

function askForPassword(tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      document.body.style.filter = 'blur(8px)';

      let password;
      do {
        password = prompt('This tab is locked. Enter password:');
        if (password === null) {
          document.body.style.filter = 'blur(8px)';
          return;
        }
        if (password !== '123') {
          alert('Incorrect password! Please try again.');
        }
      } while (password !== '123');

      document.body.style.filter = 'none';
    }
  });
}
