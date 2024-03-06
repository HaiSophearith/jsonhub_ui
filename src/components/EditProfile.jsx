import { useState } from 'react'
import { Tab } from '@headlessui/react'
import penSvg from '../asset/icon/pen-linear.svg'

import Spinners from './Spinners'
import AlertMesages from './AlertMesages'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileImage } from '../redux/slice/EditProfileSlice'
import { useRef } from 'react'
import { Button, Modal } from 'react-daisyui'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import { updateUserInfo } from '../redux/slice/EditUserSlice'
import { edit_profile, edit_username, reset_password } from '../redux/service/UserService'
import { API_HEADER, NotifySucess } from '../redux/Constants'

import { isLocalImage, isLocalImageCover, updateUserInfo } from '../redux/slice/AuthSlice'
import { NotifyError } from '../redux/Constants'

import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import bgCover from '../asset/img/coverImg.jpg'
import { useNavigate, useParams } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function EditProfile(props) {

  const { visible, toggleVisible } = props
  const {username} = useParams()
  const navigate = useNavigate()
  const [passwordEye, setPasswordEye] = useState(false);
  const [passwordEye1, setPasswordEye1] = useState(false);
  const [passwordEye2, setPasswordEye2] = useState(false);

  const [Image, setImage] = useState(false);
  const [ImgCover, setImgCover] = useState(false);

  const [imageCover, setImageCover] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const currentUser = useSelector((state) => state.auth.currentUser);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedCover, setSelectedCover] = useState("");

  const dispatch = useDispatch()

  // console.log(selectedImage.name)

  const isLocalImageStatus = useSelector(
    (state) => state.auth.isLocalImageStatus
  );

  const isLocalImageStatusCover = useSelector(
    (state) => state.auth.isLocalImageStatusCover
  );


  const [userEdit, setUserEdit] = useState({})
  const [userPass, setUserPass] = useState({})
  // console.log("here", userPass)

  // console.log("Current before: ", currentUser)
  // console.log("UserEdit : ", userEdit)

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setUserEdit({
      ...userEdit,
      [name]: value,
    })
  }

  const handleEditUsername = () => {
    setIsLoading(true)

    edit_username(userEdit.userName).then((res) => {
      if (res.status === 200) {
        setIsLoading(false)
        toggleVisible()
      }
    }).catch((e) => {
      setIsLoading(false)
      console.log(e)
    })
  }



  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setSelectedImage(file);

    setUserEdit({
      ...userEdit,
      profileImages: URL.createObjectURL(file)
    })
    setImage(true)
    dispatch(isLocalImage(true))

  }

  const handleImageCoverChange = (e) => {

    const fileCover = e.target.files[0];

    setSelectedCover(fileCover);

    setUserEdit({
      ...userEdit,
      coverImages: URL.createObjectURL(fileCover)
    })
    setImgCover(true)
    dispatch(isLocalImageCover(true))

  };

  // --------------upload image--------------
  const handleEditImageUpload = () => {
    const formData = new FormData();
    formData.append('profileImage', selectedImage);
    formData.append('coverImage', selectedCover);

    setIsLoading(true)

    edit_profile(formData, userEdit.fullName).then((data) => {
      // console.log("response form edit", data.data)
      if (data.status === 200) {
        NotifySucess("Updated successfully.")
        setIsLoading(false)
        toggleVisible()
      }
    })
      .catch((error) => {
        setIsLoading(false)
        console.error(error);
      });
  };

  const handleSave = () => {

    if (userEdit.profileImages && !userEdit.userName && !userEdit.fullName) {
      handleEditImageUpload()

      dispatch(updateUserInfo({
        profileImages: userEdit.profileImages,
        fullName: currentUser.fullName,
        userName: currentUser.userName,
        userEmail: currentUser.userEmail,
        personalProject: currentUser.personalProject,
        groupProject: currentUser.groupProject,
        coverImages: currentUser.coverImages,
        created_at: currentUser.created_at,
      }))
    }
    if (userEdit.coverImages) {
      handleEditImageUpload()

      dispatch(updateUserInfo({
        coverImages: userEdit.coverImages,
        profileImages: currentUser.profileImages,
        fullName: currentUser.fullName,
        userName: currentUser.userName,
        userEmail: currentUser.userEmail,
        personalProject: currentUser.personalProject,
        groupProject: currentUser.groupProject,
        created_at: currentUser.created_at,
      }))
    }
    if (userEdit.fullName && !userEdit.profileImages && !userEdit.userName) {
      handleEditImageUpload()

      dispatch(updateUserInfo({
        profileImages: currentUser.profileImages,
        fullName: userEdit.fullName,
        userName: currentUser.userName,
        userEmail: currentUser.userEmail,
        personalProject: currentUser.personalProject,
        groupProject: currentUser.groupProject,
        coverImages: currentUser.coverImages,
        created_at: currentUser.created_at,
      }))
      NotifySucess("Full name updated successfully")
    }
    if (userEdit.userName && !userEdit.profileImages && !userEdit.fullName) {
      handleEditUsername()

      dispatch(updateUserInfo({
        profileImages: currentUser.profileImages,
        userName: userEdit.userName,
        fullName: currentUser.fullName,
        userEmail: currentUser.userEmail,
        personalProject: currentUser.personalProject,
        groupProject: currentUser.groupProject,
        coverImages: currentUser.coverImages,
        created_at: currentUser.created_at,
      }))
      NotifySucess("Username updated successfully")
    }
    if (userEdit.profileImages && userEdit.fullName && !userEdit.userName) {
      handleEditImageUpload()

      dispatch(updateUserInfo({
        profileImages: userEdit.profileImages,
        fullName: userEdit.fullName,
        userName: currentUser.userName,
        userEmail: currentUser.userEmail,
        personalProject: currentUser.personalProject,
        groupProject: currentUser.groupProject,
        coverImages: currentUser.coverImages,
        created_at: currentUser.created_at,
      }))
      NotifySucess("Profile & fullname updated successfully")
    }
    if (userEdit.profileImages && userEdit.userName && !userEdit.fullName) {
      handleEditImageUpload()
      handleEditUsername()

      dispatch(updateUserInfo({
        profileImages: userEdit.profileImages,
        fullName: currentUser.fullName,
        userName: userEdit.userName,
        userEmail: currentUser.userEmail,
        personalProject: currentUser.personalProject,
        groupProject: currentUser.groupProject,
        coverImages: currentUser.coverImages,
        created_at: currentUser.created_at,
      }))
      NotifySucess("Profile & username updated successfully")
    }
    if (userEdit.fullName && userEdit.userName && !userEdit.profileImages) {
      handleEditUsername()
      handleEditImageUpload()
      dispatch(updateUserInfo({
        profileImages: currentUser.profileImages,
        userName: userEdit.userName,
        fullName: userEdit.fullName,
        userEmail: currentUser.userEmail,
        personalProject: currentUser.personalProject,
        groupProject: currentUser.groupProject,
        coverImages: currentUser.coverImages,
        created_at: currentUser.created_at,
      }))
      NotifySucess("Fullname & username updated successfully")
    }
    if (userEdit.fullName && userEdit.userName && userEdit.profileImages) {
      handleEditUsername()
      handleEditImageUpload()

      dispatch(updateUserInfo({
        profileImages: userEdit.profileImages,
        userName: userEdit.userName,
        fullName: userEdit.fullName,
        userEmail: currentUser.userEmail,
        personalProject: currentUser.personalProject,
        groupProject: currentUser.groupProject,
        coverImages: currentUser.coverImages,
        created_at: currentUser.created_at,
      }))
      NotifySucess("Your info is updated")
    }

    handleClearInput()
    // toggleVisible()
    // setIsLoading(false)
  }

  const handleClearInput = () => {
    setUserEdit({
      ...userEdit,
      userName: '',
      fullName: '',
    })
  }
  const handleClearInputPass = () => {
    setUserPass({
      confirmPassword: '',
      newPassword: '',
      currentUser: ''
    })
  }


  // ====================Change password====================

  const onChangeResetHadler = (e) => {
    const { name, value } = e.target

    setUserPass({
      ...userPass,
      [name]: value,
      email: currentUser.userEmail
    })
  }

  const handleSubmitResetPassword = () => {

    if (userPass.confirmPassword === userPass.newPassword) {
      reset_password(userPass).then((res) => {
        console.log(res)
        if (res.status === 200) {
          NotifySucess("Password changed successfully.")
          // handleClearInputPass()
        }
        // console.log("res form reset : ", res.data.payload)
      }).catch(e => {
        NotifyError("Invalid password.")
      })
    } else {
      NotifyError("Password isn't match.")
    }
  }

  // ------------Cover upload img--------------------//

  return (
    <div className="font-poppins w-full">
      {/* Alert */}
      <AlertMesages />

      <Modal open={visible} className='w-full 12pro:mx-8 p-0 pb-6'>
        <Modal.Body className='px-0 pb-0'>
          <Tab.Group>
            <Tab.List className="flex space-x-1 p-4 shadow-md">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-head',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-purple shadow'
                      : 'text-black'
                  )
                }
              >
                <AssignmentIndOutlinedIcon className='mr-1' />
                Profile
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-head',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-purple shadow'
                      : 'text-black'
                  )
                }
              >
                <SecurityOutlinedIcon className='mr-1' />
                Security
              </Tab>
            </Tab.List>
            <Tab.Panels>
              {/* img profile */}
              <div className={`w-full h-[185px] relative`}>
                {/* Cover */}
                <label for='fileCover' className='absolute bottom-1 right-1'>
                  <input type="file" name="fileCover"
                    onChange={handleImageCoverChange}
                    id='fileCover' className='opacity-0 hidden'
                  />
                  <CreateOutlinedIcon className='bg-purple-head p-1 text-white rounded-full cursor-pointer' sx={{ fontSize: 25 }} />
                </label>

                {isLocalImageStatusCover ? ImgCover ? (
                  <img
                    src={userEdit?.coverImages}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentUser?.coverImages}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : currentUser?.coverImages != null ? (
                  <>
                    {
                      currentUser?.coverImages.startsWith("https://")?(
                        <img
                      src={currentUser?.coverImages}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                      ):(
                        <img
                      src={`http://localhost:8080/api/file-images?fileName=${currentUser?.coverImages}`}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                      )
                    }
                  </>
                ) : (
                  <img
                    src={bgCover}
                    alt="cover"
                    className="w-full h-full object-cover absolute -z-10"
                  />
                )}

                <div className='text-white w-[150px] h-[150px] ring-4 rounded-full bg-black absolute left-1/2 bottom-[-55px] transform -translate-x-1/2'>
                  <div className='w-full h-full relative'>
                    {isLocalImageStatus ? ImgCover ? (
                      <img
                        src={userEdit?.profileImages}
                        alt="profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={currentUser?.profileImages}
                        alt="profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : currentUser?.profileImages != null ? (
                      <>
                        {
                          currentUser?.profileImages.startsWith("https://")?(
                            <img
                          src={currentUser?.profileImages}
                          alt="profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                          ):(
                            <img
                          src={`http://localhost:8080/api/file-images?fileName=${currentUser?.profileImages}`}
                          alt="profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                          )
                        }
                      </>
                    ) : (
                      <div className='w-full h-full rounded-full bg-orange-500 border-4 flex justify-center items-center text-3xl'>{currentUser.userName?.charAt(0)}</div>
                    )}
                    <label for='file' className='absolute bottom-0 right-5'>
                      <input type="file" name="file"
                        id='file' className='opacity-0 hidden'
                        onChange={handleImageChange}
                      />
                      <CreateOutlinedIcon className='bg-purple-head p-1 rounded-full cursor-pointer' sx={{ fontSize: 25 }} />
                    </label>
                  </div>
                </div>
              </div>
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-white',
                  'ring-white ring-opacity-60 ring-offset-2 rounded-lg'
                )}
              >
                {/* Main Content tab1 */}
                <div className='mt-16'>
                  <div className="flex justify-center mt-4">
                    <form>
                      {/* -------------- */}
                      <div className='mx-6 rounded-2xl 12pro:w-[300px] ipad-pro:w-[360px] laptop:w-[390px]'>
                        {/* Field full name */}
                        <div className='my-6 flex justify-between items-center'>
                          {/* <label className='label-text text-base mr-3'>Full name</label> */}
                          <div className='w-full border-[1px] rounded-lg text-purple-head border-purple-head border-spacing-11 py-1'>
                            <PersonOutlineOutlinedIcon className='ml-3' />
                            <input
                              className='bg-transparent border-none text-gray-700 py-1 px-2 focus:ring-0'
                              type='text'
                              onChange={onChangeHandler}
                              name='fullName'
                              placeholder='Enter full name'
                              value={userEdit.fullName}
                            />
                          </div>
                        </div>

                        {/* Field Username */}
                        <div className='my-6 flex justify-between items-center'>
                          {/* <span className='label-text text-base mr-3'>Username</span> */}
                          <div className='w-full border-[1px] rounded-lg text-purple-head border-purple-head border-spacing-11 py-1'>
                            <AccountCircleOutlinedIcon className='ml-3' />
                            <input
                              className='bg-transparent border-none text-gray-700 mr-3 py-1 px-2 focus:ring-0'
                              type='text'
                              onChange={onChangeHandler}
                              name="userName"
                              placeholder='Enter username'
                              value={userEdit.userName}
                            />
                          </div>
                        </div>

                        {/* Field disable */}
                        <div className='my-6 flex justify-between invisible'>
                          <span className='label-text text-base font-sans mt-3'>Email</span>
                          <div className='w-3/4'>
                            <div className='border-2 w-full rounded-lg border-purple-head border-spacing-11 py-1'>
                              <input type="email" id="email"
                                name="email" placeholder='Jsonhub.info@gmail.com'
                                className="bg-transparent border-none text-gray-700 mr-3 py-1 px-2 focus:ring-0" />
                            </div>
                          </div>
                        </div>

                        <div className="w-full flex justify-between items-center">
                          <button
                            type="button"
                            onClick={toggleVisible}
                            className="bg-transparent text-purple-head hover:bg-gray-100 rounded-lg px-6 py-2 border border-purple-head focus:ring-2">
                            Cancel
                          </button>
                          <button
                            type="button"
                            // onClick={handleSubmit}
                            onClick={handleSave}
                            className="bg-newYellow border-none text-dark-head hover:bg-dark-head hover:text-newYellow rounded-lg px-10 py-2 focus:ring-2">
                            {isLoading ? <Spinners /> : "Save"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Tab.Panel>
              {/* ----------------------------------------- */}
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-white',
                  'ring-white ring-opacity-60 ring-offset-2 rounded-lg'
                )}
              >
                {/* Main Content tab2 */}
                <div className='mt-16'>
                  <div className="flex justify-center mt-4">
                    <form>
                      {/* -------------- */}
                      <div className='mx-4 rounded-2xl 12pro:w-[300px] ipad-pro:w-[360px] laptop:w-[390px]'>
                        {/* Field full name */}
                        <div className='my-6 flex items-center justify-between text-purple-head pr-3 w-full rounded-lg border-[1px] border-purple-head border-spacing-11 py-1'>
                          <div>
                            <LockOutlinedIcon className='ml-3' />
                            <input type={passwordEye ? 'text' : 'password'}
                              placeholder='Enter Current Password'
                              name="currentPassword"
                              onChange={onChangeResetHadler}
                              className="bg-transparent border-none text-gray-700 py-1 px-2l focus:ring-0" />
                          </div>
                          <span
                            className='label-text mb-1 text-base text-purple-head cursor-pointer'
                            onClick={() => {
                              setPasswordEye(!passwordEye);
                            }}
                          >
                            <FontAwesomeIcon icon={passwordEye ? faEye : faEyeSlash} />
                          </span>
                        </div>

                        {/* Field Username */}
                        <div className='my-6 flex items-center justify-between text-purple-head  pr-3 w-full rounded-lg border-[1px] border-purple-head border-spacing-11 py-1'>
                          <div>
                            <LockOutlinedIcon className='ml-3' />
                            <input type={passwordEye1 ? 'text' : 'password'}
                              placeholder='Enter new password'
                              name="newPassword"
                              onChange={onChangeResetHadler}
                              className="bg-transparent border-none text-gray-700 py-1 px-2l focus:ring-0" />
                          </div>
                          <span
                            className='label-text mb-1 text-base text-purple-head cursor-pointer'
                            onClick={() => {
                              setPasswordEye1(!passwordEye1);
                            }}
                          >
                            <FontAwesomeIcon icon={passwordEye1 ? faEye : faEyeSlash} />
                          </span>
                        </div>

                        {/* Field confirm password */}
                        <div className='my-6 flex items-center justify-between text-purple-head pr-3 w-full rounded-lg border-[1px] border-purple-head border-spacing-11 py-1'>
                          <div>
                            <LockOpenOutlinedIcon className='ml-3' />
                            <input type={passwordEye2 ? 'text' : 'password'}
                              placeholder='Confirm password'
                              name="confirmPassword"
                              onChange={onChangeResetHadler}
                              className="bg-transparent border-none text-gray-700 py-1 px-2l focus:ring-0" />
                          </div>
                          <span
                            className='label-text mb-1 text-base text-purple-head cursor-pointer'
                            onClick={() => {
                              setPasswordEye2(!passwordEye2);
                            }}
                          >
                            <FontAwesomeIcon icon={passwordEye2 ? faEye : faEyeSlash} />
                          </span>
                        </div>

                        {/* btn cancel & save */}
                        <div className="w-full flex justify-between items-center">
                          <button
                            type="button"
                            onClick={toggleVisible}
                            className="bg-transparent text-purple-head hover:bg-gray-100 rounded-lg px-6 py-2 border border-purple-head focus:ring-2">
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSubmitResetPassword}
                            className="bg-newYellow border-none text-white hover:bg-dark-head hover:text-newYellow rounded-lg px-10 py-2 focus:ring-2">
                            {isLoading ? <Spinners /> : "Save"}
                          </button>
                        </div>
                        {/* --------------- */}

                      </div>
                    </form>
                  </div>
                </div>
              </Tab.Panel>

            </Tab.Panels>
          </Tab.Group>
        </Modal.Body>
      </Modal>
    </div>

  )
}
