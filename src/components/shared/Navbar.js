import React from "react";
import "./Navbar.css";
import avatar from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { PiSignOutLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { logout } from "../../features/reducers/auth/verifyOTPSlice";
import { clearOTP } from "../../features/reducers/auth/registerSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const walletNo = localStorage.getItem("wallet_no");
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearOTP());
    navigate("/login");
  };

  return (
    <div className="main-navbar h-12">
      <div className="flex justify-between ">
        <div className="flex  w-full ">
          <div className="w-16">
            <img
              src={avatar}
              alt=""
              className="h-10 w-10 ml-2 mt-1 absolute border rounded-full "
            />
          </div>
          <div>
            <p className="mt-2 text-white text-start text-xs font-medium">
              Merchant Wallet
            </p>
            <p className=" text-white text-start text-xs font-medium">
              {walletNo}
            </p>
          </div>
        </div>
        <div className="w-1/4 flex items-center justify-end  gap-2">
          <Link to="/configure">
            <CiSettings className="text-white text-xl" />
          </Link>
          <button className=" w-full" onClick={handleLogout}>
            <PiSignOutLight className="text-white text-xl " />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
