import React from 'react';
import { Skeleton } from '@mui/material';

const ProfileSkeleton = () => {
  return (
    <div className="flex items-center bg-white w-[35%] ml-[55%] mt-16  rounded-full shadow-2xl mb-4">
      <div className="pr-6">
        <div className="text-white w-[170px] h-[170px] rounded-full border-2 ring-4">
          <div className="w-full h-full relative">
            <Skeleton
              variant="circular"
              width={170}
              height={170}
              style={{ borderRadius: '50%' }}
            />
            <button type="button" className="">
              <label className="bg-purple-head tooltip p-1 rounded-full absolute bottom-0 right-5" data-tip="View profile">
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-hwaqf3-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CollectionsOutlinedIcon">
                  <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67 1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                </svg>
              </label>
            </button>
          </div>
        </div>
      </div>
      <div className="text-center pr-6 border-r-2 border-purple-head">
        <div className="laptop:text-3xl ipad-pro:text-2xl text-purple-head font-bold 12pro:text-sm">
          <Skeleton variant="text" width={30} height={30} />
        </div>
        <div className="laptop:text-base ipad-pro:text-sm 12pro:text-xs mb-3">
          <Skeleton variant="text" width={60} height={20} />
        </div>
        <div className="laptop:text-3xl ipad-pro:text-2xl text-purple-head font-bold 12pro:text-sm">
          <Skeleton variant="text" width={30} height={30} />
        </div>
        <div className="laptop:text-base ipad-pro:text-sm 12pro:text-xs">
          <Skeleton variant="text" width={60} height={20} />
        </div>
      </div>
      <div className="laptop:ml-5 pr-6 ipad-pro:ml-4 12pro:ml-1 font-poppins">
        <div className="flex-grow text-black font-semibold text-lg">
          <Skeleton variant="text" width={100} height={30} />
        </div>
        <div className="text-blue-600 text-sm">@admin</div>
        <div className="flex items-center flex-row justify-content-between laptop:mt-4 ipad-pro:mt-3 12pro:mt-2">
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mr-1 css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EmailOutlinedIcon">
            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
          </svg>
          <span className="text-sm">
            <Skeleton variant="text" width={150} height={20} />
          </span>
        </div>
        <div className="flex items-center flex-row justify-content-between laptop:mt-4 ipad-pro:mt-3 12pro:mt-2">
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mr-1 css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AccessTimeOutlinedIcon">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
          </svg>
          <span className="text-sm">
            <Skeleton variant="text" width={170} height={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;


