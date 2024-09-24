// ErrorDisplay.js
import React from 'react';
import '../../pages/auth/Auth.css'
const ErrorDisplay = ({ error }) => {
  console.log("err",error)
  return (
     <div className=" h-10">
            <div className="pt-4">
              <p
                style={{
                  color: "red",
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