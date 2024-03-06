import React, { useState } from "react";
import time from "../asset/icon/wall-clock.png";
import myproject_icon from "../asset/icon/project-symlink-16.svg";
import group_project_icon from "../asset/icon/group-rounded.svg";
import favourite_icon from "../asset/icon/favorite-solid.svg";
import dashbaord_icon from "../asset/icon/dashboard.svg";

export default function SubnavbarProfile(props) {

const [isList, setIsList] = useState(false);

const handleIsListButton = () => {
  setIsList(true);
  props.isList(isList)
}
const handleIsCardButton = () => {
  setIsList(false);
  props.isList(isList)
}

  return (
    <div className="">
      <div className="flex justify-center">
        <div className=" bg-FAFAFA w-full justify-between">
          <div className="py-4 grid grid-cols-2 justify-start">
            <div>
              <nav className="flex ml-5 laptop:space-x-7">
                <button
                  type="button"
                  className="flex title-font items-center md:justify-start justify-center text-purple_button font-bold hover:border-b-2 border-purple-head pb-1 12pro:text-[6px] laptop:text-[16px] ipad-pro:text-[12px]"
                >
                  <img
                    src={myproject_icon}
                    className="laptop:h-4 laptop:w-4 ipad-pro:h-3 ipad-pro:w-3 mr-1 12pro:w-2 12pro:h-2"
                    alt=""
                  />
                  <span>My Projects</span>
                </button>
                <button
                  type="button"
                  className="flex title-font items-center md:justify-start justify-center text-purple_button font-bold hover:border-b-2 border-purple-head pb-1 12pro:text-[6px] laptop:text-[16px] ipad-pro:text-[12px]"
                >
                 <img
                    src={group_project_icon}
                    className="laptop:h-4 laptop:w-4 ipad-pro:h-3 ipad-pro:w-3 12pro:w-2 12pro:h-2 mr-1 hover:underline decoration-purple-head hover:decoration-2 hover:underline-offset-8F"
                    alt=""
                  />
                  <span>Group Projects</span>
                </button>
                <button
                  type="button"
                  className="flex title-font items-center md:justify-start justify-center text-purple_button font-bold hover:border-b-2 border-purple-head pb-1 12pro:text-[6px] laptop:text-[16px] ipad-pro:text-[12px]"
                >
                  <img
                    src={favourite_icon}
                    className="laptop:h-4 laptop:w-4 ipad-pro:h-3 ipad-pro:w-3 12pro:w-2 12pro:h-2 mr-1"
                    alt=""
                  />
                  <span>Favourite</span>
                </button>
              </nav>
            </div>
            <div className="flex justify-end">
              <button
                class="inline-flex items-center border-r-2 border-2 py-2 px-5 border-gray-200"
                id="grid"
                onClick={handleIsCardButton}

              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="fill-current laptop:w-[24px] laptop:h-[24px] ipad-pro:w-[16px] ipad-pro:h-[16px] 12pro:w-[8px] 12pro:h-[8px] mr-2"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                class="inline-flex laptop:text-lg border-2 ipad-pro:text-sm text-center 12pro:text-[8px] items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-sm px-4 py-2"
                id="list"
                onClick={handleIsListButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="fill-current laptop:w-[24px] laptop:h-[24px] ipad-pro:w-[16px] ipad-pro:h-[16px] 12pro:w-[8px] 12pro:h-[8px] mr-2"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <span>List</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
