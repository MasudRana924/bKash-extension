// WalletInput.js
import React, { useState } from 'react';

const WalletInput = ({ onChange, value, maxLength }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(inputValue);
    onChange(inputValue);
  };

  return (
    <input
      className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border outline-none"
                type="text"
      placeholder="Wallet Number"
      aria-label="Phone"
      value={inputValue}
      onChange={handleInputChange}
      required
      maxLength={maxLength}
    />
  );
};

export default WalletInput;