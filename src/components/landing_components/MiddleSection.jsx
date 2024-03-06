import React, { useEffect } from "react";

import AOS from "aos";

import "aos/dist/aos.css";
import imgCode from "../../asset/img/imgCode.png";
import finger from "../../asset/icon/finger-tap-line.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export default function MiddleSection() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);

  const handleNavigateToSignUp = () => {
    navigate("/register");
  };

  return (
    <div>
      <div>
        <div className="grid md:grid-cols-2 gap-10 sm:grid-cols-1 mt-14 pb-14 bg-bg-footer md:px-32">
          {/* start img */}
          <div className="mr-8 pr-8">
            <img src={imgCode} alt="imgCode" className="mt-[-35px]" />
          </div>
          {/* Start blog right */}
          <div className="flex flex-col justify-center ">
            {/* Total control */}
            <div className=" mt-14">
              <h5 className="text-xl font-bold text-dark-head font-poppins 12pro:ml-8 laptop:ml-0 ipad-pro:ml-0 ">
                Total control
              </h5>
            </div>
            {/* articel */}
            <div className=" 12pro:flex 12pro:justify-center laptop:justify-normal  ipad-pro:justify-normal">
              <p className=" mt-10 mr-8 ipad-pro:mt-5 font-montserrat text-dark-head ">
                New in Mocky, you can now update or delete your mocks at any
                time. The next release will go furture and offer you request
                inspector and clound-based mock management.
              </p>
            </div>
            {/* Backround not ready */}
            <div className=" mt-10">
              <h5 className="text-xl text-dark-head font-bold 12pro:ml-8 font-poppins laptop:ml-0 ipad-pro:ml-0 ">
                Backend not ready?
              </h5>
            </div>
            {/* article */}
            <div className=" 12pro:flex 12pro:justify-center  laptop:justify-normal   ipad-pro:justify-normal">
              <p className=" mt-10 mr-8 ipad-pro:mt-5 font-montserrat text-dark-head ">
                Setting up, hosting and maintaining a fake API online takes
                time. Mockend lets you focus on the frontend by making it
                effortless to have a custom REST or GraphQL API.
              </p>
            </div>
            {/* Email and singup*/}
            <div
              className="mt-10 flex  gap-10 w-full h-full
                         "
            >
               
              {/* email */}
              <div className="w-1/2 flex justify-center items-center">
                <input
                  className=" focus:ring-newYellow focus:border-0 laptop:w-full h-9 ipad-pro:w-64 12pro:w-56 font-montserrat bg-white border  text-md text-black rounded-full block p-2.5 dark:border-[#8484E7] dark:text-white text-center"
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {/* singup */}
              <div className="w-1/4  ">
                <button
                  onClick={() => {
                    handleNavigateToSignUp();
                  }}
                  type="button"
                  className="drop-shadow-sm w-full h-9 flex flex-row hover:bg-dark-head hover:text-white justify-center items-center font-montserrat laptop:w-full laptop:h-9 
                  12pro:w-32 12pro:h-9 12pro:rounded-full 
                 ipad-pro:rounded-full  ipad-pro:h-9 ipad-pro:w-36 ipad-pro:text-[11px] 12pro:text-xs text-black rounded-full bg-newYellow
                 "
                >
                  <span className=""> SIGN UP NOW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
