import React, { useEffect, useState } from "react";
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
import MidProjectPageComponent from "../components/MidProjectPageComponent";
import PostProjectComponent from "../components/PostProjectComponent";
import PutProjectComponent from "../components/PutProjectComponent";
import DeleteProjectComponent from "../components/DeleteProjectComponent";
import {
    API_HEADER,
    BASE_URL,
    NotifyError,
    NotifySucess,
} from "../redux/Constants";
import EditText from "../components/edit_text/EditText";
import { toast } from "react-toastify";
import { createControllerApi, deleteEndpointApi, filterMethod, infoControllerApi, inviteMemberApi, listControllerApi, listEndpointApi, listEndpointOfController, listMemberApi, projectIdApi } from "../redux/service/ProjectService";
import { useDispatch, useSelector } from "react-redux";
import { endpointByController, endpointOfControllerName, getInfoControllerOfProject, listEndpoint, listMember } from "../redux/slice/ProjectSlice";

export default function ProjectPageNew() {
    const navigate = useNavigate();
    const location = useLocation();
    const project = location.state;
    const dispatch = useDispatch();
    const projectName = project?.info?.projectInfo?.projectInfo?.projectName;
    const projectId = project.projectId
    const infoControllerInfoOfProject = useSelector(
        (state) => state.projects.progetInfoControllerOfProjectjects
    );
    const member = useSelector(
        (state) => state.projects.listMemberr
    );
    const responseListEndpoint = useSelector(
        (state) => state.projects.listEndpoints
    );


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

    const HttpMethod = {
        GET: "GET",
        POST: "POST",
        DELETE: "DELETE",
        PUT: "PUT",
    };
    useEffect(() => {
        infoControllerApi(project?.projectId).then((response) => {
            dispatch(getInfoControllerOfProject(response.data.payload.controllerInfo))
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
            dispatch(endpointOfControllerName(endpointResponses))
            setInfoEndpoint(endpointResponses);
        }
        );
        listMemberApi(project?.projectId).then((response) => {
            dispatch(listMember(response.data.payload))
            // setShowInfoProject(response.data.payload);
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
            inviteMemberApi(emailAddUser, project.projectId, userRole).then((info) => {
                listMemberApi(project.projectId).then((response) => {
                    // setShowInfoProject(response.data.payload);
                })
                    .catch((err) => {
                        console.log(err);
                    });
            })
                .catch((err) => {
                    NotifyError("Already in project.");
                });
        }
    };
    //Button Getting HTTPMethod
    const clickHttpMethod = (e) => {
        setIsInvoked("MethodInvoked");
        filterMethod(project?.projectId, e).then((response) => {
            dispatch(listEndpoint(response.data.payload))
        })
        setMethod(e);
    };

    const handleAddController = () => {
        const newController = {
            controllerName: `Controller${infoControllerInfoOfProject.countController}`,
            isEditing: false,
        };

        const insertControllerName = {
            controllerName: `${newController.controllerName}`,
        };

        createControllerApi(project.projectId, insertControllerName).then((response) => {
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
    //Retrieve Info Controller
    // useEffect(() => {
    //     listControllerApi(projectName).then((response) => {
    //         setDataController(response.data.payload);
    //         projectIdApi(projectName).then((response) => {
    //             const projectId = response.data;
    //             dataController.forEach((name) => {
    //                 listEndpointApi(name.controllerName, projectId).then((response) => { })
    //                     .catch((err) => {
    //                         console.log(err);
    //                     });
    //             });
    //         })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    useEffect(() => {
        listControllerApi(projectId)
          .then((response) => {
            setDataController(response.data.payload.controllerInfo);
            console.log("setDataController: ", response.data.payload);
            dataController.forEach((name) => {
              listEndpointApi(name.controllerName, projectId)
                .then((response) => {
                  console.log("listEndpointApi: ", response);
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
        console.log("ControlleName: ", controllerName)
        listEndpointOfController(project?.projectId, controllerName).then((response) => {
            setCatchStore(response.data.payload)
        }).catch((err) => {
            console.log(err)
        })
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
                deleteEndpointApi(cardId);
                const updatedEndpoints = catchStore.filter(
                    (endpoint) => endpoint.endpointId !== cardId
                );
                dispatch(listEndpoint(updatedEndpoints));
                setCatchStore(updatedEndpoints);
            } catch (e) {
                console.error(e);
            }
        }
    }
    return (
        <div className=' bg-bg-new' >
            <div>
                <div className="flex justify-center ">
                    <div

                        className=' grid grid-cols-6 laptop:w-[95%] laptop:h-screen mb-10 laptop:mt-10  '
                    // className="grid grid-cols-6 laptop:rounded-tl-3xl laptop:rounded-tr-3xl 12pro:mt-5 12pro:mb-5 bg-whitesmoke shadow-md shadow-slate-400 laptop:w-[93%] laptop:h-screen laptop:mt-10 laptop:mb-10 ipad-pro:rounded-tl-3xl ipad-pro:rounded-tr-3xl ipad-pro:w-[93%] 12pro:w-[95%] ipad-pro:h-screen ipad-pro:mt-10 ipad-pro:mb-10 "
                    >
                        <div className=" laptop:col-span-1  laptop:border  laptop:border-slate-500  rounded-2xl ">
                            <div className=" block  h-[50px]">
                                <div className=" pt-10 text-start pl-10  font-bold text-black text-opacity-50 pb-10 uppercase">Academate <br /> Project</div>
                                <hr className=' mx-3' />
                                <div className=" laptop:mt-14 12pro:mt-5 12pro:ml-3 ipad-pro:ml-4 ipad-pro:mt-7 laptop:ml-10 laptop:font-bold">
                                    <div
                                        id="default-sidebar"
                                        className="overflow-auto "
                                        style={{ maxHeight: "600px" }}
                                    >
                                        {/* Each Controller */}
                                        {forController.map((info, index) => (
                                            <div key={index} className="mt-6 overflow-auto text-base">
                                                <div className="inline-block">
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/512/6229/6229265.png"
                                                        style={{
                                                            width: "18px",
                                                            height: "18px",
                                                            maxWidth: "100%",
                                                            maxHeight: "100%",
                                                        }}
                                                        className="laptop:h-9 laptop:w-9 ipad-pro:h-7 ipad-pro:w-7 inline-block rounded-3xl mr-6"
                                                    />
                                                </div>

                                                <button
                                                    className="font-poppins"
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
                                        ))}

                                    </div>
                                </div>


                            </div>




                        </div>
                        <div className=" laptop:col-span-4 ">

                            <div className=" ml-9 w-screen flex ">
                                <button
                                    onClick={handleAddController}
                                    className=" bg-white laptop:text-md border border-[#04054F]  laptop:flex laptop:items-center laptop:justify-center   text-[#04054F] laptop:w-[200px] laptop:h-[40px] laptop:rounded-lg"
                                >
                                    + New Controller
                                </button>
                                <div className=" laptop:mt-4  laptop:ml-4 laptop:font-bold">
                                    <div
                                        id="default-sidebar"
                                        className="overflow-auto "
                                        style={{ maxHeight: "600px" }}
                                    >
                                        {/* Each Controller */}
                                        {forController.map((info, index) => (
                                            <div key={index} className="mt-6 overflow-auto text-base">
                                                <div className="inline-block">
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/512/6229/6229265.png"
                                                        style={{
                                                            width: "18px",
                                                            height: "18px",
                                                            maxWidth: "100%",
                                                            maxHeight: "100%",
                                                        }}
                                                        className="laptop:h-9 laptop:w-9 ipad-pro:h-7 ipad-pro:w-7 inline-block rounded-3xl mr-6"
                                                    />
                                                </div>

                                                <button
                                                    className="font-poppins"
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
                                        ))}
                                    </div>
                                </div>
                                <div className=" ">
                                <NavLink
                                    // }
                                    to={"/createEndpoint"}
                                    className="bg-white border border-[#04054F] text-[#04054F] laptop:text-md  laptop:flex laptop:items-center laptop:justify-center ipad-pro:block     laptop:w-[200px] laptop:h-[40px] laptop:rounded-lg"
                                >
                                    + Create new endpoint
                                </NavLink>
                                </div>
                                {/* <button
                                    onClick={handleAddController}
                                    className=" ml-4 bg-white border border-[#04054F] text-[#04054F] laptop:text-md  laptop:flex laptop:items-center laptop:justify-center ipad-pro:block     laptop:w-[200px] laptop:h-[40px] laptop:rounded-lg"
                                >
                                    + New Endpoint
                                </button> */}
                                <div
                id="default-sidebar"
                style={{ maxHeight: "550px" }}
                className="overflow-auto ipad-pro:py-3 mt-2 laptop:py-3  font-poppins"
              >
                {isInvoked === "MethodInvoked" ? (
                  <>
                    {method === HttpMethod.GET &&
                        <div className="mb-1 overflow-auto" >
                          <MidProjectPageComponent
                          />
                        </div>
                      }

                    {method === HttpMethod.POST &&
                        <div className="mb-1 overflow-auto">
                          <PostProjectComponent />
                        </div>
                      }

                    {method === HttpMethod.PUT &&
                        <div className="mb-1 overflow-auto" >
                          <PutProjectComponent />
                        </div>
                        }

                    {method === HttpMethod.DELETE &&
                        <div className="mb-1 overflow-auto" >
                          <DeleteProjectComponent />
                        </div>
                        }
                  </>
                ) : isInvoked === "ControllerInvoked" ? ( 
                  <div>
                    {catchStore && catchStore.length > 0 ? (
                      catchStore.map((info, index) => (
                        <div key={index}>
                          {info.method === HttpMethod.GET ? (
                            <div className="mb-1 overflow-auto">
                              <MidProjectPageComponent
                                MethodGET={info}
                                ControllerName={sendControllerName}
                                onDelete={handleDeleteCard}
                              />
                            </div>
                          ) : info.method === HttpMethod.POST ? (
                            <div className="mb-1 overflow-auto">
                              <PostProjectComponent
                                MethodPOST={info}
                                ControllerName={sendControllerName}
                                onDelete={handleDeleteCard}
                              />
                            </div>
                          ) : info.method === HttpMethod.PUT ? (
                            <div className="mb-1 overflow-auto">
                              <PutProjectComponent
                                MethodPUT={info}
                                ControllerName={sendControllerName}
                                onDelete={handleDeleteCard}
                              />
                            </div>
                          ) : info.method === HttpMethod.DELETE ? (
                            <div className="mb-1 overflow-auto">
                              <DeleteProjectComponent
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


                                <div className=" ml-36 flex items-end justify-end">
                                    <button
                                        onClick={handleAddController}
                                        className=" ml-4 bg-white text-[#04054F] border border-[#04054F] laptop:text-md  laptop:flex laptop:items-center laptop:justify-center ipad-pro:block     laptop:w-[100px] laptop:h-[40px] laptop:rounded-lg"
                                    >
                                        Token
                                    </button>
                                    <button
                                        onClick={handleAddController}
                                        className=" ml-2  bg-white text-[#04054F] border border-[#04054F] laptop:text-md  laptop:flex laptop:items-center laptop:justify-center ipad-pro:block    laptop:w-[100px] laptop:h-[40px] laptop:rounded-lg"
                                    >
                                        Api Key
                                    </button>
                                    <button
                                        onClick={handleAddController}
                                        className=" ml-2  bg-white text-[#04054F] border border-[#04054F] laptop:text-md  laptop:flex laptop:items-center laptop:justify-center ipad-pro:block     laptop:w-[100px] laptop:h-[40px] laptop:rounded-lg"
                                    >
                                        Setting
                                    </button>
                                </div>

                            </div>



                            <dgiv className=" h-[95%]  rounded-2xl ml-10 mt-8 w-[92%]  laptop:border laptop:border-slate-500" >
                                <div className=" laptop:col-span-4">
                                    <div className="laptop:w-[97%] laptop:flex  laptop:mt-2 laptop:justify-start ml-10 items-center ">
                                        <div className=" w-[90%] laptop:ml-[8px]  laptop:space-x-3 ipad-pro:space-x-2 ipad-pro:px-1 12pro:space-x-2 12pro:px-1 ipad-pro:mt-2 laptop:px-2 12pro:mt-2 laptop:mt-2  "> Filter:

                                            <button
                                                onClick={() => {
                                                    clickHttpMethod(HttpMethod.GET);
                                                }}
                                                className=" ml-9 border border-1 font-bold text-white bg-btn-get border-blue-500 laptop:px-6 ipad-pro:px-3 ipad-pro:py-1 12pro:px-2 12pro:py-1 12pro:rounded-lg  laptop:text-sm ipad-pro:text-xs 12pro:text-[11px] ipad-pro:rounded-md laptop:rounded-md laptop:py-2"
                                            >
                                                GET
                                            </button>
                                            <button
                                                onClick={() => {
                                                    clickHttpMethod(HttpMethod.POST);
                                                }}
                                                className="border border-1  bg-btn-post text-white font-bold border-green-500 laptop:px-6 ipad-pro:px-3 ipad-pro:py-1 12pro:px-2 12pro:py-1 12pro:rounded-lg laptop:text-sm ipad-pro:text-xs 12pro:text-[11px] ipad-pro:rounded-md laptop:rounded-md laptop:py-2"
                                            >
                                                POST
                                            </button>
                                            <button
                                                onClick={() => {
                                                    clickHttpMethod(HttpMethod.PUT);
                                                }}
                                                className="border border-1 bg-btn-put text-white font-bold border-yellow-500  laptop:px-6 ipad-pro:px-3 ipad-pro:py-1 12pro:px-2 12pro:py-1 12pro:rounded-lg laptop:text-sm ipad-pro:text-xs 12pro:text-[11px] ipad-pro:rounded-md laptop:rounded-md laptop:py-2"
                                            >
                                                PUT
                                            </button>
                                            <button
                                                onClick={() => {
                                                    clickHttpMethod(HttpMethod.DELETE);
                                                }}
                                                className="border border-1 bg-btn-del font-bold text-white border-red-700 laptop:px-6 ipad-pro:px-3 ipad-pro:py-1 12pro:px-2 12pro:py-1 12pro:rounded-lg laptop:text-sm ipad-pro:text-xs 12pro:text-[11px] ipad-pro:rounded-md laptop:rounded-md laptop:py-2
                                             mb-3 "
                                            >
                                                DELETE
                                            </button>
                                            <hr className=" w-full" />
                                        </div>


                                    </div>
                                    <div className="relative mt-5 ml-4">
                                        <div className=" absolute w-[35%] border  border-[#1F98F0]  h-12   bg-white rounded-xl ">
                                            <div className=" absolute rounded-lg mt-2  ml-2 h-8 bg-white border-[#1F98F0] border w-[20%] ">
                                                <p className=" text-center mt-[2px] text-[#1F98F0]">GET</p>

                                            </div>
                                        </div>
                                        <div className=" absolute w-[35%] border top-[55px] border-[#1F98F0] h-12  bg-white rounded-xl ">
                                            <div className=" absolute rounded-lg mt-2  ml-2 h-8 bg-white border-[#1F98F0] border w-[20%] ">
                                                <p className=" text-center mt-[2px] text-[#1F98F0]">GET</p>

                                            </div>
                                        </div>
                                        <div className=" absolute w-[35%] border top-[110px] border-[#1F98F0]  h-12   bg-white rounded-xl ">
                                            <div className=" absolute rounded-lg mt-2  ml-2 h-8 bg-white border-[#1F98F0] border w-[20%] ">
                                                <p className=" text-center mt-[2px] text-[#1F98F0]">GET</p>

                                            </div>
                                        </div>
                                        <div className=" absolute w-[35%] border top-[165px] border-[#1F98F0]  h-12   bg-white rounded-xl ">
                                            <div className=" absolute rounded-lg mt-2  ml-2 h-8 bg-white border-[#1F98F0] border w-[20%] ">
                                                <p className=" text-center mt-[2px] text-[#1F98F0]">GET</p>

                                            </div>
                                        </div>

                                        <div className="   font-bold font-poppins  absolute w-[62%]  border left-[36%] top-[0px] border-slate-500 h-[550px]  bg-[#FBFBFF] rounded-2xl ">
                                            <div className=" mt-3 ml-4 mr-2 grid grid-cols-3">
                                                <div className=" col-span-1">
                                                    <p className=" uppercase text-[#454545]">id</p>
                                                    <p className=" capitalize text-[#454545] "> created at </p>
                                                    <p className="capitalize text-[#454545] ">  method </p>
                                                    <p className="capitalize text-[#454545]"> returns</p>

                                                    <div className="flex mt-1  ">
                                                        <p className=" mr-2 bg-[#000000] text-white  rounded-lg w-fit px-4"> 200 </p>
                                                        <p className=" bg-[#01094E] text-white  rounded-lg w-fit px-4"> application/json </p>
                                                    </div>
                                                </div>


                                                <div className=" col-span-2">
                                                    <h1 className=""> c45e42c6-bce2-46d2-bd5a-8f6ffc239dbb </h1>
                                                    <h1 className=""> 2023-04-27 11:04 </h1>
                                                    <h1 className=" uppercase text-blue-700 "> get </h1>

                                                </div>
                                                <div className=" rounded-xl mt-4 col-span-3 w-[98%] h-cover bg-blue-gray-600">
                                                    <p className=" text-start text-white ml-4 mt-10 font-bold font-jetbrain">

                                                        "userId": { } 1,<br />  "id": 1, <br />  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",  <br /> "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"</p>
                                                </div>
                                                {/*     
                                            <p className=" ml-2 mt-2 flex justify-start "> id
                                                <p className=" ml-20 ">c45e42c6-bce2-46d2-bd5a-8f6ffc239dbb</p></p>
                                                <p className=" ml-2 mt-2 capitalize flex justify-start "> created at
                                                <p className=" ml-20 ">2023-04-27 11:04</p></p>
                                                <p className=" ml-2 mt-2 capitalize flex justify-start "> methods
                                                <p className=" ml-20 text-blue-gray-600 ">GET</p></p>
                                                <p className=" ml-2 mt-2 flex justify-start "> Returns
                                            </p>
                                            <div className=" mx-[25px] rounded-xl bg-red-100 w-[90%]   mt-2 h-[300px]">
                                                <p> 404 </p>
                                            </div> */}



                                            </div>
                                        </div>

                                        {/* <div className=" absolute w-[100px] top-[40px] h-10 bg-red-700">dasf </div>
                                        <div className=" absolute w-[100px] top-[80px] h-10 bg-red-500">dasf </div>
                                        <div className=" absolute w-[100px] top-[120px]  h-10 bg-red-100">dasf </div> */}


                                    </div>
                                </div>

                            </dgiv>



                        </div>
                        <div className=" laptop:col-span-1  laptop:border  laptop:border-slate-500  rounded-2xl">
                            <div className=" block  h-[50px]">
                                <div className=" pt-10 text-center  font-bold text-black text-opacity-50 pb-10 uppercase">Team Member</div>


                                <hr className=' mx-3' />
                                <div className=" laptop:mt-14 12pro:mt-5 12pro:ml-3 ipad-pro:ml-4 ipad-pro:mt-7 laptop:ml-10 laptop:font-bold">

                                </div>


                            </div>

                            <div className=" ml-6 mt-6">
                                < div className=" inline-block">
                                    <div className="flex justify-center items-center">
                                        <label
                                            htmlFor="my-modal-member"
                                            className="hover:scale-110 hover:cursor-pointer py-2 font-semibold font-poppins text-sm text-center w-full flex items-center justify-center"
                                        >
                                            <img
                                                src={Add}
                                                className=" opacity-50 laptop:h-4 laptop:w-4 ipad-pro:h-3 ipad-pro:w-3 inline-block mb-1 mr-6"
                                            />

                                        </label>
                                        <h1 className=" ml-2 mb-1 font-poppins laptop:text-xl ipad-pro:text-md">
                                            Invite
                                        </h1>
                                    </div>


                                    <input
                                        type="checkbox"
                                        id="my-modal-member"
                                        className="modal-toggle"
                                    />
                                    <div className="modal font-montserrat">
                                        <div className="modal-box w-[50%] max-w-5xl px-16 py-10 ">
                                            {/* title invite member */}
                                            <span className="font-bold text-2xl">
                                                Invite members
                                            </span>

                                            <h3 className="py-4">
                                                You're inviting members to the{" "}
                                                <strong className="text-blue-500">
                                                    {member?.projectInfo?.projectName}
                                                </strong>
                                                {" project. "}
                                            </h3>
                                            <label
                                                for="default-input"
                                                className="block mb-2 py-1 text-gray-900 dark:text-white font-bold text-lg"
                                            >
                                                Email Address
                                            </label>
                                            {/* Input field */}

                                            <input
                                                type="text"
                                                required
                                                onChange={getEmailToAddUser}
                                                id="default-input"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3"
                                            />
                                            {/* Select Viewer or Editor */}
                                            <label className="text-gray-400 text-sm">
                                                Select members or type email addresses
                                            </label>
                                            <div className="relative w-full lg:max-w-sm py-3 ">
                                                <label
                                                    for="message"
                                                    className="block mb-2 font-poppins text-lg font-bold"
                                                >
                                                    Select a role
                                                </label>
                                                <select
                                                    onChange={handleUserRole}
                                                    className="w-[40%] p-2 text-gray-500 bg-whitesmoke  border rounded-lg shadow-sm outline-none appearance-none"
                                                >
                                                    <option className="">Viewer</option>
                                                    <option>Editor</option>
                                                </select>
                                            </div>
                                            {/* Button */}
                                            <div className="modal-action">
                                                <div className="flex space-x-6">
                                                    <label
                                                        htmlFor="my-modal-member"
                                                        // onClick={NotifyError('asdfghjk')}
                                                        onClick={Invite}
                                                        className="btn btn-primary capitalize font-poppins text-base rounded-lg px-10 py-2"
                                                    >
                                                        Invite
                                                    </label>
                                                    <label
                                                        htmlFor="my-modal-member"
                                                        className="btn btn-ghost capitalize font-poppins text-base rounded-lg px-10 py-2 "
                                                    >
                                                        Cancel
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" mt-3 text-lg flex justify-between">
                                    <div className=" inline-block">
                                        <img src={Members} className=" h-4 w-4 inline-block mb-1" />
                                        <span className="ml-2 laptop:text-xl ipad-pro:text-md ">
                                            {member?.countMember <= 9
                                                ? "0" + member?.countMember
                                                : member?.countMember}
                                        </span>
                                        {member?.countMember >= 2 ? (
                                            <p className=" inline-block ml-2 laptop:text-xl ipad-pro:text-md">
                                                Members
                                            </p>
                                        ) : (
                                            <p className=" inline-block ml-2 laptop:text-xl ipad-pro:text-md">
                                                Member
                                            </p>
                                        )}
                                    </div>

                                </div>

                                <div
                                    id="default-sidebar"
                                    className="mt-3 overflow-auto"
                                    style={{ maxHeight: "440px" }}
                                >
                                    {member?.userData?.map((info) => (
                                        <div className="flex items-center">
                                            <div className="my-2">
                                                <div className="mr-2">
                                                    {info.imagePath !== null ? (
                                                        info.imagePath.startsWith("https://") ||
                                                            info.imagePath.startsWith("http://") ? (
                                                            <>
                                                                {/* {checkImageUrl(image[index])} */}
                                                                {/* {image[index]} */}
                                                                <img
                                                                    src={info.imagePath}
                                                                    alt="profile"
                                                                    className="w-6 h-6 rounded-full"
                                                                />
                                                            </>
                                                        ) : info.imagePath != null ? (
                                                            <>
                                                                <img
                                                                    src={`http://localhost:8080/api/file-images?fileName=${info.imagePath}`}
                                                                    alt="profile"
                                                                    className="w-6 h-6 rounded-full"
                                                                />
                                                            </>
                                                        ) : (
                                                            <div
                                                                className={`w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center text-xl`}
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

                                            <div className="flex flex-col">
                                                <div className="">
                                                    <span>{info?.username}</span>
                                                </div>
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

    )
}