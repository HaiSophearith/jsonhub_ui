import React from 'react'
import CoverAndProfileUserComponent from '../components/userprofilecomponents/CoverAndProfileUserComponent'
import MenuProjects from '../components/MenuProjects'
import ListAllProject from '../components/userprofilecomponents/ListAllProject'

export default function ProfileUserPage() {
  return (
    <div>
      <CoverAndProfileUserComponent />
      <MenuProjects />
      <ListAllProject />
    </div>
  )
}
