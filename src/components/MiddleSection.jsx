import React from "react";
import imgCode from "../asset/img/imgCode.png";

export default function MiddleSection() {
  return (
    <div className="">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 mt-14 pb-14 bg-gradient-to-r from-[hsl(240,84%,71%,20%)] to-[hsl(272,74%,65%,20%)] px-24">
        {/* start img */}
        <div className="mr-8">
          <img src={imgCode} alt="imgCode" className="mt-[-35px]" />
        </div>
        {/* End img */}
        {/* Start blog right */}
        <div className="">
          {/* Total control */}
          <div className=" mt-14">
            <h5 className="text-xl ">Total control</h5>
            <div className="w-10 h-0.5 bg-[#6E6EE8]"></div>
          </div>
          {/* articel */}
          <div className="">
            <p className="mt-10 ipad-pro:mt-5 text-[#869AB8] w-10/12">
              New in Mocky, you can now update or delete your mocks at any time.
              The next release will go furture and offer you request inspector
              and clound-based mock management.
            </p>
          </div>
          {/* Backround not ready */}
          <div className=" mt-10">
            <h5 className="text-xl ">Backend not ready?</h5>
          </div>
          {/* article */}
          <div>
            <p className="mt-10 ipad-pro:mt-5 text-[#869AB8] w-10/12">
              Setting up, hosting and maintaining a take API online take time.
              Mockend lets you focus on the frontend by making it effortless to
              have a custom.
            </p>
          </div>
          {/* button */}
          <div className="mt-10 grid grid-cols-2 12pro:grid-cols-none ">
            {/*  */}
            <div className="">
            {/*  text-[#E9E9E9] */}
              <input
                type="text"
                id="email"
                className="
                bg-white 
                border border-[#8484E7]
                  text-sm 
                  text-black
                  rounded-full
                   focus:ring-blue-500
                    focus:border-blue-500 
                    block w-full p-2.5 
                     dark:border-[#8484E7]
                      dark:placeholder-[#8484E7]
                       dark:text-white 
                       dark:focus:ring-blue-500
                        dark:focus:border-[#8484E7]
                        12pro:text-center
                        12pro:mb-3
                        "
                placeholder="Enter your email"
                required
              />
            </div>
            {/*  */}
            <div className="ml-5 12pro:justify-center 12pro:flex 12pro:ml-0">
              <button
                type="button"
                className="
                btn
                capitalize
                py-2.5 px-5 mr-2 mb-2 text-sm font-medium
              text-white
                focus:outline-none
              bg-white 
                rounded-full
                border border-[#8484E7]
                bg-gradient-to-r from-purple-400 to-purple-600
                
                "
              >
                SIGN UP NOW
              </button>
            </div>
          </div>
        </div>
        {/* End blog right */}
      </div>
    </div>
  );
}
