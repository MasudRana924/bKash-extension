// OnlineOfflineIndicator.js
import React from 'react';
import '../../pages/auth/Auth.css'

const OnlineOfflineIndicator = ({ isOnline }) => {

    return (
        <div className="mt-4">
          <p style={{ color: 'red', fontSize: '12px' }}>No Internet Access</p>
        </div>
    );
  }
export default OnlineOfflineIndicator;