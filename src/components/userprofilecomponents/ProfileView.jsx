import React, { useEffect, useRef, useState } from "react";
import cover from "../../asset/img/laptop.png";
import gmail_icon from "../../asset/icon/gmail.png";
import penSvg from "../../asset/icon/pen-linear.svg";
import time from "../../asset/icon/wall-clock.png";
import profile from "../../asset/img/profile.jpg";
import ListProject from "./ListProject";
import SubnavbarProfile from "./SubnavbarProfile";
import FooterComponent from "../FooterComponent";
import axios from "axios";
import { Label, Modal } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { setProfileImage } from "../../redux/slice/EditProfileSlice";
import bgCover from "../../asset/img/coverImg.jpg";
import ListGroupProject from "./ListGroupProject";
import FavoriteProject from "./FavoriteProject";
import GridProfileViewProjectPage from "./GridProfileViewProjectPage";
import GridProfileViewProjectFavoritePage from "./GridProfileViewProjectFavoritePage";
import SubnavbarGridProfile from "./SubnavbarGridProfile";
import GridProfileViewProjectGroupPage from "./GridProfileViewProjectGroupPage";
import EditProfile from "../EditProfile";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ViewImg from "./ViewImg";
import Waiting from "../../asset/img/Waiting-rafiki.svg";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { instance } from "../../redux/service/InstanceHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import {
  getFavoriteProjectApi,
  getGroupProjectApi,
  getListProjectsApi,
  getRecentlyProjectApi,
} from "../../redux/service/ListProjectService";
import {
  get_current_user_info,
  get_user_info,
} from "../../redux/service/UserService";
import {
  deleteProjectApi,
  getProjectAsUser,
  getSizePrivateProject,
  isPrivateProject,
  isPublicProject,
} from "../../redux/service/ProjectService";
import { deleteProject, getFavoriteProjects, getGroupProjects, getProjects, privateProjectInfoAsUser, updateProject } from "../../redux/slice/ProjectSlice";
import { BASE_URL, NotifyError, NotifySucess } from "../../redux/Constants";
import { getCurrentUser } from "../../redux/slice/AuthSlice";
import { Input } from "react-daisyui";
import privateIcon from "../../asset/img/icon/private.svg";
import publicIcon from "../../asset/img/icon/public.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinners from "../Spinners";
// import { Input } from "@material-tailwind/react";

import PopUpForCreateProject from "../project_page/PopUpForCreateProject";

// import emptyProject from "../asset/img/Hand coding-rafiki.svg";

export default function ProfileView(props) {
  let [isOpen, setIsOpen] = useState(false);
  let [check, setCheck] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);


  const navigate = useNavigate();
  const { username } = useParams();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(t) {
    setCheck(t);
    setIsOpen(true);
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  function openModal1() {
    setIsOpen1(true)
  }

  // grid and list
  const [grid, setGrid] = useState(false);

  const currentUsername = useSelector((state) => state.auth.currentUser);
  //Get project
  const { projects } = useSelector((state) => state.projects);
  //Get Group Project
  const  {groupProjects} = useSelector((state) => state.projects);
  //Get Favorite Project
  const  {favoriteProjects} = useSelector((state) => state.projects);
  
  //current-Owner-Account
  let ownerUsername = currentUsername?.userName;

  useEffect(() => {
    get_current_user_info()
      .then((responses) => {
        setCurrentUser(responses.data.payload);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);


  // fetch data
  const [Profile, setProfile] = useState("");
  const dispatch = useDispatch();
  const [allProjectInfo, setAllProjectInfo] = useState([]);
  const [groupInfoProject, setGroupInfoProject] = useState([]);
  const [allMyProjectInfo, setAllMyProjectInfo] = useState([]);
  const [allGroupProjectInfo, setAllGroupProjectInfo] = useState([]);
  const [allFavoriteProjectsInfo, setAllFavoriteProjectsInfo] = useState([]);
  const [allFavoriteProjectInfo, setAllFavoriteProjectInfo] = useState([]);

  const [recentlyProjectInfo, setRecentlyProjectInfo] = useState([]);
  const [recentlyGroupProjectInfo, setRecentlyGroupProjectInfo] = useState([]);
  const [recentlyFavoriteProjectInfo, setRecentlyFavoriteProjectInfo] =
    useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const handleIsLoading = (loading) => {
    setIsLoading(loading)
  }


  //Retreive Recently Information
  const recentlyProjectsString = localStorage.getItem("RecentProject");
  const recentlyProjects = JSON.parse(recentlyProjectsString);

  const recentlyGroupProjectsString = localStorage.getItem(
    "recentlyGroupProject"
  );
  const recentlyGroupProjects = JSON.parse(recentlyGroupProjectsString);

  const recentlyFavoriteProjectsString = localStorage.getItem(
    "recentlyFavoriteProject"
  );
  const recentlyFavoriteProjects = JSON.parse(recentlyFavoriteProjectsString);

  //Getting User as View
  const [dataUserInfo, setDataUserInfo] = useState([]);
  const [userInformation, setUserInformation] = useState([]);

  // list of info project
  useEffect(() => {
    getListProjectsApi().then((result) =>{
      dispatch(getProjects(result.data.payload))
    setAllProjectInfo(result.data.payload)
    }
    );
  }, []);

  // list of info groups project
  useEffect(() => {
    getListProjectsApi().then((result) => {
      setAllGroupProjectInfo(result.data.payload);
    });
  }, []);

  // list of favorites project
  useEffect(() => {
    getFavoriteProjectApi().then((result) => {
      dispatch(getFavoriteProjects(result.data.payload))
      setAllFavoriteProjectInfo(result.data.payload);
    });
  }, []);

  //Group Project
  useEffect(() => {
    getGroupProjectApi().then((result) => {
      dispatch(getGroupProjects(result.data.payload))
      setGroupInfoProject(result.data.payload);
    });
  }, []);

  //Recently My Project
  useEffect(() => {
    var test = [];
    if (recentlyProjects != null) {
      recentlyProjects.forEach((item) => {
        instance
          .get(`/list-info-project/${item.recentlyProjectName}`)
          .then((response) => {
            test.push(...response.data.payload);
          });
      });
      setRecentlyProjectInfo(test);
    }
    setAllMyProjectInfo([]);
  }, []);

  //Recently Group Project
  useEffect(() => {
    var test = [];
    if (recentlyGroupProjects != null) {
      recentlyGroupProjects.forEach((item) => {
        instance
          .get(`/list-info-project/${item.recentlyProjectName}`)
          .then((response) => {
            test.push(...response.data.payload);
          });
      });
      setRecentlyGroupProjectInfo(test);
    }
    setAllGroupProjectInfo([]);
  }, []);

  //Recently Favorite Project
  useEffect(() => {
    var test = [];
    if (recentlyFavoriteProjects != null) {
      recentlyFavoriteProjects.forEach((item) => {
        instance
          .get(`/list-info-project/${item.recentlyProjectName}`)
          .then((response) => {
            test.push(...response.data.payload);
          });
      });
      setRecentlyFavoriteProjectInfo(test);
    }
    setAllFavoriteProjectsInfo([]);
  }, []);

  //Recently My Project
  useEffect(() => {
    var test = [];
    if (recentlyProjects != null) {
      recentlyProjects.forEach((item) => {
        instance
          .get(`/list-info-project/${item.recentlyProjectName}`)
          .then((response) => {
            test.push(...response.data.payload);
          });
      });
      setRecentlyProjectInfo(test);
    }
    setAllGroupProjectInfo([]);
  }, []);

  // list project
  const [Project, setProject] = useState("myProject");
  // grid project
  const [gridProject, setGridProject] = useState("gridMyProject");

  const [disable, setDisable] = useState(true);

  const isLocalImageStatusCover = useSelector(
    (state) => state.auth.isLocalImageStatusCover
  );
  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );

  //Other user-side
  useEffect(() => {
    getProjectAsUser(username).then((response) => {
      setDataUserInfo(response.data.payload);
    });
    if(username != undefined){
      get_user_info(username).then((response) => {
            setUserInformation(response.data.payload);
          });
    }
  }, [username]);

  let dateArray = [];
  username === ownerUsername
    ? dateArray.push(userInformation.created_at)
    : dateArray.push(currentUser.created_at);
  let dateObject = new Date(...dateArray);
 
  //New Code
  
  
  const [preId, setPreId] = useState("");
  const [deleteIds, setDeleteId] = useState("");

  const handleDotData = (dataFromChild) => {
    setDeleteId(dataFromChild);
    let projectId = dataFromChild.replace("dropdown-dot-", "my-modal-manage-");
    setPreId(projectId);
  };

  const deleteProjectHandler = (e) => {
    const deleteId = e.replace(`dropdown-dot-`, "");

    const filteredProjects = projects.filter((project) => {
      return project.projectId === deleteId;
    });

    const filteredGroupProjects = groupProjects.filter((project) => {
      return project.projectId === deleteId;
    });
    const filteredFavoriteProjects = favoriteProjects.filter((project) => {
      return project.projectId === deleteId;
    });
    
    if (filteredProjects.length > 0 || filteredGroupProjects.length > 0 || filteredFavoriteProjects.length >0) {
          const projectName =
            filteredProjects[0].info.projectInfo.projectInfo.projectName;

          deleteProjectApi(projectName).then(() => {
            dispatch(deleteProject({ deleteId }));
            
            //Favorite Card
            getFavoriteProjectApi().then((result) => {
              setAllFavoriteProjectInfo(result.data.payload);
            });
            //Group Project Card
            getGroupProjectApi().then((result) => {
              setGroupInfoProject(result.data.payload);
            });
             //My project Card
            getProjectAsUser(username).then((response) => {
              setDataUserInfo(response.data.payload);
            });

            getListProjectsApi().then((result) =>{
            setAllProjectInfo(result.data.payload)
            });

            get_current_user_info().then((response) => {
              setCurrentUser(response.data.payload);
            });

            NotifySucess("Delete succesfully.")
          }).catch(()=>{
            NotifyError("Failed to delete.")
          });



      }
  };
  const [isPrivate, setIsPrivate] = useState(false);
  const [authenticationMethod, setAuthenticationMethod] = useState("");
  const [newProjectName, setNewProjectName] = useState("");

  const saveHandler = () => {
    editProjectHandler();
  };

  const privateClickHandler = () => {
    setIsPrivate(!isPrivate);
  };

  const editProjectHandler = async () => {
    let projectId = preId.replace("my-modal-manage-", "");

    instance
      .put(`${BASE_URL}/projects/${projectId}?newProjectName=${newProjectName}`)
      .then((response) => {

        dispatch(updateProject({ projectId, newProjectName }));


        if (isPrivate) {
          isPrivateProject(projectId, isPrivate, authenticationMethod);
        } else {
          isPublicProject(projectId, isPrivate);
        }

         getGroupProjectApi().then((result) => {
            setGroupInfoProject(result.data.payload);
          });

          getListProjectsApi().then((result) =>{
            setAllProjectInfo(result.data.payload)
            });

        //Group Project Card
        getGroupProjectApi().then((result) => {
          setGroupInfoProject(result.data.payload);
        });

        getProjectAsUser(username).then((response) => {
          setDataUserInfo(response.data.payload);
        });


        NotifySucess("Project modified successfully.")
      }).catch((err)=>{
        console.log("err: ", err)
        NotifyError("Failed to edit.")
      });
    }
  const handleAuthenticationMethod = (e) => {
      setAuthenticationMethod(e);
  };

  const valueUpdated = (e) => {
      setNewProjectName(e.target.value);
  };
  //Infinite Scroll

  const [resultsLimit, setResultsLimit] = useState(3);
  const [hasScrolled, setHasScrolled] = useState(false);


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
          setResultsLimit((prevLimit) => prevLimit + 3);
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [resultsLimit]);

  useEffect(() => {
    if (hasScrolled) {
      const timeoutId = setTimeout(() => {
        setResultsLimit((prevLimit) => prevLimit + 3);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [hasScrolled]);

  useEffect(() => {
    const interval = setInterval(() => {
      AOS.init();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
    

  return (
    <>
      {/* cover section */}
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinners />
        </div>
      ) :(
        <div>
          <div className="">
        <div className="font-poppins relative">
          {isLocalImageStatusCover ? (
            <img
              src={currentUser?.coverImages}
              alt="profile"
              className="w-full h-full object-cover absolute -z-10"
            />
          ) : ownerUsername === username ? (
            currentUser?.coverImages != null ? (
              <>
                {currentUser?.coverImages.startsWith("https://") ? (
                  <img
                    src={currentUser?.coverImages}
                    alt="profile"
                    className="w-full h-full object-cover absolute -z-10"
                  />
                ) : (
                  <img
                    src={`http://localhost:8080/api/file-images?fileName=${currentUser?.coverImages}`}
                    alt="profile"
                    className="w-full h-full object-cover absolute -z-10"
                  />
                )}
              </>
            ) : (
              <img
                src={bgCover}
                alt="cover"
                className="w-full h-full object-cover absolute -z-10"
              />
            )
          ) : userInformation?.coverImages != null ? (
            <>
              {userInformation?.coverImages.startsWith("https://") ? (
                <img
                  src={userInformation?.coverImages}
                  alt="profile"
                  className="w-full h-full object-cover absolute -z-10"
                />
              ) : (
                <img
                  src={`http://localhost:8080/api/file-images?fileName=${userInformation?.coverImages}`}
                  alt="profile"
                  className="w-full h-full object-cover absolute -z-10"
                />
              )}
            </>
          ) : (
            <img
              src={bgCover}
              alt="cover"
              className="w-full h-full object-cover absolute -z-10"
            />
          )}

          <div className="w-full pt-8 pb-2">
            {/* card */}
            <div className="">
              <div className="flex justify-end laptop:mt-5 laptop:px-32 ipad-pro:px-20 ipad-pro:mt-3">
                <div className="flex items-center bg-white rounded-full shadow-2xl mb-4">
                  {/* profile */}
                  <div className="pr-6">
                    <div className="text-white w-[170px] h-[170px] rounded-full border-2 ring-4">
                      <div className="w-full h-full relative">
                        {ownerUsername === username ? (
                          isLocalImageStatus ? (
                            <img
                              src={currentUser.profileImages}
                              alt="profile"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : currentUser?.profileImages != null ? (
                            <>
                              {currentUser?.profileImages.startsWith(
                                "https://"
                              ) ? (
                                <img
                                  src={currentUser?.profileImages}
                                  alt="profile"
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <img
                                  src={`http://localhost:8080/api/file-images?fileName=${currentUser?.profileImages}`}
                                  alt="profile"
                                  className="w-full h-full rounded-full object-cover"
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full rounded-full bg-orange-500 border-4 flex justify-center items-center text-3xl">
                              {currentUser.userName?.charAt(0)}
                            </div>
                          )
                        ) : isLocalImageStatus ? (
                          <img
                            src={userInformation.profileImages}
                            alt="profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : userInformation?.profileImages != null ? (
                          <>
                            {userInformation?.profileImages.startsWith(
                              "https://"
                            ) ? (
                              <img
                                src={userInformation?.profileImages}
                                alt="profile"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <img
                                src={`http://localhost:8080/api/file-images?fileName=${userInformation?.profileImages}`}
                                alt="profile"
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full rounded-full bg-orange-500 border-4 flex justify-center items-center text-3xl">
                            {userInformation.userName?.charAt(0)}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => openModal("profile")}
                          className=""
                        >
                          <label
                            className="bg-purple-head tooltip p-1 rounded-full absolute bottom-0 right-5"
                            data-tip="View profile"
                          >
                            <CollectionsOutlinedIcon sx={{ fontSize: 18 }} />
                          </label>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* project type */}
                  {username === ownerUsername ? (
                    <div className="text-center pr-6 border-r-2 border-purple-head">
                      <div className="laptop:text-3xl ipad-pro:text-2xl text-purple-head font-bold 12pro:text-sm">
                        {currentUser?.personalProject < 10
                          ? "0" + currentUser?.personalProject
                          : currentUser?.personalProject}
                      </div>
                      <div className="laptop:text-base ipad-pro:text-sm 12pro:text-xs mb-3">
                        {currentUser?.personalProject < 2
                          ? "Personal Project"
                          : "Personal Projects"}
                      </div>
                      <div className="laptop:text-3xl ipad-pro:text-2xl text-purple-head font-bold 12pro:text-sm">
                        {currentUser?.groupProject < 10
                          ? "0" + currentUser?.groupProject
                          : currentUser?.groupProject}
                      </div>
                      <div className="laptop:text-base ipad-pro:text-sm 12pro:text-xs">
                        {currentUser?.groupProject < 2
                          ? "Group Project"
                          : "Group Projects"}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center pr-6 border-r-2 border-purple-head">
                      <div className="laptop:text-3xl ipad-pro:text-2xl text-purple-head font-bold 12pro:text-sm">
                        {userInformation?.personalProject +
                          userInformation?.groupProject}
                      </div>
                      <div className="laptop:text-base ipad-pro:text-sm 12pro:text-xs mb-3">
                        {userInformation?.personalProject +
                          userInformation?.groupProject <
                        2
                          ? "Total project"
                          : "Total Projects"}
                      </div>
                    </div>
                  )}

                  {/* user info */}
                  {username === ownerUsername ? (
                        <div className="laptop:ml-5 pr-12 ipad-pro:ml-4 12pro:ml-1 font-poppins">
                          <div className="flex-grow text-black font-semibold text-lg">

                            {currentUser?.fullName === null ? (
                                currentUser?.userName?.length > 15 ? (
                                  "@" + currentUser?.userName.slice(0, 15) + "..."
                                ) : (
                                  "@" + currentUser?.userName
                                )
                              ) : currentUser?.fullName?.length > 15? (
                                currentUser?.fullName.slice(0, 15) + "..."
                              ):(currentUser?.fullName)}


                          </div>
                          <div className="text-blue-600 text-sm">
                          {"@" + (currentUser?.userName?.length > 15 ? currentUser?.userName.slice(0, 15) + "..." : currentUser?.userName)}
                            </div>

                          <div className="flex items-center flex-row justify-content-between laptop:mt-4 ipad-pro:mt-3 12pro:mt-2">
                            <EmailOutlinedIcon className="mr-1" />
                            <span className="text-sm">
                              {currentUser?.userEmail?.length >25?(
                                currentUser?.userEmail.slice(0, 25) + "..."
                              ):(
                                currentUser?.userEmail
                              )}
                            </span>
                          </div>

                          <div className="flex items-center flex-row justify-content-between laptop:mt-4 ipad-pro:mt-3 12pro:mt-2">
                            <AccessTimeOutlinedIcon className="mr-1" />
                            <span className="text-sm">
                              {
                                "Joined " + dateObject.toDateString()
                                // "Joined " + getMonthName(currentUser.created_at[0]) + currentUser.created_at[1]
                              }
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="laptop:ml-5 pr-12 ipad-pro:ml-4 12pro:ml-1 font-poppins">
                          <div className="flex-grow text-black font-semibold text-lg">

                            {userInformation?.fullName === null ? (
                                userInformation?.userName?.length > 15 ? (
                                  "@" + userInformation?.userName.slice(0, 15) + "..."
                                ) : (
                                  "@" + userInformation?.userName
                                )
                              ) : userInformation?.fullName?.length > 15? (
                                userInformation?.fullName.slice(0, 15) + "..."
                              ):(userInformation?.fullName)}


                          </div>
                          <div className="text-blue-600 text-sm">
                          {"@" + (userInformation?.userName?.length > 15 ? userInformation?.userName.slice(0, 15) + "..." : userInformation?.userName)}
                            </div>

                          <div className="flex items-center flex-row justify-content-between laptop:mt-4 ipad-pro:mt-3 12pro:mt-2">
                            <EmailOutlinedIcon className="mr-1" />
                            <span className="text-sm">
                              {userInformation?.userEmail?.length >25?(
                                userInformation?.userEmail.slice(0, 20) + "..."
                              ):(
                                userInformation?.userEmail
                              )}
                            </span>
                          </div>

                          <div className="flex items-center flex-row justify-content-between laptop:mt-4 ipad-pro:mt-3 12pro:mt-2">
                            <AccessTimeOutlinedIcon className="mr-1" />
                            <span className="text-sm">
                              {
                                "Joined " + dateObject.toDateString()
                                // "Joined " + getMonthName(currentUser.created_at[0]) + currentUser.created_at[1]
                              }
                            </span>
                          </div>
                        </div>
                      )}


                </div>
              </div>
              <div class="grid grid-cols-2 justify-between laptop:mt-3 laptop:px-32 12pro:mt-10 ipad-pro:px-20 ipad-pro:mt-10 12pro:px-5">
                <div class="col-1 items-center">
                  <button
                    onClick={openModal1}
                    type="button"
                    class="text-white bg-purple-head font-medium rounded-lg laptop:text-[14px] ipad-pro:text-xs 12pro:text-[8px] laptop:px-7 laptop:py-2 ipad-pro:px-6 ipad-pro:py-2 12pro:py-1 12pro:px-1 text-center"
                  >
                    <PlaylistAddOutlinedIcon className="mr-1" />
                    New Project
                  </button>
                </div>
                <div class="col-3"></div>
              </div>
            </div>
            {/* icon upload image */}
            <button
              type="button"
              onClick={() => openModal("cover")}
              className="edit-cover ml-2 tooltip tooltip-right"
              data-tip="View cover"
            >
              <CollectionsOutlinedIcon className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#F2F4F7] px-32 pb-8 font-poppins">
        {ownerUsername === username ? (
          grid ? (
            <div className="laptop:mt-5 ipad-pro:mt-3 12pro:mt-2">
              <div className="laptop:px-32 ipad-pro:px-20 12pro:px-5">
                <SubnavbarProfile setState={setProject} setGrid={setGrid} />
              </div>
              <div className="flex justify-center laptop:px-32 ipad-pro:px-20 12pro:px-5 mb-5">
                <div className="w-full h-full bg-FAFAFA">
                  <div className="laptop:mt-10 ipad-pro:mt-5 12pro:mt-3">
                    <p className="uppercase font-poppins laptop:mx-12 ipad-pro:ml-10 12pro:ml-6 text-black font-bold laptop:text-base ipad-pro:text-sm 12pro:text-[10px]">
                      Recently Projects
                    </p>
                    
                    <div
                      className={` ${Project === "myProject" ? "" : "hidden"}`}
                    >
                      <div className="laptop:px-12 ipad-pro:px-20 12pro:px-5">
                        <div className="laptop:mt-8 ipad-pro:mt-5 12pro:mt-3 space-y-4">
                          {recentlyProjectInfo.length <= 0 ? (
                            <div className="text-center">
                              <img
                                src={Waiting}
                                alt="profile"
                                className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                              />
                              <p>No recently project.</p>
                            </div>
                          ) : (
                            recentlyProjectInfo.map((item) => (
                              <ListProject ListProject={item} />
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={` ${
                        Project === "groupProject" ? "" : "hidden"
                      }`}
                    >
                      <div className="laptop:px-28 ipad-pro:px-20 12pro:px-5">
                        <div className="laptop:mt-8 ipad-pro:mt-5 12pro:mt-3 space-y-4">
                          {recentlyGroupProjectInfo.length <= 0 ? (
                            <div className="text-center">
                              <img
                                src={Waiting}
                                alt="profile"
                                className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                              />
                              <p>No recently group project.</p>
                            </div>
                          ) : (
                            recentlyGroupProjectInfo.map((item) => (
                              <ListGroupProject ListGroupProject={item} />
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={` ${
                        Project === "favoriteProject" ? "" : "hidden"
                      }`}
                    >
                      <div className="laptop:px-28 ipad-pro:px-20 12pro:px-5">
                        <div className="laptop:mt-8 ipad-pro:mt-5 12pro:mt-3 space-y-4">
                          {recentlyFavoriteProjectInfo.length <= 0 ? (
                            <div className="text-center">
                              <img
                                src={Waiting}
                                alt="profile"
                                className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                              />
                              <p>No recently favorite project.</p>
                            </div>
                          ) : (
                            recentlyFavoriteProjectInfo.map((item) => (
                              <FavoriteProject FavoriteProject={item} />
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="laptop:py-10 ipad-pro:py-5 12pro:py-3">
                    <p className="uppercase font-poppins laptop:ml-12 ipad-pro:ml-10 12pro:ml-6 text-black font-bold laptop:text-base ipad-pro:text-sm 12pro:text-[10px]">
                      All Projects
                    </p>
                    <div
                      className={` ${Project === "myProject" ? "" : "hidden"}`}
                    >
                      <div className="laptop:px-28 ipad-pro:px-20 12pro:px-5">
                        <div className="laptop:mt-8 ipad-pro:mt-5 12pro:mt-3 space-y-4">
                          {allProjectInfo.map((item) => (
                            <ListProject ListProject={item} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className={` ${
                        Project == "groupProject" ? "" : "hidden"
                      }`}
                    >
                      <div className="laptop:px-28 ipad-pro:px-20 12pro:px-5">
                        <div className="laptop:mt-8 ipad-pro:mt-5 12pro:mt-3 space-y-4">
                          {groupInfoProject.map((item) => (
                            <ListGroupProject ListGroupProject={item} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className={` ${
                        Project == "favoriteProject" ? "" : "hidden"
                      }`}
                    >
                      <div className="laptop:px-28 ipad-pro:px-20 12pro:px-5">
                        <div className="laptop:mt-8 ipad-pro:mt-5 12pro:mt-3 space-y-4">
                          {allFavoriteProjectInfo.map((item) => (
                            <FavoriteProject FavoriteProject={item} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="laptop:mt-5 ipad-pro:mt-3 12pro:mt-2">
              <div className="laptop:px-32 ipad-pro:px-20 12pro:px-5">
                <SubnavbarGridProfile
                  setState={setGridProject}
                  setGrid={setGrid}
                />
              </div>
              <div className="flex justify-center laptop:px-32 ipad-pro:px-20 12pro:px-5 mb-5">
                <div className="w-full h-full bg-FAFAFA">
                <div className="laptop:mt-5 ipad-pro:mt-5 12pro:mt-3 pr-12">
                    
                    <div className="flex justify-between">
                        <p className="uppercase font-poppins laptop:ml-12 ipad-pro:ml-10 12pro:ml-6 text-black font-bold laptop:text-base ipad-pro:text-sm 12pro:text-[10px]">
                          Recently Projects
                        </p>

                    </div>

                  

                    <div
                      className={` ${
                        gridProject == "gridMyProject" ? "" : "hidden"
                      }`}
                    >
                      {recentlyProjectInfo.length <= 0 ? (
                        <div className="text-center">
                          <img
                            src={Waiting}
                            alt="profile"
                            className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                          />
                          <p>No recently project.</p>
                        </div>
                      ) : (
                        <div className="laptop:px-12 ipad-pro:px-20 12pro:px-5 grid laptop:grid-cols-3 ipad-pro:grid-cols-2 12pro:grid-cols-1 mt-5 gap-5 mb-10">
                          {recentlyProjectInfo.slice(0, resultsLimit)
                            .map((item) => (
                            <GridProfileViewProjectPage
                              dotData={handleDotData}
                              GridProfileView={item}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div
                      className={` ${
                        gridProject == "gridGroupProject" ? "" : "hidden"
                      }`}
                    >
                      {recentlyGroupProjectInfo.length <= 0 ? (
                        <div className="text-center">
                          <img
                            src={Waiting}
                            alt="profile"
                            className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                          />
                          <p>No recently group project.</p>
                        </div>
                      ) : (
                        <div className="laptop:px-12 ipad-pro:px-20 12pro:px-5 grid laptop:grid-cols-3 ipad-pro:grid-cols-2 12pro:grid-cols-1 mt-5 gap-5 mb-10">
                          {recentlyGroupProjectInfo.slice(0, resultsLimit)
                            .map((item) => (
                            <GridProfileViewProjectGroupPage
                              dotData={handleDotData}
                              GridGroupView={item}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div
                      className={` ${
                        gridProject == "gridFavoriteProject" ? "" : "hidden"
                      }`}
                    >
                      {recentlyFavoriteProjectInfo.length <= 0 ? (
                        <div className="text-center">
                          <img
                            src={Waiting}
                            alt="profile"
                            className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                          />
                          <p>No recently favorite project.</p>
                        </div>
                      ) : (
                        <div className="laptop:px-12 ipad-pro:px-20 12pro:px-5 grid laptop:grid-cols-3 ipad-pro:grid-cols-2 12pro:grid-cols-1 mt-5 gap-5 mb-10">
                          {recentlyFavoriteProjectInfo.slice(0, resultsLimit)
                            .map((item) => (
                            <GridProfileViewProjectFavoritePage
                            dotData={handleDotData}
                              GridProjectFavorite={item}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="laptop:mt-5 ipad-pro:mt-5 12pro:mt-3">
                    <p className="uppercase font-poppins laptop:ml-12 ipad-pro:ml-10 12pro:ml-6 text-black font-bold laptop:text-base ipad-pro:text-sm 12pro:text-[10px]">
                      All Projects
                    </p>
                    {/* my project grid */}

                    <div
                      className={` ${
                        gridProject == "gridMyProject" ? "" : "hidden"
                      }`}
                    >
                      {allProjectInfo.length <= 0 ? (
                        <div className="text-center mb-8">
                          <img
                            src={Waiting}
                            alt="profile"
                            className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                          />
                          <p>No project.</p>
                          {/* <Spinners /> */}
                        </div>
                      ) : (
                        <div className="laptop:px-12 ipad-pro:px-20 12pro:px-5 grid laptop:grid-cols-3 ipad-pro:grid-cols-2 12pro:grid-cols-1 mt-5 gap-5 mb-10">
                          {allProjectInfo.slice(0, resultsLimit)
                            .map((item) => (
                            <div 
                            data-aos="fade-right"
                            data-aos-easing="linear"
                            data-aos-duration="400">
                              
                            <GridProfileViewProjectPage
                              dotData={handleDotData}
                              GridProfileView={item}
                            />
                            
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    
                    <input type="checkbox" id="my-modal-manage" className="modal-toggle" />
      <div className="modal font-montserrat">
        <div className="modal-box">
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
              </div>
              
              {/* input new project name */}
              <div className="my-5 w-[60%]">
                <Input
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
                      checked={isPrivate}
                      onChange={privateClickHandler}
                      name="default-radio"
                      className="w-3 h-3 mr-1 hover:cursor-pointer text-purple-head focus:ring-purple-head bg-whitesmoke border-2 border-slate-500"
                    />
                    {/* icon private */}
                    <div className="mx-1">
                      <img className="w-6" src={privateIcon} alt="" />
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
                      checked={!isPrivate}
                      onChange={privateClickHandler}
                      name="default-radio"
                      className="w-3 h-3 mr-1 hover:cursor-pointer text-purple-head focus:ring-purple-head bg-whitesmoke border-2 border-slate-500"
                    />
                    {/* icon public */}
                    <div className="mx-1">
                      <img className="w-6" src={publicIcon} alt="" />
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
              {/* when choose private radio this div will show */}
              {isPrivate ? (
                <div
                  id="div-to-hide"
                  className="my-5 flex flex-col w-full items-center"
                >
                  <div className="flex flex-col border-t-2 border-slate-400">
                    <div className="font-black font-poppins text-[20px] my-2">
                      <span>Authentication method</span>
                    </div>
                  </div>

                  <div className="">
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
                </div>
              ) : (
                ""
              )}
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
                    className="text-purple-head text-lg btn btn-ghost hover:btn-primary hover:delay-150 capitalize"
                  >
                    save
                  </label>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
                    
                    {/* popUp for delete card project */}
      <input type="checkbox" id={`my-modal-delete`} className="modal-toggle" />
      <div className="modal font-montserrat">
        <div className=" relative 12pro:w-[90%] ipad-pro:w-[60%] laptop:w-[40%] bg-whitesmoke p-8 rounded-2xl shadow-xl">
          <div className="flex flex-col items-center">
            <div>
              <span className="font-poppins font-black text-xl">
                Are you sure you want to delete this project?
              </span>
            </div>
            <div className="my-3">
              <span className="font-poppins font-black text-sm">
                This will delete this project permanently, you cannot undo this
                action.
              </span>
            </div>
            {/* buttons */}
            <div className="flex justify-between w-1/2">
              {/* cancel button */}
              <div className="modal-action">
                <label
                  htmlFor={`my-modal-delete`}
                  className="text-slate-500 text-lg btn btn-ghost hover:btn-ghost hover:delay-150 capitalize"
                >
                  cancel
                </label>
              </div>

              {/* delete button */}
              <div className="modal-action">
                <label
                  onClick={() => deleteProjectHandler(`${deleteIds}`)}
                  htmlFor={`my-modal-delete`}
                  className="text-red-600 text-lg btn btn-ghost hover:bg-red-600 hover:text-white hover:delay-150 capitalize"
                >
                  delete
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

                    {/* group project grid */}
                    <div
                      className={` ${
                        gridProject == "gridGroupProject" ? "" : "hidden"
                      }`}
                    >
                      {groupInfoProject.length <= 0 ? (
                        <div className="text-center mb-8">
                          <img
                            src={Waiting}
                            alt="profile"
                            className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                          />
                          <p>No group project.</p>
                        </div>
                      ) : (
                        <div className="mt-10 laptop:px-12 ipad-pro:px-20 12pro:px-5 grid laptop:grid-cols-3 ipad-pro:grid-cols-2 12pro:grid-cols-1 gap-5 mb-10">
                          {groupInfoProject.slice(0, resultsLimit)
                    .map((item) => (
                      <div
                      data-aos="fade-right"
                          data-aos-easing="linear"
                          data-aos-duration="400">
                            <GridProfileViewProjectGroupPage
                              dotData={handleDotData}
                              GridGroupView={item}
                            /></div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* favorite project grid */}
                    <div
                      className={` ${
                        gridProject == "gridFavoriteProject" ? "" : "hidden"
                      }`}
                    >
                      {allFavoriteProjectInfo.length <= 0 ? (
                        <div className="text-center mb-8">
                          <img
                            src={Waiting}
                            alt="profile"
                            className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                          />
                          <p>No favorite project.</p>
                        </div>
                      ) : (
                        <div className="mt-10 laptop:px-12 ipad-pro:px-20 12pro:px-5 grid laptop:grid-cols-3 ipad-pro:grid-cols-2 12pro:grid-cols-1 gap-5 mb-10">
                          {allFavoriteProjectInfo.slice(0, resultsLimit)
                    .map((item) => (
                        <div
                        data-aos="fade-right"
                            data-aos-easing="linear"
                            data-aos-duration="400">
                            <GridProfileViewProjectFavoritePage
                              dotData={handleDotData}
                              GridProjectFavorite={item}
                            /></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : grid ? (
          <div className="laptop:mt-5 ipad-pro:mt-3 12pro:mt-2">
            <div className="laptop:px-32 ipad-pro:px-20 12pro:px-5">
              <SubnavbarProfile
                disable={disable}
                setState={setProject}
                setGrid={setGrid}
              />
            </div>

            <div className="flex justify-center laptop:px-32 ipad-pro:px-20 12pro:px-5 mb-5">
              <div className="w-full h-full bg-FAFAFA">
                <div className="laptop:py-10 ipad-pro:py-5 12pro:py-3">
                  <p className="uppercase font-poppins laptop:ml-12 ipad-pro:ml-10 12pro:ml-6 text-black font-bold laptop:text-base ipad-pro:text-sm 12pro:text-[10px]">
                    All Projects
                  </p>
                  <div
                    className={` ${Project === "myProject" ? "" : "hidden"}`}
                  >
                    <div className="laptop:px-28 ipad-pro:px-20 12pro:px-5">
                      <div className="laptop:mt-8 ipad-pro:mt-5 12pro:mt-3 space-y-4">
                        {dataUserInfo.length <= 0 ? (
                          <div className="text-center ">
                            <img
                              src={Waiting}
                              alt="profile"
                              className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                            />
                            <p>No recently project.</p>
                          </div>
                        ) : (
                          dataUserInfo.map((item) => (
                            <ListProject ListProject={item} />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="laptop:mt-5 ipad-pro:mt-3 12pro:mt-2">
            <div className="laptop:px-32 ipad-pro:px-20 12pro:px-5">
              <SubnavbarGridProfile
                disable={disable}
                setState={setGridProject}
                setGrid={setGrid}
              />
            </div>
            <div className="flex justify-center laptop:px-32 ipad-pro:px-20 12pro:px-5 mb-5">
              <div className="w-full h-full bg-FAFAFA">
                <div className="laptop:mt-5 ipad-pro:mt-5 12pro:mt-3">
                  <p className="uppercase font-poppins laptop:ml-12 ipad-pro:ml-10 12pro:ml-6 text-black font-bold laptop:text-base ipad-pro:text-sm 12pro:text-[10px]">
                    All Projects
                  </p>
                  {/* my project grid */}
                  <div>
                    {dataUserInfo.length <= 0 ? (
                      <div className="text-center mb-8">
                        <img
                          src={Waiting}
                          alt="profile"
                          className="w-[120px] h-[150px] rounded-full object-cover mx-auto"
                        />
                        <p>Project doesn't exists</p>
                      </div>
                    ) : (
                      <div className="laptop:px-12 ipad-pro:px-20 12pro:px-5 grid laptop:grid-cols-3 ipad-pro:grid-cols-2 12pro:grid-cols-1 mt-5 gap-5 mb-10">
                        {dataUserInfo.slice(0, resultsLimit)
                            .map((item) => (
                          <GridProfileViewProjectPage
                            disable={disable}
                            GridProfileView={item}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <ViewImg
          isOpen={isOpen}
          closeModal={closeModal}
          check={check}
          disable={disable}
        />
      </div>
        </div>
      )}
      

        {/* popUp for create new project */}
      <input type="checkbox" id="my-new-project" className="modal-toggle" />
      <div className="modal font-montserrat">
        <PopUpForCreateProject isOpen1={isOpen1} closeModal1={closeModal1} loading={handleIsLoading}/>
      </div>
    </>
  );
}

