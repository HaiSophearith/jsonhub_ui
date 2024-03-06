import React from "react";
import test from "../asset/img/icon6.png";

export default function ListOfProjectComponent() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="">
          {/* <div className="flex justify-start pl-10 pt-6 font-extrabold font-montserrat text-base">
            <h1>RECENTLY PROJECT</h1>
          </div> */}
          {/* show card project */}
          <div className="flex justify-center">
            <div className="card w-[84%] bg-base-100 shadow-xl">
              <div className="grid grid-cols-10 ">
                <div className="col-span-2 flex items-center">
                  <button
                    type="button"
                    className="text-white ml-2 bg-purple-head font-poppins mt-2 text-sm rounded-lg px-2 py-3 text-center mr-2 mb-2 "
                  >
                    HRD-PROJECT
                  </button>
                </div>
                <div className="col-span-2 flex justify-center items-center text-xs">
                  <div className=" text-slate-400 mr-4">
                    Last updated 5 min age
                  </div>
                </div>
                <div className="col-span-3 text-xs flex items-center">
                  description goes here and can wrap into multiple lines if it
                  is too long to fit on just one line
                </div>
                <div className="col-span-1">
                  <div className="flex justify-center items-center mt-3 text-xs text-slate-400">
                    <img className="h-8 w-8 self-center" src={test} alt="" />
                    28
                  </div>
                </div>
                <div className="col-span-1">
                    <div className="flex justify-center">
                        <img className=" rounded-full w-16 h-16" src={test} alt="" />
                    </div>
                </div>
                <div className="col-span-1">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
