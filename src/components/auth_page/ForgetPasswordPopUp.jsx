import { Dialog, Transition } from '@headlessui/react'
import { usePinInput } from 'react-pin-input-hook';
import Lock_Icon from '../../asset/icon/Lock_Key.png'
import React, { useState } from 'react'
import { Fragment } from 'react';
import new3 from "../../asset/img/key3.svg"
import user_icon from '../../asset/icon/user-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { closePopUpModel } from '../../redux/slice/AuthSlice';
import ResetPasswordPopUp from './ResetPasswordPopUp';
import VerifyPopUp from './VerifyPopUp';
import axios from 'axios';
import { BASE_URL, NotifyError } from '../../redux/Constants';
import Spinners from '../Spinners';
import { ToastContainer, toast } from 'react-toastify';
import AlertMesages from '../AlertMesages';
import { Forgot_password } from '../../redux/service/AuthService';

export default function ForgetPasswordPopUp(props) {
    const { isOpenMail, closeModalMail } = props
    const [email, setEmail] = useState('')
    const [msg, setMgs] = useState('')
    let [isLoading, setIsLoading] = useState(false)

    const [values, setValues] = React.useState(Array(6).fill(''))
    const { fields } = usePinInput({
        values,
        onChange: (values) => {
            setValues(values)
        },
        placeholder: '',
        autoFocus: true
    })

    const HandleOnChangeEmial = (e) => {
        setEmail(
            e.target.value
        )
    }

    let [isOpen, setIsOpen] = useState(false)

    function handlePopUpClick() {
        setIsLoading(true)

        Forgot_password(email).then((res) => {
            if (res.data) {
                closeModalMail(false)
                setIsOpen(true)
                setIsLoading(false)
            }
            else {
                NotifyError('No account found.')
                setIsLoading(false)
            }
        })
            .catch((error) => {
                setIsLoading(false)
                NotifyError('Something wrong.')
                // console.log(error.response.data.error)
            })
    }

    function closeModal() {
        setIsOpen(false)
    }


    return (
        <div>
            {/* Alert mesage */}
            <AlertMesages />
            <Transition appear show={isOpenMail} as={Fragment}>
                <Dialog as="div" open={isOpen} className="relative z-10" static onClose={closeModalMail}>
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
                                                onClick={closeModalMail}
                                                className='rounded-full w-7 h-7 bg-dark-head text-sm text-white flex items-center justify-center'>X</button>
                                        </div>

                                        <div className='px-8'>
                                            <div className='flex justify-center'>
                                                <img src={new3} alt="lockey" className='w-24' />
                                            </div>
                                            <h1 className='mt-5 text-center  font-extrabold text-xl text-black font-sans'>Enter the email address associated with your account.</h1>
                                            <h4 className='text-center my-3 text-sm font-normalfont '>We will send you a verification code for reset new password.</h4>
                                        </div>
                                    </Dialog.Title>
                                    <div className="mt-2">

                                        {/* Field Email */}
                                        <div className='mt-8 flex justify-center'>
                                            <div className='flex items-center w-[70%] border-b-2 border-purple-head border-spacing-11'>
                                                <img src={user_icon} className='pb-2 w-5 mt-1' alt='login_img' />
                                                <input
                                                    className='bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:outline-none'
                                                    type='email'
                                                    name='email'
                                                    onChange={HandleOnChangeEmial}
                                                    placeholder='Jsonhub.info@gmail.com'
                                                />
                                            </div>
                                        </div>

                                        <div className='flex justify-center'>
                                            <button type='button'
                                                onClick={handlePopUpClick}
                                                className=" border bg-dark-head hover:text-newYellow rounded-full text-white p-2 mt-8 w-[75%] font-poppins">
                                                {isLoading ? <Spinners /> : 'SEND'}
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <VerifyPopUp isOpen={isOpen} closeModal={closeModal} email={email} />
            {/* <ResetPasswordPopUp isOpenReset={isOpenReset} closeModalReset={closeModalReset} /> */}
        </div>
    )
}
