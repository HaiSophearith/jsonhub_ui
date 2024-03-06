import React, { useEffect, useState } from "react";
import {
  Link,
  Router,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";
import jsonhub_navbar from "../asset/img/jsonhub_navbar.png";
import { IconButton, Navbar, MobileNav } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  isLocalImage,
  isLoginWithGoogle,
  login,
} from "../redux/slice/AuthSlice";
import "../style/navbar.css";
import {
  get_current_user_info,
  get_user_info,
} from "../redux/service/UserService";
import EditProfile from "./EditProfile";

import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function NavbarComponent() {
  const [visible, setVisible] = useState(false);

  const [isFromGoogle, setIsFromGoogle] = useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const [openNav, setOpenNav] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentPath = window.location.pathname;
  console.log(currentPath);
  const isLoggedIn = useSelector((state) => state.auth.isLogin);
  // const isLoginWithGoogleStatus = useSelector(
  //   (state) => state.auth.isLoginWithGoogleStatus
  // );

  // console.log("Checihgg: ", currentUser)

  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );

  const onSignOuthandle = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("bearerToken");

    dispatch(login(false));
    dispatch(isLoginWithGoogle(false));

    navigate("/");
  };

  const checkImageUrl = (imageUrl) => {
    if (imageUrl.startsWith("https://") || imageUrl.startsWith("http://")) {
      setIsFromGoogle(true);
      dispatch(isLocalImage(true));
    } else {
      setIsFromGoogle(false);
      dispatch(isLocalImage(false));
    }
  };

  //get user info
  useEffect(() => {
    get_current_user_info()
      .then((res) => {
        dispatch(getCurrentUser(res.data.payload));
        checkImageUrl(res.data.payload.profileImages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // checkImageUrl(userPf.profileImages);
  // console.log("From google: " + isFromGoogle);
  // console.log("isLocalImageStatus: " + isLocalImageStatus);

  const navList = (
    <ul className=" mb-4 mt-2 text-sm font-montserrat 12pro:items-end 12pro:text-center mx-10 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 list-none capitalize">
      <div className="flex text-navbar 12pro:flex-col 12pro:items-end laptop:flex-row ipad-pro:flex-row">
        {/* home link */}
        <li>
          <Link
            to={"/"}
            className={
              currentPath == "/"
                ? "w-full px-4 py-2 text-white rounded-full bg-dark-head flex items-center"
                : "nav-link px-4 py-2 rounded-full flex items-center"
            }
          >
            <HomeOutlinedIcon className="mr-1" />
            home
          </Link>
        </li>
        {/* project link */}
        <li>
          <Link
            to={"/manage-project"}
            className={
              currentPath == "/manage-project"
                ? "flex items-center w-full px-4 py-2 rounded-full bg-dark-head text-white"
                : "nav-link flex items-center px-4 py-2 rounded-full"
            }
          >
            <DisplaySettingsOutlinedIcon className="mr-1" />
            projects
          </Link>
        </li>
        {/* search link */}
        <li>
          <Link
            to={"/search"}
            className={
              currentPath == "/search"
                ? "flex items-center w-full px-4 py-2 rounded-full bg-dark-head text-white"
                : "nav-link flex items-center px-4 py-2 rounded-full"
            }
          >
            <SearchOutlinedIcon className="mr-1" />
            search
          </Link>
        </li>
        {/* documentation link */}
        <li>
          <Link
            to={"/documentation"}
            className={
              currentPath == "/documentation"
                ? "flex items-center w-full px-4 py-2 rounded-full bg-dark-head text-white"
                : "nav-link flex items-center px-4 py-2 rounded-full"
            }
          >
            <DescriptionOutlinedIcon className="mr-1" />
            documentation
          </Link>
        </li>
        {/* about link */}
        <li>
          <Link
            to={"/about"}
            className={
              currentPath == "/about"
                ? "flex items-center w-full px-4 py-2 text-white rounded-full bg-dark-head"
                : "nav-link flex items-center px-4 py-2 rounded-full"
            }
          >
            <InfoOutlinedIcon className="mr-1" />
            about
          </Link>
        </li>
      </div>
    </ul>
  );

  return (
    <div className="shadow">
      <nav className=" bg-bg-footer  w-full py-2 px-4 lg:px-6 lg:py-2-3xl">
        <div className="flex items-center justify-between">
          {/* jsonhub logo */}
          <Link
            to={"/"}
            className="flex items-center my-1 12pro:h-12 12pro:w-11 ipad-pro:h-12 ipad-pro:w-12"
          >
            <div className=" w-[150px]">
              <img src={jsonhub_navbar} className=" " alt="JsonHub logo" />
            </div>
          </Link>
          {/* Main navabar */}
          <div className="hidden lg:flex justify-center w-full">
            {navList}
            {/* button sign in and sign up */}
          </div>

          <div className="flex items-center">
            <div className="text-navbar flex items-center ml-3">
              {/* Profile when have token */}

              {isLoggedIn ? (
                <>
                  <Link to={`/profile/${currentUser?.userName}`}>
                    <div className="profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center ring-2 items-center rounded-full">
                      {currentUser.profileImages !== null ? (
                        isLocalImageStatus ? (
                          <img
                            src={currentUser.profileImages}
                            alt="profile"
                            className="w-full h-full rounded-full object-cover border"
                          />
                        ) : currentUser?.profileImages != null ? (
                          <>
                            {currentUser?.profileImages.startsWith(
                              "https://"
                            ) ? (
                              <img
                                src={currentUser.profileImages}
                                alt="profile"
                                className="w-full h-full rounded-full object-cover border"
                              />
                            ) : (
                              <img
                                src={`http://localhost:8080/api/file-images?fileName=${currentUser?.profileImages}`}
                                alt="profile"
                                className="w-full h-full rounded-full object-cover border"
                              />
                            )}
                          </>
                        ) : (
                          currentUser.userName?.charAt(0).toUpperCase()
                        )
                      ) : (
                        <div className="text-2xl items-center justify-center">
                          {currentUser.userName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={1}
                      className="ml-3 text-purple-head transition-all"
                    >
                      <ArrowDropDownCircleOutlinedIcon className="hover:rotate-180" />
                    </label>
                    <ul
                      tabIndex={1}
                      className="list-none bg-[#FCF8FF] dropdown-content border shadow-md mt-5 rounded-lg"
                    >
                      <li className="bg-white w-full p-4 border-b">
                        <div className="flex flex-col">
                          <h4 className="font-bold text-lg capitalize">
                            {currentUser?.fullName != null
                              ? currentUser?.fullName
                              : currentUser?.userName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {currentUser?.userEmail}
                          </p>
                        </div>
                      </li>
                      <ul className="text-base-content p-4">
                        <li className="flex items-center w-full hover:text-purple-head hover:bg-[#FCF8FF] p-2 rounded-lg">
                          <ManageAccountsOutlinedIcon />
                          <button onClick={toggleVisible} className="ml-3">
                            Edit Profile
                          </button>
                          {/* <Link to={"/edit-profile"}>Edit Profile</Link> */}
                        </li>
                        <li className="flex items-center w-full text-red-500 hover:text-red-700 mt-2 hover:bg-[#FCF8FF] p-2 rounded-lg">
                          <LogoutOutlinedIcon />
                          <button onClick={onSignOuthandle} className="ml-3">
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex  ">
                  <Link to={"/login"}>
                    <button
                      type="button"
                      className="capitalize rounded-lg  hover:bg-dark-head text-black hover:text-newYellow  border border-navbar 12pro:w-[90px] ipad-pro:w-[100px] laptop:w-[100px]  focus:outline-none font-medium-lg 12pro:text-[12px] ipad-pro:text-sm px-5 py-2.5 text-center mr-2"
                    >
                      sign in
                    </button>
                  </Link>

                  <Link to={"/register"}>
                    <button
                      type="button"
                      className="capitalize rounded-lg  hover:bg-dark-head text-black hover:text-newYellow  border border-navbar 12pro:w-[90px] ipad-pro:w-[100px] laptop:w-[100px]  focus:outline-none font-medium-lg 12pro:text-[12px] ipad-pro:text-sm px-5 py-2.5 text-center mr-2"
                    >
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit text-navbar focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">{navList}</div>
        </MobileNav>
      </nav>
      <EditProfile visible={visible} toggleVisible={toggleVisible} />
    </div>
  );
}
