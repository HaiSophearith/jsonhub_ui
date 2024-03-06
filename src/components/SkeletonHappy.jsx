import React from 'react';
import { Skeleton } from '@mui/material';
import  { useState, useEffect } from 'react';
import { Box, Typography} from '@mui/material';

const ProjectCardSkeleton = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <Box minHeight="100vh" bgcolor="white" p={4}>
        {isLoading ? (
        <Box p={4}>
           <div className=' flex justify-center items-center'>
    <div className="bg-white shadow-md border laptop:w-[20%] mt-10 ml-20 rounded-lg flex flex-col px-4 py-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="laptop:mr-3">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-montserrat line-clamp-1">
                <Skeleton variant="text" width={100} height={20} />
              </span>
            </div>
          </div>
          <div className="flex items-center self-start">
            <div className="laptop:mx-2 ipad-pro:mx-1 ">
              <button>
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
            </div>
            <div className="dropdown">
              <button
                tabIndex="0"
                className="text-gray-400"
                id="dropdownDefault-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                data-dropdown-toggle="dropdown-dot-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                type="button"
              >
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1.5px] mt-3 flex">
        <div className="w-full h-full grid grid-cols-4">
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-yellow-400"></div>
          <div className="w-full h-full bg-cyan-500"></div>
          <div className="w-full h-full bg-green-400"></div>
        </div>
      </div>
      <a className="flex border-slate-400 justify-between mt-3" href="">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="font-montserrat flex w-full items-center">
              <div className="flex items-center">
                <Skeleton variant="rectangular" width={24} height={24} />
                <div className="ml-2 hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
              </div>
            </div>
          </div>
          <div className="flex w-full my-2 items-center">
            <div className="mr-2">
              <Skeleton variant="rectangular" width={24} height={24} />
            </div>
            <div className=" hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
          </div>
          <div className=" hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
        </div>
      </a>
      
      
    </div>
    <div className="bg-white shadow-md border laptop:w-[20%] mt-10 ml-20 rounded-lg flex flex-col px-4 py-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="laptop:mr-3">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className=" hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-montserrat line-clamp-1">
                <Skeleton variant="text" width={100} height={20} />
              </span>
            </div>
          </div>
          <div className="flex items-center self-start">
            <div className="laptop:mx-2 ipad-pro:mx-1 ">
              <button>
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
            </div>
            <div className="dropdown">
              <button
                tabIndex="0"
                className="text-gray-400"
                id="dropdownDefault-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                data-dropdown-toggle="dropdown-dot-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                type="button"
              >
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1.5px] mt-3 flex">
        <div className="w-full h-full grid grid-cols-4">
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-yellow-400"></div>
          <div className="w-full h-full bg-cyan-500"></div>
          <div className="w-full h-full bg-green-400"></div>
        </div>
      </div>
      <a className="flex border-slate-400 justify-between mt-3" href="">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="font-montserrat flex w-full items-center">
              <div className="flex items-center">
                <Skeleton variant="rectangular" width={24} height={24} />
              <div className="ml-2 font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
              </div>
            </div>
          </div>
          <div className="flex w-full my-2 items-center">
            <div className="mr-2">
              <Skeleton variant="rectangular" width={24} height={24} />
            </div>
            <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
          </div>
          <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
        </div>
      </a>
      
      
    </div>
    <div className="bg-white shadow-md border laptop:w-[20%] mt-10 ml-20 rounded-lg flex flex-col px-4 py-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="laptop:mr-3">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className=" hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-montserrat line-clamp-1">
                <Skeleton variant="text" width={100} height={20} />
              </span>
            </div>
          </div>
          <div className="flex items-center self-start">
            <div className="laptop:mx-2 ipad-pro:mx-1 ">
              <button>
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
            </div>
            <div className="dropdown">
              <button
                tabIndex="0"
                className="text-gray-400"
                id="dropdownDefault-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                data-dropdown-toggle="dropdown-dot-0f1c60e2-6730-4252-8ea3-4c0b9d6b4251"
                type="button"
              >
                <Skeleton variant="rectangular" width={24} height={24} />
              </button>
           
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1.5px] mt-3 flex">
        <div className="w-full h-full grid grid-cols-4">
          <div className="w-full h-full bg-red-500"></div>
          <div className="w-full h-full bg-yellow-400"></div>
          <div className="w-full h-full bg-cyan-500"></div>
          <div className="w-full h-full bg-green-400"></div>
        </div>
      </div>
      <a className="flex border-slate-400 justify-between mt-3" >
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="font-montserrat flex w-full items-center">
              <div className="flex items-center">
                <Skeleton variant="rectangular" width={24} height={24} />
                <div className=" ml-2 font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
              </div>
            </div>
          </div>
          <div className="flex w-full my-2 items-center">
            <div className="mr-2">
              <Skeleton variant="rectangular" width={24} height={24} />
            </div>
            <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
          </div>
          <div className="font-montserrat text-dark-head hover:bg-dark-head hover:text-white font-black hover:bg-blur-15% hover:px-2 hover:rounded-md">
              <Skeleton variant="text" width={100} height={30} />
            </div>
        </div>
      </a>
      
      
    </div>
    </div>
        </Box>
      ) :(
        <Box p={4}>
        {/* UI page */}
        <Typography variant="h4" gutterBottom>
          Welcome to My App
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          convallis consequat tortor, vel mattis tellus tempus id.
        </Typography>
      </Box>
      )}
    </Box>
  );
  
};

export default ProjectCardSkeleton;

