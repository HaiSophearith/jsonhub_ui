import React from 'react'
import myproject_icon from '../../asset/icon/project-symlink-16.svg'
import group_project_icon from '../../asset/icon/group-rounded.svg'
import favourite_icon from '../../asset/icon/favorite-solid.svg'
import { Link, NavLink, useParams } from "react-router-dom";
import myproject from "../../asset/img/icon/myproject.svg";
import groupproject from "../../asset/img/icon/groupproject.svg";
import favoriteGold from "../../asset/img/icon/favorite.svg";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';


export default function SubnavbarGridProfile({gridProject, setState, setGrid,disable}) {
  const {username} = useParams();
    // tab to My Project
  const gridMyProject = () => {
    setState("gridMyProject");
  };
  // tab to Group Project
  const gridGroupProject = () => {
    setState("gridGroupProject");
  };
  // tab to Favorite Project
  const gridFavoriteProject = () => {
    setState("gridFavoriteProject");
  };
  // grid
  const handleGrid = () => {
    setGrid(false);
  };
  // list
  const handleList = () => {
    setGrid(true);
  };


  return (
    <div className='mb-4 bg-white shadow rounded-lg'>
      <NavLink className="w-full items-center px-10 py-4 cursor-default uppercase laptop:flex font-black font-poppins laptop:text-base ipad-pro:flex ipad-pro:text-base 12pro:flex 12pro:text-xs border-b-[1px] border-slate-400">
        {/* left links  */}
        <div className="laptop:w-1/2 flex ipad-pro:flex ipad-pro:w-[80%] 12pro:w-full justify-between">
          {/* my project link */}
          
          <Link className={gridProject === 'gridMyProject'? "bg-purple-head text-white py-1 px-4 rounded-lg" : "py-1 px-4 rounded-lg"}>
            <div onClick={gridMyProject} className="flex items-center">
              <ArticleOutlinedIcon className="mr-1" />
              {
                disable? (
              <span className="font-normal font-montserrat hover:bg-blur-15% hover:text-purple-head hover:rounded-full"><span className='text-[#F2E900]'>{username}</span>{"'s projects"}</span>
                ):(
                  <div>
              <span className="capitalize font-normal text-sm">my project</span>
                  </div>
                )
              }
            </div>
          </Link>
          {/* group project link */}

          {
            disable? null:(
              <Link className={gridProject === 'gridGroupProject'? "bg-purple-head text-white py-1 px-4 rounded-lg" : "py-1 px-4 rounded-lg"}>
            <div onClick={gridGroupProject} className="flex items-center">
              <GroupsOutlinedIcon className="mr-1" />
              <span className="capitalize font-normal text-sm">group project</span>
            </div>
          </Link>
            )
          }

          {/* favorite link */}
          {
            disable ? null :(
              <Link className={gridProject === 'gridFavoriteProject'? "bg-purple-head text-white py-1 px-4 rounded-lg" : "py-1 px-4 rounded-lg"}>
            <div onClick={gridFavoriteProject} className="flex items-center">
              <BookmarkAddedOutlinedIcon className="mr-1" />
              <span className="capitalize font-normal text-sm">favorite</span>
            </div>
          </Link>
            )
          }

        </div>
        {/* grid */}
        {/* {
          disable?null:(
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start laptop:text-sm ipad-pro:text-[12px] text-gray-500 leading-none border-2 border-gray-200 rounded-lg mr-10">
          <button
            onClick={handleGrid}
            class="inline-flex items-center border-r-2 border-gray-200 transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full laptop:px-1 laptop:py-1 ipad-pro:px-2 ipad-pro:py-1 active"
            id="grid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="fill-current laptop:w-[24px] laptop:h-[24px] ipad-pro:w-[16px] ipad-pro:h-[16px] 12pro:w-[8px] 12pro:h-[8px] mr-2"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Grid</span>
          </button>
          <button
            onClick={handleList}
            class="inline-flex laptop:text-sm ipad-pro:text-sm text-center 12pro:text-[8px] items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-1 py-1"
            id="list"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="fill-current laptop:w-[24px] laptop:h-[24px] ipad-pro:w-[16px] ipad-pro:h-[16px] 12pro:w-[8px] 12pro:h-[8px] mr-2"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </span>
          )
        } */}
      </NavLink>
    </div>
  )
}
