import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_HEADER, BASE_URL } from "../../redux/Constants";

export default function PopupEditProject() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );
  const [newProjectName, setNewProjectName] = useState("");
  const valueUpdated = (e) => {
    console.log(e.target.value);
    setNewProjectName(e.target.value);
  };
  const [preId, setPreId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const [newData, setNewData] = useState([]);

  const editProjectNameHandler = () => {
    let projectId = preId.replace("my-modal-manage-", "");
    API_HEADER.put(
      `${BASE_URL}/projects/${projectId}?newProjectName=${newProjectName}`
    )
      .then((response) => {
        console.log("newDataResponse:", response.data.payload);
        setNewData(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="modal font-montserrat">
        {/* <div className="modal-box"> */}
        <div className="flex flex-col">
          <div>
            <span className="text-xl font-poppins font-black">
              Edit project
            </span>
          </div>
          <div className="flex flex-col items-center">
            {/* profile  */}
            <div className="flex justify-center">
              {currentUser?.profileImages !== null ? (
                isLocalImageStatus ? (
                  <div className="profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center items-center border rounded-full">
                    <img
                      src={currentUser?.profileImages}
                      alt="profile"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                ) : currentUser?.profileImages != null ? (
                  <>
                    <div className="profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center items-center border rounded-full">
                      <img
                        src={`http://localhost:8080/api/file-images?fileName=${currentUser?.profileImages}`}
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  </>
                ) : (
                  <div className="profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center items-center border rounded-full">
                    {currentUser?.userName?.charAt(0).toUpperCase()}
                  </div>
                )
              ) : (
                <div className="profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center items-center border rounded-full">
                  {currentUser?.userName?.charAt(0).toUpperCase()}
                </div>
              )}
              {/* <img
                  className="w-1/6 rounded-full"
                  src={search_logo}
                  alt="profile"
                /> */}
            </div>

            {/* input new project name */}
            <div className="my-5 w-[60%]">
              <input
                onChange={valueUpdated}
                variant="standard"
                label="New project name"
              />
            </div>

            {/* private or public */}
            <div className="w-[70%] flex justify-evenly mt-5">
              {/* private option */}
              <div className="">
                <div className="flex items-center">
                  {/* input radio */}
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="true"
                    name="default-radio"
                    className="w-3 h-3 mr-1 hover:cursor-pointer text-purple-head focus:ring-purple-head bg-whitesmoke border-2 border-slate-500"
                  />
                  {/* icon private */}
                  <div className="mx-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6 10v10h13V10H6Zm12-2h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1Zm-2 0V7a4 4 0 0 0-8 0v1h8Zm-9 3h2v2H7v-2Zm0 3h2v2H7v-2Zm0 3h2v2H7v-2Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <label
                      for="default-radio-1"
                      className="text-base font-medium text-gray-900"
                    >
                      Private
                    </label>
                  </div>
                </div>
              </div>

              {/* public option */}
              <div className="">
                <div className="flex items-center">
                  {/* input radio */}
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="true"
                    name="default-radio"
                    className="w-3 h-3 mr-1 hover:cursor-pointer text-purple-head focus:ring-purple-head bg-whitesmoke border-2 border-slate-500"
                  />
                  {/* icon public */}
                  <div className="mx-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm-1-2.05V18q-.825 0-1.413-.588T9 16v-1l-4.8-4.8q-.075.45-.138.9T4 12q0 3.025 1.988 5.3T11 19.95Zm6.9-2.55q.5-.55.9-1.188t.662-1.325q.263-.687.4-1.412T20 12q0-2.45-1.363-4.475T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h6q.425 0 .713.288T15 13v3h1q.65 0 1.175.388T17.9 17.4Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <label
                      for="default-radio-1"
                      className="text-base font-medium text-gray-900"
                    >
                      Public
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* members */}
            <div className="w-full flex justify-center border-t-[3px] border-t-blue-gray-700 mt-10">
              <Link className="flex w-[80%] justify-between mt-5 hover:scale-105">
                <div className="flex justify-between items-center">
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7zm-8 0h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7zM20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14zm-8 2a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-black font-poppins">Members</span>
                  </div>
                </div>
                <div>
                  <span className="text-cyan-400 font-poppins">10</span>
                </div>
              </Link>
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
              <button onClick={editProjectNameHandler}>
                <label
                  htmlFor="my-modal-manage"
                  className="text-purple-head text-lg btn btn-ghost hover:btn-primary hover:delay-150 capitalize"
                >
                  save
                </label>
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
