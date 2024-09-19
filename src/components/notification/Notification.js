import React, { useEffect, useState } from 'react';
import echo from './echo';

const NotificationComponent = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    echo.channel('notifications')
      .listen('NotificationEvent', (e) => {
        setMessage(e.message);
      })
      .error((error) => {
        setError(error);
      });
    return () => {
      echo.leaveChannel('notifications');
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Notification</h1>
      <p>{message}</p>
    </div>
  );
};

export default NotificationComponent;