chrome.runtime.onInstalled.addListener(() => {
  console.log("bKash running");
  chrome.storage.local.get("walletNo", (result) => {
    if (result.walletNo) {
      chrome.alarms.create("fetchTransactionData", { periodInMinutes: 0.167 });
    } else {
      console.log("No wallet number found in local storage.");
    }
  });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "fetchTransactionData") {
    chrome.storage.local.get("walletNo", async (result) => {
      if (result.walletNo) {
        const walletNo = result.walletNo;
        try {
          const response = await fetch(
            `https://ext-poc.pgw-integration.bkash.com/WebhookListener/api/transaction?walletNo=${walletNo}`
          );
          const responseData = await response.json();
          console.log("responseData", responseData);

          if (responseData && responseData.data) {
            const currentTime = new Date().getTime();
            const newTransactions = responseData.data.filter((transaction) => {
              const transactionTime = new Date(
                transaction.created_at
              ).getTime();
              return currentTime - transactionTime <= 10000; // 10000ms = 10s
            });
            chrome.storage.local.get("storedTransactions", (storedResult) => {
              const existingTransactions =
                storedResult.storedTransactions || [];
              const updatedTransactions = [
                ...existingTransactions,
                ...newTransactions,
              ];
              console.log("updatedTransactions", updatedTransactions.length);
              chrome.storage.local.set({
                storedTransactions: updatedTransactions,
              });
              newTransactions.forEach((transaction) => {
                const debitMsisdn = transaction.debit_msisdn;
                const amount = transaction.amount;
                chrome.notifications.create({
                  type: "basic",
                  iconUrl: "icon.png",
                  title: "bKash Payment",
                  message: `You have received a payment of amount ${amount} taka from ${debitMsisdn}`,
                  priority: 2,
                });
              });
              if (updatedTransactions.length > 0) {
                chrome.action.setBadgeText({
                  text: updatedTransactions.length.toString(),
                });
                chrome.action.setBadgeBackgroundColor({ color: "white" });
              } else {
                chrome.action.setBadgeText({ text: "" });
              }
            });
          }
        } catch (error) {
          console.error("Error fetching transaction data:", error);
        }
      }
    });
  }
});

// Handle popup open and close to manage transactions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTransactions") {
    chrome.storage.local.get("storedTransactions", (result) => {
      sendResponse({ transactions: result.storedTransactions || [] });
    });
    return true; // Keep the message channel open for sendResponse
  } else if (request.action === "popupOpened") {
    // Clear stored transactions when the popup opens
    chrome.storage.local.set({ storedTransactions: [] }, () => {
      chrome.action.setBadgeText({ text: "" }); // Clear badge text
    });
  } else if (request.action === "popupClosed") {
    // Restore the badge when the popup closes
    chrome.storage.local.get("storedTransactions", (result) => {
      const count = (result.storedTransactions || []).length;
      chrome.action.setBadgeText({ text: count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: "red" });
    });
  }
});
