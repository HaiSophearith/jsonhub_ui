import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import favoriteGray from "../asset/img/icon/favoriteGray.svg";
import favoriteGold from "../asset/img/icon/favorite.svg";
import dotGray from "../asset/img/icon/dot.svg";
import url from "../asset/img/icon/url.svg";
import manage from "../asset/img/icon/manage.svg";
import deleteIcon from "../asset/img/icon/deleted.svg";
import {
  addOrRemoveProjectToFavoriteAPI,
  getAllFavoriteProjectsAPI,
  getAllMemberByProjectIdAPI,
  getProjectsApi,
} from "../redux/service/ProjectService";
import { Link, useNavigate } from "react-router-dom";
import {
  addOrRemoveProjectToFavorite,
  deleteFavoriteProject,
  getFavoriteProjects,
  getProjects,
} from "../redux/slice/ProjectSlice";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PopUpForEditProject from "../components/project_page/PopUpForEditProject";
import PopUpForDeleteAndLeaveProject from "../components/project_page/PopUpForDeleteAndLeaveProject";

const ProjectCard = ({ project, cardInfo, cardMembers, dotData }) => {

  const [preId, setPreId] = useState("");
  const [clickCount, setClickCount] = useState(1);
  const [members, setMembers] = useState([]);
  const [dotId, setDotId] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);

  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );

  const favoriteProjects = useSelector(
    (state) => state.projects.favoriteProjects
  );
  const { projects } = useSelector((state) => state.projects);

  const checkEditProject = (dropdownId) => {
    if (dropdownId !== preId) {
      const preDropdown = document.getElementById(preId);
      if (preDropdown) {
        preDropdown.classList.add("hidden");
      }
      setPreId(dropdownId);
    }

    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };

  useEffect(() => {
    getAllMemberByProjectIdAPI(project.projectId).then((response) => {
      setMembers(response.data.payload.userData);
      console.log("respone member card", response.data.payload.userData);
    });
    let canEdit =
      members.filter(
        (member) =>
          member.subRole === "EDITOR" &&
          currentUser.userName === member.username
      )[0]?.username == currentUser.userName;
    console.log("canEdit: ", canEdit);
    setIsEditable(canEdit);
  }, [dotId]);


  function handleCardClick(card) {
    cardInfo(card);
    console.log("Ondata: ", cardInfo);

    getAllMemberByProjectIdAPI(card.projectId).then((response) => {
      cardMembers(response.data.payload);
    });
  }

  const checkDot = (dropdownId) => {
    dotData(dropdownId);
    // setProjectName(projectName);
    if (dropdownId !== preId) {
      const preDropdown = document.getElementById(preId);
      if (preDropdown) {
        preDropdown.classList.add("hidden");
      }
      setPreId(dropdownId);
    }
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
    let projectDotId = dropdownId.replace("dropdown-dot-", "");
    setDotId(projectDotId);
  };

  const checkDeleteProject = (dropdownId) => {
    if (dropdownId !== preId) {
      const preDropdown = document.getElementById(preId);
      if (preDropdown) {
        preDropdown.classList.add("hidden");
      }
      setPreId(dropdownId);
    }

    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };

  const convertTimestampToDate = (timestampArray) => {
    const [year, month, day] = timestampArray;
    const date = new Date(year, month - 1, day);
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  const convertTimestampToDateLastUpdate = (timestampArray) => {
    const now = new Date();

    const Minutes = now.getMinutes() - timestampArray[4];
    const Hours = now.getHours() - timestampArray[3];
    const Days = now.getDate() - timestampArray[2];
    const Years = now.getYear() - timestampArray[0];
    const Months = now.getMonth() + 1 - timestampArray[1];

    let formattedDate;

    if (Years > 0) {
      formattedDate = `${Years} years ago`;
    } else if (Months > 0) {
      return (formattedDate = `${Months} months ago`);
    } else if (Days > 0) {
      return (formattedDate = `${Days} days ago`);
    } else if (Hours > 0) {
      return (formattedDate = `${Hours} hours ago`);
    } else if (Minutes > 0) {
      return (formattedDate = `${Minutes} minutes ago`);
    } else {
      return (formattedDate = `just now`);
    }
  };

  useEffect(() => {
    getAllFavoriteProjectsAPI().then((data) => {
      if (
        data.data.payload.some(
          (favProject) => favProject.projectId === project.projectId
        )
      ) {
        setIsInFavorite(true);
      }
      dispatch(getFavoriteProjects(data.data.payload));
    });
  }, []);

  const [isInFavorite, setIsInFavorite] = useState(false);

  const favoriteIconClickHandler = (id) => {
    setIsInFavorite(true);
    if (isInFavorite == true) {
      setIsInFavorite(false);
      let deleteId = id;
      addOrRemoveProjectToFavoriteAPI(deleteId).then(() => {
        dispatch(deleteFavoriteProject({ deleteId }));
      });
    } else {
      addOrRemoveProjectToFavoriteAPI(id);
    }
  };

  const handleClick = (project) => {
    console.log("Project: ", project);

    // Increment click count
    setClickCount(clickCount + 1);
    console.log("clickCount: ", clickCount);
    // Navigate if user double clicks (within 500ms)
    setTimeout(() => {
      switch (clickCount) {
        case 1: {
          handleCardClick(project);
          console.log("Single click");
          break;
        }
        case 2: {
          navigate(`/project/${project.projectId}`, { state: project });
          console.log("Double click");
          break;
        }
        default: {
          break;
        }
      }
      setClickCount(1);
    }, 500);
  };
  return (
    <div className="bg-whitesmoke shadow-md border laptop:w-full rounded-lg flex flex-col px-4 py-4">
      {/* profile user create project */}
      <div className="">
        {/* left */}
        <div className="flex items-center justify-between">
          {/* profile */}
          <div>
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
          </div>
          {/* username */}
          <div className="flex flex-col">
            <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Link
                to={""}
                className=""
                onClick={() => handleCardClick(project)}
              >
                <span>
                  {project.info?.projectInfo?.projectInfo.projectName.length <=
                  5
                    ? project.info?.projectInfo?.projectInfo.projectName
                    : project.info?.projectInfo?.projectInfo.projectName.slice(
                        0,
                        10
                      ) + "..."}
                </span>
              </Link>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-montserrat line-clamp-1">
                {/* create date: 07/09/2023 */}
                Created :{" "}
                {convertTimestampToDate(
                  project?.info?.projectInfo?.projectInfo?.createdDate
                )}
              </span>
            </div>
          </div>
          {/* right */}
          <div className="flex items-center self-start">
            {/* favorite icon */}
            <div className="laptop:mx-2 ipad-pro:mx-1 mt-1">
              <button
                onClick={() => favoriteIconClickHandler(project.projectId)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill={isInFavorite ? "#f19844" : "#96AED0"}
                    d="M34 16.78a2.22 2.22 0 0 0-1.29-4l-9-.34a.23.23 0 0 1-.2-.15l-3.11-8.4a2.22 2.22 0 0 0-4.17 0l-3.1 8.43a.23.23 0 0 1-.2.15l-9 .34a2.22 2.22 0 0 0-1.29 4l7.06 5.55a.23.23 0 0 1 .08.24l-2.43 8.61a2.22 2.22 0 0 0 3.38 2.45l7.46-5a.22.22 0 0 1 .25 0l7.46 5a2.2 2.2 0 0 0 2.55 0a2.2 2.2 0 0 0 .83-2.4l-2.45-8.64a.22.22 0 0 1 .08-.24Z"
                    class="clr-i-solid clr-i-solid-path-1"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
              </button>
            </div>

            {/* dot icon */}
            <div className="dropdown">
              <button
                tabIndex={0}
                className="text-gray-400"
                id={`dropdownDefault-${project.projectId}`}
                data-dropdown-toggle={`dropdown-dot-${project.projectId}`}
                type="button"
                onClick={() => checkDot(`dropdown-dot-${project.projectId}`)}
              >
                <MoreVertIcon />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu shadow bg-base-100 rounded-lg border"
              >
                {isEditable ? (
                  <>
                    <li className="flex w-full border-b">
                      <label
                        htmlFor="my-modal-manage"
                        onClick={() =>
                          checkEditProject(
                            `my-modal-manage-${project.projectId}`
                          )
                        }
                        className="cursor-pointer"
                      >
                        <div>
                          <img src={manage} alt="" />
                        </div>
                        <div>
                          <span>edit</span>
                        </div>
                      </label>
                    </li>
                    <li className="flex w-full border-b">
                      <label
                        onClick={() =>
                          checkEditProject(
                            `my-modal-manage-${project.projectId}`
                          )
                        }
                        className="cursor-not-allowed focus:outline-none disabled:opacity-75"
                      >
                        <div>
                          <img src={deleteIcon} alt="" />
                        </div>
                        <div>
                          <span className="text-red-600">delete</span>
                        </div>
                      </label>
                    </li>
                  </>
                ) : project.info.userInfo.username !== currentUser.userName ? (
                  <>
                    <li className="flex w-full border-b">
                      <label
                        onClick={() =>
                          checkEditProject(
                            `my-modal-manage-${project.projectId}`
                          )
                        }
                        className="cursor-not-allowed focus:outline-none disabled:opacity-75"
                      >
                        <div>
                          <img src={manage} alt="" />
                        </div>
                        <div>
                          <span>edit</span>
                        </div>
                      </label>
                    </li>
                    <li className="flex w-full border-b">
                      <label
                        onClick={() =>
                          checkEditProject(
                            `my-modal-manage-${project.projectId}`
                          )
                        }
                        className="cursor-not-allowed focus:outline-none disabled:opacity-75"
                      >
                        <div>
                          <img src={deleteIcon} alt="" />
                        </div>
                        <div>
                          <span className="text-red-600">delete</span>
                        </div>
                      </label>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex w-full border-b">
                      <label
                        htmlFor="my-modal-manage"
                        onClick={() =>
                          checkEditProject(
                            `my-modal-manage-${project.projectId}`
                          )
                        }
                        className="cursor-pointer"
                      >
                        <div>
                          <img src={manage} alt="" />
                        </div>
                        <div>
                          <span>edit</span>
                        </div>
                      </label>
                    </li>
                    <li className="flex w-full border-b">
                      <label
                        htmlFor={`my-modal-delete`}
                        onClick={() =>
                          checkEditProject(
                            `my-modal-manage-${project.projectId}`
                          )
                        }
                        className="cursor-pointer"
                      >
                        <div>
                          <img src={deleteIcon} alt="" />
                        </div>
                        <div>
                          <span className="text-red-600">delete</span>
                        </div>
                      </label>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* bottom lines */}
      <div className="h-[1.5px] mt-3 flex">
        <div className="w-full h-full grid grid-cols-4">
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-yellow-400"></div>
          <div className="w-full h-full bg-cyan-500"></div>
          <div className="w-full h-full bg-green-400"></div>
        </div>
      </div>

      {/* project name div */}
      <Link
        className="flex border-slate-400 justify-between mt-3"
        onClick={() => handleClick(project)}
      >
        <div className="flex flex-col">
          {/* project name */}
          <div className="flex flex-col">
            <div className="font-montserrat flex w-full items-center">
              {project.info?.projectInfo?.projectInfo?.isPublic ? (
                <div className="flex items-center">
                  <PublicOutlinedIcon className="mr-2 text-gray-500" />
                  <p className="text-sm text-gray-500 font-montserrat">
                    Public
                  </p>
                </div>
              ) : (
                <div className="flex items-center">
                  <LockOutlinedIcon className="mr-2 text-gray-500" />
                  <p className="text-sm text-gray-500 font-montserrat">
                    Private
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* url endpoints */}
          <div className="flex w-full my-2 items-center">
            <div className="mr-2">
              <InsertLinkIcon className="text-gray-500 rotate-45" />
            </div>
            {/* number of url endpoints */}
            <div className="text-sm text-gray-500 font-montserrat">
              <span>
                {project?.info?.projectInfo?.urlEndpoint} url endpoints
              </span>
            </div>
          </div>
          {/* last update time */}
          <div className="text-sm  text-gray-500 font-montserrat">
            <span>
              Last Update:{" "}
              {convertTimestampToDateLastUpdate(
                project?.info?.projectInfo?.projectInfo?.updatedDate
              ).toString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
