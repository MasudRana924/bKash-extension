chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateBadge") {
      chrome.browserAction.setBadgeText({ text: request.count.toString() });
      chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] }); // Set badge background color to red
    }
  });