import React, { useEffect, useState } from "react";
import { API_HEADER, BASE_URL } from "../redux/Constants";
import { Link, unstable_HistoryRouter, useLocation, useNavigate } from "react-router-dom";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import back_icon from '../asset/icon/Back.svg'

export default function CreateNewEndPointPage() {

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState([]);
  const [controllerName, setControllerName] = useState([]);
  const [method, setMethod] = useState("GET");
  const [responseBody, setResponseBody] = useState("");
  const [mockIdentify, setMockIdentify] = useState("");
  const [path, setPath] = useState("");

  const [selected, setSelected] = useState("Selected Project");
  const [selectedController, setSelectedController] = useState(
    "Selected Controller"
  );
  const [projectId, setProjectId] = useState("");
  const [isTextAreaValid, setIsTextAreaValid] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    API_HEADER.get(`${BASE_URL}/projects`)
      .then((info) => {
        setProjectName(info.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API_HEADER.get(`${BASE_URL}/controller/${selected}`).then((response) => {
      setSelectedController("Selected Controller");
      setControllerName(response.data.payload);
      // API_HEADER.get(`${BASE_URL}/project-id/${selected}`).then((info) => {
      //   console.log("ProjectId: ", info.data);
      //   setProjectId(info.data);
      // });

      API_HEADER.get(`${BASE_URL}/list-info-project/${selected}`).then((info) => {
        setProjectId(info.data.payload[0].projectId);
        setSelectedProject(info.data.payload[0])
      });

    });

  }, [selected]);

  console.log("selected: ", selected);



  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "method":
        setMethod(value);
        break;
      case "responseBody":
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
        setResponseBody(parsedValue);
        break;
      case "mockIdentify":
        setMockIdentify(value);
        break;
      case "path":
        setPath(value);
        break;
      default:
        break;
    }

    const isTextAreaValid = value.trim() !== "";
    setIsTextAreaValid(isTextAreaValid);
  };

  const generate = () => {
    setIsSubmitClicked(true);
    if (
      !isTextAreaValid ||
      selected === "Selected Project" ||
      selectedController === "Selected Controller"
    ) {
      return;
    }
    API_HEADER.get(
      `${BASE_URL}/controllerId?controllerName=${selectedController}&projectId=${projectId}`
    )
      .then((response) => {
        console.log("controllerId: ", response);
        API_HEADER.post(
          `${BASE_URL}/endpoint?httpMethod=${method}&controllerId=${response.data.payload}&mockIdentify=${mockIdentify}&customizeURL=${path}`,
          JSON.parse(responseBody)
        )
          .then((response) => {
            navigate(`/project/${projectId}`, { state: selectedProject });
          })
          .catch((err) => {
            console.log(err.response.data.error);
            if (err.response.data.error === "This route is already exists.") {
              setIsError(true);
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="laptop:px-32 ipad-pro:px-32 12pro:px-10">
      <div className="bg-white border-gray-300 12pro:w-full border-spacing-2.5 border-2 py-14 pb-2 px-10 12pro:px-4 rounded-xl shadow-md ">
        <div className="text-center flex flex-row font-bold text-[#04054F] text-xl uppercase">
          <div className="group flex items-center -mt-16 -ml-2 hover:scale-110 hover:cursor-pointer">
            <img src={back_icon} className="h-6 w-6 hover:text-red-600" alt="icon" />
            <Link onClick={handleBack} className="ml-0">Back</Link>
          </div>
        </div>




        <div className="ipad-pro:gap-10 12pro:gap-0">
          <div className=" ipad-pro:gap-10  laptop:grid laptop:gird-cols-3 bg-purple-head w-full">
            <div className="laptop:w-full ipad-pro:w-full 12pro:w-full w-[35%] rounded-md text-white bg-dark-head font-poppins">
              <div className="w-full flex 12pro:px-2 text-base px-14 py-3">
                <span>Do the following(for response)</span>
              </div>
            </div>
          </div>
          {/* select Method */}
          <div className="flex gap-20 12pro:gap-12 px-14 py-4 12pro:py-3 12pro:px-1 ipad-pro:grid ipad-pro:grid-cols-2 laptop:grid 12pro:flex-col laptop:grid-cols-3">
            <div className="relative w-[30%] 12pro:w-full ipad-pro:w-full">
              <div>
                <label
                  for="message"
                  className="block mb-2 font-poppins text-lg font-bold"
                >
                  Method
                </label>
                <select
                  name="method"
                  onChange={handleChange}
                  className="w-full p-2.5 12pro:w-full text-gray-500 bg-whitesmoke border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option>GET</option>
                  <option>PUT</option>
                  <option>POST</option>
                  <option>DELETE</option>
                </select>
              </div>
            </div>
            {/* Input Return HTTP status as */}
            <div className="relative w-full">
              <div>
                <label
                  for="message"
                  className="block mb-2 font-poppins text-lg font-bold"
                >
                  Return HTTP status as
                </label>
                <select className="w-full p-2.5 text-gray-500 bg-whitesmoke border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                  <option>200</option>
                </select>
              </div>
              <div className="font-montserrat mt-2 text-blue-400 text-sm">
                <span>
                  The HTTP Code of the HTTP response you'll receive. Customize
                  the HTTP headers sent in the response. Define the headers as a
                  JSON object.
                </span>
              </div>
            </div>
            {/* Select Response content type */}
            <div className="">
              <div className="relative w-full ">
                <label
                  for="message"
                  className="block mb-2 font-poppins text-lg font-bold"
                >
                  Response content type
                </label>
                <select className="ipad-pro:grid ipad-pro: w-full p-2.5 text-gray-500 bg-whitesmoke border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                  <option>application/json</option>
                </select>
              </div>
              <div className="font-montserrat mt-2 text-blue-400 text-sm">
                <span>
                  The Content-Type header that will be sent with the response.
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Input text HTTP Headers */}
        <div className="px-14 12pro:px-0 mt-3">
          <div>
            <label for="message" className="block mb-2 font-poppins text-lg font-bold">
              {" "}
              HTTP Headers
              {"      "}
              <span className="text-sm">{"(Optional)"}</span>
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 font-montserrat w-full text-sm text-gray-900 bg-whitesmoke rounded-lg border border-gray-300"
              placeholder='{
                        "JSONHub": "Mock-API"
              }'
            ></textarea>
          </div>
        </div>

        {/* Input text Response HTTP body */}
        <div className="py-8 px-14 12pro:px-0">
          <div>
            <label for="message" className="block mb-2 font-poppins text-lg font-bold">
              Response HTTP body{" "}
              <span className="text-sm text-red-500">{"(Required*)"}</span>
            </label>
            <textarea
              id="message"
              rows="10"
              name="responseBody"
              required
              onChange={handleChange}
              class="block p-2.5 w-full text-sm font-montserrat  text-gray-900 bg-whitesmoke rounded-lg border border-gray-300"
              placeholder='{
                "Status": "Awesome!
              "}'
            ></textarea>
            {!isTextAreaValid && isSubmitClicked && (
              <p className="text-red-500 mt-2 ml-1 text-sm">
                This field is required.
              </p>
            )}
          </div>
        </div>

        <div className="bg-dark-head rounded-md w-full mt-6 ">
          <div className="ipad-pro:w-full justify-evenly flex  text-white font-poppins">
            <div className="w-full flex 12pro:px-2 text-base px-14 py-3">
              <span>Option to manage your mock after creation</span>
            </div>
          </div>
        </div>

        {/* Input Secret Token */}
        <div className="flex px-14 12pro:grid-cols-none 12pro:flex-col 12pro:gap-8 12pro:px-1 py-6 ipad-pro:gap-10 ipad-pro:grid ipad-pro:grid-cols-2 laptop:grid">
          <div className="relative w-full mt-1">
            <label for="message" className="block mb-2 font-poppins text-lg font-bold">
              {" "}
              Secret Token
            </label>
            <input
              type="text"
              placeholder="Type here"
              className=" bg-whitesmoke input input-bordered input-md 12pro:w-full ipad-pro:w-full laptop:w-[90%]"
            />
            <div className="font-montserrat mt-2 text-blue-400 text-sm laptop:w-[90%]">
              <span>
                Required to Update/Delete your mock. If Blank, a random secret
                will be generated.
              </span>
            </div>
          </div>
          {/* Input Mock Identifier */}
          <div className="relative w-full  mt-1 laptop:w-full">
            <div>
              <label for="message" className="block mb-2 font-poppins text-lg font-bold">
                Mock Identifier
              </label>
              <input
                type="text"
                name="mockIdentify"
                onChange={handleChange}
                placeholder="Type here"
                className="bg-whitesmoke input 12pro:w-full input-bordered input-md ipad-pro:w-full laptop:w-[90%]"
              />
            </div>
            <div className="font-montserrat mt-2 text-blue-400 text-sm">
              <span>
                Just a name to identify this mock in your management console
                later
              </span>
            </div>
          </div>
          {/* Responsive controller and path */}
          <div className="laptop:w-full laptop:h-[20px] ">
            {/* Select Controller */}
            <div className="relative w-full  ipad-pro:w-full laptop:w-full ">
              <div className="">
                <label
                  for="message"
                  className="block mb-2 font-poppins text-lg font-bold"
                >
                  Controller
                </label>
                <div className=" laptop:w-[90%] ">
                  <div className="grid grid-cols-2 justify-between gap-4 font-poppins">
                    {/* Project DropDown */}
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full border border-gray-300 cursor-default rounded-lg bg-whitesmoke py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500 sm:text-sm">
                          <span className="block truncate">{selected}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {projectName.length > 0 ? (
                              projectName.map((project, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                      ? "bg-gray-400 text-black"
                                      : "text-gray-900"
                                    }`
                                  }
                                  value={project.projectName}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selected
                                          ? "font-medium"
                                          : "font-normal"
                                          }`}
                                      >
                                        {project.projectName}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))
                            ) : (
                              <Listbox.Option
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                    ? "bg-gray-400 text-black"
                                    : "text-gray-900"
                                  }`
                                }
                                value={"No Project"}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? "font-medium" : "font-normal"
                                        }`}
                                    >
                                      {"No Project"}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            )}
                          </Listbox.Options>
                        </Transition>
                        {selected === "Selected Project" && isSubmitClicked && (
                          <p className="text-red-500 mt-2 ml-1 text-sm">
                            Please choose a project.
                          </p>
                        )}
                      </div>
                    </Listbox>

                    {/* Controller DropDown */}
                    <Listbox
                      value={selectedController}
                      onChange={setSelectedController}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full border border-gray-300 cursor-default rounded-lg bg-whitesmoke py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500 sm:text-sm">
                          <span className="block truncate">
                            {selectedController}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {controllerName.length > 0 ? (
                              <div>
                                {controllerName.map((controller, personIdx) => (
                                  <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                        ? "bg-gray-400 text-black"
                                        : "text-gray-900"
                                      }`
                                    }
                                    value={controller.controllerName}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${selected
                                            ? "font-medium"
                                            : "font-normal"
                                            }`}
                                        >
                                          {controller.controllerName}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <Listbox.Option
                                  disabled
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                      ? "bg-gray-400 text-black"
                                      : "text-gray-900"
                                    }`
                                  }
                                  value={"No Controller"}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selected
                                          ? "font-medium"
                                          : "font-normal"
                                          }`}
                                      >
                                        {"No Controller"}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              </div>
                            )}
                          </Listbox.Options>
                        </Transition>
                        {selectedController === "Selected Controller" &&
                          isSubmitClicked && (
                            <p className="text-red-500 mt-2 ml-1 text-sm">
                              Please choose a controller.
                            </p>
                          )}
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
              <span className="font-montserrat mt-2 text-blue-400 text-sm">
                The Content-Type header that will be sent with the response.
              </span>
            </div>
          </div>
          {/*Input Path */}
          <div className="flex gap-20 px-14 12pro:px-1 ipad-pro:w-full ipad-pro:px-0  laptop:w-[90%]">
            <div className="relative w-full mt-1 ipad-pro:w-full">
              <div>
                <label
                  for="message"
                  className="block mb-2 font-poppins text-lg font-bold"
                >
                  Request URL{" "}
                  <span className="text-sm text-red-500">{"(Required*)"}</span>
                </label>
                <input
                  type="text"
                  name="path"
                  required
                  onChange={handleChange}
                  placeholder="Type here"
                  className="bg-whitesmoke input input-bordered 12pro:w-full input-md ipad-pro:w-full laptop:w-full"
                />
                {!isTextAreaValid && isSubmitClicked && (
                  <p className="text-red-500 mt-2 ml-1 text-sm">
                    This field is required.
                  </p>
                )}
                {isError && <div className="text-sm font-poppins text-red-500 mt-2 ml-1">
                  This route is already exists.
                </div>}
              </div>
              <span className="font-montserrat mt-2 text-blue-400 text-sm">
                The path is typically defined as part of the URL structure used
                to access the API.
              </span>
            </div>
          </div>

          <div className="flex gap-20 px-14 py-6 ipad-pro:w-full ipad-pro:py-1 ipad-pro:px-0 ">
            <button
              type="button"
              onClick={generate}
              className="text-white  bg-dark-head 12pro:text-[12px] font-medium rounded-lg text-sm px-6 py-3 mr-2 mb-2"
            >
              GENERATE MY HTTP RESPONSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


