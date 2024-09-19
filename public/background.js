chrome.runtime.onInstalled.addListener(() => {
  console.log("Background script running");
  
  // Retrieve wallet_no from Chrome's local storage
  chrome.storage.local.get('walletNo', async (result) => {
    if (result.walletNo) {
      const walletNo = result.walletNo;
      console.log("Wallet number retrieved:", walletNo);

      // Show notification with walletNo
      showNotification(walletNo);

      // Fetch transaction data using walletNo
      try {
        const response = await fetch(
          `https://merchant-product-rnd.labs.bka.sh/listener/WebhookListener/api/transaction?walletNo=${walletNo}`
        );
        const responseData = await response.json();
        
        console.log("Response data:", responseData.data);
        if (responseData && responseData.data) {
          console.log("Transaction data retrieved:", responseData.data);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    } else {
      console.log("No wallet number found in local storage.");
    }
  });
});
function showNotification(walletNo) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'bKash Payment',
    message: `Hello your wallet is  ${walletNo}!`,
    priority: 2
  });
}

// Run the notification every 10 seconds
setInterval(showNotification, 5000);
