import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import addNotification from "react-push-notification";
import Lottie from "lottie-react";
import preloaderAnimation from "../../assets/json/Animation - 1715745618808.json";
import TransactionCard from "./../../components/transactions/TransactionCard ";
const TransactionList = () => {
  const walletNo = localStorage.getItem("wallet_no"); // Still fetching the wallet number from localStorage
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSpeakEnabled = useSelector(
    (state) => state.isConfigurationEnabled.isSpeakEnabled
  );
  const isNotificationEnabled = useSelector(
    (state) => state.isConfigurationEnabled.isNotificationEnabled
  );
  const speakNotification = (message) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech not supported in this browser.");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          "https://ext-poc.pgw-integration.bkash.com/WebhookListener/api/transaction",
          {
            params: { walletNo: walletNo },
          }
        );
        const newData = response.data;
        setData(newData); // Set data directly from API response
        setLoading(false);
        const currentTime = new Date().getTime();
        const newTransactions = newData.data.filter((transaction) => {
          const transactionTime = new Date(transaction.created_at).getTime();
          return currentTime - transactionTime <= 3000; // 3000ms = 3s
        });
        newTransactions.forEach((transaction) => {
          const notificationMessage = `You have received a payment of ${transaction.amount} taka from ${transaction.debit_msisdn}`;
          if (isNotificationEnabled) {
            addNotification({
              title: "Payment",
              message: notificationMessage,
              native: true,
            });
          }
          if (isSpeakEnabled) {
            speakNotification(notificationMessage);
          }
        });
      } catch (error) {
        setLoading(false);
        console.error("Error fetching transactions:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds
    return () => clearInterval(interval);
  }, [walletNo, isNotificationEnabled, isSpeakEnabled]);
  return (
    <div className="popup-container">
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="bg-gray-100">
            <Lottie animationData={preloaderAnimation} className="h-20 w-32" />
          </div>
        </div>
      ) : (
        <div>
          {data && data.data.length > 0 ? (
            <div>
              {data.data.map((item) => (
                <TransactionCard key={item.trx_id} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-center text-xl" style={{ color: "#ff006e" }}>
                Welcome
              </p>
              <p className="text-center text-sm text-gray-500">
                You have no transactions yet
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default TransactionList;
