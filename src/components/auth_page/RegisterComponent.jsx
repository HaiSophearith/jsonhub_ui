import React, { useEffect, useState } from "react";
import icon1 from "../../asset/img/1.svg";
import icon3 from "../../asset/icon/8666757_lock_security_icon.svg";
import icon4 from "../../asset/icon/User.svg";
import user_icon from "../../asset/icon/user-icon.png";
import logo from "../../asset/img/icon6.png";
import sign from "../../asset/img/sign1.svg";
import menu from "../../asset/img/Sign2.svg";
import '../../style/auth_style.css'

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { popUpModel, register } from "../../redux/slice/AuthSlice";
import VerifyPopUp from "./VerifyPopUp";

import { Field, Form, Formik } from "formik";
import axios from "axios";
import { SignupSchema } from "../../utils/Validation";
import Spinners from "../Spinners";
import lock_icon from "../../asset/icon/icons8-lock.png";
import { BASE_URL, NotifyError } from "../../redux/Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import AlertMesages from "../AlertMesages";
import { instance } from "../../redux/service/InstanceHeader";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function RegisterComponent() {
  let [isOpen, setIsOpen] = useState(false);
  let [email, setEmail] = useState("");

  let [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [passwordEye, setPasswordEye] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMesages, setAlertMesage] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (value) => {
    setEmail(value.email);

    setIsLoading(true);
    if (selected) {
      axios
        .post(`${BASE_URL}/v1/auth/v1/auth/register`, value)
        .then((response) => {
          setIsLoading(false);
          setIsOpen(true);
        })
        .catch(function (error) {
          setShowAlert(true);
          setAlertMesage("Email or username is already taken");
          setIsLoading(false);
          // console.log(error.response.data.error)
        });
    } else {
      setShowAlert(true);
      setAlertMesage("Please read and accept term of use.");
      setIsLoading(false);
    }

    console.log("show", showAlert);
    console.log("mesage", AlertMesages);
  };

  const onselectPrivacy = (e) => {
    const selected = e.target.checked;
    setSelected(selected);
    if (selected) {
      setShowAlert(false);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 font-poppins w-auto h-auto laptop:w-screen laptop:h-screen ipad-pro:w-screen ipad-pro:h-screen 12pro:w-screen 12pro:h-screen">
        {/* Right side (Form) */}
        <div className="bg-white w-auto h-full flex justify-center items-center order-2 md:order-1 pt-40 md:mt-0 12pro:pt-1">
          <Formik
            initialValues={{
              fullName: "",
              myUserName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <div className="mx-6 card-paper z-10 relative px-6 rounded-lg">
                <Form>
                  {/* Message Alert */}
                  {showAlert ? (
                    <div className="alert bg-[#fde8e8] text-[#c81e1e] justify-start fade-in show mb-3">
                      <ErrorOutlineOutlinedIcon />
                      <span>{alertMesages}</span>
                    </div>
                  ) : null}
                  {/* -------------- */}
                  <div className="border p-8 shadow-lg shadow-slate-400 rounded-2xl w-[350px] md:w-[400px] lg:w-[450px]">
                    <h1 className="font-extrabold text-center text-2xl uppercase">
                      Create Account
                    </h1>

                    {/* Field full name */} 
                    <div className="mt-4">
                      <span className="label-text text-base">Full name</span>
                      <div className="flex items-center border-b-2 border-purple-head border-spacing-11 py-1">
                        <PersonOutlineOutlinedIcon />
                        <Field
                          className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:ring-0"
                          type="text"
                          id="fullName"
                          name="fullName"
                          placeholder="JSONHub"
                        />
                      </div>
                      <div className="h-5">
                        {errors.fullName && touched.fullName ? (
                          <label className="text-red-500 mb-3 text-xs">
                            {errors.fullName}
                          </label>
                        ) : null}
                      </div>
                    </div>

                    {/* Field Username */}
                    <div className="mt-4">
                      <span className="label-text text-base">Username</span>
                      <div className="flex items-center border-b-2 border-purple-head border-spacing-11 py-1">
                        <AccountCircleOutlinedIcon />
                        <Field
                          className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:ring-0"
                          type="text"
                          id="username"
                          name="myUserName"
                          placeholder="Jsonhub81"
                        />
                      </div>
                      <div className="h-5">
                        {errors.myUserName && touched.myUserName ? (
                          <label className="text-red-500 mb-3 text-xs">
                            {errors.myUserName}
                          </label>
                        ) : null}
                      </div>
                    </div>

                    {/* Field email */}
                    <div className="mt-4 mb-3">
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
                          className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:ring-0"
                        />
                      </div>
                      <div className="h-5">
                        {errors.email && touched.email ? (
                          <label className="text-red-500 mb-3 text-xs">
                            {errors.email}
                          </label>
                        ) : null}
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
                      <div className="h-auto">
                        {errors.password && touched.password ? (
                          <label className="text-red-500 mb-3 text-xs">
                            {errors.password}
                          </label>
                        ) : null}
                      </div>
                    </div>

                    {/* --------------- */}
                    <div className="flex items-center mt-2 text-gray-200">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        onChange={onselectPrivacy}
                        name="checkPrivacy"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                      />
                      <label
                        for="link-checkbox"
                        className="ml-2 text-sm text-gray-600 cursor-pointer select-none"
                      >
                        I have read and accepts term of Use{" "}
                        <a
                          href="privacy_policy.html"
                          target="_blank"
                          className="link font-bold"
                        >
                          privacy
                        </a>
                      </label>
                    </div>
                    <div className="flex justify-center items-center mt-8">
                      <button
                        type="submit"
                        className="bg-dark-head hover:text-newYellow w-full py-2 rounded-3xl text-white"
                      >
                        {isLoading ? <Spinners /> : "REGISTER"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>

        {/* Left side */}
        <div className=" flex flex-col justify-center w-auto h-full laptop:w-auto laptop:h-full  12pro:justify-stretch 12pro:w-auto 12pro:h-auto bg-navbar-bg order-1">
          <Link to={"/"}>
            <img
              className="w-20 h-18 ml-auto mb-14 12pro:mb-6 mr-6 pt-6"
              src={logo}
              alt="logo"
            />
          </Link>
          <div className="flex flex-col justify-center items-center w-auto h-auto laptop:w-full laptop:h-full ipad-pro:w-full ipad-pro:h-full 12pro:w-auto 12pro:h-auto">
            <div className="text-center">
              <div className="text-dark-head text-2xl mb-3 font-bold">SIGN IN</div>
              <div className=" font-monster font-bold text-dark-head">
                Do you have an account?
              </div>
              <Link to={"/login"}>
                <button className="bg-dark-head hover:text-newYellow font-monster text-sm font-bold text-white mt-4 py-2 px-10 rounded-3xl">
                  Login
                </button>
              </Link>
            </div>
            <div className="mt-10 ">
              <img className=" w-[500px] h-80 hidden md:block px-8" src={menu} alt="heroIcon" />
            </div>
          </div>
        </div>
      </div>
      <VerifyPopUp
        isOpen={isOpen}
        closeModal={closeModal}
        login={"login"}
        email={email}
      />
    </div>
  );
}
