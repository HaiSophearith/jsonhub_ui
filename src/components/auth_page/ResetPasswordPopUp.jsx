import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import new2 from "../../asset/img/key2.svg"
import Lock_Icon from '../../asset/icon/Lock_Key.png'
import { BASE_URL, NotifyError, NotifySucess } from '../../redux/Constants';
import axios from 'axios';
import Spinners from '../Spinners';
import AlertMesages from '../AlertMesages';
import { Reset_password } from '../../redux/service/AuthService';


export default function ResetPasswordPopUp(props) {
    const { isOpenReset, closeModalReset, resetEmail, optCode} = props


    let [isLoading, setIsLoading] = useState(false)

    const [passwordEye, setPasswordEye] = useState(false)
    // const [passwordEye2, setPasswordEye2] = useState(false);

    const [resetInfo, setresetInfo] = useState({email : ''})

    const [confirmPassword, setConfirmPassword] = useState()

    const OnChangeHandleConfirm = (e) => {
        let cPassword = e.target.value
        setConfirmPassword({
            ...confirmPassword,
            cPassword
        })
    }


    const OnChangeHandle = (e) => {
        let newPassword = e.target.value
        setresetInfo({
            ...resetInfo,
            newPassword,
            email : resetEmail
        })
    }

    function handleConfirm() {
        
        setIsLoading(true)
        if (resetInfo.newPassword === confirmPassword.cPassword) {
            Reset_password(resetInfo, optCode).then((res) => {
                setIsLoading(false)
                if(res.status === 200){
                    closeModalReset()
                    NotifySucess('Password changed successfully.')
                }
            })
                .catch((error) => {
                    console.log(error)
                    NotifyError("Password isn't strong.")
                    setIsLoading(false)
                })
        } else {
            NotifyError("Passoword isn't match")
            setIsLoading(false)
        }
    }

    return (
        <div>
            {/* Alert mesage */}
            <AlertMesages />
            <Transition appear show={isOpenReset} as={Fragment}>
                <Dialog as="div" className="relative z-10" open={false} static onClose={closeModalReset}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 pt-4 pb-8 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <div className='flex justify-end'>
                                            <button
                                                onClick={closeModalReset}
                                                className='rounded-full w-7 h-7 bg-dark-head text-sm text-white flex items-center justify-center'>X</button>
                                        </div>

                                        <div>
                                            <div className='flex justify-center'>
                                                <img src={new2} alt="lockey" className='w-24' />
                                            </div>
                                            <h1 className='mt-5 text-center  font-extrabold text-xl text-black font-sans'>VERIFICATION CODE</h1>
                                            <h4 className='text-center my-3 text-sm font-normalfont '>Enter the code from the email we just sent you.</h4>
                                        </div>
                                    </Dialog.Title>
                                    <div className="mt-2">

                                        {/* Field password */}
                                        <div className='mt-8 flex justify-center'>
                                            <div className='flex items-center w-[70%] border-b-2 border-purple-head border-spacing-11 py-1'>
                                                {/* <img className="w-5" src={icon3} alt="icon-p" /> */}
                                                <input
                                                    className='bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2'
                                                    type={passwordEye ? 'text' : 'password'}
                                                    name='newPassword'
                                                    onChange={OnChangeHandle}
                                                    placeholder='Enter new password'
                                                />
                                                <span
                                                    className='label-text mb-1 text-base cursor-pointer'
                                                    onClick={() => {
                                                        setPasswordEye(!passwordEye);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={passwordEye ? faEye : faEyeSlash} />
                                                </span>
                                            </div>
                                        </div>

                                        <div className='mt-4 flex justify-center'>
                                            <div className='flex items-center w-[70%] border-b-2 border-purple-head border-spacing-11 py-1'>
                                                {/* <img className="w-5" src={icon3} alt="icon-p" /> */}
                                                <input
                                                    className='bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2'
                                                    type={passwordEye ? 'text' : 'password'}
                                                    name='confirmPassword'
                                                    onChange={OnChangeHandleConfirm}
                                                    placeholder='Confirm new password'
                                                />
                                                <span
                                                    className='label-text mb-1 text-base cursor-pointer'
                                                    onClick={() => {
                                                        setPasswordEye(!passwordEye);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={passwordEye ? faEye : faEyeSlash} />
                                                </span>
                                            </div>
                                        </div>

                                        <div className='flex justify-center'>
                                            <button type='button'
                                                onClick={handleConfirm}
                                                className=" border bg-dark-head hover:text-newYellow rounded-full text-white p-2 mt-8 w-[75%] font-poppins">
                                                {isLoading ? <Spinners /> : 'CONFIRM'}
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
