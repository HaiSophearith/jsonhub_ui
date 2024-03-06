import { createSlice } from '@reduxjs/toolkit'
import profile from '../../asset/img/profile.jpg'

const initialState = {
    editProfile: {Image : profile}
}

export const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.editProfile.Image = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfileImage } = editProfileSlice.actions

export default editProfileSlice.reducer
