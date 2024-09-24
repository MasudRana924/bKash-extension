import React from "react";
import { useState } from "react";
import axios from "axios";
import TransactionCard from "../../components/transactions/TransactionCard ";
import Lottie from "lottie-react";
import preloaderAnimation from "../../assets/json/Animation - 1715745618808.json";
import Navbar from "../../components/shared/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
const SearchTransactions = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const walletNo = localStorage.getItem("wallet_no");
  const handleSearch = async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://merchant-product-rnd.labs.bka.sh/listener/WebhookListener/api/search-transaction",
        {
          params: {
            customerWallet: phoneNumber,
            merchantWallet:walletNo
          },
        }
      );
      setSearchResults(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const handleRecent=()=>{
    navigate("/main");
  }
  return (
    <div className="popup-container ">
      <Navbar/>
      <div className="w-full border-b bg-white flex justify-between">
        <button
          onClick={handleRecent}
          style={{ color: location.pathname === "/main" || location.pathname === "/main" ? "#ff006e" : "gray"}}
          className=" h-8 w-full"
        >
          Recent
        </button>
        <button
          onClick={() => navigate("/search")}
          style={{ color: location.pathname === "/search" ? "#ff006e" : "gray" }}
          className=" h-8 w-full"
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Customer Wallet"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="h-8 border-b outline-none "
        />
        <button
          onClick={handleSearch}
          className="h-8 w-20 text-white"
          style={{ backgroundColor: "#ff006e" }}
        >
          Search
        </button>

        {loading &&  <div className="flex justify-center items-center mt-20">
         <div className=" bg-gray-100 ">
           <Lottie
             animationData={preloaderAnimation}
             className="h-20 w-32"
           ></Lottie>
         </div>
       </div>}
        {error && <p className="error-message">{error}</p>}

        {searchResults &&
        searchResults.data &&
        searchResults.data.length > 0 ? (
          <div className="results-container mt-2">
            {searchResults.data.map((item) => (
              <TransactionCard key={item.trx_id} item={item} />
            ))}
          </div>
        ) : (
          searchResults && (
            <p className="no-results-message mt-8 text-red-500">No transactions found.</p>
          )
        )}
      </div>
    </div>
  );
};
export default SearchTransactions;
