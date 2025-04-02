let refreshIntervalId = null;

const refreshQueue = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tabs.forEach(tab => {
            if (tab.url.includes('lightning')) {
                chrome.tabs.sendMessage(tab.id, { action: 'refreshQueue' }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.log('Failed to send refreshQueue message to tab:', tab.id, chrome.runtime.lastError);
                    } else {
                        console.log('Sent refreshQueue message to tab:', tab.id);
                    }
                });
            } else {
                console.log('Tab does not match Salesforce URL:', tab.url);
            }
        });
    });
};

const startRefreshing = (interval) => {
    stopRefreshing();
    refreshIntervalId = setInterval(refreshQueue, interval * 1000);
    console.log('Started refresher with interval:', interval);
};

const stopRefreshing = () => {
    if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
        console.log('Stopped refresher');
    }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'start') {
        chrome.storage.sync.get('refreshInterval', (data) => {
            if (data.refreshInterval) {
                startRefreshing(data.refreshInterval);
            } else {
                console.log('No refreshInterval found in storage');
            }
        });
    } else if (message.action === 'stop') {
        stopRefreshing();
    }
    console.log('Received message:', message);
    sendResponse({ status: 'done' });
    return true;  // Indicate asynchronous response
});