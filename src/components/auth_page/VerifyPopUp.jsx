import React, { useState } from 'react'
import { usePinInput } from 'react-pin-input-hook';
import Lock_Icon from '../../asset/icon/Lock_Key.png'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePopUpModel, popUpModel } from '../../redux/slice/AuthSlice';
import { API, BASE_URL, NotifyError, NotifySucess } from '../../redux/Constants';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import AlertMesages from '../AlertMesages';
import ResetPasswordPopUp from './ResetPasswordPopUp';
import Spinners from '../Spinners';
import new1 from "../../asset/img/key1.svg"
import { instance } from '../../redux/service/InstanceHeader';

export default function VerifyPopUp(props) {

    const { isOpen, closeModal, login, email } = props
    // const { resetEmail } = props

    // console.log(email)

    const navigate = useNavigate()
    let [isLoading, setIsLoading] = useState(false)

    const [isOpenReset, setIsOpenReset] = useState(false)
    const [values, setValues] = React.useState(Array(6).fill(''))
    const { fields } = usePinInput({
        values,
        onChange: (values) => {
            setValues(values)
        },
        placeholder: '',
        autoFocus: true
    })

    const [optCode, setOtpCode] = useState()

    const onVerifyHandler = () => {
        setValues(Array(6).fill(''))
        let valuesToInt = parseInt(values.join(''));
        setOtpCode(valuesToInt)
        // console.log("Email : " + email)
        // console.log(resetEmail)

        setIsLoading(true)
        axios.post(`${BASE_URL}/v1/auth/verification?email=${email}&otp=${valuesToInt}`)
            .then((res) => {
                setIsLoading(false)
                console.log("response ", res.status)
                if (res.status) {
                    if (login == 'login') {
                        navigate('/login')
                    }
                    else {
                        closeModal() //close this popUp
                        setIsOpenReset(true) //open resetPassword popUp
                    }
                } else {
                    NotifyError('Invalid Code.')
                }


            }).catch((error) => {
                NotifyError('something wrong.')
                closeModal()
                setIsLoading(false)
                // console.log(error)
            })
    }

    const handleOnResendMail = () => {
        // console.log("Email : " + resetEmail.userEmail)
        instance.post(`/v1/auth/resend-code?email=${email}`)
            .then((res) => {
                console.log("Resend")
                console.log(res)
                NotifySucess('Verify code sent Successfully')
            }).catch((error) => {
                console.log("resend error")
                console.log(error)
                NotifyError("Something wrong.")
                // closeModal()
                // console.log(error)
            })
    }
    function openModalReset() {
        setIsOpenReset(true)
    }
    function closeModalReset() {
        setIsOpenReset(false)
    }

    return (
        <div>
            {/* Message Alert */}
            <AlertMesages />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={isOpenReset} static className="relative z-10" onClose={closeModal}>
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
                                                onClick={closeModal}
                                                className='rounded-full w-7 h-7 bg-dark-head text-sm text-white flex items-center justify-center'>X</button>
                                        </div>

                                        <div>
                                            <div className='flex justify-center'>
                                                <img src={new1} alt="lockey" className='w-24' />
                                            </div>
                                            <h1 className='mt-5 text-center  font-extrabold text-xl text-black font-sans'>VERIFICATION CODE</h1>
                                            <h4 className='text-center my-3 text-sm font-normalfont '>Enter the code from the email we just sent you.</h4>
                                        </div>
                                    </Dialog.Title>
                                    <div className="mt-2">

                                        {/*-------- OTP input ------- */}
                                        <div className='pin-input flex justify-center mt-8'>
                                            {fields.map((propsField, index) => (
                                                <input key={index} className='pin-input__field focus:ring-newYellow focus:border-0 w-9 mx-1.5 h-12 rounded border-dark-head' {...propsField} />
                                            ))}
                                        </div>

                                        <div className='flex flex-col items-center '>
                                            <button type='button'
                                                onClick={onVerifyHandler}
                                                className=" border bg-dark-head hover:text-newYellow rounded-full text-white p-2 mt-8 w-[75%] font-poppins">
                                                {isLoading ? <Spinners /> : 'CONFIRM'}
                                            </button>
                                            <div className='bar-or flex items-center mt-3'>
                                                Do you receive your code?<span onClick={handleOnResendMail} className='cursor-pointer hover:text-newYellow font-semibold link-hover'> Resend code</span>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ResetPasswordPopUp isOpenReset={isOpenReset} closeModalReset={closeModalReset} resetEmail={email} optCode={optCode}/>
        </div>
    )
}
