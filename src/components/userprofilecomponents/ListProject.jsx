import React, { useState } from "react";
import time from "../../asset/icon/wall-clock.png";
import favourite_icon from "../../asset/icon/favorite-solid.svg";
import profile_img from "../../asset/img/Photo_profile.jpg";
import menucard_img from "../../asset/icon/menu-card-dots-bold.svg";
import icon_copy_in_card from "../../asset/icon/copy-in-card.svg";
import { useEffect } from "react";
import { getListProjectsApi, postStarMyProjectsApi } from "../../redux/service/ListProjectService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ListProject({ ListProject}) {
  console.log("Data Recently: ",ListProject);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );
  // Favorite project
  const [favorite, setFavorite] = useState(true);

  // handle favorite
  const handleFavorite = () => {
    setFavorite(!favorite);
    postStarMyProjectsApi().then((result) => {
      console.log(result);
    })
  };

// view
  const navigate = useNavigate();
  const handleClick = (project) => {
    navigate("/project", { state: project });
  };
  return (
    <div>
      <div className="grid grid-cols-2 laptop:w-full border shadow-md content-center laptop:h-16 ipad-pro:h-12 12pro:h-8 12pro:px-2 font-poppins bg-white laptop:rounded-listProjective ipad-pro:rounded-listProjective 12pro:rounded-lg items-center text-center">
        {/* project */}
        <button
          onClick={() => handleClick(ListProject)}
          type="button"
          className="w-fit bg-blur-15% rounded-lg laptop:text-[16px] ipad-pro:text-[8px] 12pro:text-[4px]  px-2 py-1 ml-2 text-center text-purple_button font-bold"
        >
          {ListProject
            ? ListProject.info.projectInfo.projectInfo.projectName
            : ""}
        </button>
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
              {ListProject ? ListProject.info.projectInfo.urlEndpoint : ""}
            </span>
          </div>
          {/* profile */}
          <div className="flex flex-row laptop:space-x-4 ipad-pro:space-x-1 justify-end">
            {/* <div className="bg-purple-head rounded-full laptop:h-10 laptop:w-10 ipad-pro:h-8 ipad-pro:w-8 12pro:h-4 12pro:w-4 items-center">
              <img
                src={profile_img}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div> */}
            {isLocalImageStatus ? (
              <div className="profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center items-center border rounded-full">
                <img
                  src={currentUser.profileImages}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ) : currentUser?.profileImages != null ? (
              <>
                <div className="profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center items-center border rounded-full">
                  <img
                    src={`http://localhost:8080/api/file-images?fileName=${currentUser?.profileImages}`}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </>
            ) : (
              <div className="profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center items-center border rounded-full">
                currentUser.userName?.charAt(0)
              </div>
            )}
            <div className="flex -mt-10 space-x-1">
              {/* star */}
              <button >
                <svg
                  onClick={handleFavorite}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="laptop:w-[16px] laptop:h-[16px] ipad-pro:w-[14px] ipad-pro:h-[14px] 12pro:h-[8px] 12pro:w-[8px]"
                >
                  <path
                    fill={favorite ? "rgba(0, 0, 0, 0.2)" : "#F09944"}
                    stroke={favorite ? "none" : "#F09944"}
                    stroke-width="2"
                    stroke-linejoin="round"
                    d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                  />
                </svg>
              </button>
              {/* more */}
              <button>
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
