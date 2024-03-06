import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "aos/dist/aos.css";
import "../style/page_project.css";

import setting from "../asset/img/icon/setting.svg";
import bro1 from "../asset/img/Waiting-bro.svg";
import add from "../asset/img/icon/add.svg";
import plusBlack from "../asset/img/icon/plusBlack.svg";
import manage from "../asset/img/icon/manage.svg";
import apiKey from "../asset/img/icon/apiKey.svg";
import tokenIcon from "../asset/img/icon/tokenIcon.svg";
import leave from "../asset/img/icon/leave.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectApi,
  getAllFavoriteProjectsAPI,
  getAllMemberByProjectIdAPI,
  getProjectsApi,
  getProjectsApiKeyApi,
  getSortedFavoriteProjectsByDateApi,
  getSortedFavoriteProjectsByNameApi,
  getSortedGroupProjectsByDateApi,
  getSortedGroupProjectsByNameApi,
  getSortedProjectsByDateApi,
  getSortedProjectsByNameApi,
  postProjectApi,
} from "../redux/service/ProjectService";
import ProjectSlice, {
  getProjects,
  deleteProject,
  getFavoriteProjects,
  getGroupProjects,
  getSortedProjectsByDate,
  getSortedProjectsByName,
  getSortedGroupProjectsByName,
  getSortedGroupProjectsByDate,
  getSortedFavoriteProjectsByName,
  getSortedFavoriteProjectsByDate,
  updateFavoriteProject,
  updateGroupProject,
} from "../redux/slice/ProjectSlice";
import { Dropdown } from "react-daisyui";
import { faBullseye, fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  API_HEADER,
  BASE_URL,
  NotifyError,
  NotifyInfo,
  NotifySucess,
  shareLinkURL,
} from "../redux/Constants";
import ProjectCard from "./ProjectCard";
import { getListGroupProjectsApi } from "../redux/service/ListProjectService";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DatasetLinkedIcon from "@mui/icons-material/DatasetLinked";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyIcon from "@mui/icons-material/Key";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import noSelected from "../asset/img/Waiting-bro (1).svg";
import emptyProject from "../asset/img/Hand coding-rafiki.svg";
import emptyProject2 from "../asset/img/code1.svg";
import Spinners from "../components/Spinners";
import PopUpForInviteMemeber from "../components/project_page/PopUpForInviteMemeber";
import PopUpForCreateProject from "../components/project_page/PopUpForCreateProject";
import PopUpForTokenOption from "../components/project_page/PopUpForTokenOption";
import PopUpForApiKeyOption from "../components/project_page/PopUpForApiKeyOption";
import PopUpForEditProject from "../components/project_page/PopUpForEditProject";
import PopUpForDeleteAndLeaveProject from "../components/project_page/PopUpForDeleteAndLeaveProject";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PopUpForRemoveMember from "../components/project_page/PopUpForRemoveMember";
import { userId } from "../redux/service/UserService";
import { Box, Skeleton } from "@mui/material";

export default function ProjectPage() {

  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );

  const { projects } = useSelector((state) => state.projects);

  const sortedProjectByName = useSelector(
    (state) => state.projects.sortedProjectByName
  );

  const sortedProjectByDate = useSelector(
    (state) => state.projects.sortedProjectByDate
  );

  const favoriteProjects = useSelector(
    (state) => state.projects.favoriteProjects
  );
  const sortedFavoriteProjectByDate = useSelector(
    (state) => state.projects.sortedFavoriteProjectByDate
  );

  const sortedFavoriteProjectByName = useSelector(
    (state) => state.projects.sortedFavoriteProjectByName
  );
  const groupProjects = useSelector((state) => state.projects.groupProjects);

  const sortedGroupProjectByDate = useSelector(
    (state) => state.projects.sortedGroupProjectByDate
  );

  const sortedGroupProjectByName = useSelector(
    (state) => state.projects.sortedGroupProjectByName
  );

  const [selectedCard, setSelectedCard] = useState(null);
  const [projectMember, setProjectMember] = useState(null);

  const [activeProject, setActiveProject] = useState("myproject");

  const [orderBy, setOrderBy] = useState(false);
  const [sortTracking, setSortTracking] = useState(false);

  const [copyTextApiKey, setCopyTextApiKey] = useState("");

  const [isCopiedToken, setIsCopiedToken] = useState(false);

  const textRefGetApiToken = useRef(null);
  const textRefGetToken = useRef(null);

  let [isLoading, setIsLoading] = useState(false);

  //searchProjectByName
  const [resultsLimit, setResultsLimit] = useState(6);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [image, setImages] = useState([]);
  const [searchResultsProject, setSearchResultsProject] = useState([]);

  const [dropdownVisibleSetting, setDropdownVisibleSetting] = useState(
    localStorage.getItem("dropdownVisibleSetting") === "true" || false
  );

  const [isDelete, setIsDelete] = useState("");

  const [preId, setPreId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const [projectId, setProjectId] = useState("");

  const [isMyProject, setIsMyProject] = useState(true);
  const [isGroupProject, setIsGroupProject] = useState(false);
  const [isFavoriteProject, setIsFavoriteProject] = useState(false);

  const [projectName, setProjectName] = useState("");

  let [isOpen, setIsOpen] = useState(false);
  let [isOpen1, setIsOpen1] = useState(false);



  let [isOpenRemove, setIsOpenRemove] = useState(false)
  let [removeMember, setRemoveMember] = useState('')

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true)
  }
  
  
  function closeModal1() {
    setIsOpen1(false);
  }

  function openModal1() {
    setIsOpen1(true)
  }

  function closeModalRemove() {
    setIsOpenRemove(false)
  }
  function openModalRemove(member) {
    setRemoveMember(member)
    setIsOpenRemove(true)
  }

  function closeModalRemove() {
    setIsOpenRemove(false);
  }
  function openModalRemove(member) {
    setRemoveMember(member);
    setIsOpenRemove(true);
  }

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (windowHeight + scrollTop >= documentHeight - 200) {
        setHasScrolled(true);
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
          if (searchResultsProject.length < resultsLimit) {
            return;
          }
          setResultsLimit((prevLimit) => prevLimit + 6);
        }, 2000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [searchResultsProject, resultsLimit]);

  useEffect(() => {
    if (hasScrolled) {
      const timeoutId = setTimeout(() => {
        setResultsLimit((prevLimit) => prevLimit + 6);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [hasScrolled]);

  useEffect(() => {
    if (searchTerm === "") {
      setResultsLimit(6);
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() !== "") {
      if (isMyProject) {
        const filteredProject = projects.filter((item) =>
          item.info.projectInfo.projectInfo?.projectName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setSearchResultsProject(filteredProject);
        console.log("Filter Object: ", filteredProject);
        setOrderBy(false);
        const projectImages = filteredProject.map(
          (item) => item.info.userInfo?.imagePath
        );
        setImages(projectImages);
      }

      if (isGroupProject) {
        const filteredProject = groupProjects.filter((item) =>
          item.info.projectInfo.projectInfo?.projectName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setSearchResultsProject(filteredProject);
        console.log("Filter Object: ", filteredProject);
        setOrderBy(false);
        const projectImages = filteredProject.map(
          (item) => item.info.userInfo?.imagePath
        );
        setImages(projectImages);
      }
      if (isFavoriteProject) {
        const filteredProject = favoriteProjects.filter((item) =>
          item.info.projectInfo.projectInfo?.projectName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setSearchResultsProject(filteredProject);
        console.log("Filter Object: ", filteredProject);
        setOrderBy(false);
        const projectImages = filteredProject.map(
          (item) => item.info.userInfo?.imagePath
        );
        setImages(projectImages);
      }
    } else {
      setSearchResultsProject([]);
    }
    setHasScrolled(false);
  };

  const checkSort = () => {
    const dropdown = document.getElementById("dropdown-sort");
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };

  const checkSetting = () => {
    setIsDelete("leave");
    if (selectedCard) {
      const dropdown = document.getElementById(
        `dropdown-setting-${selectedCard.projectId}`
      );
      dropdown.classList.toggle("hidden");
      setDropdownVisibleSetting(!dropdownVisibleSetting);
    }
  };
  const [isLeave, setIsLeave] = useState(false);
  useEffect(() => {
    getAllMemberByProjectIdAPI(selectedCard?.projectId).then((response) => {
      let canLeave =
        response.data.payload.userData.filter(
          (member) =>
            member.groupRole === "OWNER" &&
            currentUser.userName === member.username
        )[0]?.username == currentUser.userName;
      setIsLeave(canLeave);
      console.log("respone member card", canLeave);
    });
  }, [selectedCard]);
  const handleCardInfo = (dataFromChild) => {
    setSelectedCard(dataFromChild);
    // console.log("Selected card : ", dataFromChild);
    setProjectId(dataFromChild.projectId);
    getProjectsApiKeyApi(dataFromChild.projectId).then((res) => {
      if (res.data?.payload?.apiKey === null) {
        setCopyTextApiKey("No ApiKey for public project");
      }
      setCopyTextApiKey(res.data?.payload?.apiKey);
      console.log("ApiKey Response: ", res.data.payload.apiKey);
    });
  };

  const handleCardMembers = (dataFromChild) => {
    setProjectMember(dataFromChild);
  };

  const handleDotData = (dataFromChild) => {
    setIsDelete("delete");
    setDeleteId(dataFromChild);
    let projectId = dataFromChild.replace("dropdown-dot-", "my-modal-manage-");
    setPreId(projectId);
  };

  useEffect(() => {
    if (isMyProject) {
      setIsLoading(true);
      getProjectsApi().then((data) => {
        setIsLoading(false);
        dispatch(getProjects(data.data.payload));
      });
    } else if (isGroupProject) {
      setIsLoading(true);
      getListGroupProjectsApi().then((data) => {
        setIsLoading(false);
        dispatch(getGroupProjects(data.data.payload));
      });
      // console.log("useEffect Group project");
    } else if (isFavoriteProject) {
      setIsLoading(true);
      getAllFavoriteProjectsAPI().then((data) => {
        // console.log("F: ", data.data.payload);
        setIsLoading(false);
        dispatch(getFavoriteProjects(data.data.payload));
      });
      console.log("useEffect Favorite project: ", favoriteProjects);
    }
  }, [isMyProject, isGroupProject, isFavoriteProject]);

  const handleMyProjectClick = (active) => {
    setOrderBy(false);
    setIsMyProject(true);
    setIsFavoriteProject(false);
    setIsGroupProject(false);
    setActiveProject(active);
  };

  const handleGroupProjectClick = (active) => {
    setOrderBy(false);
    setIsMyProject(false);
    setIsFavoriteProject(false);
    setIsGroupProject(true);
    setActiveProject(active);
  };

  const handleFavoriteProjectClick = (active) => {
    setOrderBy(false);
    setIsMyProject(false);
    setIsFavoriteProject(true);
    setIsGroupProject(false);
    setActiveProject(active);
  };

  const sortAZHandler = () => {
    setOrderBy(!orderBy);
    if (isMyProject) {
      getSortedProjectsByNameApi().then((data) => {
        dispatch(getSortedProjectsByName(data.data.payload));
      });
      console.log("sort My project: ", sortedProjectByName);
    } else if (isGroupProject) {
      getSortedGroupProjectsByNameApi().then((data) => {
        dispatch(getSortedGroupProjectsByName(data.data.payload));
      });
      console.log("sort Group project: ", sortedGroupProjectByName);
    } else if (isFavoriteProject) {
      getSortedFavoriteProjectsByNameApi().then((data) => {
        console.log("data: ", data.data.payload);
        dispatch(getSortedFavoriteProjectsByName(data.data.payload));
      });

      // setNewData(sortedFavoriteProjectByName);
      console.log("sort Favorite project: ", sortedFavoriteProjectByName);
    }
    setSortTracking(!sortTracking);
  };

  const sortDateHandler = () => {
    setOrderBy(!orderBy);

    if (isMyProject) {
      getSortedProjectsByDateApi().then((data) => {
        console.log("data: ", data.data.payload);
        dispatch(getSortedProjectsByDate(data.data.payload));
      });

      // setNewData(sortedProjectByDate)
      console.log("sort My project: ", sortedProjectByDate);
    } else if (isGroupProject) {
      getSortedGroupProjectsByDateApi().then((data) => {
        console.log("data: ", data.data.payload);
        dispatch(getSortedGroupProjectsByDate(data.data.payload));
      });

      // setNewData(sortedGroupProjectByDate);
      console.log("sort Group project: ", sortedGroupProjectByDate);
    } else if (isFavoriteProject) {
      getSortedFavoriteProjectsByDateApi().then((data) => {
        console.log("data: ", data.data.payload);
        dispatch(getSortedFavoriteProjectsByDate(data.data.payload));
      });
      // setNewData(sortedFavoriteProjectByName);
      console.log("sort Favorite project: ", sortedFavoriteProjectByDate);
    }
    setSortTracking(!sortTracking);
  };


  const handleIsLoading = (loading) => {
    setIsLoading(loading)
  }

  const textToCopyRef = useRef(null);
  const shareLink = (projectId) => {
    userId(currentUser.userName).then((response) => {
      let userId = response.data.payload;
      let shareLink = `${shareLinkURL}/${userId}/${projectId}`;
      
      // Copy the shareLink to clipboard
      navigator.clipboard.writeText(shareLink)
        .then(() => {
          console.log('Text copied to clipboard:', shareLink);
        })
        .catch((error) => {
          console.error('Error copying text to clipboard:', error);
        });
    });
  }

  return (
    <Box minHeight="100vh" bgcolor="white" p={4}>
       {isLoading ? ( <Box p={4}>
        <div className=' flex justify-center items-center'>
    <div className="bg-white shadow-md border laptop:w-[20%] mt-10 ml-20 rounded-lg flex flex-col px-4 py-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="laptop:mr-3">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-montserrat line-clamp-1">
                <Skeleton variant="text" width={100} height={20} />
              </span>
            </div>
          </div>
          <div className="flex items-center self-start">
            <div className="laptop:mx-2 ipad-pro:mx-1 ">
              <button>
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
            </div>
            <div className="dropdown">
              <button
                tabIndex="0"
                className="text-gray-400"
                id="dropdownDefault-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                data-dropdown-toggle="dropdown-dot-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                type="button"
              >
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1.5px] mt-3 flex">
        <div className="w-full h-full grid grid-cols-4">
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-yellow-400"></div>
          <div className="w-full h-full bg-cyan-500"></div>
          <div className="w-full h-full bg-green-400"></div>
        </div>
      </div>
      <a className="flex border-slate-400 justify-between mt-3" href="">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="font-montserrat flex w-full items-center">
              <div className="flex items-center">
                <Skeleton variant="rectangular" width={24} height={24} />
                <div className="ml-2 hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
              </div>
            </div>
          </div>
          <div className="flex w-full my-2 items-center">
            <div className="mr-2">
              <Skeleton variant="rectangular" width={24} height={24} />
            </div>
            <div className=" hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
          </div>
          <div className=" hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
        </div>
      </a>
      
      
    </div>
    <div className="bg-white shadow-md border laptop:w-[20%] mt-10 ml-20 rounded-lg flex flex-col px-4 py-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="laptop:mr-3">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className=" hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-montserrat line-clamp-1">
                <Skeleton variant="text" width={100} height={20} />
              </span>
            </div>
          </div>
          <div className="flex items-center self-start">
            <div className="laptop:mx-2 ipad-pro:mx-1 ">
              <button>
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
            </div>
            <div className="dropdown">
              <button
                tabIndex="0"
                className="text-gray-400"
                id="dropdownDefault-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                data-dropdown-toggle="dropdown-dot-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                type="button"
              >
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1.5px] mt-3 flex">
        <div className="w-full h-full grid grid-cols-4">
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-yellow-400"></div>
          <div className="w-full h-full bg-cyan-500"></div>
          <div className="w-full h-full bg-green-400"></div>
        </div>
      </div>
      <a className="flex border-slate-400 justify-between mt-3" href="">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="font-montserrat flex w-full items-center">
              <div className="flex items-center">
                <Skeleton variant="rectangular" width={24} height={24} />
              <div className="ml-2 font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
              </div>
            </div>
          </div>
          <div className="flex w-full my-2 items-center">
            <div className="mr-2">
              <Skeleton variant="rectangular" width={24} height={24} />
            </div>
            <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
          </div>
          <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
        </div>
      </a>
      
      
    </div>
    <div className="bg-white shadow-md border laptop:w-[20%] mt-10 ml-20 rounded-lg flex flex-col px-4 py-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="laptop:mr-3">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className=" hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-montserrat line-clamp-1">
                <Skeleton variant="text" width={100} height={20} />
              </span>
            </div>
          </div>
          <div className="flex items-center self-start">
            <div className="laptop:mx-2 ipad-pro:mx-1 ">
              <button>
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
            </div>
            <div className="dropdown">
              <button
                tabIndex="0"
                className="text-gray-400"
                id="dropdownDefault-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                data-dropdown-toggle="dropdown-dot-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                type="button"
              >
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
           
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1.5px] mt-3 flex">
        <div className="w-full h-full grid grid-cols-4">
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-yellow-400"></div>
          <div className="w-full h-full bg-cyan-500"></div>
          <div className="w-full h-full bg-green-400"></div>
        </div>
      </div>
      <a className="flex border-slate-400 justify-between mt-3" >
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="font-montserrat flex w-full items-center">
              <div className="flex items-center">
                <Skeleton variant="rectangular" width={24} height={24} />
                <div className=" ml-2 font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
              </div>
            </div>
          </div>
          <div className="flex w-full my-2 items-center">
            <div className="mr-2">
              <Skeleton variant="rectangular" width={24} height={24} />
            </div>
            <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
          </div>
          <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
        </div>
      </a>
      
      
    </div>
    </div>
        </Box>):( <Box p={4}>
          <div className="bg-[#F2F4F7] pt-8 laptop:px-32 ipad-pro:px-24 12pro:px-8 pb-8">
      {/* project page content */}
      <div className="font-montserrat">
        <div className="laptop:grid laptop:grid-cols-12 ipad-pro:grid ipad-pro:grid-cols-12 rounded-lg gap-4">
          <div className="w-full flex justify-around ipad-pro:col-span-8 laptop:col-span-9">
            {/* project is empty content */}
            <div className="w-full">
              {/* links  */}
              <NavLink className="w-full mb-8 bg-white rounded-lg shadow items-center px-8 py-4 cursor-default uppercase laptop:flex font-black font-poppins laptop:text-base ipad-pro:flex ipad-pro:text-base 12pro:flex 12pro:text-xs">
                {/* left links  */}

                <div className="w-[80%] flex 12pro:w-full justify-between">
                  {/* my project link */}
                  <Link
                    to={""}
                    className={
                      activeProject === "myproject"
                        ? "bg-dark-head text-white py-1 px-4 rounded-lg"
                        : "py-1 px-4 rounded-lg"
                    }
                    onClick={() => handleMyProjectClick("myproject")}
                  >
                    <div className="flex items-center">
                      <ArticleOutlinedIcon className="mr-1" />
                      <span className="capitalize font-normal text-sm">
                        my project
                      </span>
                    </div>
                  </Link>
                  {/* group project link */}
                  <Link
                    to={""}
                    className={
                      activeProject === "gproject"
                        ? "bg-dark-head text-white py-1 px-4 rounded-lg"
                        : "py-1 px-4 rounded-lg"
                    }
                    onClick={() => handleGroupProjectClick("gproject")}
                  >
                    <div className="flex items-center">
                      <GroupsOutlinedIcon className="mr-1" />
                      <span className="capitalize font-normal text-sm">
                        group project
                      </span>
                    </div>
                  </Link>
                  {/* favorite link */}
                  <Link
                    to={""}
                    className={
                      activeProject === "favoriteproject"
                        ? "bg-dark-head text-white py-1 px-4 rounded-lg"
                        : "py-1 px-4 rounded-lg"
                    }
                    onClick={() =>
                      handleFavoriteProjectClick("favoriteproject")
                    }
                  >
                    <div className="flex items-center">
                      <BookmarkAddedOutlinedIcon className="mr-1" />
                      <span className="capitalize font-normal text-sm">
                        favorite
                      </span>
                    </div>
                  </Link>
                </div>
                {/* right links */}
                <div className="laptop:w-[55%] ipad-pro:w-[80%] flex justify-end items-center">
                  {/* search input */}
                  <div className="mr-5">
                    <form>
                      <label
                        for="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only"
                      >
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <ManageSearchIcon clas />
                        </div>
                        <input
                          onChange={handleSearch}
                          value={searchTerm}
                          type="text"
                          id="default-search"
                          className="block w-full pl-10 text-sm focus:border-0  rounded-lg focus:ring-newYellow"
                          placeholder="Search..."
                          required
                        />
                      </div>
                    </form>
                  </div>

                  {/* sort icon */}
                  <div className="dropdown">
                    <label
                      id="dropdown"
                      onClick={checkSort}
                      data-dropdown-toggle="dropdown-sort"
                      tabIndex={0}
                      className="focus:ring-2 focus:ring-newYellow cursor-pointer rounded hover:text-gray-500"
                    >
                      <SortIcon className="" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content border menu shadow bg-base-100 rounded-lg"
                    >
                      <li className="flex w-full border-b">
                        <label
                          type="button"
                          onClick={sortAZHandler}
                          for="alphabet"
                          className="text-sm flex font-semibold font-poppins text-gray-900 w-full delay-150 cursor-pointer"
                        >
                          <SortByAlphaIcon />
                          <span className="text-navbar text-sm capitalize">
                            alphabet
                          </span>
                        </label>
                      </li>

                      <li className="flex w-full">
                        <label
                          onClick={sortDateHandler}
                          for="date"
                          className="text-sm flex font-semibold font-poppins text-gray-900 w-full delay-150 cursor-pointer"
                        >
                          <EventNoteIcon />
                          <span className="text-navbar text-sm capitalize">
                            Date
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center bg-whitesmoke rounded-lg"></div>
                </div>
              </NavLink>

              {/* middle content of my project */}

              {/* button new project */}
              {isLoading ? (
                <div className="w-full h-[630px] flex items-center justify-center">
                  <Spinners />
                </div>
        
              ) : projects.length > 0 ? (
                <>
                  <div className="p-8 shadow bg-white min-h-[630px] rounded-lg">
                    <div className="">
                      <div className="">
                        <div className="w-full h-full laptop:grid laptop:grid-cols-3 laptop:gap-7 ipad-pro:grid ipad-pro:grid-cols-2 ipad-pro:gap-5">
                          <button
                            onClick={openModal1}
                            className={
                              activeProject === "favoriteproject" ||
                                activeProject === "gproject"
                                ? "hidden"
                                : "flex justify-center items-center border-[3px] border-dashed rounded-lg text-center"
                            }
                          >
                            <div className="flex flex-col items-center cursor-pointer">
                              <AddCircleIcon
                                className="text-purple-head"
                                sx={{ fontSize: 50 }}
                              />
                              <span className="text-gray-600 font-bold">
                                Add new project
                              </span>
                            </div>
                          </button>
                          {searchTerm === ""
                            ? orderBy === true
                              ? searchTerm === ""
                                ? projects.map((project) => (
                                    <ProjectCard
                                      project={project}
                                      cardInfo={handleCardInfo}
                                      cardMembers={handleCardMembers}
                                      dotData={handleDotData}
                                    />
                                  ))
                                : searchResultsProject.map((project) => (
                                    <ProjectCard
                                      project={project}
                                      cardInfo={handleCardInfo}
                                      cardMembers={handleCardMembers}
                                      dotData={handleDotData}
                                    />
                                  ))
                              : isMyProject
                              ? projects.map((project) => (
                                  <ProjectCard
                                    project={project}
                                    cardInfo={handleCardInfo}
                                    cardMembers={handleCardMembers}
                                    dotData={handleDotData}
                                  />
                                ))
                              : isGroupProject
                              ? groupProjects.map((project) => (
                                  <ProjectCard
                                    project={project}
                                    cardInfo={handleCardInfo}
                                    cardMembers={handleCardMembers}
                                    dotData={handleDotData}
                                  />
                                ))
                              : favoriteProjects.map((project) => (
                                  <ProjectCard
                                    project={project}
                                    cardInfo={handleCardInfo}
                                    cardMembers={handleCardMembers}
                                    dotData={handleDotData}
                                  />
                                ))
                            : orderBy === true
                            ? isMyProject
                              ? projects.map((project) => (
                                  <ProjectCard
                                    project={project}
                                    cardInfo={handleCardInfo}
                                    cardMembers={handleCardMembers}
                                    dotData={handleDotData}
                                  />
                                ))
                              : isGroupProject
                              ? groupProjects.map((project) => (
                                  <ProjectCard
                                    project={project}
                                    cardInfo={handleCardInfo}
                                    cardMembers={handleCardMembers}
                                    dotData={handleDotData}
                                  />
                                ))
                              : favoriteProjects.map((project) => (
                                  <ProjectCard
                                    project={project}
                                    cardInfo={handleCardInfo}
                                    cardMembers={handleCardMembers}
                                    dotData={handleDotData}
                                  />
                                ))
                            : searchResultsProject.map((project) => (
                                <ProjectCard
                                  project={project}
                                  cardInfo={handleCardInfo}
                                  cardMembers={handleCardMembers}
                                  dotData={handleDotData}
                                />
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : //------------------- (empty)-----------------
              isLoading ? (
                <Spinners />
              ) : (groupProjects.length == 0 || favoriteProjects.length == 0) &&
                activeProject !== "myproject" ? (
                <div className="flex bg-white rounded-lg shadow 12pro:h-[700px] ipad-pro:h-[600px] laptop:h-[630px] text-center justify-center items-center">
                  <div className="flex flex-col">
                    <img src={emptyProject2} />
                    <span className="text-gray-500 font-poppins text-base">
                      Your project repository is empty...
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex bg-white font-poppins rounded-lg shadow 12pro:h-[700px] ipad-pro:h-[600px] laptop:h-[630px] text-center justify-center items-center">
                  <div className="flex flex-col">
                    <span className="font-gray-500 font-medium">
                      Your project repository is empty...
                    </span>
                    <div className="mt-5">
                      <button
                        onClick={openModal1}
                        className="flex justify-center py-1.5 items-center border-[3px] border-dashed rounded-lg text-center"
                      >
                        <div className="flex flex-col items-center cursor-pointer">
                          <AddCircleIcon
                            className="text-purple-head"
                            sx={{ fontSize: 50 }}
                          />
                          <span className="text-gray-600 font-bold">
                            Add new project
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* right bar */}
          {selectedCard && (
            <div className="flex ipad-pro:col-span-4 laptop:col-span-3 12pro:w-full 12pro:hidden ipad-pro:inline-flex laptop:inline-flex 12pro:h-[300px] laptop:w-full laptop:h-full h-full laptop:justify-end ipad-pro:w-full ipad-pro:h-full ipad-pro:justify-end">
              <div className="flex w-full ml-3 justify-end">
                {/* when click 1 time (double click go to view group project page if public) on project name card this will show */}
                <div className="h-full text-sm w-full flex flex-col">
                  {/* profile project */}
                  <div className="shadow bg-white rounded-lg">
                    <div className="p-4">
                      <div className="">
                        {/* setting icon */}
                        <div className="flex justify-end w-full relative">
                          <Link
                            id={`dropdownDefault`}
                            data-dropdown-toggle={`dropdown-setting-${selectedCard.projectId}`}
                            className="text-white absolute focus:outline-none font-medium hover:scale-110 rounded-lg text-sm py-1 text-center inline-flex items-center"
                            type="button"
                            onClick={() => {
                              checkSetting();
                            }}
                          >
                            <img
                              className="h-5"
                              src={setting}
                              alt="iconSetting"
                            />
                          </Link>
                        </div>
                        {/* dropdown show for setting icon */}
                        <div
                          id={`dropdown-setting-${selectedCard.projectId}`}
                          className="hidden relative"
                        >
                          <ul
                            className="space-y-2 z-50 right-0 top-7 absolute text-sm capitalize laptop:w-[70%] bg-white rounded-lg border shadow font-montserrat font-light"
                            id={`dropdownDefault`}
                          >
                            {/* manage project option */}
                            <div className="grid grid-rows-1 gap-2 border-b-2 border-b-slate-500 p-3">
                              <label
                                htmlFor="my-modal-manage"
                                className="hover:scale-110 hover:cursor-pointer text-center w-full flex items-center justify-center"
                              >
                                <div>
                                  <DriveFileRenameOutlineIcon className="mr-1" />
                                </div>
                                <div>
                                  <span>manage project</span>
                                </div>
                              </label>

                              <button
                                onClick={()=>{shareLink(selectedCard.projectId)}}
                                className="hover:scale-110 hover:cursor-pointer text-center w-full flex items-center justify-center"
                              >
                                <div>
                                  <ReplyOutlinedIcon className="mr-1" />
                                </div>
                                <div>
                                  <span>Share link</span>
                                </div>
                              </button>

                            </div>

                            {/* api key and token options */}
                            <div className="border-b-2 border-b-slate-500">
                              {/* api key option */}
                              {selectedCard.info.projectInfo.projectInfo
                                .isPublic ? (
                                <>
                                  <label className="cursor-not-allowed focus:outline-none disabled:opacity-75 p-3 text-sm text-center w-full flex items-center">
                                    <div>
                                      <KeyIcon className="mr-1" />
                                    </div>
                                    <div>
                                      <span>aPI key</span>
                                    </div>
                                  </label>
                                  {/* token option */}
                                  <label className="cursor-not-allowed focus:outline-none disabled:opacity-75 p-3 text-sm text-center w-full flex items-center">
                                    <div>
                                      <LockOpenIcon className="mr-1" />
                                    </div>
                                    <div>
                                      <span>token</span>
                                    </div>
                                  </label>
                                </>
                              ) : (
                                <>
                                  <label
                                    htmlFor="my-modal-apiKey"
                                    className="p-3 text-sm text-center w-full flex items-center hover:scale-110 hover:cursor-pointer"
                                  >
                                    <div>
                                      <img
                                        className="mr-2"
                                        src={apiKey}
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <span>aPI key</span>
                                    </div>
                                  </label>
                                  {/* token option */}
                                  <label
                                    htmlFor="my-modal-token"
                                    className="p-3 text-sm text-center w-full flex items-center hover:scale-110 hover:cursor-pointer"
                                  >
                                    <div>
                                      <img
                                        className="mr-2"
                                        src={tokenIcon}
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <span>token</span>
                                    </div>
                                  </label>
                                </>
                              )}
                            </div>

                            {/* leave group option */}
                            <div className="">
                              {isLeave ? (
                                <>
                                  <label
                                    htmlFor="my-modal-leave"
                                    className="p-3 text-sm text-center w-full flex items-center text-red-500"
                                  >
                                    <div>
                                      <LogoutIcon className="mr-1" />
                                    </div>
                                    <div>
                                      <span>leave group</span>
                                    </div>
                                  </label>
                                </>
                              ) : (
                                <>
                                  <label className="cursor-not-allowed focus:outline-none disabled:opacity-75 p-3 text-center w-full flex items-center text-red-500">
                                    <div>
                                      <LogoutIcon className="mr-1" />
                                    </div>
                                    <div>
                                      <span>leave group</span>
                                    </div>
                                  </label>
                                </>
                              )}
                            </div>
                          </ul>
                        </div>

                        {/* profile */}
                        <div className="flex flex-col items-center">
                          <div className="mb-1">
                            {isLocalImageStatus ? (
                              <div className="style-pf border-l-4 border-l-transparent border-r-4 border-t-4  border-b-4 p-1 border-dark-head rounded-full -rotate-45">
                                <img
                                  src={currentUser.profileImages}
                                  alt="profile"
                                  className="w-24 h-24 right-2 rounded-full object-cover rotate-45"
                                />
                              </div>
                            ) : currentUser?.profileImages != null ? (
                              <div className="style-pf border-l-4 border-l-transparent border-r-4 border-t-4 border-b-4 p-1 border-dark-head rounded-full -rotate-45">
                                <img
                                  src={`http://localhost:8080/api/file-images?fileName=${currentUser?.profileImages}`}
                                  alt="profile"
                                  className="w-24 h-24 rounded-full object-cover rotate-45"
                                />
                              </div>
                            ) : (
                              <div className="style-pf">
                                <div className="noImg w-24 h-24 ring-2 rounded-full bg-orange-500 text-white border-4 flex justify-center items-center text-2xl">
                                  {currentUser.userName?.charAt(0)}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* project name and date */}
                          <div className="flex flex-col text-center mt-2 text-base font-poppins font-black text-purple-head">
                            <div className="flex items-center">
                              <span>
                                {selectedCard.info?.projectInfo?.projectInfo
                                  .projectName.length <= 5
                                  ? selectedCard.info?.projectInfo?.projectInfo
                                    .projectName
                                  : selectedCard.info?.projectInfo?.projectInfo.projectName.slice(
                                    0,
                                    10
                                  )}
                              </span>
                              <FiberManualRecordIcon
                                className="mx-1"
                                sx={{ fontSize: 6 }}
                              />
                              {selectedCard.info?.projectInfo.projectInfo
                                ?.isPublic ? (
                                <PublicOutlinedIcon sx={{ fontSize: 16 }} />
                              ) : (
                                <LockOutlinedIcon sx={{ fontSize: 16 }} />
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {"@" + selectedCard?.info?.userInfo?.username}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* url endpoints and controllers */}
                      <div className="flex flex-col my-3 mt-4">
                        {/* url endpoints */}
                        <div className="flex items-center">
                          <div className="mr-2">
                            <InsertLinkIcon className="text-gray-500 rotate-45" />
                          </div>
                          <span>
                            {projectMember?.countEndPoint}{" "}
                            {projectMember?.countEndPoint >= 2
                              ? " url-endpoints"
                              : "url-endpoint"}
                          </span>
                        </div>
                        {/* controllers */}
                        <div className="flex items-center mt-1.5">
                          <div className="mr-2">
                            <DatasetLinkedIcon className="text-gray-500" />
                          </div>
                          <span>
                            {projectMember?.countController}{" "}
                            {projectMember?.countEndPoint >= 2
                              ? " controllers"
                              : "controller"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* members */}
                  <div className="mt-5 pt-1 bg-white rounded-lg shadow h-full">
                    <div className="">
                      {/*number of members and icon add member */}
                      <div className="flex mt-3 px-4 justify-between items-center pb-3">
                        <div className="flex items-center">
                          <div className="font-black font-poppins">
                            <div className="text-base flex">
                              <PeopleOutlineIcon className="mr-2" />
                              <div>
                                <span>Team members</span>
                                <p className="text-gray-500 text-xs opacity-80 mt-1">
                                  Total:{" "}
                                  {projectMember?.countMember <= 9 ? "0" : ""}
                                  {projectMember?.countMember}{" "}
                                  {projectMember?.countMember >= 2
                                    ? " members"
                                    : " member"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* members in project */}
                      <div className="flex flex-col">

                        <button
                          onClick={openModal}
                          className="cursor-pointer py-2 text-sm flex items-center my-3 border-b border-t w-full border-l-4 border-l-transparent hover:border-l-4 hover:border-l-newYellow hover:bg-yellow-opacity transition delay-100"
                        >
                          <div className="flex items-center">
                            <AddCircleOutlineIcon className="mx-3" />
                            <span className="ml-1">Invite</span>
                          </div>
                        </button>
                        {projectMember?.userData.map((member) => (
                          <div className="flex items-center border-l-4 border-transparent hover:border-l-4 hover:border-l-newYellow hover:bg-yellow-opacity hover:text-dark-head transition delay-100">
                            <div className="my-2">
                              <div className="mx-3">
                                {member?.imagePath !== null ? (
                                  member?.imagePath.startsWith("https://") ||
                                    member?.imagePath.startsWith("http://") ? (
                                    <div className="profile m-auto-full h-6 w-6 bg-red-600 text-white flex justify-center items-center border rounded-full">
                                      <img
                                        src={member?.imagePath}
                                        alt="profile"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    </div>
                                  ) : member?.imagePath != null ? (
                                    <>
                                      <div className="profile m-auto-full h-6 w-6 bg-red-600 text-white flex justify-center items-center border rounded-full">
                                        <img
                                          src={`http://localhost:8080/api/file-images?fileName=${member?.imagePath}`}
                                          alt="profile"
                                          className="w-6 h-6 rounded-full object-cover"
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <div className="profile m-auto-full h-6 w-6 bg-red-600 text-white flex justify-center items-center border rounded-full">
                                      {member?.username
                                        ?.charAt(0)
                                        .toUpperCase()}
                                    </div>
                                  )
                                ) : (
                                  <div className="profile m-auto-full h-6 w-6 bg-red-600 text-white flex justify-center items-center border rounded-full">
                                    {member?.username?.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {
                              member.groupRole === "OWNER" ? (
                                <div className="flex w-full justify-between pr-3">
                                  <span>{member?.username}</span>

                                <span className="font-semibold text-xs">
                                  Owner
                                </span>
                              </div>
                            ) : (
                              <div className="flex w-full justify-between pr-3">
                                <span>{member?.username}</span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    openModalRemove(member.username, projectId)
                                  }
                                >
                                  <PersonRemoveOutlinedIcon
                                    className="text-gray-500"
                                    sx={{ fontSize: 18 }}
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* when no project select */}
          {!selectedCard && (
            <div className="flex ipad-pro:col-span-4 laptop:col-span-3 12pro:w-full 12pro:hidden ipad-pro:inline-flex laptop:inline-flex 12pro:h-[300px] laptop:w-full laptop:h-full h-full laptop:justify-end ipad-pro:w-full ipad-pro:h-full ipad-pro:justify-end">
              <div className="flex flex-col w-full ml-3 shadow bg-white rounded-lg pt-6 items-center">
                <img
                  src={noSelected}
                  alt="selected"
                  className="w-10/12"
                />
                <p className="text-center mt-2 text-gray-500 font-medium">
                  No Project Selected
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* popUp for edit card project and manage project option in setting icon */}
      <input type="checkbox" id="my-modal-manage" className="modal-toggle" />
      <div className="modal font-montserrat">
        <PopUpForEditProject
          projectDotId={preId}
          isMyProject={isMyProject}
          isGroupProject={isGroupProject}
          isFavoriteProject={isFavoriteProject}
        />
      </div>

      {/* popUp for delete card project */}
      <input type="checkbox" id={`my-modal-${isDelete}`} className="modal-toggle" />
      <div className="modal font-montserrat">
        <PopUpForDeleteAndLeaveProject
          title={isDelete}
          htmlFor={`my-modal-${isDelete}`}
          projectId={preId}
        />
      </div> *

      {/* popUp for api key option in setting icon */}
      <input type="checkbox" id="my-modal-apiKey" className="modal-toggle" />
      <div className="modal">
        <PopUpForApiKeyOption project={selectedCard} />
      </div>
      {/* popUp for token option in setting icon */}
      <input type="checkbox" id="my-modal-token" className="modal-toggle" />
      <div className="modal font-montserrat">
        <PopUpForTokenOption />
      </div>
      {/* popUp for leave group option in setting icon */}
      {/* <input type="checkbox" id={`my-modal-${isDelete}`} className="modal-toggle" />
      <div className="modal font-montserrat">
        <PopUpForDeleteAndLeaveProject
          title="leave"
          buttonText="Leave"
          htmlFor="my-modal-leave"
          projectId={preId}
        />
      </div> */}
      {/* popUp for invite members */}
      {selectedCard && (
        <div className="modal font-montserrat">
          <PopUpForInviteMemeber
            project={selectedCard}
            memberInfo={handleCardMembers}
            openModal={openModal}
            closeModal={closeModal}
            isOpen={isOpen}
          />
        </div>
      )}
      {/* popUp for create new project */}
      <input type="checkbox" id="my-new-project" className="modal-toggle" />
      <div className="modal font-montserrat">
        <PopUpForCreateProject isOpen1={isOpen1} closeModal1={closeModal1} loading={handleIsLoading} />
      </div>
      {/* for remove member */}
      <PopUpForRemoveMember
        projectId={projectId}
        setProjectMember={setProjectMember}
        removeMember={removeMember}
        closeModal={closeModalRemove}
        isOpen={isOpenRemove}
      />
    </div>
        </Box>)}
    </Box>
  );
}
