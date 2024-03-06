import React from 'react'
import forder_icon from '../asset/icon/Folder_icon.svg'

export default function GroupProjectComponent() {
    return (
        <div className='ipad-pro:px-16 12pro:px-7 '>
            <div className='bg-whitesmoke border-gray-300 h-screen  border-spacing-2.5 border-2 py-2.5 flex  justify-center items-center m-auto 12pro:px-4 ipad-pro:px-36'>
                <div class="bg-white laptop:w-[45%] ipad-pro:w-[90%] 12pro:w-[70%] 12pro:h-[270px] h-[500px] ipad-pro:h-[400px] border-gray-300 border-2 rounded-xl shadow">
                    <div className='grid grid-rows-4 12pro:flex 12pro:flex-col 12pro:justify-between'>
                        <div className='row-span-1 flex justify-center'>
                            <div className=' font-black text-2xl mt-20 ipad-pro:mt-10 ipad-pro:text-lg 12pro:mt-2 12pro:text-sm 12pro:text-center '>
                                There is no active group projects
                            </div>
                        </div>
                        <div className='row-span-2 ipad-pro:row-span-2 12pro:row-span-1'>
                            <div className=' w-[60%] py-[50px] flex justify-center items-center m-auto '>
                                <div className='bg-gray-100 rounded-full w-36 h-36 ipad-pro:w-28 ipad-pro:h-28 12pro:w-12 12pro:h-12 flex justify-center items-center m-auto'>
                                    <img className='justify-center m-auto h-20 w-20 ipad-pro:h-14 ipad-pro:w-14 12pro:w-8 12pro:h-8  ' src={forder_icon} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='row-span-1 flex justify-center items-center'>
                            <div className='font-black text-lg ipad-pro:text-sm 12pro:text-sm 12pro:text-center '>
                                It's time to create your project with team.
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}