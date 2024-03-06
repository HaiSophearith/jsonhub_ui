import React from 'react'
import ControllerCardPage from '../components/userprofile_components/ControllerCardPage'
import CreateControllerPopUpPage from '../components/userprofile_components/CreateControllerPopUpPage'
import CreateNewEndPointPage from '../components/userprofile_components/CreateNewEndPointPage'
import DeleteProjectPopUpPage from '../components/userprofile_components/DeleteProjectPopUpPage'
import EditProfilePagePopUpPage from '../components/userprofile_components/EditProfilePagePopUpPage'
import FavoriteProfilePage from '../components/userprofile_components/FavoriteProfilePage'
import GroupProjectPage from '../components/userprofile_components/GroupProjectPage'
import MenuProjectPage from '../components/userprofile_components/MenuProjectPage'
import MyProjectProfilePage from '../components/userprofile_components/MyProjectProfilePage'
import ProfileViewProjectPage from '../components/userprofile_components/ProfileViewProjectPage'
import ProfileViewProjectFavoritePage from '../components/userprofile_components/ProfileViewProjectFavoritePage'
import SearchPage from '../components/userprofile_components/SearchPage'
import InviteMemberPopUpPage from '../components/userprofile_components/InviteMemberPopUpPage'
import TokenPopUpPage from '../components/userprofile_components/TokenPopUpPage'
import GenerateTokenPopUpPage from '../components/userprofile_components/GenerateTokenPopUpPage'


export default function ProfileUserComponent() {
  return (
    <div>
      <MenuProjectPage />
      
      {/* <ControllerCardPage /> */}
      {/* <CreateControllerPopUpPage /> */}
      {/* <CreateNewEndPointPage /> */}
      {/* <DeleteProjectPopUpPage /> */}
      {/* <EditProfilePagePopUpPage /> */}
      {/* <FavoriteProfilePage /> */}
      {/* <GroupProjectPage /> */}
      {/* <MyProjectProfilePage /> */}
      {/* <ProfileViewProjectPage /> */}
      {/* <ProfileViewProjectFavoritePage /> */}
      {/* <SearchPage /> */}
      {/* <InviteMemberPopUpPage /> */}
      <TokenPopUpPage />
     


     {/* <GenerateTokenPopUpPage/> */}
      
    </div>

  )
}
