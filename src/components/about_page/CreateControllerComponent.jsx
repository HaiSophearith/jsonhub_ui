import React, { Component } from 'react'
import NavbarWhiteComponent from '../NavbarWhiteComponent'
import Footer from '../FooterComponent'
import Public from '../../asset/img/public.svg'
import URL from '../../asset/img/url.svg'
import Setting from '../../asset/img/settting.svg'
import Members from '../../asset/img/members.svg'
import Add from '../../asset/img/add.svg'
import Profile from '../../asset/img/profile.svg'
import Add_Profile from '../../asset/img/Forder.svg'
// import Folder from '../../asset/img/folder.svg'
export default class CreateControllerComponent extends Component {
  render() {
    return (
      <div>
        <NavbarWhiteComponent/>
        <div className=' bg-whitesmoke grid laptop:grid-cols-5 laptop:w-11/12 h-fit laptop:ml-auto laptop:mr-auto laptop:my-10 rounded-lg shadow-[0px_3px_8px_0px_#1A202C]  justify-evenly'>
            <div className=' laptop:border-r-2 border-gray-400 shadow-lg flex flex-col items-center laptop:row-span-4'>
                <h1 className=' font-bold text-center laptop:mt-10 font-poppins text-xl'>Create Controller</h1>
                <p className=' laptop:ml-8 laptop:mt-3'>Create controller for a new idea or bring over and existing controller to keep contributing to it.</p>
                <button className=' w-36 bg-blue-500  laptop:mt-4 rounded-lg p-1 text-md font-poppins text-white'>+ New Controller</button>
            </div>
            <div className=' laptop:col-span-3 laptop:row-span-4 flex flex-col justify-center items-center'>
                      <img src={Add_Profile} className=' h-32 w-32'/> 
                      <h2 className=' mt-2  font-poppins text-2xl'>No Controller or Endpoint</h2>
            </div>
            <div className=' laptop:border-l-2 row-span-3 grid laptop:grid-rows-4 gap-3 border-gray-400 shadow-[0px_0px_6px_0px_#718096]'>
               <div className='  shadow-[0px_6px_6px_0px_#718096] flex flex-col  text-center relative pb-6'>
                    <div className=' place-self-center'>
                      <img src={Setting} className=' h-6 w-6 inline-block mt-1 absolute right-2 top-2'/>  
                      <div class=" font-bold font-poppins rounded-full mx-28 bg-green-400 h-14 w-14 flex  items-center justify-center mt-4">
                        T
                      </div>
                    </div>
                   
                    <p className=' uppercase font-bold font-poppins text-title mt-1'>
                      Project management
                    </p>
                    <div>
                        <span className='  inline-block text-date font-poppins'>
                        May, 05 2022 &nbsp;
                        </span>
                        <img src={Public} className=' h-4 w-4 inline-block mb-1'/>
                    </div>   
                     
                    <div className=' place-start'>
                        <div className=' flex justify-start ml-6 mt-2'>
                          <img src={URL} className=' h-4 w-4 inline-block mt-1'/>
                          <span className=' ml-3 font-poppins'>0</span>
                          <p className=' font-poppins'>&nbsp;url-endpoints</p>
                        </div>    
                        <div className=' flex justify-start ml-6'>
                          <img src={URL} className=' h-4 w-4 inline-block mt-1'/>
                          <span className=' ml-3 font-poppins'>0</span>
                          <p className=' font-poppins'>&nbsp;controller</p>
                        </div> 
                    </div>
                    
                    
                    
               </div>
               <div className='  row-span-3 shadow-[0px_0px_7px_0px_#718096]'>
                  
                  <div className=' ml-6 mt-6'>
                    <h1 className=' font-bold font-poppins text-xl'>Memebers</h1>
                    <div className=' mt-3 text-lg flex justify-between'>
                      
                      <div className=' inline-block'>
                        <img src={Members} className=' h-4 w-4 inline-block mb-1'/>
                        <span className=' ml-2'>
                          10
                        </span>
                        <p className=' inline-block ml-2'>Members</p>
                      </div>
                      <button className=' inline-block'>
                         <img src={Add} className=' h-4 w-4 inline-block mb-1 mr-6'/>
                      </button>                      
                    </div>
                    <div className=' font-poppins'>
                      <div className=' mt-7'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                        <div className=' inline-block'>
                          <img src={Profile} className=' h-9 w-9 inline-block  mr-6'/>
                        </div>
                        
                        <h2 className=' inline-block'>Cristiano Ronaldo</h2>
                        
                      </div>
                      <div className=' mt-3'>
                      <button className=' text-gray-600 font-semibold font-poppins' type="submit">See More</button>
                        
                      </div>
                    </div>
                  </div>
               </div>
               
            </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
