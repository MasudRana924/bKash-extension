import React from "react";
import "react-phone-input-2/lib/style.css";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../../assets/logo.png";
import { IoMdArrowBack } from "react-icons/io";
import { clearOTP, sendOTP } from "../../features/reducers/auth/registerSlice";
import Lottie from "lottie-react";
import preloaderAnimation from "../../assets/json/Animation - 1715745618808.json";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, success, error } = useSelector((state) => state.sendotp);
  const [walletNo, setWalletNo] = useState("");
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setWalletNo(inputValue.replace(/[^0-9]/g, ""));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("walletNo", walletNo);
    dispatch(sendOTP({ wallet_no: walletNo }));
  };
  useEffect(() => {
    if (success) {
      navigate("/verify/otp");
      dispatch(clearOTP());
    }
  }, [success, navigate, dispatch]);

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
      <div className="w-full">
        {isOnline ? null : (
          <div className="internet-popup-overlay">
            <div className="internet-popup ">
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                }}
              >
                No Internet Access
              </p>
            </div>
          </div>
        )}
        {error ? (
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
        ) : null}
        <div className="w-3/4 mx-auto">
          <div className="pt-8 mb-8">
            <Link to="/">
              <p className="flex text-gray-500 text-sm gap-2">
                <IoMdArrowBack
                  className="text-2xl"
                  style={{ color: "#E2136E" }}
                />
              </p>
            </Link>
          </div>
          <img src={logo} alt="" className="h-10 w-10  mt-2 " />

          <h2 className="mt-6 text-xl text-gray-900 text-start ">
            Enter your wallet number{" "}
          </h2>
          <h2 className="text-sm text-gray-900 text-start ">
            for <span style={{ color: "#E2136E " }}>onboard</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-6">
              <input
                className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border outline-none"
                type="text"
                placeholder="Wallet Number"
                aria-label="Phone"
                value={walletNo}
                onChange={handleInputChange}
                required
                maxLength={11}
              />
            </div>
            <div>
              <button
                className=" mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform "
                style={{ backgroundColor: "#E2136E" }}
                disabled={!isOnline}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="popup-overlay">
          <div className="popup ">
            <Lottie
              animationData={preloaderAnimation}
              className="h-32 w-44"
            ></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
