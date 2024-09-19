let transactionDataInterval;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Background script running");
  // Retrieve wallet_no from Chrome's local storage
  chrome.storage.local.get("walletNo", async (result) => {
    if (result.walletNo) {
      const walletNo = result.walletNo;
      console.log("Wallet number retrieved:", walletNo);
      // Fetch transaction data every 5 seconds
      transactionDataInterval = setInterval(async () => {
        try {
          const response = await fetch(
            `https://merchant-product-rnd.labs.bka.sh/listener/WebhookListener/api/transaction?walletNo=${walletNo}`
          );
          const responseData = await response.json();

          console.log("Response data:", responseData.data);
          if (responseData && responseData.data) {
            console.log("Transaction data retrieved:", responseData.data);
            const debitMsisdn = responseData.data[0].debit_msisdn;
            console.log("debitMsisdn", debitMsisdn);
            if (debitMsisdn) {
              showNotification(debitMsisdn);
            }
          }
        } catch (error) {
          console.error("Error fetching transaction data:", error);
        }
      }, 1000);
    } else {
      console.log("No wallet number found in local storage.");
    }
  });
});

function showNotification(debitMsisdn) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "bKash Payment",
    message: `Hello, You got a payment from  ${debitMsisdn}.`,
    priority: 2,
  });
}
