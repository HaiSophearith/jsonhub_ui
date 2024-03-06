import React from 'react'
import favorite_icon from '../asset/icon/favorite-solid.svg'

export default function FavoriteProfileComponent() {
    return (
        <div className='md:px-32 12pro:px-24'>
            <div className='bg-whitesmoke border-gray-300 h-screen  border-spacing-2.5 border-2 py-2.5 flex justify-center items-center m-auto 12pro:px-2 ipad-pro:px-24 '>
                <div class="bg-white w-[35%] 12pro:w-[80%] ipad-pro:w-[55%] 12pro:h-[280px] h-[500px] border-gray-300 border-2 rounded-xl shadow">
                    <div className='grid grid-rows-4 12pro:flex 12pro:justify-between 12pro:flex-col'>
                        <div className='row-1 flex justify-center'>
                            <div className=' font-black text-xl mt-20 12pro:text-center 12pro:mt-2 12pro:text-sm'>
                                There is no favorite
                            </div>
                        </div>
                        <div className='row-span-2'>
                            <div className=' w-[60%] py-[50px] flex justify-center items-center m-auto '>
                                <div className='bg-gray-100 rounded-full w-36 h-36 12pro:w-16 12pro:h-16 flex justify-center items-center m-auto'>
                                    <img className='justify-center m-auto h-20 w-20 12pro:h-8 12pro:w-8 ' src={favorite_icon} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='row-3 flex justify-center'>
                            <div className='font-black text-lg 12pro:text-sm 12pro:text-center '>
                                Add file to your favorite                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
