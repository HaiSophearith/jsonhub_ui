import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import bgCover from '../../asset/img/coverImg.jpg'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getProjectAsUser } from '../../redux/service/ProjectService';
import { get_user_info } from '../../redux/service/UserService';
import { useParams } from 'react-router-dom';

export default function ViewImg(props) {

  const { isOpen, closeModal, check, disable } = props
  const {username} = useParams()

  const currentUser = useSelector((state) => state.auth.currentUser);

    //Getting User as View
    const [userInformation, setUserInformation] = useState([]);

  //Other user-side
  useEffect(() => {
    get_user_info(username).then((response) => {
      setUserInformation(response.data.payload);
    });
  }, [username]);


  const isLocalImageStatusCover = useSelector(
    (state) => state.auth.isLocalImageStatusCover
  );
  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );

  return (
    <>
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
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className='flex w-full justify-end'>
              <HighlightOffIcon sx={{ fontSize: 35 }} className='text-white mt-2 mr-2' />
            </div>
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
                <Dialog.Panel className="w-full h-full">

                  {
                    check === 'cover' ? (
                        disable?(
                          <div className="flex justify-center items-center">
                          {isLocalImageStatusCover ? (
                            <img
                              src={userInformation?.coverImages}
                              alt="profile"
                              className="w-10/12 h-full object-contain"
                            />
                          ) : userInformation?.coverImages != null ? (
                            <>
                              {
                                userInformation?.coverImages.startsWith('https://')?(
                                  <img
                                src={userInformation?.coverImages}
                                alt="profile"
                                className="w-10/12 h-full object-contain"
                              />
                                ):(
                                  <img
                                src={`http://localhost:8080/api/file-images?fileName=${userInformation?.coverImages}`}
                                alt="profile"
                                className="w-10/12 h-full object-contain"
                              />
                                )
                              }
                            </>
                          ) : (
                            <img
                              src={bgCover}
                              alt="cover"
                              className="w-10/12 h-full object-contain"
                            />
                          )}
                        </div>
                        ):(
                          <div className="flex justify-center items-center">
                          {isLocalImageStatusCover ? (
                            <img
                              src={currentUser?.coverImages}
                              alt="profile"
                              className="w-10/12 h-full object-contain"
                            />
                          ) : currentUser?.coverImages != null ? (
                            <>
                              <img
                                src={`http://localhost:8080/api/file-images?fileName=${currentUser?.coverImages}`}
                                alt="profile"
                                className="w-10/12 h-full object-contain"
                              />
                            </>
                          ) : (
                            <img
                              src={bgCover}
                              alt="cover"
                              className="w-10/12 h-full object-contain"
                            />
                          )}
                        </div>
                        )
                        
                      ) : (
                        <div className="flex justify-center items-center">
                          {
                            disable?(
                              isLocalImageStatus ? (
                                <img
                                  src={userInformation.profileImages}
                                  alt="profile"
                                  className="w-6/12 h-full object-cover"
                                />
                              ) : userInformation?.profileImages != null ? (
                                <>
                                  <img
                                    src={`http://localhost:8080/api/file-images?fileName=${userInformation?.profileImages}`}
                                    alt="profile"
                                    className="w-6/12 h-full object-cover"
                                  />
                                </>
                              ) : (
                                <div className='w-6/12 h-full bg-orange-500 border-4 flex justify-center items-center text-3xl'>{currentUser.userName?.charAt(0)}</div>
                              )
                            ):(
                              isLocalImageStatus ? (
                                <img
                                  src={currentUser.profileImages}
                                  alt="profile"
                                  className="w-6/12 h-full object-cover"
                                />
                              ) : currentUser?.profileImages != null ? (
                                <>
                                  <img
                                    src={`http://localhost:8080/api/file-images?fileName=${currentUser?.profileImages}`}
                                    alt="profile"
                                    className="w-6/12 h-full object-cover"
                                  />
                                </>
                              ) : (
                                <div className='w-6/12 h-full bg-orange-500 border-4 flex justify-center items-center text-3xl'>{currentUser.userName?.charAt(0)}</div>
                              )
                            )
                          }
                        </div>
                      )
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
