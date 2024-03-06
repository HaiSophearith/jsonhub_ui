import React, { Fragment } from "react";
import { useState } from "react";
import {
  getAllMemberByProjectIdAPI,
  getProjectsApiKeyApi,
} from "../../redux/service/ProjectService";
import {
  API_HEADER,
  BASE_URL,
  NotifyError,
  NotifyInfo,
  NotifySucess,
} from "../../redux/Constants";
import Spinners from "../Spinners";
import { Dialog, Transition } from "@headlessui/react";

export default function PopUpForInviteMemeber({
  project,
  memberInfo,
  openModal,
  closeModal,
  isOpen,
}) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [projectId, setProjectId] = useState("");
  const [copyTextApiKey, setCopyTextApiKey] = useState("");
  const [emailAddUser, setEmailAddUser] = useState("");
  const [userRole, setUserRole] = useState("viewer");
  const [projectMember, setProjectMember] = useState(null);

  let [isLoading, setIsLoading] = useState(false);

  const getEmailAddUserHandler = (e) => {
    // console.log("Check email: ", e.target.value);
    setEmailAddUser(e.target.value);
  };

  const setUserRoleHandler = (e) => {
    // console.log("user role", e.target.value);
    setUserRole(e.target.value);
  };

  const inviteMemberHandler = () => {
    if (userRole === "") {
      setIsLoading(true);
      API_HEADER.post(
        `${BASE_URL}/invite/${emailAddUser}/${
          project.projectId
        }?roleUser=${userRole.toUpperCase()}`
      )
        .then((info) => {
          setIsLoading(false);
          closeModal();
          NotifySucess("Invited sucessfully.");
        })
        .catch((err) => {
          NotifyError("Already in project.");
          closeModal();
          // console.log("Check err: ", err);
        });
    } else {
      setIsLoading(true);
      API_HEADER.post(
        `${BASE_URL}/invite/${emailAddUser}/${
          project.projectId
        }?roleUser=${userRole.toUpperCase()}`
      )
        .then((info) => {
          // console.log("Check: ", info);
          if (info.status === 200) {
            getAllMemberByProjectIdAPI(project.projectId).then((response) => {
              setProjectMember(response.data.payload);
              memberInfo(response.data.payload);
            });
            setIsLoading(false);
            closeModal();
            NotifySucess("Invited Successfully");
            // console.log("Edit Successfully");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          NotifyError("Already in project.");
          closeModal();
          // console.log("Check err b: ", err);
        });
    }
  };

  //   const handleCardInfo = (dataFromChild) => {
  //       setSelectedCard(dataFromChild);
  //       console.log("Selected card : ", dataFromChild);
  //       setProjectId(dataFromChild.projectId);
  //       getProjectsApiKeyApi(dataFromChild.projectId).then((res) => {
  //         if (res.data?.payload?.apiKey === null) {
  //           setCopyTextApiKey("No ApiKey for public project");
  //         }
  //         setCopyTextApiKey(res.data?.payload?.apiKey);
  //         console.log("ApiKey Response: ", res.data.payload.apiKey);
  //       });
  //     };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          open={false}
          static
          className="relative z-10"
          onClose={closeModal}
        >
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-whitesmoke p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium  leading-6 text-gray-900"
                  >
                    Invite members
                  </Dialog.Title>
                  <h3 className="py-4">
                    You're inviting member to the{" "}
                    <strong className="text-newYellow font-poppins">
                      {project.info?.projectInfo?.projectInfo.projectName.toUpperCase()}
                    </strong>{" "}
                    project.
                  </h3>
                  <label
                    for="default-input"
                    className="block mb-2 py-1  text-gray-900 dark:text-white font-bold text-lg"
                  >
                    Email address
                  </label>
                  {/* Input field */}

                  <input
                    type="email"
                    onChange={getEmailAddUserHandler}
                    id="default-input"
                    className="bg-white border-none text-gray-900 text-sm rounded-lg block w-full p-3 focus:ring-dark-head focus:outlin-none"
                    placeholder="example@gmail.com"
                  />
                  {/* Select Viewer or Editor */}
                  <label className="text-gray-400 text-sm">
                    Select members or type email addresses
                  </label>
                  <div className="relative w-full lg:max-w-sm py-3 ">
                    <label
                      for="message"
                      className="block mb-2 font-poppins text-lg font-bold"
                    >
                      Select a role
                    </label>
                    <select
                      onChange={setUserRoleHandler}
                      className="w-[40%] p-2 text-gray-500 bg-white focus:ring-dark-head border-none hover:cursor-pointer rounded-lg shadow-sm focus:outline-none appearance-none"
                    >
                      <option>Viewer</option>
                      <option>Editor</option>
                    </select>
                  </div>
                  {/* Button */}
                  <div className="modal-action">
                    <div className="flex space-x-6 font-poppins">
                      <label
                        onClick={closeModal}
                        className="text-slate-500 text-lg btn btn-ghost hover:btn-ghost hover:delay-150 capitalize"
                      >
                        Cancel
                      </label>
                      <label
                        onClick={inviteMemberHandler}
                        htmlFor="my-modal-member"
                        className="text-yellow-400 text-lg btn btn-ghost hover:btn-warning hover:delay-150 capitalize"
                      >
                        {isLoading ? <Spinners /> : "Invite"}
                      </label>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
