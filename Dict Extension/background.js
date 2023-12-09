chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.insertCSS(tab.id, { file: "dict.css" });
    chrome.tabs.executeScript(tab.id, { file: "dict.js" });
});