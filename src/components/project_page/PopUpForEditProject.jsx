import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@material-tailwind/react";

import privateIcon from "../../asset/img/icon/private.svg";
import publicIcon from "../../asset/img/icon/public.svg";
import apiKey from "../../asset/img/icon/apiKey.svg";
import tokenIcon from "../../asset/img/icon/tokenIcon.svg";
import jsonhubLogo from "../../asset/img/jsonhub_navbar.png";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { instance } from "../../redux/service/InstanceHeader";
import { BASE_URL } from "../../redux/Constants";
import {
  updateFavoriteProject,
  updateGroupProject,
  updateProject,
} from "../../redux/slice/ProjectSlice";
import {
  isPrivateProject,
  isPublicProject,
} from "../../redux/service/ProjectService";

export default function PopUpForEditProject({
  projectDotId,
  isMyProject,
  isGroupProject,
  isFavoriteProject,
}) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );

  let projectId = projectDotId.replace("my-modal-manage-", "");

  const dispatch = useDispatch();

  const [newProjectName, setNewProjectName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [authenticationMethod, setAuthenticationMethod] = useState("");
  const [preId, setPreId] = useState("");

  const valueUpdated = (e) => {
    console.log(e.target.value);
    setNewProjectName(e.target.value);
  };

  const privateClickHandler = () => {
    setIsPrivate(!isPrivate);
  };

  const handleAuthenticationMethod = (e) => {
    setAuthenticationMethod(e);
  };

  const editProjectHandler = async () => {
    instance
      .put(`/projects/${projectId}?newProjectName=${newProjectName}`)
      .then((response) => {
        console.log("isMyProject: ", isMyProject);
        if (isMyProject) {
          dispatch(updateProject({ projectId, newProjectName }));
          console.log("updateProject");
        } else if (isFavoriteProject) {
          dispatch(updateFavoriteProject({ projectId, newProjectName }));
          console.log("updateFavoriteProject");
        } else if (isGroupProject) {
          dispatch(updateGroupProject({ projectId, newProjectName }));
        }
        console.log("New Project updated", newProjectName);
        if (isPrivate) {
          isPrivateProject(projectId, isPrivate, authenticationMethod);
        } else {
          isPublicProject(projectId, isPrivate);
        }
        console.log("Successfully.");
      });

    console.log("Successfully.");
  };

  const saveHandler = () => {
    editProjectHandler();
  };

  return (
    <div className="modal-box bg-whitesmoke">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          
          <span className="text-xl font-poppins font-black">Edit project</span>
        </div>
        <div className="flex flex-col items-center">
         {/* profile */}
          {/* <div>
            <div className="laptop:mr-3">
              {isLocalImageStatus ? (
                <img
                  src={currentUser.profileImages}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : currentUser?.profileImages != null ? (
                <>
                  <img
                    src={`http://localhost:8080/api/file-images?fileName=${currentUser?.profileImages}`}
                    alt="profile"
                    className="w-10 h-10  rounded-full object-cover"
                  />
                </>
              ) : (
                <div className="w-10 h-10 rounded-full bg-orange-500 border-4 flex justify-center items-center text-3xl">
                  {currentUser.userName?.charAt(0)}
                </div>
              )}
            </div>
          </div> */}
          <img className="w-14 h-14" src={jsonhubLogo} alt="" />
          {/* input new project name */}
          <div className="my-5 w-1/2">
            <Input
              onChange={valueUpdated}
              variant="standard"
              label="New project name here*"
              color="yellow"
            />
          </div>

          <div className="my-2">
            {/* choose privacy's project */}
            <div className="my-2 w-full flex flex-col">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div>
                    <span className="font-semibold">
                      Choose Privacy Of Project*
                    </span>
                  </div>
                  {/* public or private */}
                  <div className="flex my-2">
                    {/* public option */}
                    <div className="flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full pr-3"
                        htmlFor="public1"
                        data-ripple-dark=""
                      >
                        <input
                          id="public1"
                          aria-labelledby="label1"
                          type="radio"
                          name="private1"
                          checked={!isPrivate}
                          onChange={privateClickHandler}
                          className="focus:opacity-100 focus:ring-0 focus:ring-offset-2 focus:ring-yellow-400 focus:outline-none border rounded-full border-gray-400 cursor-pointer w-3 h-3 checked:border-none checked:bg-yellow-400"
                        />
                      </label>
                      <label
                        className={`mt-px cursor-pointer select-none flex`}
                        htmlFor="public1"
                      >
                        <PublicOutlinedIcon />
                        <span className="mx-1">public</span>
                      </label>
                    </div>

                    {/* private option */}
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="private1"
                        data-ripple-dark=""
                      >
                        <input
                          id="private1"
                          aria-labelledby="label1"
                          type="radio"
                          name="private1"
                          checked={isPrivate}
                          onChange={privateClickHandler}
                          className="focus:opacity-100 focus:ring-0 focus:ring-offset-2 focus:ring-yellow-400 focus:outline-none border rounded-full border-gray-400 cursor-pointer w-3 h-3 checked:border-none checked:bg-yellow-400"
                        />
                      </label>
                      <label
                        className={`mt-px cursor-pointer select-none flex`}
                        htmlFor="private1"
                      >
                        <LockOutlinedIcon />
                        <span className="mx-1">private</span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* when choosing private radio, this div will show */}
                <div className="">
                  {isPrivate ? (
                    <div id="div-to-hide" className="my-5 w-full flex flex-col">
                      <div className="flex flex-col">
                        <div className="font-black font-poppins">
                          <span className="">Authentication method</span>
                        </div>
                        <div className="flex my-2">
                          <div className="inline-flex items-center">
                            <label
                              className="relative flex cursor-pointer items-center rounded-full pr-3"
                              htmlFor="apikey1"
                              data-ripple-dark=""
                            >
                              <input
                                id="apikey1"
                                aria-labelledby="label1"
                                type="radio"
                                name="radio"
                                onChange={() => {
                                  handleAuthenticationMethod("APIKEY");
                                }}
                                className="focus:opacity-100 focus:ring-0 focus:ring-offset-2 focus:ring-newYellow focus:outline-none border rounded-full border-gray-400 cursor-pointer w-3 h-3 checked:border-none checked:bg-yellow-400"
                              />
                            </label>
                            <label
                              className="mt-px cursor-pointer select-none flex"
                              htmlFor="apikey1"
                            >
                              <img src={apiKey} alt="" />
                              <span className="mx-1">api key</span>
                            </label>
                          </div>
                          <div className="inline-flex items-center">
                            <label
                              className="relative flex cursor-pointer items-center rounded-full p-3"
                              htmlFor="token1"
                              data-ripple-dark=""
                            >
                              <input
                                id="token1"
                                aria-labelledby="label1"
                                type="radio"
                                name="radio"
                                onChange={() => {
                                  handleAuthenticationMethod("TOKEN");
                                }}
                                className="focus:opacity-100 focus:ring-0 focus:ring-offset-2 focus:ring-newYellow focus:outline-none border rounded-full border-gray-400 cursor-pointer w-3 h-3 checked:border-none checked:bg-yellow-400"
                              />
                            </label>
                            <label
                              className="mt-px cursor-pointer select-none flex"
                              htmlFor="token1"
                            >
                              <img className="" src={tokenIcon} alt="" />
                              <span className="mx-1">token</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="my-5 flex flex-col px-4 py-[38px]"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex justify-end font-poppins">
        <div className="w-1/2 flex justify-evenly">
          {/* cancel button */}
          <div className="modal-action">
            <label
              htmlFor="my-modal-manage"
              className="text-slate-500 text-lg btn btn-ghost hover:btn-ghost hover:delay-150 capitalize"
            >
              cancel
            </label>
          </div>
          {/* save button */}
          <div className="modal-action">
            <button onClick={saveHandler}>
              <label
                htmlFor="my-modal-manage"
                className="text-yellow-400 text-lg btn btn-ghost hover:btn-warning hover:delay-150 capitalize"
              >
                save
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
