import React from "react";
import { useState } from "react";
import {
  getProjectsApi,
  postProjectApi,
} from "../../redux/service/ProjectService";
import { useDispatch, useSelector } from "react-redux";
import { addProject, getProjects } from "../../redux/slice/ProjectSlice";

import createProject from "../../asset/img/createProject.gif";
import jsonhubLogo from "../../asset/img/jsonhub_navbar.png";
import apiKey from "../../asset/img/icon/apiKey.svg";
import tokenIcon from "../../asset/img/icon/tokenIcon.svg";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { NotifyError, NotifyInfo, NotifySucess } from "../../redux/Constants";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { SignupSchema } from "../../utils/Validation";
import { Spinner } from "flowbite-react";
import Spinners from "../Spinners";
export default function PopUpForCreateProject({
  loading,
  isOpen1,
  closeModal1,
}) {
  const { projects } = useSelector((state) => state.projects);

  console.log("cbhshvbs oepn", isOpen1);

  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [authenticationMethod, setAuthenticationMethod] = useState("");

  const [isToken, setIsToken] = useState(false);
  const navigate = useNavigate();

  const projectNameValueHandler = (e) => {
    let value = e.target.value;
    setProjectName(value);
  };

  const [isLoading, setIsLoading] = useState(false)

  const createProjectHandler = () => {
    if (projectName === "") {
      NotifyInfo("Project name is require.");
    } else {
      setIsLoading(true)
      postProjectApi(projectName, isPrivate, authenticationMethod)
        .then((res) => {
          getProjectsApi()
            .then((data) => {
              dispatch(addProject(res.data.payload));
              dispatch(getProjects(data.data.payload));
              setIsLoading(false)
              NotifySucess("Project created successfully.")
              setProjectName('');

              closeModal1();
            })
            .catch(() => {
              setIsLoading(false)
              NotifyError("Failed to create project.");
              closeModal1();
            });
        })
        .catch(() => {
          NotifyError("Failed to create project.");
          setIsLoading(false)
          closeModal1();
        });
    }
  };

  const privateClickHandler = () => {
    setIsPrivate(!isPrivate);
  };

  const handleAuthenticationMethod = (e) => {
    setAuthenticationMethod(e);
  };

  return (
    <Transition appear show={isOpen1} as={Fragment}>
      <Dialog
        as="div"
        open={false}
        static
        className="relative z-10"
        onClose={closeModal1}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-4/5 transition-all">
                <div className="grid grid-cols-5 shadow-lg drop-shadow-lg rounded-2xl">
                  <div className="col-span-2 bg-white p-3 pb-4 rounded-l-2xl flex flex-col justify-around items-center">
                    <div className="w-full h-full flex justify-center items-center">
                      <div>
                        <img className="" src={createProject} alt="" />
                      </div>
                    </div>
                    <div className="w-full h-1/2 flex justify-center items-start">
                      <div className="flex flex-col items-center">
                        <span className="capitalize text-xl font-poppins font-black my-3">
                          let's create your project
                        </span>
                        <span className="">Feel free to enjoy it in your</span>
                        <span>awesome projects!</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 h-full w-full bg-whitesmoke rounded-r-2xl flex flex-col justify-center items-center">
                    <div className="flex flex-col w-1/2">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <img
                            className="w-18 h-16"
                            src={jsonhubLogo}
                            alt="jsonhub-logo"
                          />
                          <span className="font-poppins text-4xl text-navbar font-black">
                            JSONHub
                          </span>
                        </div>
                        <span className="text-xl font-poppins font-black my-4">
                          Create your project here...
                        </span>
                      </div>
                      <div className="my-2">
                        {/* input project name  */}
                        <span className="font-semibold">
                          Input Your Project's Name*
                        </span>
                        <div className="my-2">
                          <input
                            type="text"
                            id="projectName"
                            name="projectName"
                            onChange={projectNameValueHandler}
                            className="font-poppins border-none text-sm rounded-lg focus:ring-0 focus:border-none w-full"
                            placeholder="Project's Name*"
                          />
                        </div>
                      </div>
                      <div className="my-2">
                        {/* choose privacy's project */}
                        <span className="font-semibold">
                          Choose Privacy Of Project*
                        </span>
                        <div className="my-2">
                          {/* public or private */}
                          <div className="flex justify-start">
                            {/* public option */}
                            <div className="flex items-center">
                              <label
                                className="relative flex cursor-pointer items-center rounded-full pr-3"
                                htmlFor="public"
                                data-ripple-dark=""
                              >
                                <input
                                  id="public"
                                  aria-labelledby="label1"
                                  type="radio"
                                  name="private"
                                  checked={!isPrivate}
                                  onChange={privateClickHandler}
                                  className="focus:opacity-100 focus:ring-0 focus:ring-offset-2 focus:ring-newYellow focus:outline-none border rounded-full border-gray-400 cursor-pointer w-3 h-3 checked:border-none checked:bg-yellow-400"
                                />
                              </label>
                              <label
                                className={`mt-px cursor-pointer select-none flex`}
                                htmlFor="public"
                              >
                                <PublicOutlinedIcon />
                                <span className="mx-1">public</span>
                              </label>
                            </div>

                            {/* private option */}
                            <div className="inline-flex items-center">
                              <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="private"
                                data-ripple-dark=""
                              >
                                <input
                                  id="private"
                                  aria-labelledby="label1"
                                  type="radio"
                                  name="private"
                                  checked={isPrivate}
                                  onChange={privateClickHandler}
                                  className="focus:opacity-100 focus:ring-0 focus:ring-offset-2 focus:ring-newYellow focus:outline-none border rounded-full border-gray-400 cursor-pointer w-3 h-3 checked:border-none checked:bg-yellow-400"
                                />
                              </label>
                              <label
                                className={`mt-px cursor-pointer select-none flex`}
                                htmlFor="private"
                              >
                                <LockOutlinedIcon />
                                <span className="mx-1">private</span>
                              </label>
                            </div>
                          </div>

                          {/* when choosing private radio, this div will show */}
                          {isPrivate ? (
                            <div
                              id="div-to-hide"
                              className="my-5 flex flex-col"
                            >
                              <div className="flex flex-col">
                                <div className="font-black font-poppins w-full">
                                  <span className="">
                                    choose authentication method
                                  </span>
                                </div>
                              </div>

                              <div className="w-full flex my-2">
                                <div className="inline-flex items-center">
                                  <label
                                    className="relative flex cursor-pointer items-center rounded-full pr-3"
                                    htmlFor="apikey"
                                    data-ripple-dark=""
                                  >
                                    <input
                                      id="apikey"
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
                                    htmlFor="apikey"
                                  >
                                    <img src={apiKey} alt="" />
                                    <span className="mx-1">api key</span>
                                  </label>
                                </div>
                                <div className="inline-flex items-center">
                                  <label
                                    className="relative flex cursor-pointer items-center rounded-full p-3"
                                    htmlFor="token"
                                    data-ripple-dark=""
                                  >
                                    <input
                                      id="token"
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
                                    htmlFor="token"
                                  >
                                    <img className="" src={tokenIcon} alt="" />
                                    <span className="mx-1">token</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="my-5 flex flex-col px-4 py-[38px]"></div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex justify-center items-end w-full">
                        {/* buttons */}
                        <div className="flex w-1/2 h-full justify-evenly font-poppins">
                          {/* cancel button */}
                          <div className="modal-action">
                            <label
                              onClick={closeModal1}
                              className="text-slate-500 text-lg btn btn-ghost hover:btn-ghost hover:delay-150 capitalize"
                            >
                              cancel
                            </label>
                          </div>
                          {/* create button */}
                          <div className="modal-action">
                            <button
                              onClick={createProjectHandler}
                              type="button"
                              className="text-yellow-400 text-lg btn btn-ghost hover:btn-warning hover:delay-150 capitalize"
                            >
                              {isLoading ? <Spinners /> : "create"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
