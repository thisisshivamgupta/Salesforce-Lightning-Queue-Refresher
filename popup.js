document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['refreshInterval', 'isRefreshing'], (data) => {
    if (data.refreshInterval) {
      document.getElementById('interval').value = data.refreshInterval;
    }
    updateStatus(data.isRefreshing);
    updateUrlList();
  });
});

document.getElementById('start').addEventListener('click', () => {
  const interval = document.getElementById('interval').value;
  if (interval && interval > 0) {
    chrome.storage.sync.set({ refreshInterval: interval, isRefreshing: true }, () => {
      alert('Queue refresher started!');
      updateStatus(true);
      chrome.runtime.sendMessage({ action: 'start' });
    });
  } else {
    alert('Please enter a valid interval.');
  }
});

document.getElementById('stop').addEventListener('click', () => {
  chrome.storage.sync.set({ isRefreshing: false }, () => {
    chrome.runtime.sendMessage({ action: 'stop' });
    updateStatus(false);
    alert('Queue refresher stopped!');
  });
});

function updateStatus(isRefreshing) {
  document.getElementById('status').innerText = isRefreshing ? "Running" : "Stopped";
}

function updateUrlList() {
  chrome.storage.sync.get('activeUrls', (data) => {
    const urlList = document.getElementById('url-list');
    urlList.innerHTML = '';
    if (data.activeUrls && data.activeUrls.length > 0) {
      data.activeUrls.forEach(url => {
        const li = document.createElement('li');
        li.innerText = url;
        urlList.appendChild(li);
      });
    } else {
      urlList.innerText = 'No active Salesforce tabs.';
    }
  });
}