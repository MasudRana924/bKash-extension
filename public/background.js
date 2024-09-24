chrome.runtime.onInstalled.addListener(() => {
  console.log("bKash running");

  chrome.storage.local.get("walletNo", (result) => {
    if (result.walletNo) {
      const walletNo = result.walletNo;

      // Set up an alarm that triggers every 10 seconds
      chrome.alarms.create("fetchTransactionData", { periodInMinutes: 0.167 }); // 0.167 minutes = 10 seconds
    } else {
      console.log("No wallet number found in local storage.");
    }
  });
});

// Listen for the alarm to trigger the API call
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "fetchTransactionData") {
    chrome.storage.local.get("walletNo", async (result) => {
      if (result.walletNo) {
        const walletNo = result.walletNo;

        try {
          const response = await fetch(
            `https://merchant-product-rnd.labs.bka.sh/listener/WebhookListener/api/transaction?walletNo=${walletNo}`
          );
          const responseData = await response.json();

          if (responseData && responseData.data) {
            const debitMsisdn = responseData.data[0].debit_msisdn;
            const amount = responseData.data[0].amount;
            const newTransactionData = responseData.data[0];
            const transactionTime = new Date(newTransactionData.created_at).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - transactionTime;

            if (timeDifference <= 10000) {
              chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: "bKash Payment",
                message: `You have received a payment of amount ${amount} taka from ${debitMsisdn}`,
                priority: 2,
              });
            }
          }
        } catch (error) {
          console.error("Error fetching transaction data:", error);
        }
      }
    });
  }
});