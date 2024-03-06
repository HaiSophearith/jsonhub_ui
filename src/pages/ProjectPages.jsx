import React, { useEffect, useState } from "react";
// import NavbarBeforeLoginComponent from "../components/NavbarBeforeLoginComponent";
import FooterComponent from "../components/FooterComponent";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import myproject from "../asset/icon/myproject.svg";
import groupproject from "../asset/icon/groupproject.svg";
import favorite from "../asset/icon/favorite.svg";
import search from "../asset/icon/search.svg";
import sort from "../asset/icon/sort.svg";
import Setting from "../asset/img/settting.svg";
import Public from "../asset/img/public.svg";
import URL from "../asset/img/url.svg";
import Profile from "../asset/img/profile.svg";
import Members from "../asset/img/members.svg";
import Add from "../asset/img/add.svg";
import tokenIcon from "../asset/img/icon/tokenIcon.svg";
import MidProjectPageComponent from "../components/MidProjectPageComponent";
import PostProjectComponent from "../components/PostProjectComponent";
import PutProjectComponent from "../components/PutProjectComponent";
import DeleteProjectComponent from "../components/DeleteProjectComponent";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {
  API_HEADER,
  BASE_URL,
  NotifyError,
  NotifySucess,
} from "../redux/Constants";
import EditText from "../components/edit_text/EditText";
import { toast } from "react-toastify";
import {
  createControllerApi,
  deleteController,
  deleteEndpointApi,
  filterMethod,
  getProjectName,
  infoControllerApi,
  inviteMemberApi,
  listControllerApi,
  listEndpointApi,
  listEndpointOfController,
  listMemberApi,
  projectIdApi,
} from "../redux/service/ProjectService";
import { useDispatch, useSelector } from "react-redux";
import {
  endpointByController,
  endpointOfControllerName,
  getInfoControllerOfProject,
  listEndpoint,
  listMember,
} from "../redux/slice/ProjectSlice";

import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PopUpForInviteMemeber from "../components/project_page/PopUpForInviteMemeber";
import { get_member_role } from "../redux/service/Controller";
import { instance } from "../redux/service/InstanceHeader";

export default function ProjectPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state;
  const dispatch = useDispatch();
  const projectName = project?.info?.projectInfo?.projectInfo?.projectName;

  let projectId = project.projectId;

  const infoControllerInfoOfProject = useSelector(
    (state) => state?.projects?.progetInfoControllerOfProjectjects
  );
  const member = useSelector(
    (state) => state.projects.listMemberr
  );
  const responseListEndpoint = useSelector(
    (state) => state.projects.listEndpoints
  );

  const [checkRole, setCheckRole] = useState('')

  useEffect(() => {
    get_member_role(projectId).then((res) => {
      setCheckRole(res.data.payload)
    })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  // const checkRole = member?.userData[0]?.groupRole
  console.log("checkRole ", checkRole)


  const [method, setMethod] = useState([]);
  const [endpointMethod, setEndpointMethod] = useState([]);
  const [isInvoked, setIsInvoked] = useState("");
  const [requestURL, setRequestURL] = useState([]);
  const [dataController, setDataController] = useState([]);
  const [emailAddUser, setEmailAddUser] = useState("");
  const [sendControllerName, setSendControllerName] = useState("");
  //Get Data from API
  const [forController, setForController] = useState([]);
  const [allData, setAllData] = useState([]);
  const [infoEndpoint, setInfoEndpoint] = useState([]);
  const [catchStore, setCatchStore] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [projectNames,  setProjectNames] = useState("");
  const [saveControllerName, setSaveControllerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataMember, setDataMember] = useState([]);
  const [isDataUpdate, setIsDataUpdate] = useState(false);
  const [invokedNewData, setInvokedNewData] = useState(false);
  const [countController, setCountController] = useState();

  const HttpMethod = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
  };

  useEffect(() => {
    setDataMember(member);
    setCountController(infoControllerInfoOfProject);
  }, []); 

  useEffect(() => {
    infoControllerApi(project?.projectId).then((response) => {
      dispatch(
        getInfoControllerOfProject(response.data.payload.controllerInfo)
      );
      setAllData(response.data.payload.controllerInfo);
      const result = response.data.payload.controllerInfo.map((obj) => ({
        controllerName: obj.controllerName,
        isEditing: false,
      }));
      setForController(result);
      const name = result.map((name) => name.controllerName);
      const getEndpointResponseByControllerName = (controllerName) => {
        const foundObj = response.data.payload.controllerInfo.find(
          (obj) => obj.controllerName === controllerName
        );
        return foundObj ? foundObj.endpointResponse : null;
      };
      const endpointResponses = name.map((controllerName) => ({
        controllerName,
        endpointResponse: getEndpointResponseByControllerName(controllerName),
      }));
      dispatch(endpointOfControllerName(endpointResponses));
      setInfoEndpoint(endpointResponses);
    });

    listMemberApi(project?.projectId)
      .then((response) => {
        dispatch(listMember(response.data.payload));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getEmailToAddUser = (e) => {
    setEmailAddUser(e.target.value);
  };
  const handleUserRole = (e) => {
    setUserRole(e.target.value);
  };
  const Invite = () => {
    NotifySucess("sucessfully.");
    if (userRole == "") {
      let userRole = "VIEWER"
      inviteMemberApi(emailAddUser, project.projectId, userRole).then((info) => {
        NotifySucess("sucessfully.");
        listMemberApi(project.projectId).then((response) => {
          // setShowInfoProject(response.data.payload);
        })
          .catch((err) => {
            NotifyError("Invalid password or email.");
          });
      })
      userRole = "VIEWER"
      inviteMemberApi(emailAddUser, project.projectId, userRole).then((info) => {
        NotifySucess("sucessfully.");
        listMemberApi(project.projectId).then((response) => {
          // setShowInfoProject(response.data.payload);
        })
          .catch((err) => {
            NotifyError("Invalid password or email.");
          });
      })
        .catch((err) => {
          toast.error("error hz");
        });
    } else {
      inviteMemberApi(emailAddUser, project.projectId, userRole)
        .then((info) => {
          listMemberApi(project.projectId)
            .then((response) => {})
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          NotifyError("Already in project.");
        });
    }
  };
  let [active, setActive] = useState()
  //Button Getting HTTPMethod
  const clickHttpMethod = (e) => {
    setIsInvoked("MethodInvoked");
    setActive(e)
    console.log("cs ac ", active)
    filterMethod(project?.projectId, e).then((response) => {
      dispatch(listEndpoint(response.data.payload));
    });
    setMethod(e);
  };
  const handleAddController = () => {
    const newController = {
      controllerName: `Controller${forController.length}`,
      isEditing: false,
    };
    const insertControllerName = {
      controllerName: `${newController.controllerName}`,
    };
    createControllerApi(project.projectId, insertControllerName)
      .then((response) => {
          listMemberApi(project?.projectId)
          .then((response) => {
          setIsDataUpdate(true);
          setDataMember(response.data.payload);
          dispatch(listMember(response.data.payload));
        })
        .catch((err) => {
          console.log(err);
        });

        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setForController([...forController, newController]);
  };
  //Convert number of month to the word of month
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const convertTimestampToDate = (timestamp) => {
    let date;
    if (typeof timestamp === "number") {
      date = new Date(timestamp);
    } else if (Array.isArray(timestamp)) {
      date = new Date(Date.UTC(...timestamp));
    } else {
      return "";
    }

    const day = date.getUTCDate().toString().padStart(2, "0");
    const monthIndex = date.getUTCMonth();
    const month = monthNames[monthIndex];
    const year = date.getUTCFullYear().toString();
    return `${month} ${day}, ${year}`;
  };
  const infoControllerInfoOfProjects = useSelector(
    (state) => state?.projects?.projects
  );
  useEffect(()=>{
    infoControllerApi(project?.projectId).then((r)=>{
      dispatch(getInfoControllerOfProject(r?.data?.payload.controllerInfo))
    })

  },[])

const url = window.location.href;
const id = url.substring(url.lastIndexOf("/") + 1)


  //Retrieve Info Controller
  useEffect(() => {
    listControllerApi(id)
      .then((response) => {
        setDataController(response.data.payload.controllerInfo);
        dataController.forEach((name) => {
          listEndpointApi(name.controllerName, id)
            .then((response) => {
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  //  (List-Endpoint)
  const retreiveController = (controllerName) => {
    setSaveControllerName(controllerName);
    listEndpointOfController(project?.projectId, controllerName)
      .then((response) => {
        setCatchStore(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsInvoked("ControllerInvoked");
  };
  const handleSave = (newText, index) => {
    const updatedControllers = [...forController];
    updatedControllers[index].controllerName = newText;
    updatedControllers[index].isEditing = false;
    setForController(updatedControllers);
  };
  const handleDeleteCard = (message, cardId) => {
    if (message) {
      try {
        deleteEndpointApi(cardId).then(() => {
          listMemberApi(project?.projectId)
            .then((response) => {
              setIsDataUpdate(true);
              
              listMemberApi(project?.projectId)
              .then((response) => {
              setDataMember(response.data.payload);
              dispatch(listMember(response.data.payload));
            })
            .catch((err) => {
              console.log(err);
            }); 
              dispatch(listMember(response.data.payload));
            })
            .catch((err) => {
              console.log(err);
            });
        });
        const updatedEndpoints = catchStore.filter(
          (endpoint) => endpoint.endpointId !== cardId
        );
        setIsDataUpdate(true);
        setDataMember(member);
        dispatch(listEndpoint(updatedEndpoints));
        setCatchStore(updatedEndpoints);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const controllerUpdated = (data) => {
    if (data) {
      listEndpointOfController(project?.projectId, saveControllerName)
        .then((response) => {
          setIsDataUpdate(true);
          listMemberApi(project?.projectId)
          .then((response) => {
          setDataMember(response.data.payload);
          dispatch(listMember(response.data.payload));
        })
        .catch((err) => {
          console.log(err);
        });
          setCatchStore(response.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

   const removeController = (controllerName) =>{
    instance.get(`/controllerId?controllerName=${controllerName}&projectId=${project.projectId}`).then((info)=>{
      deleteController(info.data.payload).then(()=>{
        infoControllerApi(project?.projectId).then((response)=>{
          console.log("resp",response?.data.payload.controllerInfo)
          dispatch(
            getInfoControllerOfProject(response?.data.payload.controllerInfo)
          );
          setForController(response?.data.payload.controllerInfo);
          setIsDataUpdate(true);

          listMemberApi(project?.projectId)
          .then((response) => {
          setDataMember(response.data.payload);
          dispatch(listMember(response.data.payload));
        })
        .catch((err) => {
          console.log(err);
        });
        })

        NotifySucess("Controller deleted successfully.")
      }).catch(()=>{
        NotifyError("Failed to delete.")
      })
    })
    
  }

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="bg-[#F2F4F7] font-poppins">
      <div>
        <div className="laptop:px-24 ipad-pro:px-16 12pro:px-8">
          <div className="grid laptop:grid-cols-10 ipad-pro:grid-cols-5 12pro:grid-cols-4 gap-2 rounded-lg py-10">
            {/* left side */}
            <div className="bg-white rounded-lg laptop:col-span-2 ipad-pro:col-span-1 12pro:col-span-4 shadow border">
              <div className="pl-5 py-6 border-b">
                <div className="text-dark-head font-bold laptop:text-2xl ipad-pro:text-xl">
                  {projectNames}
                </div>
                <div className="text-dark-head font-bold laptop:text-xl ipad-pro:text-base">
                  Project
                </div>
              </div>

              {/* <hr className=" mx-4" /> */}

              <div className="laptop:mt-4 ml-2 font-medium">
                <div
                  id="default-sidebar"
                  className="overflow-auto "
                  style={{ maxHeight: "550px" }}
                >
                  {/* Each Controller */}
                  {forController?.map((info, index) => (
                    <div
                      // key={info.controllerName}
                      className="grid grid-cols-2 mt-6 overflow-auto text-sm"
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <div className="inline-block mr-1">
                        <DatasetLinkedOutlinedIcon />
                      <button
                        className="laptop:text-sm ipad-pro:text-xs ml-4"
                        onClick={() => retreiveController(info.controllerName)}
                      >
                        <EditText
                          projectId={project.projectId}
                          initialValue={
                            info.controllerName.length > 20
                              ? info.controllerName.slice(0, 20) + "..."
                              : info.controllerName
                          }
                          onSave={(newText) => handleSave(newText, index)}
                        />
                      </button>
                      </div>

                      <button 
                      
                      onClick={()=>removeController(info.controllerName)}
                      className=" inline-block mr-6">
                      <ClearOutlinedIcon style={{ fontSize: '15px' }} />
                      </button>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* middle side */}
            <div className="laptop:col-span-6 ipad-pro:col-span-3 12pro:col-span-4 px-3">
              {
                checkRole === "OWNER" ? (
                  <div className="laptop:flex ipad-pro:block justify-between mb-3">
                    <div>
                      <button
                        onClick={handleAddController}
                        className="bg-white laptop:text-md border border-dark-head text-dark-head py-1 px-3 rounded-lg mr-2"
                      >
                        <ControlPointDuplicateOutlinedIcon className="text-gray-500 mr-1.5" />
                        <span className="12pro:text-sm laptop:text-base">New Controller</span>
                      </button>

                      <button className="bg-white laptop:text-md border border-dark-head text-dark-head py-1 px-3 rounded-lg">
                        <NavLink
                          // }
                          to={"/createEndpoint"}
                          className=" "
                        >
                          <ControlPointDuplicateOutlinedIcon className="text-gray-500 mr-1.5" />
                          <span className="12pro:text-sm laptop:text-base">New endpoint</span>
                        </NavLink>
                      </button>
                    </div>

                <div className="flex 12pro:mt-2 laptop:mt-0">
                  <button className="flex items-center bg-white laptop:text-md border border-dark-head text-dark-head py-1 px-3 rounded-lg mr-2">
                    <HttpsOutlinedIcon className="text-gray-500 mr-1.5" sx={{ fontSize: 20 }} />
                    <NavLink
                      // }
                      to={"/createEndpoint"}
                      className="12pro:text-sm laptop:text-base"
                    >
                      Token
                    </NavLink>

                      </button>

                      <button className="flex items-center bg-white laptop:text-md border border-dark-head text-dark-head py-1 px-3 rounded-lg mr-2">
                        <VpnKeyOutlinedIcon className="text-gray-500 mr-1.5" sx={{ fontSize: 20 }} />
                        <NavLink
                          // }
                          to={"/createEndpoint"}
                          className="12pro:text-sm laptop:text-base"
                        >
                          API Key
                        </NavLink>
                      </button>

                      <button className="flex items-center bg-white laptop:text-md border border-dark-head text-dark-head py-1 px-3 rounded-lg">
                        <SettingsOutlinedIcon className="text-gray-500" sx={{ fontSize: 20 }} />
                        <NavLink
                          // }
                          to={"/createEndpoint"}
                          className="12pro:text-sm laptop:text-base"
                        >
                        </NavLink>
                      </button>
                    </div>
                  </div>
                ) : null
              }

              {/* filter */}
              <div className="w-full bg-white min-h-screen rounded-lg border shadow p-4">
                <div className="">
                  <div className="py-4 flex items-center gap-6 border-b">
                    <p className=" inline-block opacity-70 mr-4">Filter:</p>
                    <button
                      onClick={() => {
                        clickHttpMethod(HttpMethod.GET);
                      }}
                      className={active == 'GET' ? 'border py-1 border-1 bg-blue-500 text-white border-blue-700 px-6 rounded-lg text-sm' : 'border border-1 hover:bg-blue-500 text-blue-500 hover:text-white border-blue-700 px-6 py-1 rounded-lg text-sm'}
                    >
                      GET
                    </button>
                    <button
                      onClick={() => {
                        clickHttpMethod(HttpMethod.POST);
                      }}
                      className={active == 'POST' ? 'border py-1 border-1 bg-green-500 text-white border-green-700 px-6 rounded-lg text-sm' : 'border border-1 hover:bg-green-500 text-green-500 hover:text-white border-green-700 px-6 py-1 rounded-lg text-sm'}
                    >
                      POST
                    </button>
                    <button
                      onClick={() => {
                        clickHttpMethod(HttpMethod.PUT);
                      }}
                      className={active == 'PUT' ? 'border py-1 border-1 bg-yellow-500 text-white border-yellow-700 px-6 rounded-lg text-sm' : 'border border-1 hover:bg-yellow-500 text-yellow-500 hover:text-white border-yellow-700 px-6 py-1 rounded-lg text-sm'}
                    >
                      PUT
                    </button>
                    <button
                      onClick={() => {
                        clickHttpMethod(HttpMethod.DELETE);
                      }}
                      className={active == 'DELETE' ? 'border py-1 border-1 bg-red-500 text-white border-red-700 px-6 rounded-lg text-sm' : 'border border-1 hover:bg-red-500 text-red-500 hover:text-white border-red-700 px-6 py-1 rounded-lg text-sm'}
                    >
                      DELETE
                    </button>
                  </div>

                  {/* main dropdown */}
                  <div
                    id="default-sidebar"
                    // style={{ maxHeight: "550px" }}
                    className="overflow-auto mt-5 w-full font-poppins"
                  >
                    {isInvoked === "MethodInvoked" ? (
                      <>
                        {method === HttpMethod.GET && (
                          <div className="mb-1 overflow-auto">
                            <MidProjectPageComponent />
                          </div>
                        )}

                        {method === HttpMethod.POST && (
                          <div className="mb-1 overflow-auto">
                            <PostProjectComponent />
                          </div>
                        )}

                        {method === HttpMethod.PUT && (
                          <div className="mb-1 overflow-auto">
                            <PutProjectComponent />
                          </div>
                        )}

                        {method === HttpMethod.DELETE && (
                          <div className="mb-1 overflow-auto">
                            <DeleteProjectComponent />
                          </div>
                        )}
                      </>
                    ) : isInvoked === "ControllerInvoked" ? (
                      <div>
                        {catchStore && catchStore.length > 0 ? (
                          catchStore.map((info, index) => (
                            <div key={index}>
                              {info.method === HttpMethod.GET ? (
                                <div className="mb-1 overflow-auto">
                                  <MidProjectPageComponent
                                    getData={controllerUpdated}
                                    MethodGET={info}
                                    ControllerName={sendControllerName}
                                    onDelete={handleDeleteCard}
                                  />
                                </div>
                              ) : info.method === HttpMethod.POST ? (
                                <div className="mb-1 overflow-auto">
                                  <PostProjectComponent
                                    getData={controllerUpdated}
                                    MethodPOST={info}
                                    ControllerName={sendControllerName}
                                    onDelete={handleDeleteCard}
                                  />
                                </div>
                              ) : info.method === HttpMethod.PUT ? (
                                <div className="mb-1 overflow-auto">
                                  <PutProjectComponent
                                    getData={controllerUpdated}
                                    MethodPUT={info}
                                    ControllerName={sendControllerName}
                                    onDelete={handleDeleteCard}
                                  />
                                </div>
                              ) : info.method === HttpMethod.DELETE ? (
                                <div className="mb-1 overflow-auto">
                                  <DeleteProjectComponent
                                    getData={controllerUpdated}
                                    MethodDELETE={info}
                                    ControllerName={sendControllerName}
                                    onDelete={handleDeleteCard}
                                  />
                                </div>
                              ) : null}
                            </div>
                          ))
                        ) : (
                          <div className="text-center">
                            No request URLs available.
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="laptop:col-span-2 ipad-pro:col-span-1 12pro:col-span-2 bg-white rounded-lg pt-8 border shadow">
              <div className="">
                <div className="pb-4 flex justify-center flex-col items-center">
                  {/* Character Image */}
                  <div className="style-pf border-l-4 border-l-transparent border-r-4 border-t-4  border-b-4 p-1 border-dark-head rounded-full -rotate-45">
                    <p className="w-24 h-24 bg-blue-500 rounded-full rotate-45 text-2xl uppercase text-white flex justify-center items-center">
                      {member?.projectInfo?.projectName?.charAt(0)}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center mt-3 mb-3">
                    <p className="font-medium font-poppins text-dark-head ipad-pro:text-xs laptop:text-lg mt-1">
                      {/* {dataMember?.projectInfo?.projectName} */}
                      {isDataUpdate
                        ? dataMember?.projectInfo?.projectName
                        : member?.projectInfo?.projectName}
                    </p>
                    <div className="text-sm flex items-center">
                      <span className="text-date font-poppins">
                        {convertTimestampToDate(
                          isDataUpdate
                            ? dataMember?.projectInfo?.createdDate
                            : member?.projectInfo?.createdDate
                        )}
                        &nbsp;
                      </span>-

                      {member?.projectInfo?.isPublic === true ? (
                        <LockOutlinedIcon sx={{ fontSize: 15 }} />
                      ) : (
                        <HttpsOutlinedIcon sx={{ fontSize: 15 }} />
                      )}
                    </div>
                  </div>

                  <div className="self-start pl-3 text-gray-500">
                    <div className="flex items-center mt-2 text-sm">
                      <InsertLinkOutlinedIcon />
                      <span className=" ml-2 font-poppins text-date">
                        {isDataUpdate
                          ? dataMember?.countEndPoint <= 9
                            ? `0${dataMember?.countEndPoint}`
                            : `${dataMember?.countEndPoint}`
                          : member?.countEndPoint <= 9
                          ? `0${member?.countEndPoint}`
                          : `${member?.countEndPoint}`}
                      </span>

                      {isDataUpdate ? (
                        dataMember?.countEndPoint <= 1 ? (
                          <p className=" font-poppins text-date">
                            &nbsp;url-endpoint
                          </p>
                        ) : (
                          <p className=" font-poppins text-date  ">
                            &nbsp;url-endpoints
                          </p>
                        )
                      ) : member?.countEndPoint <= 1 ? (
                        <p className=" font-poppins text-date">
                          &nbsp;url-endpoint
                        </p>
                      ) : (
                        <p className=" font-poppins text-date  ">
                          &nbsp;url-endpoints
                        </p>
                      )}
                    </div>

                    <div className=" flex items-center text-date text-sm">
                      <DatasetLinkedOutlinedIcon />
                      <span className=" ml-2 font-poppins text-date">
                        {isDataUpdate
                          ? dataMember?.countController <= 9
                            ? `0${dataMember?.countController}`
                            : `${dataMember?.countController}`
                          : member?.countController <= 9
                          ? `0${member?.countController}`
                          : `${member?.countController}`}
                      </span>

                      {isDataUpdate ? (
                        dataMember?.countController <= 1 ? (
                          <p className=" font-poppins text-date">
                            &nbsp;controller
                          </p>
                        ) : (
                          <p className=" font-poppins text-date">
                            &nbsp;controllers
                          </p>
                        )
                      ) : member?.countController <= 1 ? (
                        <p className=" font-poppins text-date">
                          &nbsp;controller
                        </p>
                      ) : (
                        <p className=" font-poppins text-date">
                          &nbsp;controllers
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="mx-4" />
                <div className="mt-6">
                  <div className="flex px-4 justify-between items-center pb-3 border-b">
                    <div className="flex items-center">
                      <div className="font-montserrat">
                        <div className="flex">
                          <PeopleOutlineIcon className="mr-2" />
                          <div>
                            <span className="laptop:text-base ipad-pro:text-xs font-semibold">Team members</span>
                            <p className="text-gray-500 text-sm opacity-80 mt-1">
                              Total: {member?.countMember <= 9
                                ? "0" + member?.countMember
                                : member?.countMember}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* map members */}
                  <div
                    id="default-sidebar"
                    className="mt-3 px-3 overflow-auto"
                    style={{ maxHeight: "440px" }}
                  >
                    {member?.userData?.map((info) => (
                      <div className="flex items-center">
                        <div className="my-2">
                          <div className="">
                            {info.imagePath !== null ? (
                              info.imagePath.startsWith("https://") ||
                                info.imagePath.startsWith("http://") ? (
                                <>
                                  {/* {checkImageUrl(image[index])} */}
                                  {/* {image[index]} */}
                                  <img
                                    src={info.imagePath}
                                    alt="profile"
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                </>
                              ) : info.imagePath != null ? (
                                <>
                                  <img
                                    src={`http://localhost:8080/api/file-images?fileName=${info.imagePath}`}
                                    alt="profile"
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                </>
                              ) : (
                                <div
                                  className={`w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center text-xl`}
                                >
                                  {info.username.charAt(0).toUpperCase()}
                                </div>
                                // console.log("hlo")
                              )
                            ) : (
                              <div
                                className={`w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center text-xl`}
                              >
                                {info.username.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>


                        <div className="text-sm flex justify-between pl-2 w-full">
                          <span>{info?.username}</span>
                          {
                            info.groupRole === "OWNER" ? (
                              <div className="ml-2">
                                <span>{member?.username}</span>

                                <span className="font-semibold text-xs">Owner</span>
                              </div>
                            )
                              : null
                          }
                        </div>
                      </div>

                    ))}
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
