import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { getAllMemberByProjectIdAPI, remove_member } from '../../redux/service/ProjectService'
import { NotifySucess } from '../../redux/Constants'
import Spinners from '../Spinners'

export default function PopUpForRemoveMember(props) {

const {isOpen, removeMember, projectId, setProjectMember, closeModal} = props
const [isLoading, setIsLoading] = useState(false)

// console.log("mem", removeMember)
// console.log("proID", projectId)

const removeMemberHandler = () => {
    setIsLoading(true)
    remove_member(projectId, removeMember).then((res) => {
        setIsLoading(false)
        if(res.status === 200){
            getAllMemberByProjectIdAPI(projectId).then((response) => {
                setProjectMember(response.data.payload);
              });              
            closeModal()
            NotifySucess("Member removed successfully.")
        }
        // console.log("remove res", res)
    }).catch((e)=> {
        closeModal()
        setIsLoading(false)
        // console.log(e)
    })
}

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" static open={false} className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform font-montserrat overflow-hidden rounded-2xl bg-whitesmoke p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold text-center leading-6 text-gray-900"
                  >
                    Are you sure to remove <span className='text-newYellow'>{removeMember}</span> ?
                  </Dialog.Title>
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-500">
                      This action is final and you will be unable to undo
                    </p>
                  </div>

                  <div className="mt-4 flex justify-evenly font-poppins">
                    <button
                      type="button"
                      className="text-slate-500 btn btn-sm btn-ghost hover:btn-ghost hover:delay-150 capitalize"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="text-red-600 btn btn-sm btn-ghost hover:bg-red-600 hover:text-white hover:delay-150 capitalize"
                      onClick={removeMemberHandler}
                    >
                      {isLoading?<Spinners/>: "Remove"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
