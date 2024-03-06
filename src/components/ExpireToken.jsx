import React, { useState } from "react";
import warning from "../asset/icon/warn.svg";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { login } from "../redux/slice/AuthSlice";
import { useDispatch } from "react-redux";

export default function ExpireToken(props) {
  const {openModal, closeModal, isOpen} = props
  const navigate = useNavigate();
  const loginCom = () => {
    localStorage.removeItem('token')
    closeModal()
    navigate("/login");
  }

  const cancelCom = () => {
    localStorage.removeItem('token')
    closeModal()
    navigate("/");
  }

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl font-montserrat bg-whitesmoke p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-center text-gray-900"
                  >
                    Login session expired
                  </Dialog.Title>
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-500">
                      Your account have been expired
                      please login again.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-evenly font-poppins">
                    <button
                      type="button"
                      className="text-dark-head focus:outline-none hover:bg-dark-head bg-newYellow btn btn-sm btn-ghost hover:text-newYellow hover:delay-150"
                      onClick={loginCom}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={cancelCom}
                      className="text-dark-head focus:outline-none hover:bg-dark-head bg-newYellow btn btn-sm btn-ghost hover:text-newYellow hover:delay-150"
                    > 
                      Home
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
