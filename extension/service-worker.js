// service-worker.js
console.log("Service worker injected."); // Log when the script is injected

chrome.runtime.onInstalled.addListener((details) => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
          url: "options.html"
        });
    }
});

// Add listener for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        // Store the current URL
        chrome.storage.local.set({
            currentPageUrl: tab.url
        }, () => {
            // Send message with error handling
            chrome.runtime.sendMessage({
                type: 'urlChanged'
            }).catch((error) => {
                // It's normal for this error to occur when no receiver is listening
                console.debug('No receiver available for urlChanged message');
            });
        });
    }
});