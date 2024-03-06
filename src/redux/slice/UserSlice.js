import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allUses: [],
    userInfo : {}
}

export const UserSlice = createSlice({
    name : 'userInfo',
    initialState,
    reducers : {
        getUserInfo : (state, action) => {
            console.log(action.payload)
            state.userInfo = action.payload
        },
        getAllUser: (state, action) => {
            state.allUses = action.payload
        }
    }
})
export const {getUserInfo, getAllUser} = UserSlice.actions
export default UserSlice.reducer