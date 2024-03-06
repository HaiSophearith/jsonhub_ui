import React from 'react'
import profile_img from "../../asset/img/Photo_profile.jpg";

export default function ListGroupProject({ ListGroupProject }) {
  
  return (
    <div>
        <div className="grid grid-cols-2 laptop:w-full content-center laptop:h-16 ipad-pro:h-12 12pro:h-8 12pro:px-2 font-poppins shadow-listProjective bg-white laptop:rounded-listProjective ipad-pro:rounded-listProjective 12pro:rounded-lg items-center text-center">
        {/* project */}
        <div
          type="button"
          className="w-fit bg-blur-15% rounded-lg laptop:text-[16px] ipad-pro:text-[8px] 12pro:text-[4px]  px-2 py-2 ml-2 text-center text-purple_button font-bold"
        >
          {ListGroupProject
            ? ListGroupProject.info.projectInfo.projectInfo.projectName
            : ""}
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-2 flex justify-end items-center  laptop:text-[14px] ipad-pro:text-[8px] 12pro:text-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="laptop:w-[17.33px] laptop:h-[23.34] ipad-pro:w-[10.33px] ipad-pro:h-[16.34] 12pro:w-[8.33px] 12pro:h-[14.34px]"
            >
              <path
                fill="rgba(0, 0, 0, 0.4)"
                d="m10 17.55l-1.77 1.72a2.47 2.47 0 0 1-3.5-3.5l4.54-4.55a2.46 2.46 0 0 1 3.39-.09l.12.1a1 1 0 0 0 1.4-1.43a2.75 2.75 0 0 0-.18-.21a4.46 4.46 0 0 0-6.09.22l-4.6 4.55a4.48 4.48 0 0 0 6.33 6.33L11.37 19A1 1 0 0 0 10 17.55ZM20.69 3.31a4.49 4.49 0 0 0-6.33 0L12.63 5A1 1 0 0 0 14 6.45l1.73-1.72a2.47 2.47 0 0 1 3.5 3.5l-4.54 4.55a2.46 2.46 0 0 1-3.39.09l-.12-.1a1 1 0 0 0-1.4 1.43a2.75 2.75 0 0 0 .23.21a4.47 4.47 0 0 0 6.09-.22l4.55-4.55a4.49 4.49 0 0 0 .04-6.33Z"
              />
            </svg>
            {/* endpoint number */}
            <span>
              {ListGroupProject ? ListGroupProject.info.projectInfo.urlEndpoint : ""}
            </span>
          </div>
          {/* profile */}
          <div className="flex flex-row laptop:space-x-4 ipad-pro:space-x-1 justify-end">
            <div className="bg-purple-head rounded-full laptop:h-10 laptop:w-10 ipad-pro:h-8 ipad-pro:w-8 12pro:h-4 12pro:w-4 items-center">
              <img
                src={profile_img}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex -mt-2 space-x-1">
              {/* star */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="laptop:w-[16px] laptop:h-[16px] ipad-pro:w-[14px] ipad-pro:h-[14px] 12pro:h-[8px] 12pro:w-[8px]"
              >
                <path
                  fill="rgba(0, 0, 0, 0.2)"
                  d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                />
              </svg>
              {/* more */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="laptop:w-[16px] laptop:h-[16px] ipad-pro:w-[14px] ipad-pro:h-[14px] 12pro:h-[8px] 12pro:w-[8px]"
              >
                <path
                  fill="rgba(0, 0, 0, 0.2)"
                  fill-rule="evenodd"
                  d="M2.5 7.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Zm15 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Zm-7.274 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
