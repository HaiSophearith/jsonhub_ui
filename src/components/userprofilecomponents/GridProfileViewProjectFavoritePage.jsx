import React, { useState } from "react";
import favoriteGold from "../../asset/icon/favorite-solid.svg";
import dot_icon from "../../asset/icon/Dot_icon.svg";
import link_icon from "../../asset/icon/copy-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import start_gray_icon from "../../asset/icon/start_gray.svg";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import manage from "../../asset/img/icon/manage.svg";
import deleteIcon from "../../asset/img/icon/deleted.svg";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import favoriteGolds from "../../asset/img/icon/favorite.svg";
import favoriteGrays from "../../asset/img/icon/favoriteGray.svg";

import { addOrRemoveProjectToFavorite} from "../../redux/slice/ProjectSlice";
import { addOrRemoveProjectToFavoriteAPI } from "../../redux/service/ProjectService";
import { instance } from "../../redux/service/InstanceHeader";
import { useEffect } from "react";
export default function GridProfileViewProjectFavoritePage({
  GridProjectFavorite,dotData
}) {


  const [favorite, setFavorite] = useState(true);
  const [checkRole,setCheckRole] = useState('')
  const dispatch = useDispatch()
  // handle favorite
  const handleFavorite = () => {
    setFavorite(!favorite);
  };
  // view project
  const navigate = useNavigate();
  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );
  useEffect(()=>{
    instance.get(`projects/role/${GridProjectFavorite.projectId}`).then((response)=>{
      setCheckRole(response.data.payload);
    }).catch(()=>{
      setCheckRole("VIEWER")
    })
},[])

  if(!localStorage.getItem("recentlyFavoriteProject"))
  localStorage.setItem("recentlyFavoriteProject",JSON.stringify([]));

  const handleClick = (project) => {
    const newProjectName = project.info?.projectInfo?.projectInfo?.projectName;
    const newObj = { recentlyProjectName: newProjectName };
    const previous = [...JSON.parse(localStorage.getItem("recentlyFavoriteProject"))]
    var check = true;
    previous.forEach((item,index)=>{
      if(item.recentlyProjectName==newProjectName){
        check= false;
      }
    })
    if(check)localStorage.setItem("recentlyFavoriteProject",JSON.stringify([...previous,newObj]))
  };

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.removeItem("recentlyFavoriteProject");
    }, 3 * 60 * 60 * 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);

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

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(Date.UTC(...timestamp));
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear().toString();
    return `${month}/${day}/${year}`;
  };

  const [imageFavoriteSrc, setImageSrc] = useState(favoriteGrays);

  const favoriteIconClickHandler = (id) => {
    addOrRemoveProjectToFavoriteAPI(id).then((projectId) => {
      console.log("Add to favorite: ", projectId);
      dispatch(addOrRemoveProjectToFavorite(projectId));
    });
    if (imageFavoriteSrc === favoriteGrays) {
      setImageSrc(favoriteGolds);
    } else {
      setImageSrc(favoriteGrays);
      // addOrRemoveProjectToFavoriteAPI(id)
      //   .then((projectId) => {
      //     console.log("Add to favorite: ", projectId);
      //     dispatch(addOrRemoveProjectToFavorite(projectId));
      //   });
      //   addOrRemoveProjectToFavoriteAPI(id)
    }
  };
  const favoriteProjects = useSelector(
    (state) => state.projects.favoriteProjects
  );

  const [preId, setPreId] = useState("");
  const checkDot = (dropdownId) => {
    console.log("CheckingID: ",dropdownId)
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
  };

  return (
    <div>
    {
      GridProjectFavorite === undefined ? (
        
        null
      
    ) : (
      <div className=" bg-white shadow-md border laptop:w-full rounded-lg flex flex-col px-4 py-4">
      {/* profile user create project */}
      <div className="">
        {/* left */}
        <div className="flex items-center justify-between">
          {/* profile */}
          <div>
            <div className="laptop:mr-3">
              {isLocalImageStatus ? (
                <Link
                to={`/profile/${GridProjectFavorite?.info?.userInfo?.username}`}>
                <img
                  src={GridProjectFavorite?.info?.userInfo?.imagePath}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                /></Link>
              ) : GridProjectFavorite?.info?.userInfo?.imagePath != null ? (
                <>
                {GridProjectFavorite?.info?.userInfo?.imagePath.startsWith("https://")?(
                  <Link to={`/profile/${GridProjectFavorite?.info?.userInfo?.username}`}>
                  <img
                  src={GridProjectFavorite?.info?.userInfo?.imagePath}
                  alt="profile"
                  className="w-10 h-10  rounded-full object-cover"
                /></Link>
                ):(
                  <Link to={`/profile/${GridProjectFavorite?.info?.userInfo?.username}`}>
                  <img 
                    src={`http://localhost:8080/api/file-images?fileName=${GridProjectFavorite?.info?.userInfo?.imagePath}`}
                    alt="profile"
                    className="w-10 h-10  rounded-full object-cover"
                  />
                  </Link>
                )}
                  
                </>
              ) : (
                <div className='w-10 h-10 rounded-full bg-orange-500 border-4 flex justify-center items-center text-3xl'>{GridProjectFavorite.userName?.charAt(0)}</div>
              )}
            </div>
          </div>
          {/* username */}
          <div className="flex flex-col">
            <div className="font-montserrat text-purple-head font-black hover:bg-blur-15% hover:rounded-full">
              <Link
                to={`/project/${GridProjectFavorite.projectId}`}
                className=""
                onClick={() => handleClick(GridProjectFavorite)}
              >
                <span>
                  {GridProjectFavorite?.info?.projectInfo?.projectInfo?.projectName.length <=
                    10
                    ? GridProjectFavorite?.info?.projectInfo?.projectInfo?.projectName
                    : GridProjectFavorite?.info?.projectInfo?.projectInfo?.projectName.slice(
                      0,
                      15
                    ) + "..."}
                </span>
              </Link>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-montserrat line-clamp-1">
                {/* create date: 07/09/2023 */}
                Created :{" "}
                {convertTimestampToDate(
                  GridProjectFavorite?.info?.projectInfo?.projectInfo?.createdDate
                )}
              </span>
            </div>
          </div>
          {/* right */}
          <div className="flex items-center self-start">
            {/* favorite icon */}
            <div className="laptop:mx-2 ipad-pro:mx-1 mt-1">
              <button>
                <img
                  onClick={() => favoriteIconClickHandler(GridProjectFavorite.projectId)}
                  src={
                    imageFavoriteSrc === favoriteGold
                      ? imageFavoriteSrc
                      : favoriteProjects.some(
                          (favProject) =>
                            favProject.projectId === GridProjectFavorite.projectId
                        )
                      ? favoriteGold
                      : favoriteGrays
                  }
                  alt="favorite"
                />
              </button>
            </div>
      
            {/* dot icon */}
            <div className="dropdown">
              <button
                tabIndex={0}
                className="text-gray-400"
                id={`dropdownDefault-${GridProjectFavorite.projectId}`}
                data-dropdown-toggle={`dropdown-dot-${GridProjectFavorite.projectId}`}
                type="button"
                onClick={() => checkDot(`dropdown-dot-${GridProjectFavorite?.projectId}`)}
              >
                <MoreVertIcon />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu shadow bg-base-100 rounded-lg border"
              >
                <li className="flex w-full border-b">
                  <label
                    // onClick={() =>
                    //   checkEditProject(`my-modal-manage-${GridProfileViewProjectPage.projectId}`)
                    // }
                    htmlFor="my-modal-manage"
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
                <li className="flex w-full">

                {checkRole === "EDITOR" || checkRole==="VIEWER"?(
                    <label
                    className="cursor-not-allowed"
                  >
                    <div>
                      <img src={deleteIcon} alt="" />
                    </div>
                    <div>
                      <span className="text-red-600">delete</span>
                    </div>
                  </label>
                  ):(
                    <label
                    // onClick={() =>
                    //   checkDeleteProject(`my-modal-delete-${GridProfileViewProjectPage.projectId}`)
                    // }
                    htmlFor={`my-modal-delete`}
                    className=""
                  >
                    <div>
                      <img src={deleteIcon} alt="" />
                    </div>
                    <div>
                      <span className="text-red-600">delete</span>
                    </div>
                  </label>
                  )}
                </li>
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
        // onClick={() => handleClick(project)}
      >
        <div className="flex flex-col">
          {/* project name */}
          <div className="flex flex-col">
            <div className="font-montserrat flex w-full items-center">
              {
                GridProjectFavorite?.info?.projectInfo?.projectInfo?.isPublic
                  ? (
                    <div className="flex items-center">
                      <PublicOutlinedIcon className="mr-2 text-gray-500"/>
                      <p className="text-sm text-gray-500 font-montserrat">Public</p>
                    </div>
                  )
                  : (
                    <div className="flex items-center">
                      <LockOutlinedIcon className="mr-2 text-gray-500"/>
                      <p className="text-sm text-gray-500 font-montserrat">Private</p>
                    </div>
                  )
              }
      
            </div>
          </div>
          {/* url endpoints */}
          <div className="flex w-full my-2 items-center">
            <div className="mr-2">
              <InsertLinkIcon className="text-gray-500 rotate-45" />
            </div>
            {/* number of url endpoints */}
            <div className="text-sm text-gray-500 font-montserrat">
              <span>{GridProjectFavorite?.info?.projectInfo?.urlEndpoint} url endpoints</span>
            </div>
          </div>
          {/* last update time */}
          <div className="text-sm  text-gray-500 font-montserrat">
            <span>
              Last Update:{" "}
              {convertTimestampToDateLastUpdate(
                GridProjectFavorite?.info?.projectInfo?.projectInfo?.updatedDate
              ).toString()}
            </span>
          </div>
        </div>
      </Link>
      </div>
    )
    }
  </div>
  );
}
