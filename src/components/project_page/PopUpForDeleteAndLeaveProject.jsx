import React, { useState } from "react";
import { deleteProjectApi, getProjectsApi, removeMemberApi } from "../../redux/service/ProjectService";
import { deleteFavoriteProject, deleteGroupProject, deleteProject, getProjects } from "../../redux/slice/ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { current } from '@reduxjs/toolkit';

export default function PopUpForDeleteAndLeaveProject({
  title,
  htmlFor,
  projectId,
}) {

  const { projects } = useSelector((state) => state.projects);
  const currentUser = useSelector((state) => state.auth.currentUser);
  
  const dispatch = useDispatch();


  const deleteProjectHandler = () => {
    // const deleteId = projectId.replace(`dropdown-dot-`, "");
    console.log("projectId popup ", projectId);
    let deleteId = projectId.replace("my-modal-manage-", "");
    const filteredProjects = projects.filter((project) => {
      return project.projectId === deleteId;
    });
    if (filteredProjects.length > 0) {
      const projectName =
        filteredProjects[0].info.projectInfo.projectInfo.projectName;
      console.log("Project Name:", projectName);
      deleteProjectApi(projectName).then(() => {
        dispatch(deleteProject({ deleteId }));
        dispatch(deleteGroupProject({ deleteId }));
        dispatch(deleteFavoriteProject({ deleteId }));
      });
      console.log("delete project: ", projectName);
    }
  };

  const leaveProjectHandler = (id, username) => {
    let removeProjectId = id.replace("my-modal-manage-", "");
    console.log("removeProjectId: ", removeProjectId);
    removeMemberApi(removeProjectId, username).then(() => {
      getProjectsApi().then((data) => {
        dispatch(getProjects(data.data.payload));
      });
    })

  }

  return (
    <div className=" relative 12pro:w-[90%] ipad-pro:w-[60%] laptop:w-[40%] bg-whitesmoke p-8 rounded-2xl shadow-xl">
      <div className="flex flex-col items-center">
        <div>
          <span className="font-poppins font-black text-xl">
            Are you sure you want to {title} this project?
          </span>
        </div>
        <div className="my-3">
          <span className="font-poppins font-black text-sm">
            This will {title} this project permanently, you cannot undo this
            action.
          </span>
        </div>
        {/* buttons */}
        <div className="flex justify-between w-1/2 font-poppins">
          {/* cancel button */}
          <div className="modal-action">
            <label
              htmlFor={htmlFor}
              className="text-slate-500 text-lg btn btn-ghost hover:btn-ghost hover:delay-150 capitalize"
            >
              cancel
            </label>
          </div>

          {/* delete and leave button */}
          <div className="modal-action">
            <label
              htmlFor={htmlFor}
              className="text-red-600 text-lg  btn btn-ghost hover:bg-red-600 hover:text-white hover:delay-150 capitalize"
              onClick={
                title === "delete" ? deleteProjectHandler : (() => leaveProjectHandler(projectId, currentUser.userName))
              }
            >
              {title}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
