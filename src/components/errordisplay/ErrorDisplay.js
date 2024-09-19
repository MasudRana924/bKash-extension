// ErrorDisplay.js
import React from 'react';
import '../../pages/auth/Auth.css'
const ErrorDisplay = ({ error }) => {
  console.log("err",error)
  return (
     <div className="bg-red-500 h-10">
            <div className="pt-2">
              <p
                style={{
                  color: "white",
                  fontSize: "12px",
                }}
              >
                {error}
              </p>
            </div>
          </div>
  );
};

export default ErrorDisplay;