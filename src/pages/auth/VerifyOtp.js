import React, { useState } from "react";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoCheckmarkCircle ,IoWarning } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../features/reducers/auth/verifyOTPSlice";
import Lottie from "lottie-react";
import preloaderAnimation from "../../assets/json/Animation - 1715745618808.json";
const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpString, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { isLoading, success, errorMessage } = useSelector(
    (state) => state.otpVerification
  );
  useEffect(() => {
    const savedEndTime = localStorage.getItem("otpEndTime");
    if (savedEndTime) {
      const endTime = new Date(savedEndTime);
      const currentTime = new Date();
      const diff = Math.ceil((endTime - currentTime) / 1000);
      if (diff > 0) {
        setTimer(diff);
        setCanResend(false);
      } else {
        setTimer(0);
        setCanResend(true);
      }
    }
  }, []);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    const newEndTime = new Date(new Date().getTime() + 60 * 1000);
    localStorage.setItem("otpEndTime", newEndTime);
    setTimer(60);
    setCanResend(false);
  };

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otpString];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otpString.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  const walletNo = localStorage.getItem("wallet_no");
  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpString.join("");
    const OTP = otp;
    const data = { OTP, walletNo };
    dispatch(verifyOTP(data));
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        // navigate("/main/recent");
        navigate("/main");
      }, 1000); // navigate after 1 second
    }
  }, [success, navigate]);

  return (
    <div className="popup-container flex-col justify-center items-center">
      <div className="flex flex-col justify-center bg-gray-150">
        <div className="px-6 pt-4 pb-9 mx-auto w-full max-w-lg">
          <div className="mx-auto flex w-full max-w-md flex-col">
            <div className="text-start">
              <div>
                <Link to="/">
                  <p
                    className="flex text-sm gap-2"
                    style={{ color: "#E2136E" }}
                  >
                    <IoMdArrowBack className=" text-xl" />
                  </p>
                </Link>
              </div>
              <div className="pt-8">
                <p className="text-xl " style={{ color: "#E2136E" }}>
                  Verification Code
                </p>
                <p className="text-xs pt-2 text-gray-500">
                  We have sent a code to{" "}
                  <span style={{ color: "#E2136E" }}>{walletNo}</span>
                </p>
              </div>
            </div>

            <div>
              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otpString.map((digit, index) => (
                      <div key={index} className="w-16 h-16">
                        <input
                          className="w-12 h-12 flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-pink-500"
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          id={`otp-input-${index}`}
                          style={{ color: digit ? "#E2136E" : "black" }}
                          placeholder="0"
                          required
                          autoComplete="off"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-start  text-sm font-medium  text-gray-500">
                      {canResend ? (
                        <button
                          onClick={handleResend}
                          className="text-xs"
                          style={{ color: "#E2136E" }}
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <p className="text-pink-500 text-xs">
                          Did not recieve your OTP{" "}
                          {`0:${timer.toString().padStart(2, "0")}`}{" "}
                        </p>
                      )}
                    </div>
                    <div>
                      <button
                        className=" mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform "
                        style={{ backgroundColor: "#E2136E" }}
                      >
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
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
      {success ? (
        <div className="flex justify-center items-center gap-2">
        <IoCheckmarkCircle  style={{
              color: "#16a34a",
              fontSize: "15px",
            }}/>
          <p
            style={{
              color: "#16a34a",
              fontSize: "12px",
            }}
          >
            Verification Done
          </p>
        </div>
      ) : errorMessage ? (
        <div className="flex justify-center items-center gap-2">
          <IoWarning 
            style={{
              color: "#E2136E",
              fontSize: "15px",
            }}
          />
          <p
            style={{
              color: "#E2136E",
              fontSize: "12px",
            }}
          >
            Verification Failed
          </p>
        </div>
      ) : null}
      
    </div>
  );
};
export default VerifyOtp;
