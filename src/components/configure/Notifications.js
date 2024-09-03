import React, { useState, useEffect } from 'react';
import { requestPermission, onMessageListener } from './Firebase';

const Notifications = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (onMessageListener.currentMessage) {
      setNotification({
        title: onMessageListener.currentMessage?.notification?.title,
        body: onMessageListener.currentMessage?.notification?.body,
      });
    }
  }, [onMessageListener.currentMessage]);

  return (
    <div>
      {notification.title && <h2>{notification.title}</h2>}
      {notification.body && <p>{notification.body}</p>}
    </div>
  );
};

export default Notifications;