import React from "react";

export default function () {
  return (
    <div>
      {/* dropdown for dot icon */}
      <div className="right-[-15px] top-10 ipad-pro:w-28 laptop:w-32 12pro:w-24 p-2 bg-white rounded-lg drop-shadow-lg shadow-lg">
        <ul className="space-y-2 text-sm capitalize">
          {/* edit project */}
          <div className="border-b-2 border-b-slate-500">
            <li className="flex p-2 w-full">
              <label className="hover:scale-110 hover:cursor-pointer font-semibold font-poppins text-sm text-center w-full flex items-center justify-center space-x-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[14px] h-[14px]"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="m290.74 93.24l128.02 128.02l-277.99 277.99l-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22l277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55l128.02 128.02l56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
                    />
                  </svg>
                </div>
                <div>
                  <span>edit</span>
                </div>
              </label>
            </li>
          </div>

          {/* delete project */}
          <div className="">
            <li className="flex w-full">
              <label className="hover:scale-110 hover:cursor-pointer py-2 font-semibold font-poppins text-sm text-center w-full flex items-center justify-center space-x-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[14px] h-[14px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="red"
                      d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-red-600">delete</span>
                </div>
              </label>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
