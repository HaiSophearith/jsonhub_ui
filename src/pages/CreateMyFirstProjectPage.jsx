import React from "react";
import { useState } from "react";
import create from "../asset/img/icon/create.svg";
import privateIcon from "../asset/img/icon/private.svg";
import publicIcon from "../asset/img/icon/public.svg";
import FooterComponent from "../components/FooterComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { instance } from "../redux/service/InstanceHeader";
import { BASE_URL } from "../redux/Constants";
import { postProjectApi } from "../redux/service/ProjectService";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/slice/ProjectSlice";

export default function CreateMyFirstProjectPage() {
  const [projectName, setProjectName] = useState("");
  const [authenticationMethod, setAuthenticationMethod] = useState("");

  const dispatch = useDispatch();

  const [isPrivate, setIsPrivate] = useState(false);

  const privateClickHandler = () => {
    setIsPrivate(!isPrivate);
  };

  const handleValue = (e) => {
    setProjectName(e.target.value);
  };

  const handleAuthenticationMethod = (e) => {
    setAuthenticationMethod(e);
  };

  const handleCreate = async () => {
    postProjectApi(projectName, isPrivate, authenticationMethod);

    console.log("Successfully.");
  };

  return (
    <div>
      <div>
        {/*creaete my first project page */}
        <div className="flex justify-center my-10 font-montserrat">
          <div className="laptop:w-[85%] laptop:h-[700px] ipad-pro:w-[83%] ipad-pro:h-[700px] 12pro:w-[90%] 12pro:h-[600px] bg-whitesmoke shadow-lg shadow-slate-400 rounded-t-2xl">
            <div className="laptop:w-full ipad-pro:w-full 12pro:w-full flex justify-around ipad-pro:col-span-2 laptop:col-span-2">
              <div className="w-full laptop:w-full ipad-pro:w-full ipad-pro:flex ipad-pro:justify-center  12pro:w-full h-full border-slate-400">
                {/* content of create first project */}
                <div className="flex 12pro:h-[500px] 12pro:w-full 12pro:my-10 laptop:my-0 ipad-pro:h-[600px] laptop:w-full laptop:h-[700px] ipad-pro:w-[700px] ipad-pro:justify-center justify-center ipad-pro:items-center items-center">
                  <div className="flex flex-col laptop:w-[800px] ipad-pro:w-[600px] 12pro:w-[300px] ">
                    {/* create new project  */}
                    <div className="flex laptop:w-full border-b-2 ipad-pro:w-full border-slate-400 ">
                      {/* logo create */}
                      <div className="flex">
                        <img
                          className="12pro:hidden ipad-pro:inline-flex laptop:inline-flex ipad-pro:h-28 laptop:h-24"
                          src={create}
                          alt="create logo"
                        />
                      </div>
                      {/* text header */}
                      <div className="flex flex-col justify-center">
                        <div className="text-xl font-poppins 12pro:text-sm font-black capitalize">
                          <span>create new project</span>
                        </div>
                        <div className="my-1 text-md 12pro:text-xs laptop:w-[650px]">
                          <span>
                            Projects allow you to manage and collaborate across
                            multiple endpoint. you can add add Members and have
                            access to all of its projects.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* project name */}
                    <div className="my-5 flex flex-col">
                      <div className="font-black 12pro:text-sm font-poppins text-lg">
                        <span>Project name</span>
                      </div>
                      {/* input project name  */}
                      <div className="ipad-pro:w-1/2 laptop:w-1/2 my-2">
                        <input
                          type="text"
                          onChange={handleValue}
                          id="first_name"
                          name="projectName"
                          className="bg-whitesmoke laptop:line-clamp-1 border border-slate-400 text-sm rounded-lg focus:ring-purple-head focus:border-purple-head block w-full p-2.5"
                          placeholder="My awesome project"
                        />
                      </div>
                    </div>

                    {/* Visibility level */}
                    <div className="flex flex-col">
                      <div className="font-black 12pro:text-sm font-poppins text-lg">
                        <span>Visibility level</span>
                      </div>
                      <div className="my-1 text-md 12pro:text-xs">
                        <span>Who will be able to see this project?</span>
                      </div>
                    </div>

                    {/* private option */}
                    <div className="my-1">
                      <div class="flex items-center">
                        {/* input radio */}
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="true"
                          checked={isPrivate}
                          onChange={privateClickHandler}
                          name="default-radio"
                          className="w-3 h-3 mr-1 text-purple-head focus:ring-purple-head bg-whitesmoke border-2 border-slate-500"
                        />
                        {/* icon private */}
                        <div className="mx-1">
                          <img className="w-6 h-6" src={privateIcon} alt="" />
                        </div>
                        <div>
                          <label
                            for="default-radio-1"
                            class="ml-1 text-sm 12pro:text-xs font-medium text-gray-900 dark:text-gray-300"
                          >
                            Private
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* public option */}
                    <div className="my-1">
                      <div class="flex items-center">
                        {/* input radio */}
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="true"
                          checked={!isPrivate}
                          onChange={privateClickHandler}
                          name="default-radio"
                          className="w-3 h-3 mr-1 text-purple-head focus:ring-purple-head bg-whitesmoke border-2 border-slate-500"
                        />
                        {/* icon public */}
                        <div className="mx-1">
                          <img className="w-6 h-6" src={publicIcon} alt="" />
                        </div>
                        <div>
                          <label
                            for="default-radio-1"
                            class="ml-1 text-sm 12pro:text-xs font-medium text-gray-900 dark:text-gray-300"
                          >
                            Public
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* when choose private radio this div will show */}
                    {isPrivate ? (
                      <div id="div-to-hide" className="my-5">
                        <div className="flex flex-col border-t-2 border-slate-400">
                          <div className="font-black font-poppins text-[20px] my-2">
                            <span>Authentication method</span>
                          </div>
                        </div>

                        <div className="my-1">
                          <div className="flex items-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              value=""
                              onChange={() => {
                                handleAuthenticationMethod("APIKEY");
                              }}
                              name="default-radio-1"
                              className="w-3 h-3 mr-1 text-purple-head focus:ring-purple-head bg-whitesmoke border-2 border-slate-500"
                            />
                            <div>
                              <label
                                for="default-radio-1"
                                className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Api key
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="my-1">
                          <div className="flex items-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              onChange={() => {
                                handleAuthenticationMethod("TOKEN");
                              }}
                              value=""
                              name="default-radio-1"
                              className="w-3 h-3 mr-1 text-purple-head focus:ring-purple-head bg-whitesmoke border-2 border-slate-500"
                            />
                            <div>
                              <label
                                for="default-radio-1"
                                className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Token
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {/* button create and cancel */}
                    <div className="flex my-5">
                      {/* button create */}
                      <Link to="/manageProject">
                        <button
                          type="button"
                          onClick={() => {
                            handleCreate();
                          }}
                          className="btn btn-sm btn-primary font-poppins capitalize transition delay-150 focus:outline-none font-medium rounded-lg text-xs px-5 text-center"
                        >
                          Create
                        </button>
                      </Link>
                      {/* button cancel */}
                      <div className="mx-5">
                        <Link
                          to={"/manageProject"}
                          type="button"
                          className="btn btn-sm btn-primary font-poppins capitalize transition delay-150 focus:outline-none font-medium rounded-lg text-xs px-5 text-center"
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
