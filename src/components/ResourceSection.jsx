import React, { useState } from "react";
import iconCopy from "../asset/icon/copyIcon.png";
import { CopyToClipboard } from "react-copy-to-clipboard";




export default function ResourceSection() {
  const [text, setText] = useState(
    "http://jsonplaceholder.typicode.com/gellAlls"
  );
  const [getasingle, setGetasingle] = useState(
    "http://jsonplaceholder.typicode.com/getAsingle"
  );
  const [post, setPost] = useState("http://jsonplaceholder.typicode.com/post");
  const [put, setPut] = useState("http://jsonplaceholder.typicode.com/put");

  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const [dropdown, setDropdown] = useState(false);
  const dropDownMenu = () => {
    dropdown ? setDropdown(false) : setDropdown(true);
  };
  return (
    <div className="mt-16">
      <div className="flex justify-center text-center">
        <div className="text-2xl font-poppins font-bold">Resource</div>
      </div>
      <br />
      <div className="flex justify-center items-center">
        <div>
          JSONHub come with a set of 50 Endpoints resources.
          <u className="font-bold">How to use?</u>
        </div>
      </div>
      <br />
      <br />
      <div className="mb-10">
        <div className="flex justify-center items-center ">
          <ul className="w-3/4">
            <button
              type="button"
              className="flex items-center w-[100%] h-14 border-1 border-zinc-200  shadow-sm shadow-zinc-200 border p-2 transition duration-75 rounded-xl mb-1 group"
              onClick={dropDownMenu}
            >
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Status
              </span>
              <svg
                class="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="w-[99%] mx-auto">
              <div className="">
                {dropdown ? (
                  <div className="grid grid-cols-5 border border-1  rounded-xl h-12">
                    <div className="flex justify-center items-center">
                      <ul
                        id="dropdown"
                        className=" col-span-1 bg-blue-400 h-8 w-20 rounded-xl flex items-center justify-center text-center text-blue-500 font-bold "
                      >
                        Get
                      </ul>
                    </div>
                    <ul
                      id="dropdown"
                      className=" col-span-3 flex justify-center items-center"
                    >
                      <div
                        className="
                          flex justify-between
                          text-gray-900 border 
                          h-10
                          
                            rounded-lg
                          border-violet-700 
                            border-solid 
                            container
                            "
                      >
                        <div className="">
                          <input
                            type="text"
                            disabled
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            id="first_name"
                            placeholder="John"
                            required
                            className="
              text-gray-900 
                text-sm rounded-lg
              focus:ring-blue-500
              focus:border-blue-500 border-none
              w-96 ml-36
              text-center 
              dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
                  "
                          ></input>
                        </div>
                        <div className="">
                          <CopyToClipboard text={text} onCopy={onCopyText}>
                            <div className="copy-area">
                              <button className="mr-1 mt-1">
                                <img src={iconCopy} alt="" />
                              </button>
                              <span
                                className={`copy-feedback ${
                                  isCopied ? "active" : " "
                                }`}
                              ></span>
                            </div>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </ul>
                    <ul
                      id="dropdown"
                      className=" col-span-1 flex justify-center items-center"
                    >
                      Get all trips
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </ul>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button className=" w-40 h-10 text-md text-white rounded-3xl bg-gradient-to-tr from-pink-400 to-indigo-500">
          More endPoints
        </button>
      </div>
    </div>
  );
}
