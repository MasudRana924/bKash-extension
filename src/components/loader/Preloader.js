import React from "react";
import Lottie from "lottie-react";
import preloaderAnimation from "../../json/Animation - 1715745618808.json";
import logo from '../assets/bkash.svg'

const Preloader = () => {
  return (
    <div className=" popup-container flex justify-center items-center "style={{backgroundColor:'#E2136E'}}>
      <div>
        {/* <Lottie
          animationData={preloaderAnimation}
          className=" h-32 w-44"
        ></Lottie> */}
       <div className="flex">
         <p className="text-xl text-white mt-4">বি<span className="text-gray-900">কাশ</span> </p>
         <img src={logo} className="h-16 w-16" alt=""/>
       </div>
      </div>
    </div>
  );
};

export default Preloader;