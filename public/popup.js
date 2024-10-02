document.addEventListener('DOMContentLoaded', () => {
  // Notify the background script that the popup has opened
  chrome.runtime.sendMessage({ action: "popupOpened" });

  // Fetch stored transactions and display them (will be empty now)
  chrome.runtime.sendMessage({ action: "getTransactions" }, (response) => {
      const transactions = response.transactions;
      const transactionsDiv = document.getElementById('transactions');

      // Display transactions
      if (transactions.length > 0) {
          transactionsDiv.innerHTML = transactions.map(tx => {
              return `<div>${tx.amount} taka from ${tx.debit_msisdn} at ${tx.created_at}</div>`;
          }).join('');
      } 
  });

  // Optionally handle popup close
  window.addEventListener('unload', () => {
      chrome.runtime.sendMessage({ action: "popupClosed" });
  });
});
