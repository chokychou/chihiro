import { CACHED_AI_OPTION, USE_CONTEXT, DEFAULT_AI_OPTION } from './constants.js';

function saveOptions() {
    const model_name = document.querySelector('input[name="ai-select"]:checked').value;
    const is_context_enabled = document.getElementById('use-context').checked;
    
    chrome.storage.sync.set({
        [CACHED_AI_OPTION]: model_name,
        [USE_CONTEXT]: is_context_enabled
    }, () => {
        // Notify the sidepanel that options have changed
        chrome.runtime.sendMessage({ 
            type: 'optionsChanged', 
            modelName: model_name,
        });
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        [CACHED_AI_OPTION]: DEFAULT_AI_OPTION,
        [USE_CONTEXT]: false
    }, (items) => {
        document.querySelector(`input[value="${items[CACHED_AI_OPTION]}"]`).checked = true;
        document.getElementById('use-context').checked = items[USE_CONTEXT];
    });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelectorAll('input[name="ai-select"]').forEach(radio => {
    radio.addEventListener('change', saveOptions);
});
document.querySelectorAll('input[name="ai-option"]').forEach(checkbox => {
    checkbox.addEventListener('change', saveOptions);
});