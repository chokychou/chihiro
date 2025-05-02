import { CACHED_AI_OPTION, DEFAULT_AI_OPTION, AI_URLS } from './constants.js';

const iframeStyles = {
    width: '100%',
    height: '100vh',
    border: 'none',
    position: 'fixed',
    top: '0',
    left: '0'
};

function updateIframe(modelName) {
    const container = document.getElementById('iframe-selector');
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = AI_URLS[modelName];
    iframe.allow = "clipboard-write; clipboard-read";
    iframe.sandbox = "allow-forms allow-scripts allow-same-origin allow-popups";

    Object.assign(iframe.style, iframeStyles);
    container.appendChild(iframe);
}

// TODO
function attachContext() {}

// Load initial option
chrome.storage.sync.get({ [CACHED_AI_OPTION]: DEFAULT_AI_OPTION }, (items) => {
    updateIframe(items[CACHED_AI_OPTION]);
    attachContext(); // Attach context on initial load
});

// Listen for option changes
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'optionsChanged') {
        updateIframe(message.modelName);
    } else if (message.type === 'urlChanged') {
        attachContext();
    }
});
