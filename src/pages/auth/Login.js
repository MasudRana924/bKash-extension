import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { clearOTP, sendOTP } from "../../features/reducers/auth/registerSlice";
import ErrorDisplay from "../../components/errordisplay/ErrorDisplay";
import OnlineOfflineIndicator from "../../components/onlineofflineindicator/OnlineOfflineIndicator";
import Loader from "../../components/loader/Loader";
import WalletInput from "./../../components/auth/WalletInput";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [walletNo, setWalletNo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("walletNo", walletNo);
    dispatch(sendOTP({ wallet_no: walletNo }));
    if (window.chrome && window.chrome.storage) {
      window.chrome.storage.local.set({ walletNo: walletNo }, () => {
      });
    } else {
      console.error('Chrome API is not available.');
    }
  };

  const { isLoading, success, error } = useSelector((state) => state.sendotp);
  useEffect(() => {
    if (success) {
      navigate("/verify/otp");
    }if(error){
      setTimeout(() => {
        dispatch(clearOTP());
      }, 2000); 
    }
  }, [navigate, success,error,dispatch]);

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
    <div className=" popup-container flex justify-center ">
      <div className="w-full ">
        {error ? <ErrorDisplay error={error} /> : null}
        {isOnline ? null : <OnlineOfflineIndicator />}
        <div className="w-3/4 mx-auto mt-12">
          <img src={logo} alt="" className="h-10 w-10  mt-2 " />
          <h2 className="mt-6 text-xl text-gray-900 text-start ">
            Enter your wallet number{" "}
          </h2>

          <h2 className="text-sm text-gray-900 text-start ">
            for <span style={{ color: "#ff006e " }}>Login</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-6">
              <WalletInput
                value={walletNo}
                onChange={(value) => setWalletNo(value)}
                maxLength={11}
              />
            </div>
            <div>
              <button
                className=" mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform "
                style={{ backgroundColor: "#ff006e" }}
                disabled={!isOnline}
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <Link to="/register">
              <p className="text-xs text-start mt-2 ">
                Don't have an account
                <span className="  ml-2" style={{ color: "#ff006e" }}>
                  Create an account
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};
export default Login;
