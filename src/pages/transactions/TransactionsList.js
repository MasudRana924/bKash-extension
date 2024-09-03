import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import addNotification from "react-push-notification";
import notificationSound from '../../assets/notificationsound.mpeg';

import Lottie from "lottie-react";
import preloaderAnimation from "../../assets/json/Animation - 1715745618808.json";
import TransactionCard from "../../components/transactions/TransactionCard ";

const TransactionList = () => {
  const walletNo = localStorage.getItem("wallet_no");
  const [data, setData] = useState(JSON.parse(localStorage.getItem("transactionData")) || null);
  const [loading, setLoading] = useState(!data);
  const [lastTransactionId, setLastTransactionId] = useState(localStorage.getItem("lastTransactionId") || null);
  const [newTransaction, setNewTransaction] = useState(null);
  const isSpeakEnabled = useSelector(
    (state) => state.isConfigurationEnabled.isSpeakEnabled
  );
  const isNotificationEnabled = useSelector(
    (state) => state.isConfigurationEnabled.isNotificationEnabled
  );

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://merchant-product-rnd.labs.bka.sh/listener/WebhookListener/api/transaction",
          {
            params: { walletNo: walletNo },
          }
        );
        const newData = response.data;
        setData(newData);
        localStorage.setItem("transactionData", JSON.stringify(newData));
        setLoading(false);

        const firstTransactionData = newData.data[0];
        if (
          firstTransactionData &&
          firstTransactionData.trx_id !== lastTransactionId
        ) {
          setNewTransaction(firstTransactionData);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [walletNo, lastTransactionId]);

  useEffect(() => {
    if (newTransaction) {
      const notificationMessage = `You got a payment of ${newTransaction.amount} from ${newTransaction.debit_msisdn}`;
      const transactionTime = new Date(newTransaction.created_at).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - transactionTime;

      if (timeDifference <= 3000) {
        if (isNotificationEnabled) {
          addNotification({
            title: "Payment",
            message: notificationMessage,
            native: true,
          });
          console.log("Notification:", notificationMessage);
        }
        if (isSpeakEnabled) {
          playNotificationSound();
        }
      }

      setLastTransactionId(newTransaction.trx_id);
      localStorage.setItem("lastTransactionId", newTransaction.trx_id);
    }
  }, [newTransaction, isNotificationEnabled, isSpeakEnabled]);

  return (
    <div className="popup-container ">
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="bg-gray-100">
            <Lottie
              animationData={preloaderAnimation}
              className="h-20 w-32"
            ></Lottie>
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
              <p className="text-center text-xl" style={{ color: "#E2136E" }}>
                Welcome{" "}
              </p>
              <p className="text-center text-sm text-gray-500">
                You have no transaction yet{" "}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
