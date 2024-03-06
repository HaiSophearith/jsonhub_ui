import React, { useEffect, useRef, useState } from "react";
import profile from "../../asset/img/profile.jpg";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function EditProfile(props) {
  const InputRef = useRef(null);
  const [image, setImage] = useState("");
  const [objectUrl, setobjectUrl] = useState();

  const handleImage = () => {
    InputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(event.target.files[0]);
    setobjectUrl(URL.createObjectURL(event.target.files[0]));
  };
  // fetch data
  const [Profile, setProfile] = useState("");

  const addPost = () => {
    Profile(image);
  };

  const { isOpenReset, closeModalReset, resetEmail } = props;

  let [isLoading, setIsLoading] = useState(false);

  const [passwordEye, setPasswordEye] = useState(false);
  // const [passwordEye2, setPasswordEye2] = useState(false);
  const [newPassword, setnewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const OnChangeHandleComfirm = (e) => {
    let cPassword = e.target.value;
    setConfirmPassword({
      ...confirmPassword,
      cPassword,
    });
  };

  const OnChangeHandle = (e) => {
    let password = e.target.value;
    setnewPassword({
      ...newPassword,
      password,
    });
  };
  return (
    <div>
      {/* edit profile */}
      <div className="font-poppins laptop:h-[700px] laptop:w-[550px] 12pro:h-[500px] 12pro:w-[300px] rounded-[25px] bg-white drop-shadow-lg">
        <div className="absolute inset-x-0 top-0 mx-auto flex h-[60px] justify-between w-full rounded-t-[25px] bg-[#FAFAFA] px-[100px] items-center font-semibold text-[20px] text-black drop-shadow-lg">
          <span>Profile</span>
          <span>Security</span>
        </div>
        <div className="w-full laptop:h-[130px] ipad-pro:h-[110px] 12pro:h-[80px] bg-cover object-cover relative mt-[60px]">
          <div className="laptop:h-[150px] laptop:w-[150px] ipad-pro:h-[130px] ipad-pro:w-[130px] 12pro:h-[100px] 12pro:w-[100px] rounded-full relative laptop:mt-[3rem] ipad-pro:mt-[3rem] 12pro::mt-[3rem] justify-center laptop:ml-[225px]">
            <img
              src={image ? objectUrl : profile}
              alt=""
              className="w-full h-full rounded-full border-2 object-cover border-white"
            />
            <input
              type="file"
              ref={InputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <div
              onClick={() => {
                InputRef.current.click();
              }}
              className="bg-purple-head rounded-full absolute flex justify-center items-center bottom-0 laptop:right-6 ipad-pro:right-5 12pro:right-3 laptop:h-10 laptop:w-10 ipad-pro:w-8 ipad-pro:h-8 12pro:w-4 12pro:h-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="laptop:w-[16px] laptop:h-[16px] ipad-pro:w-[14px] ipad-pro:h-[14px] 12pro:w-[8px] 12pro:h-[8px]"
              >
                <path
                  fill="white"
                  d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <form class="w-full max-w-sm px-10 mt-20">
          <div class="md:flex md:items-center mt-5">
            <div class="md:w-1/3">
              <label
                class="block text-black text-[14px] font-bold mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div class="flex md:w-2/3">
              <input
                class="border-2 border-gray-200 rounded-lg w-full py-2 px-14 pl-[20rem] text-gray-700 leading-tight"
                type={passwordEye ? "text" : "password"}
                onChange={OnChangeHandle}
              />
              <span
                className="label-text mb-1 text-base cursor-pointer"
                onClick={() => {
                  setPasswordEye(!passwordEye);
                }}
              ></span>
              <FontAwesomeIcon icon={passwordEye ? faEye : faEyeSlash} />
            </div>
          </div>
          {/* jhhhhj */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center w-[70%] border-b-2 border-purple-head border-spacing-11 py-1">
              {/* <img className="w-5" src={icon3} alt="icon-p" /> */}
              <input
                className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2"
                type={passwordEye ? "text" : "password"}
                name="newPassword"
                onChange={OnChangeHandle}
                placeholder="Enter new password"
              />
              <span
                className="label-text mb-1 text-base cursor-pointer"
                onClick={() => {
                  setPasswordEye(!passwordEye);
                }}
              >
                <FontAwesomeIcon icon={passwordEye ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>
          <div class="md:flex md:items-center mt-5">
            <div class="md:w-1/3">
              <label
                class="block text-black text-[14px] font-bold mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                UserName
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="border-2 border-gray-200 rounded-lg w-full py-2 px-14 pl-[20rem] text-gray-700 leading-tight"
                id="inline-full-name"
                type="text"
                value=""
              />
            </div>
          </div>
          <div class="md:flex md:items-center mt-5">
            <div class="md:w-1/3">
              <label
                class="block text-black text-[14px] font-bold mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Email
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="border-2 border-gray-200 rounded-lg w-full py-2 px-14 pl-[20rem] text-gray-700 leading-tight"
                id="inline-full-name"
                type="text"
                value=""
              />
            </div>
          </div>
        </form>
        <div className="flex px-28 justify-between mt-10">
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-10 border border-blue-500 hover:border-transparent rounded">
            Button
          </button>
          <button class="text-white font-bold py-2 px-10 rounded bg-purple-head">
            Button
          </button>
        </div>
      </div>
      {/* security */}
      <div className="font-poppins laptop:h-[700px] laptop:w-[550px] 12pro:h-[500px] 12pro:w-[300px] rounded-[25px] bg-white drop-shadow-lg mt-5">
        <div className="top-0 mx-auto flex h-[60px] justify-between w-full rounded-t-[25px] bg-[#FAFAFA] px-[100px] items-center font-semibold text-[20px] text-black drop-shadow-lg">
          <span>Profile</span>
          <span>Security</span>
        </div>
       
      </div>
    </div>
  );
}
