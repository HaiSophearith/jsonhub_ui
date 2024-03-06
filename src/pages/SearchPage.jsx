import search_logo from "../asset/img/search_page.png";
import FooterComponent from "../components/FooterComponent";
import { useEffect, useState } from "react";
import favoriteGray from "../asset/icon/favoriteGray.svg";
import dot from "../asset/icon/dot.svg";
import url from "../asset/img/url.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../redux/Constants";
import axios from "axios";
import find from "../asset/img/Rk.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { instance } from "../redux/service/InstanceHeader";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import ProjectCard from "./ProjectCard";
import PopUpForEditProject from "../components/project_page/PopUpForEditProject";
import PopUpForDeleteAndLeaveProject from "../components/project_page/PopUpForDeleteAndLeaveProject";

export default function SearchPage() {
  // change find by to username and project

  const [isLoading, setIsLoading] = useState();

  const options = ["Username", "Project"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  // const [isFromGoogle, setIsFromGoogle] = useState(false);
  // const [name, setName] = useState(null);
  // const [findby, setFindby] = useState("Username");

  // function selectName(e) {
  //   const name =
  //     e === "Username" ? "Username" : e === "Project" ? "Project" : "Find By";
  //   const findBy = e;

  //   setName(name);
  //   setFindby(findBy);
  // }

  // useEffect(() => {}, [name]);

  //Filter

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [resultsLimit, setResultsLimit] = useState(6);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchResultsProject, setSearchResultsProject] = useState([]);
  const [project, setProject] = useState([]);
  const [image, setImages] = useState([]);

  const [charImages, setImageCharacter] = useState([]);

  const fetchFilter = async () => {
    const userNameData = await instance.get(`/v1/all-user-info`);
    setUsers(userNameData.data);

    const projectData = await instance.get(`/all-info-public-project`);
    setProject(projectData.data.payload);
  };

  useEffect(() => {
    fetchFilter();
  }, []);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(Date.UTC(...timestamp));
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear().toString();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (windowHeight + scrollTop >= documentHeight - 200) {
        setHasScrolled(true);
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
          if (searchResultsProject.length < resultsLimit) {
            return;
          }
          setResultsLimit((prevLimit) => prevLimit + 6);
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [searchResultsProject, resultsLimit]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() !== "") {
      if (
        (selectedOption == null ? "Username" : selectedOption) === "Username"
      ) {
        const filteredUsername = users.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredUsername);
        const projectImages = filteredUsername.map(
          (item) => item.profileImages
        );
        const charImages = filteredUsername.map((item) => item.userName);
        setImageCharacter(charImages);
        setImages(projectImages);
      } else if (selectedOption === "Project") {
        const filteredProject = project.filter((item) =>
          item.info.projectInfo.projectInfo.projectName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        console.log(filteredProject);
        setSearchResultsProject(filteredProject);
        const projectImages = filteredProject.map(
          (item) => item.info.userInfo.imagePath
        );
        // console.log(filteredProject[0].info.userInfo.imagePath);

        setImages(projectImages);
      } else {
        console.log("Hello form not project");

        const filteredUsername = users.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredUsername);
      }
    } else {
      setSearchResults([]);
      setSearchResultsProject([]);
    }
    setHasScrolled(false);
  };

  useEffect(() => {
    if (hasScrolled) {
      const timeoutId = setTimeout(() => {
        setResultsLimit((prevLimit) => prevLimit + 6);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [hasScrolled]);

  useEffect(() => {
    if (searchTerm === "") {
      setResultsLimit(6);
    }
  }, [searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      AOS.init();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [clickCount, setClickCount] = useState(1);
  const navigate = useNavigate();

  const convertTimestampToDateLastUpdate = (timestampArray) => {
    const now = new Date();

    const Minutes = now.getMinutes() - timestampArray[4];
    const Hours = now.getHours() - timestampArray[3];
    const Days = now.getDate() - timestampArray[2];
    const Years = now.getYear() - timestampArray[0];
    const Months = now.getMonth() + 1 - timestampArray[1];

    let formattedDate;

    if (Years > 0) {
      formattedDate = `${Years} years ago`;
    } else if (Months > 0) {
      return (formattedDate = `${Months} months ago`);
    } else if (Days > 0) {
      return (formattedDate = `${Days} days ago`);
    } else if (Hours > 0) {
      return (formattedDate = `${Hours} hours ago`);
    } else if (Minutes > 0) {
      return (formattedDate = `${Minutes} minutes ago`);
    } else {
      return (formattedDate = `just now`);
    }
  };

  const handleCardInfo = (dataFromChild) => {};
  const [preId, setPreId] = useState("");
  const handleDotData = (dataFromChild) => {
    // setDeleteId(dataFromChild);
    let projectId = dataFromChild.replace("dropdown-dot-", "my-modal-manage-");
    setPreId(projectId);
  };

  return (
    <div>
      <div className="mb-1 12pro:mb-20">
        {/* <NavbarBeforeLoginComponent /> */}
      </div>
      {/* search page content  */}
      <div className="laptop:w-full ipad-pro:w-full 12pro:w-full ipad-pro:mt-32 flex justify-center font-montserrat mb-20">
        <div className="laptop:w-1/2 12pro:w-[85%] ipad-pro:w-[60%] ">
          <div
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="700"
            className="text-center"
          >
            <p className="capitalize  text-2xl -mt-12 font-black font-poppins 12pro:mb-2 mb-3">
              explore new mock aPIs with us
            </p>
            <p className="mb-8 text-md 12pro:text-sm">
              Search for a user or project to help you for a better life
              experience as a developer
              <br /> Enjoy!
            </p>
          </div>
          {/* form search */}
          <div className="mb-20 12pro:mb-24">
            <form>
              <div
                data-aos="zoom-out"
                data-aos-easing="linear"
                data-aos-duration="300"
                className="flex border-2 rounded-l-xl rounded-r-xl border-dark-head drop-shadow-xl"
              >
                <label
                  for="search-dropdown"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  Your Email
                </label>

                <div className="inline-flex">
                  {/* findby */}
                  <div className="relative flex min-w-[100px] rounded-l-lg  border-dark-head  bg-white">
                    <a
                      href="#"
                      onClick={toggling}
                      className="w-40 text-center font-extrabold rounded-l-md px-4 py-2 text-sm text-gray-600 no-underline hover:bg-gray-50 hover:text-gray-700"
                    >
                      {selectedOption || "Find by"}
                      {console.log("selectedValue" + selectedOption)}
                    </a>
                    <div className="relative">
                      <button
                        type="button"
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        className={`button-${isOpen ? "danger" : "success"}
               hover:text-gray-700' inline-flex h-full items-center justify-center rounded-r-md border-l border-l-2 border-dark-head px-2 text-gray-600 hover:bg-gray-50`}
                        onClick={toggling}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={
                            (isOpen ? "content show" : "content", "h-4 w-4")
                          }
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                    {isOpen && (
                      <div className="absolute top-6 right-0 z-10 mt-4 min-w-[200px] origin-top-right rounded-md border bg-white shadow-md">
                        {options.map((option) => (
                          <div>
                            <a
                              href="#"
                              onClick={onOptionClicked(option)}
                              key={Math.random()}
                              className="block font-extrabold text-center rounded-lg px-4 py-2 text-sm text-gray-500 no-underline hover:bg-gray-50 hover:text-gray-700"
                            >
                              {option}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder='"Awaiting the search."'
                    id="search-dropdown"
                    onChange={handleSearch}
                    value={searchTerm}
                    className="block p-2.5 w-full h-full z-20 text-sm text-gray-900 border-dark-head rounded-r-lg focus:ring-0 focus:border-0"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="laptop:mt-28 laptop:flex laptop:justify-center ipad-pro:flex ipad-pro:justify-center">
            <div className="laptop:flex laptop:my-5 laptop:justify-center ipad-pro:justify-center 12pro:justify-center laptop:w-[1500px] laptop:h-full ipad-pro:flex ipad-pro:w-[1500px] ipad-pro:h-full ipad-pro:my-2 ipad-pro:mt-0 12pro:mt-[50px]">
              <div
                className={
                  searchTerm === ""
                    ? ""
                    : (selectedOption == null ? "Username" : selectedOption) ===
                      "Username"
                    ? "laptop:-mt-10 ipad-pro:-mt-7 laptop:flex laptop:flex-col laptop:w-full ipad-pro:w-full ipad-pro:gap-5"
                    : "laptop:grid laptop:grid-cols-3 laptop:gap-7 laptop:w-[1200px] ipad-pro:w-[950px] ipad-pro:grid ipad-pro:grid-cols-3 ipad-pro:gap-5"
                }
              > 
                {/* card */}
                {searchTerm === "" ? (
                  <div
                    data-aos="fade-left"
                    data-aos-easing="linear"
                    data-aos-duration="800"
                    className="laptop:flex laptop:flex-col laptop:justify-center laptop:items-center 12pro:flex 12pro:flex-col 12pro:justify-center 12pro:items-center 12pro:mt-5"
                  >
                    <img
                      className="laptop:h-[350px] laptop:w-[100%] laptop:-mt-20 ipad-pro:w-[100%] ipad-pro:h-[300px] ipad-pro:-mt-16 12pro:h-[240px] 12pro:-mt-16 items-center mb-5 12pro:w-full"
                      src={find}
                      alt="search logo"
                    />
                    <p className=" 12pro:mr-10">Waiting to search!</p>
                  </div>
                ) : (selectedOption == null ? "Username" : selectedOption) ===
                  "Username" ? (
                  searchResults.slice(0, resultsLimit).map((items, index) => (
                    <NavLink
                      data-aos="fade-left"
                      data-aos-easing="linear"
                      data-aos-duration="500"
                      to={`/profile/${items.userName}`}
                      className="flex flex-row items-center laptop:my-2  ipad-pro:my-0 12pro:my-1"
                    >
                      {/* list username */}
                      <div
                        className="bg-white laptop:-mt-1 ipad-pro:mt-6 flex items-center laptop:w-[1000px] laptop:h-[70px] ipad-pro:w-[800px] ipad-pro:h-[60px] 12pro:w-full 12pro:h-[50px] shadow-md rounded-2xl px-1.5 border border-gray-200 "
                        style={{ height: "70px" }}
                      >
                        <div className="grid grid-cols-6 laptop:w-[88%] ipad-pro:w-[88%] 12pro:w-[90%] laptop:mx-3 ipad-pro:mx-5 12pro:mx-5 ">
                          <div className=" font-black col-span-2 ">
                            <span className="text-gray-600 bg-newYellow custom-width px-3 py-2 rounded-lg laptop:w-[70%] ipad-pro:w-[80%] 12pro:w-full laptop:text-lg ipad-pro:text-lg 12pro:text-sm">
                              {items.fullName == null
                                ? `${items.userName}`
                                : `${items.fullName}`}
                            </span>
                          </div>
                          <div className=" col-span-3 text-center font-light laptop:text-lg 12pro:text-sm 12pro:mt-1 laptop:mt-0 ipad-pro:mt-0 ipad-pro:text-lg laptop:inline-flex ipad-pro:inline-flex">
                            <span className="flex items-center justify-center">
                              @{items.userName}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-1 profile m-auto-full h-10 w-10 bg-red-600 text-white flex justify-center items-center border rounded-full">
                          {
                            image[index] !== null ? (
                              image[index].startsWith("https://") ||
                              image[index].startsWith("http://") ? (
                                <>
                                  {/* {checkImageUrl(image[index])} */}
                                  {/* {image[index]} */}
                                  <img
                                    src={image[index]}
                                    alt="profile"
                                    className="w-full h-full rounded-full"
                                  />
                                </>
                              ) : image[index] != null ? (
                                <>
                                  <img
                                    src={`http://localhost:8080/api/file-images?fileName=${image[index]}`}
                                    alt="profile"
                                    className="w-10 h-10 rounded-full"
                                  />
                                </>
                              ) : null
                            ) : // charImages[index].charAt(0)
                            // console.log("hlo")
                            null
                            // charImages[index].charAt(0)
                          }
                        </div>
                      </div>
                    </NavLink>
                  ))
                ) 
                 : selectedOption === "Project" ? (
                  searchResultsProject
                    .slice(0, resultsLimit)
                    .map((items, index) => (
                      <ProjectCard
                        project={items}
                        cardInfo={handleCardInfo}
                        // cardMembers={handleCardMembers}
                        dotData={handleDotData}
                      />
                    ))
                ) : (
                  "Username"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* popUp for edit card project and manage project option in setting icon */}
      <input type="checkbox" id="my-modal-manage" className="modal-toggle" />
      <div className="modal font-montserrat">
        <PopUpForEditProject
          projectDotId={preId}
          // isMyProject={isMyProject}
          // isGroupProject={isGroupProject}
          // isFavoriteProject={isFavoriteProject}
        />
      </div>

      {/* popUp for delete card project */}
      <input type="checkbox" id="my-modal-delete" className="modal-toggle" />
      <div className="modal font-montserrat">
        <PopUpForDeleteAndLeaveProject
          title="delete"
          buttonText="Delete"
          htmlFor="my-modal-delete"
          projectId={preId}
        />
      </div>
    </div>
  );
}
