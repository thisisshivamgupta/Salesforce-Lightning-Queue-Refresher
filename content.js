console.log('Content script loaded');

// Inject utility bar button
function injectUtilityBarButton() {
    console.log('Attempting to inject button into utility bar');
    const utilityBar = document.querySelector('.utilitybar.slds-utility-bar');

    if (utilityBar && !document.getElementById('queueRefresherButton')) {
        console.log('Utility bar found, injecting button');
        // Create button
        const button = document.createElement('button');
        button.id = 'queueRefresherButton';
        button.className = 'slds-button slds-button_neutral';
        button.innerText = 'Start Queue Refresher';

        // Handle button click
        button.addEventListener('click', toggleQueueRefresher);

        // Inject button into utility bar
        utilityBar.appendChild(button);

        console.log('Queue Refresher Button Added');
    } else {
        console.log('Utility bar not found or button already exists');
    }
}

function toggleQueueRefresher() {
    const button = document.getElementById('queueRefresherButton');
    if (!button) return;

    const isRunning = button.innerText.includes('Stop');

    if (isRunning) {
        // Stop refresher
        chrome.runtime.sendMessage({ action: 'stop' }, (response) => {
            if (chrome.runtime.lastError) {
                console.log('Failed to send stop message');
            } else {
                console.log('Stop message sent');
            }
        });
        button.innerText = 'Start Queue Refresher';
        console.log('Refresher stopped');
    } else {
        // Ask user for interval and start refresher
        const interval = prompt('Enter refresh interval in seconds:', '30');
        if (interval && !isNaN(interval) && interval > 0) {
            chrome.storage.sync.set({ refreshInterval: interval, isRefreshing: true }, () => {
                chrome.runtime.sendMessage({ action: 'start' }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.log('Failed to send start message');
                    } else {
                        console.log('Start message sent');
                    }
                });
                console.log('Refresher started with interval:', interval);
            });
            button.innerText = 'Stop Queue Refresher';
        } else {
            alert('Invalid interval. Please enter a number greater than 0.');
            console.log('Invalid interval input');
        }
    }
}

// Observe for utility bar availability
const observer = new MutationObserver((mutations, observerInstance) => {
    const utilityBar = document.querySelector('.utilitybar.slds-utility-bar');
    if (utilityBar && !document.getElementById('queueRefresherButton')) {
        injectUtilityBarButton();
        observerInstance.disconnect(); // Disconnect observer once the button is injected
    }
});
observer.observe(document.body, { childList: true, subtree: true });

// Initial attempt to inject button in case the utility bar is already available
document.addEventListener('DOMContentLoaded', () => {
    injectUtilityBarButton();
    console.log('Content Script Loaded and Executed');
});

// Listen for refresh messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'refreshQueue') {
        refreshAllQueues();
        console.log('Received refreshQueue action message');
        sendResponse({ status: 'done' });
    }
});

// Refresh all queues
function refreshAllQueues() {
    const refreshButtons = document.querySelectorAll('button[name="refreshButton"][title="Refresh"]');
    if (refreshButtons.length > 0) {
        refreshButtons.forEach(button => button.click());
        console.log('All queues refreshed');
    } else {
        console.warn('No refresh buttons found on the page.');
    }
}