import React, { useEffect, useState } from "react";
import no_data from "../asset/icon/No data-bro.png";
import { API_HEADER, BASE_URL, NotifyError, NotifySucess } from "../redux/Constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDispatch, useSelector } from "react-redux";
import { deleteEndpointApi, updateEndpoint } from "../redux/service/ProjectService";
import { listEndpoint, updateNewEndpoint } from "../redux/slice/ProjectSlice";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

export default function PostProjectComponent({
  MethodPOST,
  ControllerName,
  info,
  onDelete,
  getData
}) {
  const dispatch = useDispatch();
  const [catchStore, setCatchStore] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const responseListEndpoint = useSelector(
    (state) => state.projects.listEndpoints
  );

  useEffect(() => {
    setCatchStore(responseListEndpoint);
  }, [responseListEndpoint]);

  const handleDeleteEndpoint = async (cardId) => {
    try {
      await deleteEndpointApi(cardId);
      const updatedEndpoints = responseListEndpoint.filter(
        (endpoint) => endpoint.endpointId !== cardId
      );
      NotifySucess("Endpoint delete successfully.")
      dispatch(listEndpoint(updatedEndpoints));
    } catch (e) {
      NotifyError("Failed to delete endpoint.")
      console.error(e);
    }
  };

  const handleDeleteEndpointByController = (cardId) => {
    onDelete(true, cardId)
    try {
      deleteEndpointApi(cardId);
      const updatedEndpoints = responseListEndpoint.filter(
        (endpoint) => endpoint.endpointId !== cardId
      );
      NotifySucess("Endpoint delete successfully.")
      dispatch(listEndpoint(updatedEndpoints));
    } catch (e) {
      NotifyError("Failed to delete endpoint.")
      console.error(e);
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const [selectedEndpointId, setSelectedEndpointId] = useState(null);
  const dropDownMenu = (endpointId) => {
    setDropdown(!dropdown);
    setSelectedEndpointId(endpointId);
  };

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


  //Edit Endpoint
  const [endpointId, setEndpointId] = useState('')
  const [method, setMethod] = useState('')
  const [getRequestBody, setRequestBody] = useState('')
  const [isTextAreaValid, setIsTextAreaValid] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const EditEndpoint = (id, method) => {
    setEndpointId(id)
    setMethod(method)
  }

  const requestBody = (e) => {
    let value = e.target.value

    let parsedValue;
    if (value.startsWith('"') && value.endsWith('"')) {
      parsedValue = JSON.stringify({ data: value.slice(1, -1) });
    } else if (value.startsWith('[') && value.endsWith(']')) {
      parsedValue = JSON.stringify({ data: JSON.parse(value) });
    } else if (value.startsWith('{') && value.endsWith('}')) {
      parsedValue = value
    } else {
      parsedValue = JSON.stringify({ data: value });
    }
    const isTextAreaValid = value.trim() !== "";
    setIsTextAreaValid(isTextAreaValid);
    setRequestBody(parsedValue)
  }
  const ModifyEndpoint = async (method) => {
    setIsSubmitClicked(true);
    if (!isTextAreaValid) {
      return;
    } else {
      try {
        await updateEndpoint(endpointId, method, getRequestBody).then((item) => {
          dispatch(updateNewEndpoint({ endpointId, getRequestBody }))
        })
        getData(true)
        setIsLoading(true)
        NotifySucess("Endpoint changed successfully.")
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <div>
        {MethodPOST === undefined ? (
          catchStore && catchStore.length > 0 ? (
            catchStore.map((info) => (
              <div className="w-full">
                <ul className="">
                  <button
                    type="button"
                    className="w-full flex justify-between items-center bg-green-50 border border-green-300 px-4 py-2 transition duration-75 rounded-2xl mb-1 group"
                    onClick={() => dropDownMenu(info.endpointId)}
                  >
                    <div className="border px-2 border-green-300 rounded-lg text-green-500 laptop:rounded-md">
                      {/* {MethodPOST.method} */}
                      {info.method}
                    </div>
                    <div className="font-montserrat col-span-1 text-left 12pro:text-[12px] laptop:text-sm ipad-pro:text-xs ">
                      {/* {MethodPOST.path} */}
                      {info.route}
                    </div>

                    <div className=" 12pro:text-[11px] col-span-1 text-left laptop:text-sm ipad-pro:text-sm ">
                      {/* {MethodPOST.mockIdentify} */}
                      {info.mockIdentify}
                    </div>

                    <div className=" laptop:flex laptop:flex-row ipad-pro:flex ipad-pro:flex-rpw 12pro:flex 12pro:justify-end ">
                      <div className="flex flex-row">
                        {/*------ btn edit----- */}
                        <label
                          htmlFor={`my-modal-${endpointId}`}
                          onClick={() => { EditEndpoint(info.endpointId, info.method) }}
                          className="hover:scale-110 border border-green-300 rounded-lg p-1 hover:cursor-pointer mr-2 text-center w-full flex items-center justify-center">
                          <BorderColorOutlinedIcon className="text-green-400" sx={{ fontSize: 20 }} />
                        </label>

                        <input
                          type="checkbox"
                          id={`my-modal-${endpointId}`}
                          className="modal-toggle"
                        />

                        <div className="modal font-montserrat">
                          <div className="modal-box w-[40%] max-w-5xl px-10 py-5 ">
                            <div class="flex items-center">
                              <span class="mr-2">
                                <img
                                  class="w-8 h-8"
                                  src="https://cdn-icons-png.flaticon.com/512/1166/1166716.png?w=740&t=st=1686563967~exp=1686564567~hmac=2360063086e32cebda29a20a75ea15a4ac392cbe53ff506b0ee489250bc14f5e"
                                  alt=""
                                />
                              </span>
                              <span class="font-bold text-[20px] ml-2">
                                Endpoint Modification
                              </span>
                            </div>

                            <hr className="mt-2 h-1 bg-gray-300" />
                            <label
                              for="default-input"
                              className="block mt-3 py-1 text-left text-gray-900 dark:text-white font-bold text-[14px]"
                            >
                              Endpoint ID: <span className="ml-4">{endpointId}</span>
                            </label>

                            <label
                              for="default-input"
                              className="block py-1 text-left text-gray-900 dark:text-white font-bold text-[14px]"
                            >
                              Method: <span className="bg-green-500 ml-2">{method}</span>
                            </label>

                            <div className="bg-green-500 rounded-xl p-4 mt-3">
                              <label
                                for="default-input"
                                className="block text-left text-gray-900 dark:text-white font-bold text-[14px]"
                              >
                                Request Body{" "}
                                <span className="text-red-500 text-sm">
                                  {"(required)"}
                                </span>
                              </label>


                              {/* Input field */}
                              <textarea
                                id="message"
                                rows="6"
                                onChange={requestBody}
                                className="block mt-2 font-montserrat w-full text-sm text-gray-900 bg-whitesmoke rounded-lg border border-gray-300 placeholder-left-middle"
                                placeholder='{
                            "JSONHub": "Mock-API"
                            }'
                              ></textarea>
                              {!isTextAreaValid && isSubmitClicked && (
                                <p className="text-red-500 mt-2 ml-1 text-sm">
                                  This field is required.
                                </p>
                              )}
                            </div>

                            {/* Button */}
                            <div className="modal-action">
                              <div className="flex space-x-4">

                                <label
                                  htmlFor={`my-modal-${endpointId}`}
                                  onClick={() => { ModifyEndpoint(info.method) }}
                                  className="btn btn-primary -mt-3 capitalize font-poppins text-sm rounded-xl w-[120px] h-[30 px]"
                                >
                                  Modify
                                </label>

                                <label
                                  htmlFor={`my-modal-${endpointId}`}
                                  className="btn btn-ghost -mt-3 capitalize font-poppins text-sm rounded-xl w-[120px] h-[30 px] "
                                >
                                  Cancel
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>





                        {/*------- btn delete --------*/}
                        <label
                          htmlFor={`my-modal-delete-${info.endpointId}`}
                          className="hover:scale-110 hover:cursor-pointer border border-red-300 rounded-lg py-1 px-[1.5px] text-center w-full flex items-center"
                        >
                          <DeleteOutlinedIcon className="text-red-400" />
                        </label>

                        {/* -------popUp delete endpoint ------------ */}
                        <input
                          type="checkbox"
                          id={`my-modal-delete-${info.endpointId}`}
                          className="modal-toggle"
                        />
                        <div className="modal font-montserrat">
                          <div className="modal-box w-[25%] max-w-5xl px-12 py-8 text-center ">
                            <p>Are you sure to delete this Route ?</p>
                            {/* Button */}

                            <div className="modal-action flex justify-center">
                              <div className="flex space-x-6">
                                <label
                                  htmlFor={`my-modal-delete-${info.endpointId}`}
                                  onClick={() => {
                                    handleDeleteEndpoint(
                                      info.endpointId,
                                      info.httpMethod,
                                      "ControllerInvoked"
                                    );
                                  }}
                                  className="btn btn-error text-white capitalize font-poppins text-base rounded-lg px-6 py-1"
                                >
                                  DELETE
                                </label>
                                <label
                                  htmlFor={`my-modal-delete-${info.endpointId}`}
                                  className="btn btn-ghost capitalize font-poppins text-base rounded-lg px-6 py-1 "
                                >
                                  Cancel
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* -----------end popUp------------ */}
                      </div>
                    </div>
                  </button>
                  <div className="mb-4">
                    <div className="">
                      {dropdown && info.endpointId === selectedEndpointId ? (
                        <div className="bg-green-50 rounded-lg p-3 pt-0">
                          <div className=" ipad-pro:w-full 12pro:grid-rows-3 12pro:grid laptop:grid-rows-none ipad-pro:grid ipad-pro:grid-rows-3 laptop:w-full laptop:grid laptop:grid-cols-2 border border-1 border-green-400 border-t-0 border-l-0 border-r-0 h-fit py-2 bg-sky-100 ">
                            <div className=" laptop:flex laptop:row-span-1 laptop:col-span-1 laptop:w-full  ipad-pro:flex ipad-pro:row-span-1 ipad-pro:w-full">
                              <div className=" laptop:pl-2 laptop:flex laptop:flex-col ipad-pro:mt-2 ipad-pro:pl-2 ipad-pro:flex-col">
                                <div className="laptop:flex ipad-pro:flex 12pro:flex 12pro:text-[12px] laptop:text-sm ipad-pro:text-xs">
                                  <div className="w-[35%] font-bold">ID</div>
                                  <div className="">{info.endpointId}</div>
                                </div>
                                <div className="laptop:flex 12pro:flex 12pro:text-[12px] ipad-pro:flex laptop:text-sm ipad-pro:text-xs">
                                  <div className="w-[27%] font-bold">
                                    Create At
                                  </div>
                                  <div>
                                    {convertTimestampToDate(info.createdDate)}
                                  </div>
                                </div>
                                <div className="laptop:flex 12pro:flex 12pro:text-[12px] ipad-pro:flex laptop:text-sm ipad-pro:text-xs">
                                  <div className="w-[27%] font-bold">
                                    Method
                                  </div>
                                  <div className="text-green-500 font-bold">
                                    {info.httpMethod}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="laptop:w-[95%] 12pro:row-span-2 laptop:col-span-1 laptop:h-full ipad-pro:w-[100%] ipad-pro:row-span-2 ipad-pro:h-full bg-sky-300 laptop:rounded-md">
                              <div className="laptop:py-4 laptop:text-lg 12pro:px-3 12pro:py-1 laptop:px-3 ipad-pro:py-2 ipad-pro:text-lg ipad-pro:px-4 font-poppins font-bold text-slate-600">
                                Returns
                              </div>
                              <div className="laptop:flex laptop:flex-row 12pro:px-3 12pro:flex 12pro:flex-row laptop:px-3 ipad-pro:flex ipad-pro:flex-row ipad-pro:px-3">
                                <div className="bg-black ipad-pro:py-1 ipad-pro:px-7 ipad-pro:mr-3 laptop:py-1.5 laptop:px-7 laptop:mr-3 12pro:text-[12px] 12pro:pt-1 12pro:mr-2 12pro:py-1 12pro:px-4 laptop:text-md ipad-pro:text-sm rounded-lg text-white ">
                                  200
                                </div>
                                <div className=" bg-cyan-500 laptop:py-1.5 laptop:px-7 ipad-pro:py-1 ipad-pro:px-7 rounded-lg 12pro:text-[12px] 12pro:pt-1 12pro:mr-2 laptop:text-md 12pro:px-4 ipad-pro:text-sm text-white ">
                                  {"Application/Json"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="laptop:py-4 laptop:text-lg 12pro:px-3 12pro:py-1 laptop:px-3 ipad-pro:py-2 ipad-pro:text-lg ipad-pro:px-4 font-poppins font-bold text-slate-600">
                            Request Body
                          </div>
                          <div className="-mt-10 laptop:flex laptop:justify-center 12pro:py-5 12pro:flex 12pro:justify-center ipad-pro:py-5 ipad-pro:flex ipad-pro:justify-center laptop:py-5 ">
                            <div className="laptop:w-[100%] laptop:h-[80%] ipad-pro:w-[90%] ipad-pro:h-[80%] 12pro:w-[90%] 12pro:h-[80%] bg-sky-200 12pro:rounded-md laptop:rounded-lg 12pro:py-1 12pro:px-1 laptop:py-5 laptop:px-3 ipad-pro:rounded-lg ipad-pro:py-5 ipad-pro:px-3">
                              <div>
                                <SyntaxHighlighter
                                  language="json"
                                  style={atomDark}
                                >
                                  {JSON.stringify(info.requestBody, null, 2)}
                                </SyntaxHighlighter>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </ul>
              </div>
            ))
          ) : (
            <div className="mt-4 flex flex-col items-center">
              <img src={no_data} className="w-1/3" alt="no data" />
              <span>No endPoints.</span>
            </div>
          )
        ) : info === undefined ? (
          <div className="w-full">
            <ul className="">
              <button
                type="button"
                className="w-full flex justify-between items-center bg-green-50 border border-green-300 px-4 py-2 transition duration-75 rounded-2xl mb-1 group"
                onClick={dropDownMenu}
              >
                <div className="border px-2 border-green-300 rounded-lg text-green-500 laptop:rounded-md">
                  {MethodPOST.method}
                </div>
                <div className="font-montserrat col-span-1 text-left 12pro:text-[12px] laptop:text-sm ipad-pro:text-xs ">
                  {MethodPOST.route}
                  {/* {info.path} */}
                </div>

                <div className=" 12pro:text-[11px] col-span-1 text-left laptop:text-sm ipad-pro:text-sm ">
                  {MethodPOST.mockIdentify}
                  {/* {info.mockIdentify} */}
                </div>

                <div className=" laptop:flex laptop:flex-row ipad-pro:flex ipad-pro:flex-rpw 12pro:flex 12pro:justify-end ">
                  <div className="flex flex-row">
                    <label
                      htmlFor={`my-modal-${endpointId}`}
                      onClick={() => { EditEndpoint(MethodPOST.endpointId, MethodPOST.method) }}
                      className="hover:scale-110 border border-green-300 rounded-lg p-1 hover:cursor-pointer mr-2 text-center w-full flex items-center justify-center">
                      <BorderColorOutlinedIcon className="text-blue-400" sx={{ fontSize: 20 }} />
                    </label>

                    <input
                      type="checkbox"
                      id={`my-modal-${endpointId}`}
                      className="modal-toggle"
                    />

                    <div className="modal font-montserrat">
                      <div className="modal-box w-[40%] max-w-5xl px-10 py-5 ">
                        <div class="flex items-center">
                          <span class="mr-2">
                            <img
                              class="w-8 h-8"
                              src="https://cdn-icons-png.flaticon.com/512/1166/1166716.png?w=740&t=st=1686563967~exp=1686564567~hmac=2360063086e32cebda29a20a75ea15a4ac392cbe53ff506b0ee489250bc14f5e"
                              alt=""
                            />
                          </span>
                          <span class="font-bold text-[20px] ml-2">
                            Endpoint Modification
                          </span>
                        </div>

                        <hr className="mt-2 h-1 bg-gray-300" />
                        <label
                          for="default-input"
                          className="block mt-3 py-1 text-left text-gray-900 dark:text-white font-bold text-[14px]"
                        >
                          Endpoint ID: <span className="ml-4">{endpointId}</span>
                        </label>

                        <label
                          for="default-input"
                          className="block py-1 text-left text-gray-900 dark:text-white font-bold text-[14px]"
                        >
                          Method: <span className="bg-green-500 ml-2">{method}</span>
                        </label>

                        <div className="bg-green-500 rounded-xl p-4 mt-3">
                          <label
                            for="default-input"
                            className="block text-left text-gray-900 dark:text-white font-bold text-[14px]"
                          >
                            Request Body{" "}
                            <span className="text-red-500 text-sm">
                              {"(required)"}
                            </span>
                          </label>


                          {/* Input field */}
                          <textarea
                            id="message"
                            rows="6"
                            onChange={requestBody}
                            className="block mt-2 font-montserrat w-full text-sm text-gray-900 bg-whitesmoke rounded-lg border border-gray-300 placeholder-left-middle"
                            placeholder='{
                            "JSONHub": "Mock-API"
                            }'
                          ></textarea>
                          {!isTextAreaValid && isSubmitClicked && (
                            <p className="text-red-500 mt-2 ml-1 text-sm">
                              This field is required.
                            </p>
                          )}
                        </div>

                        {/* Button */}
                        <div className="modal-action">
                          <div className="flex space-x-4">

                            <label
                              htmlFor={`my-modal-${endpointId}`}
                              onClick={() => { ModifyEndpoint(MethodPOST.method) }}
                              className="btn btn-primary -mt-3 capitalize font-poppins text-sm rounded-xl w-[120px] h-[30 px]"
                            >
                              Modify
                            </label>

                            <label
                              htmlFor={`my-modal-${endpointId}`}
                              className="btn btn-ghost -mt-3 capitalize font-poppins text-sm rounded-xl w-[120px] h-[30 px] "
                            >
                              Cancel
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>







                    <label
                      htmlFor={`my-modal-delete-${MethodPOST.endpointId}`}
                      className="hover:scale-110 hover:cursor-pointer border border-red-300 rounded-lg py-1 px-[1.5px] text-center w-full flex items-center"
                    >
                      <DeleteOutlinedIcon className="text-red-400" />
                    </label>
                    <input
                      type="checkbox"
                      id={`my-modal-delete-${MethodPOST.endpointId}`}
                      className="modal-toggle"
                    />

                    <div className="modal font-montserrat">
                      <div className="modal-box w-[25%] max-w-5xl px-12 py-8 text-center ">
                        <p>Are you sure to delete this Route ?</p>
                        {/* Button */}

                        <div className="modal-action flex justify-center">
                          <div className="flex space-x-6">
                            <label
                              htmlFor={`my-modal-delete-${MethodPOST.endpointId}`}
                              onClick={() => {
                                handleDeleteEndpointByController(
                                  MethodPOST.endpointId,
                                  MethodPOST.httpMethod,
                                  "ControllerInvoked"
                                );
                              }}
                              className="btn btn-error text-white capitalize font-poppins text-base rounded-lg px-6 py-1"
                            >
                              DELETE
                            </label>
                            <label
                              htmlFor={`my-modal-delete-${MethodPOST.endpointId}`}
                              className="btn btn-ghost capitalize font-poppins text-base rounded-lg px-6 py-1 "
                            >
                              Cancel
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <div className="mb-4">
                <div className="">
                  {dropdown ? (
                    MethodPOST === undefined ? (
                      <div className="bg-green-100 rounded-lg ipad-pro:w-full 12pro:grid-rows-3 12pro:grid laptop:grid-rows-none ipad-pro:grid ipad-pro:grid-rows-3 laptop:w-full laptop:grid laptop:grid-cols-2 border border-1 h-fit py-2">
                        <div className=" laptop:flex laptop:row-span-1 laptop:col-span-1 laptop:w-full  ipad-pro:flex ipad-pro:row-span-1 ipad-pro:w-full">
                          <div className=" laptop:pl-2 laptop:flex laptop:flex-col ipad-pro:mt-2 ipad-pro:pl-2 ipad-pro:flex-col">
                            <div className="laptop:flex ipad-pro:flex 12pro:flex 12pro:text-[12px] laptop:text-sm ipad-pro:text-xs">
                              <div className="w-[35%] font-bold">ID</div>
                              <div className="">{info.endpointId}</div>
                            </div>
                            <div className="laptop:flex 12pro:flex 12pro:text-[12px] ipad-pro:flex laptop:text-sm ipad-pro:text-xs">
                              <div className="w-[27%] font-bold">Create At</div>
                              <div>
                                {convertTimestampToDate(info.endpointId)}
                              </div>
                            </div>
                            <div className="laptop:flex 12pro:flex 12pro:text-[12px] ipad-pro:flex laptop:text-sm ipad-pro:text-xs">
                              <div className="w-[27%] font-bold">Method</div>
                              <div className="text-green-500 font-bold">
                                {info.httpMethod}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="laptop:w-[95%] 12pro:row-span-2 laptop:col-span-1 laptop:h-full ipad-pro:w-[100%] ipad-pro:row-span-2 ipad-pro:h-full bg-sky-300 laptop:rounded-md">
                          <div className="laptop:py-4 laptop:text-lg 12pro:px-3 12pro:py-1 laptop:px-3 ipad-pro:py-2 ipad-pro:text-lg ipad-pro:px-4 font-poppins font-bold text-slate-600">
                            Returns
                          </div>
                          <div className="laptop:flex laptop:flex-row 12pro:px-3 12pro:flex 12pro:flex-row laptop:px-3 ipad-pro:flex ipad-pro:flex-row ipad-pro:px-3">
                            <div className="bg-black ipad-pro:py-1 ipad-pro:px-7 ipad-pro:mr-3 laptop:py-1.5 laptop:px-7 laptop:mr-3 12pro:text-[12px] 12pro:pt-1 12pro:mr-2 12pro:py-1 12pro:px-4 laptop:text-md ipad-pro:text-sm rounded-lg text-white ">
                              200
                            </div>
                            <div className=" bg-cyan-500 laptop:py-1.5 laptop:px-7 ipad-pro:py-1 ipad-pro:px-7 rounded-lg 12pro:text-[12px] 12pro:pt-1 12pro:mr-2 laptop:text-md 12pro:px-4 ipad-pro:text-sm text-white ">
                              {info.header}
                            </div>
                          </div>
                          <div className="laptop:flex laptop:justify-center 12pro:py-5 12pro:flex 12pro:justify-center ipad-pro:py-5 ipad-pro:flex ipad-pro:justify-center laptop:py-5 ">
                            <div className="laptop:w-[90%] laptop:h-[80%] ipad-pro:w-[90%] ipad-pro:h-[80%] 12pro:w-[90%] 12pro:h-[80%] bg-sky-200 12pro:rounded-md laptop:rounded-lg 12pro:py-1 12pro:px-1 laptop:py-5 laptop:px-3 ipad-pro:rounded-lg ipad-pro:py-5 ipad-pro:px-3">
                              <div>{info.responseBody}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : info === undefined ? (
                      <div className="bg-green-100 rounded-lg">
                        <div className="ipad-pro:w-full 12pro:grid-rows-3 12pro:grid laptop:grid-rows-none ipad-pro:grid ipad-pro:grid-rows-3 laptop:w-full laptop:grid laptop:grid-cols-2 border border-green-400 border-1 border-t-0 border-l-0 border-r-0 h-fit py-2 bg-sky-100 ">
                          <div className="laptop:flex laptop:row-span-1 laptop:col-span-1 laptop:w-full  ipad-pro:flex ipad-pro:row-span-1 ipad-pro:w-full">
                            <div className="laptop:pl-2 laptop:flex laptop:flex-col ipad-pro:mt-2 ipad-pro:pl-2 ipad-pro:flex-col">
                              <div className="laptop:flex ipad-pro:flex 12pro:flex 12pro:text-[12px] laptop:text-sm ipad-pro:text-xs">
                                <div className="w-[35%] font-bold">ID</div>
                                <div className="">{MethodPOST.endpointId}</div>
                              </div>
                              <div className="laptop:flex 12pro:flex 12pro:text-[12px] ipad-pro:flex laptop:text-sm ipad-pro:text-xs">
                                <div className="w-[27%] font-bold">
                                  Create At
                                </div>
                                <div>
                                  {convertTimestampToDate(
                                    MethodPOST.createdDate
                                  )}
                                </div>
                              </div>
                              <div className="laptop:flex 12pro:flex 12pro:text-[12px] ipad-pro:flex laptop:text-sm ipad-pro:text-xs">
                                <div className="w-[27%] font-bold">Method</div>
                                <div className="text-green-500 font-bold">
                                  {MethodPOST.httpMethod}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="laptop:w-[95%] 12pro:row-span-2 laptop:col-span-1 laptop:h-full ipad-pro:w-[100%] ipad-pro:row-span-2 ipad-pro:h-full bg-sky-300 laptop:rounded-md">
                            <div className="laptop:py-4 laptop:text-lg 12pro:px-3 12pro:py-1 laptop:px-3 ipad-pro:py-2 ipad-pro:text-lg ipad-pro:px-4 font-poppins font-bold text-slate-600">
                              Returns
                            </div>
                            <div className="laptop:flex laptop:flex-row 12pro:px-3 12pro:flex 12pro:flex-row laptop:px-3 ipad-pro:flex ipad-pro:flex-row ipad-pro:px-3">
                              <div className="bg-black ipad-pro:py-1 ipad-pro:px-7 ipad-pro:mr-3 laptop:py-1.5 laptop:px-7 laptop:mr-3 12pro:text-[12px] 12pro:pt-1 12pro:mr-2 12pro:py-1 12pro:px-4 laptop:text-md ipad-pro:text-sm rounded-lg text-white ">
                                200
                              </div>
                              <div className=" bg-cyan-500 laptop:py-1.5 laptop:px-7 ipad-pro:py-1 ipad-pro:px-7 rounded-lg 12pro:text-[12px] 12pro:pt-1 12pro:mr-2 laptop:text-md 12pro:px-4 ipad-pro:text-sm text-white ">
                                {"Application/Json"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="laptop:py-4 laptop:text-lg 12pro:px-3 12pro:py-1 laptop:px-3 ipad-pro:py-2 ipad-pro:text-lg ipad-pro:px-4 font-poppins font-bold text-slate-600">
                          Request Body
                        </div>
                        <div className="laptop:flex laptop:justify-center 12pro:py-5 12pro:flex 12pro:justify-center ipad-pro:py-5 ipad-pro:flex ipad-pro:justify-center laptop:py-5 ">
                          <div className="laptop:w-[100%] laptop:h-[80%] ipad-pro:w-[90%] ipad-pro:h-[80%] 12pro:w-[90%] 12pro:h-[80%] bg-sky-200 12pro:rounded-md laptop:rounded-lg 12pro:py-1 12pro:px-1 laptop:py-0 laptop:px-3 ipad-pro:rounded-lg ipad-pro:py-5 ipad-pro:px-3">
                            <div className="-mt-8">
                              <SyntaxHighlighter
                                language="json"
                                style={atomDark}
                              >
                                {JSON.stringify(
                                  MethodPOST.requestBody,
                                  null,
                                  2
                                )}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  ) : null}
                </div>
              </div>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
