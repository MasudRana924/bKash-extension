function showNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'bKash Payment',
    message: 'Hello, please open the extension!',
    priority: 2
  });
}

// Run the notification every 10 seconds
setInterval(showNotification, 1000);

// Optional: To clear notifications automatically after some time
chrome.notifications.onClicked.addListener(function(notificationId) {
  chrome.notifications.clear(notificationId);
});

// Function to update the badge with the notification count
function updateBadge(count) {
chrome.action.setBadgeText({ text: count.toString() });
chrome.action.setBadgeBackgroundColor({ color: '#ffffff' });
chrome.action.setBadgeTextColor({ color: 'red' });
}

// Initialize notification count
let notificationCount = 10;

// Set the initial badge count
updateBadge(notificationCount);

// Simulate receiving a new notification every 10 seconds
setInterval(() => {
notificationCount++;
updateBadge(notificationCount);
}, 20000);
