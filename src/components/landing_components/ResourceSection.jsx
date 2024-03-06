import React, { useState, useEffect } from "react";
import iconCopy from "../../asset/icon/copyIcon.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "flowbite";

import AOS from "aos";

import "aos/dist/aos.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { faLevelDown } from "@fortawesome/free-solid-svg-icons";

import copyIcon from "../../asset/icon/copyIconDoc.svg";
import copiedIcon from "../../asset/icon/copiedIcon.svg";

const apiUrl = process.env.API_URL;

export default function ResourceSection() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleNavigate = () => {
    navigate("/documentation");
  };

  const [get, setText] = useState(
    "http://localhost:8080/api/v1/predefine/get-all-trip"
  );
  const [getasingle, setGetasingle] = useState(
    "http://localhost:8080/api/v1/predefine/get-trip-by-id/1"
  );
  const [getAllProducts, setAllProducts] = useState(
    "http://localhost:8080/api/v1/predefine/get-all-products"
  );
  const [getAProduct, setAProduct] = useState(
    "http://localhost:8080/api/v1/predefine/get-products-by-id/1"
  );
  const [getAllSport, setAllSport] = useState(
    "http://localhost:8080/api/v1/predefine/get-all-players"
  );
  const [getASport, setASport] = useState(
    "http://localhost:8080/api/v1/predefine/get-player-by-id/1"
  );

  const [isCopied, setIsCopied] = useState(false);
  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);
  const [isCopied3, setIsCopied3] = useState(false);
  const [isCopied4, setIsCopied4] = useState(false);
  const [isCopied5, setIsCopied5] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(get);
    setIsCopied(true);
  };

  const handleCopyClick1 = () => {
    navigator.clipboard.writeText(getasingle);
    setIsCopied1(true);
  };
  const handleCopyClick2 = () => {
    navigator.clipboard.writeText(getAllProducts);
    setIsCopied2(true);
  };
  const handleCopyClick3 = () => {
    navigator.clipboard.writeText(getAProduct);
    setIsCopied3(true);
  };
  const handleCopyClick4 = () => {
    navigator.clipboard.writeText(getAllSport);
    setIsCopied4(true);
  };
  const handleCopyClick5 = () => {
    navigator.clipboard.writeText(getASport);
    setIsCopied5(true);
  };

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const onCopyText1 = () => {
    setIsCopied1(true);
    setTimeout(() => {
      setIsCopied1(false);
    }, 1000);
  };
  const onCopyText2 = () => {
    setIsCopied2(true);
    setTimeout(() => {
      setIsCopied2(false);
    }, 1000);
  };
  const onCopyText3 = () => {
    setIsCopied3(true);
    setTimeout(() => {
      setIsCopied3(false);
    }, 1000);
  };
  const onCopyText4 = () => {
    setIsCopied4(true);
    setTimeout(() => {
      setIsCopied4(false);
    }, 1000);
  };
  const onCopyText5 = () => {
    setIsCopied5(true);
    setTimeout(() => {
      setIsCopied5(false);
    }, 1000);
  };

  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropDownMenu = () => {
    dropdown ? setDropdown(false) : setDropdown(true);
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-8 bg-white px-32">
      <div className="flex justify-center text-center">
        <div className="text-xl font-poppins font-bold text-dark-head">
          Resources
        </div>
      </div>
      <div className="flex justify-center text-center mt-5">
        <div className="w-10 h-0.5 bg-newYellow 12pro:ml-8 laptop:ml-0 ipad-pro:ml-0"></div>
      </div>

      <div className="flex justify-center items-center 12pro:text-center mt-8">
        <div className="font-montserrat text-dark-head">
          JSONHub come with a set of 50 Endpoints resources.
          <NavLink
            to={"/documentation"}
            className="font-bold underline text-dark-head font-montserrat"
          >
            How to use?
          </NavLink>
        </div>
      </div>
      <div className=" flex flex-col  mt-8  w-100%">
        {/* btn dropdown */}
        <div className="flex flex-col justify-center items-center w-auto ">
          <div className="w-full h-full flex flex-col">
            <button
              type="button"
              className="  w-full h-full px-20 py-3 flex justify-center items-center border shadow-md rounded-xl group "
              onClick={dropDownMenu}
            >
              <div className="flex-1 text-left justify-between ">
                <span className="font-poppins text-blue-900 font-semibold ">
                  EndPoints <span></span>
                </span>
                <span className="font-poppins font-bold ml-2"> - </span>
                <span className="text-newYellow font-poppins  ml-2">
                  {" "}
                  JSONHub{" "}
                </span>
              </div>
              {isOpen ? (
                <svg
                  id="arrow-up"
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  id="arrow-down"
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          {/*  */}
        </div>
        {/* data list */}
        {isOpen && (
          <div className="w-full flex flex-col mt-2 shadow-md rounded-b-lg duration-[2000ms] ">
            {/* get all trip*/}
            <div className="w-full h-auto block">
              <div className="w-full h-auto">
                {dropdown ? (
                  <div
                    className=" grid grid-cols-4 shadow py-3
                                12pro:hiddengrid-grid-cols-5 w-full h-full  rounded-t-lg
                "
                  >
                    {/* get */}
                    <div
                      className=" w-full h-full flex justify-center items-center col-span-1 
                                  12pro:hidden-flex-justify-center-items-center 
                  "
                    >
                      <div
                        className="col-span-1 px-8 bg-blue-100 h-8 w-20 rounded-xl flex items-center justify-center text-center text-blue-400 font-montserrat"
                        id="dropdown"
                      >
                        <span className="">GET</span>
                      </div>
                    </div>
                    {/* link */}
                    <div className=" w-auto h-full flex justify-center items-center col-span-2 ">
                      <div
                        className="border border-solid border-purple-head rounded-lg w-full h-10 flex  justify-center items-center 
                                  12pro:hidden-col-span-3-flex-justify-center-items-center 
                              "
                        id="dropdown"
                      >
                        <div className="w-full h-full flex flex-row  text-gray-900  rounded-lg  container">
                          {/* input */}
                          <div className=" w-full h-full  basis-1/1 flex justify-center items-center ">
                            <a
                              href="http://localhost:8080/api/v1/predefine/get-all-trip"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-red-500  underline  w-full text-gray-900 text-sm rounded-lg border-none ml-10
                                     12pro:w-80-text-gray-900-text-sm-rounded-lg 	font-jetbrain bg-transparent 	"
                            >
                              {get}
                            </a>
                          </div>
                          {/*  */}
                          <div className=" basis-1/6 h-full">
                            <CopyToClipboard
                              text={get}
                              onCopy={onCopyText}
                              className="  w-full h-full flex justify-end items-center "
                            >
                              <div className="h-full w-full">
                                <button
                                  className="h-auto w-auto m-1"
                                  onClick={handleCopyClick}
                                >
                                  {isCopied ? (
                                    <img
                                      src={copiedIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1  "
                                    />
                                  ) : (
                                    <img
                                      src={copyIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1 text-dark-head"
                                    />
                                  )}
                                </button>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* dis */}
                    <div
                      className="flex col-span-1 justify-start ml-20 items-center 
                                12pro:hidden col-span-1-flex-justify-center-items-center 
                                laptop:inline-flex
                                ipad-pro:inline-flex
                                font-montserrat
                                 "
                      id="dropdown"
                    >
                      <span className=""> Get all trips</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/* get a single trip*/}
            <div className="w-full h-auto">
              <div className="w-full h-auto">
                {dropdown ? (
                  <div
                    className="grid grid-cols-4 shadow py-3
                                12pro:hiddengrid-grid-cols-5 w-full h-full  
                "
                  >
                    {/* get */}
                    <div
                      className=" w-full h-full flex justify-center items-center col-span-1 
                                  12pro:hidden-flex-justify-center-items-center 
                  "
                    >
                      <div
                        className="col-span-1 px-8 bg-blue-100 h-8 w-20 rounded-xl flex items-center justify-center text-center text-blue-400 font-montserrat"
                        id="dropdown"
                      >
                        <span className="">GET</span>
                      </div>
                    </div>
                    {/* link */}
                    <div className=" w-auto h-full flex justify-center items-center col-span-2 ">
                      <div
                        className="border border-solid  border-purple-head rounded-lg w-full h-9 flex  justify-center items-center 
                                  12pro:hidden-col-span-3-flex-justify-center-items-center 
                              "
                        id="dropdown"
                      >
                        <div className="w-full h-full flex flex-row  text-gray-900  rounded-lg  container">
                          <div className=" w-full h-full  basis-1/1 flex justify-center items-center ">
                            <a
                              href="http://localhost:8080/api/v1/predefine/get-trip-by-id/1"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-gray-900 text-sm rounded-lg border-none ml-10 underline
                            12pro:w-80-text-gray-900-text-sm-rounded-lg	font-jetbrain bg-transparent 	"
                            >
                              {getasingle}
                            </a>
                          </div>
                          <div className=" basis-1/6 h-full">
                            <CopyToClipboard
                              text={getasingle}
                              onCopy={onCopyText1}
                              className="  w-full h-full flex justify-end items-center "
                            >
                              <div className="h-full w-full">
                                <button
                                  className="h-auto w-auto m-1"
                                  onClick={handleCopyClick1}
                                >
                                  {isCopied1 ? (
                                    <img
                                      src={copiedIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1"
                                    />
                                  ) : (
                                    <img
                                      src={copyIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1"
                                    />
                                  )}
                                </button>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* dis */}
                    <div
                      className="flex col-span-1 ml-20 items-center 
                                12pro:hidden col-span-1-flex-justify-center-items-center 
                                laptop:inline-flex
                                ipad-pro:inline-flex
                                font-montserrat
                                 "
                      id="dropdown"
                    >
                      <span> Get a single trip</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/* get all products*/}
            <div className="w-full h-auto block">
              <div className="w-full h-auto">
                {dropdown ? (
                  <div
                    className=" grid grid-cols-4 shadow py-3
                                12pro:hiddengrid-grid-cols-5 w-full h-full  rounded-t-lg
                "
                  >
                    {/* get */}
                    <div
                      className=" w-full h-full flex justify-center items-center col-span-1 
                                  12pro:hidden-flex-justify-center-items-center 
                  "
                    >
                      <div
                        className="col-span-1 px-8 bg-blue-100 h-8 w-20 rounded-xl flex items-center justify-center text-center text-blue-400 font-montserrat"
                        id="dropdown"
                      >
                        <span className="">GET</span>
                      </div>
                    </div>
                    {/* link */}
                    <div className=" w-auto h-full flex justify-center items-center col-span-2 ">
                      <div
                        className="border border-solid border-purple-head rounded-lg w-full h-10 flex  justify-center items-center 
                                  12pro:hidden-col-span-3-flex-justify-center-items-center 
                              "
                        id="dropdown"
                      >
                        <div className="w-full h-full flex flex-row  text-gray-900  rounded-lg  container">
                          <div className=" w-full h-full  basis-1/1 flex justify-center items-center ">
                            <a
                              href="http://localhost:8080/api/v1/predefine/get-all-products"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-red-500  underline w-full text-gray-900 text-sm rounded-lg border-none ml-10
                           12pro:w-80-text-gray-900-text-sm-rounded-lg 	font-jetbrain bg-transparent 	"
                            >
                              {getAllProducts}
                            </a>
                          </div>
                          {/*  */}
                          <div className=" basis-1/6 h-full">
                            <CopyToClipboard
                              text={getAllProducts}
                              onCopy={onCopyText2}
                              className="  w-full h-full flex justify-end items-center "
                            >
                              <div className="h-full w-full">
                                <button
                                  className="h-auto w-auto m-1"
                                  onClick={handleCopyClick2}
                                >
                                  {isCopied2 ? (
                                    <img
                                      src={copiedIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1  "
                                    />
                                  ) : (
                                    <img
                                      src={copyIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1 text-dark-head"
                                    />
                                  )}
                                </button>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* dis */}
                    <div
                      className="flex col-span-1 justify-start ml-20 items-center 
                                12pro:hidden col-span-1-flex-justify-center-items-center 
                                laptop:inline-flex
                                ipad-pro:inline-flex
                                font-montserrat
                                 "
                      id="dropdown"
                    >
                      <span className=""> Get all products</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/* get a product*/}
            <div className="w-full h-auto">
              <div className="w-full h-auto">
                {dropdown ? (
                  <div
                    className="grid grid-cols-4 shadow py-3
                                12pro:hiddengrid-grid-cols-5 w-full h-full  
                "
                  >
                    {/* get */}
                    <div
                      className=" w-full h-full flex justify-center items-center col-span-1 
                                  12pro:hidden-flex-justify-center-items-center 
                  "
                    >
                      <div
                        className="col-span-1 px-8 bg-blue-100 h-8 w-20 rounded-xl flex items-center justify-center text-center text-blue-400 font-montserrat"
                        id="dropdown"
                      >
                        <span className="">GET</span>
                      </div>
                    </div>
                    {/* link */}
                    <div className=" w-auto h-full flex justify-center items-center col-span-2 ">
                      <div
                        className="border border-solid  border-purple-head rounded-lg w-full h-9 flex  justify-center items-center 
                                  12pro:hidden-col-span-3-flex-justify-center-items-center 
                              "
                        id="dropdown"
                      >
                        <div className="w-full h-full flex flex-row  text-gray-900  rounded-lg  container">
                          {/* input */}
                          <div className=" w-full h-full  basis-1/1 flex justify-center items-center ">
                            <a
                              href="http://localhost:8080/api/v1/predefine/get-products-by-id/1"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-gray-900 text-sm rounded-lg border-none ml-10 underline
                          12pro:w-80-text-gray-900-text-sm-rounded-lg	font-jetbrain bg-transparent 	"
                            >
                              {getAProduct}
                            </a>
                          </div>
                          {/*  */}
                          <div className=" basis-1/6 h-full">
                            <CopyToClipboard
                              text={getAProduct}
                              onCopy={onCopyText3}
                              className="  w-full h-full flex justify-end items-center "
                            >
                              <div className="h-full w-full">
                                <button
                                  className="h-auto w-auto m-1"
                                  onClick={handleCopyClick3}
                                >
                                  {isCopied3 ? (
                                    <img
                                      src={copiedIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1"
                                    />
                                  ) : (
                                    <img
                                      src={copyIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1"
                                    />
                                  )}
                                </button>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* dis */}
                    <div
                      className="flex col-span-1 ml-20 items-center 
                                12pro:hidden col-span-1-flex-justify-center-items-center 
                                laptop:inline-flex
                                ipad-pro:inline-flex
                                font-montserrat
                                 "
                      id="dropdown"
                    >
                      <span> Get a single product</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/* get all sport */}
            <div className="w-full h-auto block">
              <div className="w-full h-auto">
                {dropdown ? (
                  <div
                    className=" grid grid-cols-4 shadow py-3
                                12pro:hiddengrid-grid-cols-5 w-full h-full  rounded-t-lg
                "
                  >
                    {/* get */}
                    <div
                      className=" w-full h-full flex justify-center items-center col-span-1 
                                  12pro:hidden-flex-justify-center-items-center 
                  "
                    >
                      <div
                        className="col-span-1 px-8 bg-blue-100 h-8 w-20 rounded-xl flex items-center justify-center text-center text-blue-400 font-montserrat"
                        id="dropdown"
                      >
                        <span className="">GET</span>
                      </div>
                    </div>
                    {/* link */}
                    <div className=" w-auto h-full flex justify-center items-center col-span-2 ">
                      <div
                        className="border border-solid border-purple-head rounded-lg w-full h-10 flex  justify-center items-center 
                                  12pro:hidden-col-span-3-flex-justify-center-items-center 
                              "
                        id="dropdown"
                      >
                        <div className="w-full h-full flex flex-row  text-gray-900  rounded-lg  container">
                          {/* input */}
                          <div className=" w-full h-full  basis-1/1 flex justify-center items-center ">
                            <a
                              href="http://localhost:8080/api/v1/predefine/get-all-players"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-red-500 underline  w-full text-gray-900 text-sm rounded-lg border-none ml-10
                            12pro:w-80-text-gray-900-text-sm-rounded-lg 	font-jetbrain bg-transparent 	"
                            >
                              {getAllSport}
                            </a>
                          </div>
                          {/*  */}
                          <div className=" basis-1/6 h-full">
                            <CopyToClipboard
                              text={getAllSport}
                              onCopy={onCopyText4}
                              className="  w-full h-full flex justify-end items-center "
                            >
                              <div className="h-full w-full">
                                <button
                                  className="h-auto w-auto m-1"
                                  onClick={handleCopyClick4}
                                >
                                  {isCopied4 ? (
                                    <img
                                      src={copiedIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1  "
                                    />
                                  ) : (
                                    <img
                                      src={copyIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1 text-dark-head"
                                    />
                                  )}
                                </button>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* dis */}
                    <div
                      className="flex col-span-1 justify-start ml-20 items-center 
                                12pro:hidden col-span-1-flex-justify-center-items-center 
                                laptop:inline-flex
                                ipad-pro:inline-flex
                                font-montserrat
                                 "
                      id="dropdown"
                    >
                      <span className=""> Get all sports</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/* get a sport*/}
            <div className="w-full h-auto">
              <div className="w-full h-auto">
                {dropdown ? (
                  <div
                    className="grid grid-cols-4 shadow py-3
                                12pro:hiddengrid-grid-cols-5 w-full h-full  
                "
                  >
                    {/* get */}
                    <div
                      className=" w-full h-full flex justify-center items-center col-span-1 
                                  12pro:hidden-flex-justify-center-items-center 
                  "
                    >
                      <div
                        className="col-span-1 px-8 bg-blue-100 h-8 w-20 rounded-xl flex items-center justify-center text-center text-blue-400 font-montserrat"
                        id="dropdown"
                      >
                        <span className="">GET</span>
                      </div>
                    </div>
                    {/* link */}
                    <div className=" w-auto h-full flex justify-center items-center col-span-2 ">
                      <div
                        className="border border-solid  border-purple-head rounded-lg w-full h-9 flex  justify-center items-center 
                                  12pro:hidden-col-span-3-flex-justify-center-items-center 
                              "
                        id="dropdown"
                      >
                        <div className="w-full h-full flex flex-row  text-gray-900  rounded-lg  container">
                          {/* input */}
                          <div className=" w-full h-full  basis-1/1 flex justify-center items-center ">
                            <a
                              href="http://localhost:8080/api/v1/predefine/get-player-by-id/1"
                              target="_blank"
                              className="w-full text-gray-900 text-sm rounded-lg border-none ml-10
                          12pro:w-80-text-gray-900-text-sm-rounded-lg	font-jetbrain bg-transparent underline"
                            >
                              {getASport}
                            </a>
                          </div>
                          {/*  */}
                          <div className=" basis-1/6 h-full">
                            <CopyToClipboard
                              text={getASport}
                              onCopy={onCopyText5}
                              className="  w-full h-full flex justify-end items-center "
                            >
                              <div className="h-full w-full">
                                <button
                                  className="h-auto w-auto m-1"
                                  onClick={handleCopyClick5}
                                >
                                  {isCopied5 ? (
                                    <img
                                      src={copiedIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1"
                                    />
                                  ) : (
                                    <img
                                      src={copyIcon}
                                      alt="iconCopy"
                                      className="rounded-lg w-auto h-7 p-1"
                                    />
                                  )}
                                </button>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* dis */}
                    <div
                      className="flex col-span-1 ml-20 items-center 
                                12pro:hidden col-span-1-flex-justify-center-items-center 
                                laptop:inline-flex
                                ipad-pro:inline-flex
                                font-montserrat
                                 "
                      id="dropdown"
                    >
                      <span> Get a single sport</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* more btn */}
      <div className="flex justify-center items-center mt-8 mb-20 drop-shadow-sm">
        <Button
          className="ipad-pro:rounded-full font-montserrat ipad-pro:h-9 border-none	 laptop:h-9 text-black laptop:text-black 12pro:text-black rounded-full bg-newYellow  hover:text-white hover:bg-dark-head"
          onClick={() => {
            handleNavigate();
          }}
        >
          More endpoints
        </Button>
      </div>
    </div>
  );
}
