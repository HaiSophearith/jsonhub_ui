import React from 'react'
import forder_icon from '../asset/icon/Folder_icon.svg'

export default function MyProjectProfileComponent() {
    return (
        <div>
            <div className='md:px-32 12pro:px-12'>
                <div className='bg-whitesmoke border-gray-300 h-screen  border-spacing-2.5 border-2 py-2.5 flex  justify-center items-center m-auto 12pro:px-4 md:px-24'>
                    <div class="bg-white w-[40%] 12pro:h-[320px] ipad-pro:w-[75%] ipad-pro:h-[280px] 12pro:w-[80%] laptop:h-[280px] border-gray-300 border-2 rounded-xl shadow">
                        <div className='grid grid-rows-4b 12pro:flex 12pro:flex-col 12pro:justify-between'>
                            <div className='row-1 flex m-auto'>
                                <div className=' font-black text-xl mt-20 12pro:text-center 12pro:mt-4 12pro:text-sm '>
                                    There is no active group projects
                                </div>
                            </div>
                            <div className='row-span-2 '>
                                <div className=' w-[60%] py-[40px] flex justify-center items-center m-auto '>
                                    <div className='bg-gray-100 rounded-full w-36 h-36 12pro:w-12 12pro:h-12 flex justify-center items-center m-auto'>
                                        <img className='justify-center m-auto h-20 w-20 12pro:h-8 12pro:w-8 ' src={forder_icon} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className='row-3 justify-center m-auto'>
                                <div className='font-black text-lg 12pro:text-center 12pro:text-sm'>
                                    It’s time to create your project with team.
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <button type="button" className="text-white bg-purple-head font-bold font-poppins rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">+ Create Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
