import React ,{useState,useEffect}from "react";
import "./Main.css";
import {useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import RecentTransaction from "../transactions/RecentTransaction";
import OnlineOfflineIndicator from './../../components/onlineofflineindicator/OnlineOfflineIndicator';
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleRecent=()=>{
    navigate("/main");
  }
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <div className="popup-container ">
      <Navbar />
      {isOnline ? null : <OnlineOfflineIndicator />}
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
          style={{ color: location.pathname === "search" ? "#ff006e" : "gray" }}
          className=" h-8 w-full"
        >
          Search
        </button>
      </div>
      <RecentTransaction/>
    </div>
  );
};

export default Dashboard