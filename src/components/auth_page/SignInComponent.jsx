import React, { useState } from "react";
import SignUp_img from "../../asset/icon/pic_sign_in.png";
import google from "../../asset/icon/icons8-google-24.png";
import user_icon from "../../asset/icon/user-icon.png";
import lock_icon from "../../asset/icon/icons8-lock.png";
import logo from "../../asset/img/icon6.png";
import "../../style/auth_style.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Link, useNavigate } from "react-router-dom";
import Spinners from "../Spinners";
import { Field, Form, Formik } from "formik";
import sign1 from "../../asset/img/sign3.svg";
import axios from "axios";
import { SignupSchema } from "../../utils/Validation";
import ForgetPasswordPopUp from "./ForgetPasswordPopUp";
import { API, BASE_URL, NotifyError } from "../../redux/Constants";
import { Auth_login } from "../../redux/service/AuthService";
import AlertMesages from "../AlertMesages";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  providerGoogle,
} from "../../configure_i18next/firebase";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/slice/UserSlice";
import { useEffect } from "react";
import { isLoginWithGoogle, login } from "../../redux/slice/AuthSlice";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignInComponent() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMesages, setAlertMesage] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(isLoginWithGoogle(true));
    signInWithPopup(auth, providerGoogle)
      .then((data) => {
        // console.log("checking: ",data)

        const userInfo = {
          password: data.user.uid + "#",
          email: data._tokenResponse.email,
          myUserName: data._tokenResponse.email.split("@")[0],
        };

        const forLogin = {
          email: data._tokenResponse.email,
          profileImage: data.user.photoURL,
        };

        registerUser(userInfo)
          .then(() => {
            loginUser(forLogin)
              .then((token) => {
                dispatch(login(true));
                localStorage.setItem("token", token);
                navigate("/");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  };

  const registerUser = (userInfo) => {
    return API.post(`/gmail/register`, userInfo)
      .then((response) => {
        console.log("RegisterSuccess: ", response.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = (forLogin) => {
    return API.post(`/gmail/login`, forLogin)
      .then((response) => {
        const token = response.data.payload.token;
        return token;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  let [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordEye, setPasswordEye] = useState(false);

  const onSubmitHanler = (values) => {
    setIsLoading(true);
    setShowAlert(false);

    Auth_login(values, setIsLoading)
      .then((res) => {
        if (res.data.status) {
          dispatch(login(true));
          navigate("/");
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        setShowAlert(true);
        setAlertMesage("Invalid password or email.");
      });
  };

  return (
    <div className="w-screen h-screen">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 font-poppins w-screen h-screen laptop:w-screen laptop:h-screen ipad-pro:w-screen ipad-pro:h-screen 12pro:w-screen 12pro:h-screen">
        {/* left side */} 
        <div className="flex justify-center flex-col w-auto h-auto 12pro:justify-stretch 12pro:h-auto bg-navbar-bg ">
          <div>
            <Link to={"/"} >
              <img
                className="w-20 h-18 ml-auto mb-14 12pro:mb-6 mr-6 pt-6"
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex justify-center items-center w-auto h-auto laptop:w-auto laptop:h-full ipad-pro:w-auto ipad-pro:h-full 12pro:w-auto 12pro:h-auto">
            <div className="flex flex-col">
              <div className="text-center">
                <div className="text-dark-head text-2xl mb-2 font-bold">
                  SIGN UP
                </div>
                <div className="mb-4 font-monster font-bold text-dark-head">
                  Create an account
                </div>
                <Link to={"/register"}>
                  <button className="w-28 h-9 bg-dark-head text-white font-bold rounded-3xl hover:text-newYellow">
                    SIGN UP
                  </button>
                </Link>
              </div>
              <div className="mt-10">
                <img
                  className="w-[100%] h-80 hidden md:block px-8"
                  src={sign1}
                  alt="heroIcon"
                />
              </div>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="bg-white flex justify-center items-center w-auto h-auto ">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmitHanler}
          >
            <div className="mx-6 card-paper z-10 relative px-6 pt-6 pb-12 rounded-lg ">
              <Form>
                {/* Message Alert */}
                {showAlert ? (
                  <div className="alert bg-[#fde8e8] text-[#c81e1e] justify-start fade-in show mb-3">
                    <ErrorOutlineOutlinedIcon />
                    <span>{alertMesages}</span>
                  </div>
                ) : null}
                <div className="border bg-white shadow-lg py-8 px-10 shadow-slate-400 rounded-2xl w-[350px] md:w-[400px] lg:w-[450px]">
                  <div className="text-center">
                    <h1 className="font-extrabold text-2xl">Welcome Back!</h1>
                    <h4 className="my-3 text-sm font-normalfont">
                      Log in to your account to continue
                    </h4>
                  </div>

                  {/* Field email */}
                  <div className="mt-6 mb-3">
                    <span className="label-text text-base font-sans">
                      Email
                    </span>
                    <div className="flex items-center border-b-2 border-purple-head border-spacing-11 py-1">
                      <EmailOutlinedIcon />
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Jsonhub.info@gmail.com"
                        className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* Field Password */}
                  <div className="mb-4">
                    <span className="label-text text-base font-sans">
                      Password
                    </span>
                    <div className="flex items-center border-b-2 border-purple-head border-spacing-11 py-1">
                      <LockOutlinedIcon />
                      <Field
                        type={passwordEye ? "text" : "password"}
                        placeholder="********"
                        id="password"
                        name="password"
                        className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                      />
                      <span
                        className="label-text mb-1 text-base cursor-pointer"
                        onClick={() => {
                          setPasswordEye(!passwordEye);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={passwordEye ? faEye : faEyeSlash}
                        />
                      </span>
                    </div>
                  </div>

                  {/* --------------- */}
                  <div className="mt-2 text-sm">
                    <button
                      type="button"
                      onClick={openModal}
                      className="select-none cursor-pointer link-hover hover:text-indigo-400 label-text-alt text-[#6E6FE8]"
                    >
                      Forget Password?
                    </button>
                  </div>

                  {/* btn log in */}
                  <button
                    type="submit"
                    className="bg-dark-head text-white hover:text-newYellow border rounded-full  p-2 mt-10 w-full font-poppins"
                  >
                    {isLoading ? <Spinners /> : "LOG IN"}
                  </button>
                  <div className="flex justify-center items-center mt-3 px-3">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <span className="text-gray-300 mx-3">or</span>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                  </div>

                  {/* btn sign in with google */}
                  <button
                    type="submit"
                    onClick={handleClick}
                    className="border rounded-lg shadow-sm shadow-slate-600 p-2 w-full max-w-sm mt-2"
                  >
                    <div className="flex justify-center">
                      <img src={google} alt="google" className="w-5 h-5 mr-2" />
                      <span className="font-sans">Continue with Google</span>
                    </div>
                  </button>
                </div>
              </Form>
            </div>
          </Formik>
          {/* forgot password */}
          <ForgetPasswordPopUp
            isOpenMail={isOpen}
            closeModalMail={closeModal}
          />
        </div>
      </div>
    </div>
  );
}
