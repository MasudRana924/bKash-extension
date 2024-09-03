import React from "react";
import "./Main.css";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleRecent=()=>{
    navigate("/main/recent");
  }
  return (
    <div className="popup-container ">
      <Navbar />
      <div className="w-full border-b bg-white flex justify-between">
        <button
          onClick={handleRecent}
          style={{ color: location.pathname === "/main/recent" || location.pathname === "/main" ? "#E2136E" : "gray"}}
          className=" h-8 w-full"
        >
          Recent
        </button>
        <button
          onClick={() => navigate("/main/search")}
          style={{ color: location.pathname === "/main/search" ? "#E2136E" : "gray" }}
          className=" h-8 w-full"
        >
          Search
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
