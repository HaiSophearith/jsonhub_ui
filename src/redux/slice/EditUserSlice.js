import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo : {}
}

export const editUserSlice = createSlice({
    name : 'editUser',
    initialState,
    reducers : {
        updateUserInfo : (state, action) => {
            console.log(action.payload)
            // state.category = state.category.map(item => item.categoryId==action.payload.categoryId?{...item,categoryName:action.payload.categoryName}:item)
            // state.userInfo = state.userInfo.map(item => item)
            state.userInfo = action.payload
        }
    }
})

export const {updateUserInfo} = editUserSlice.actions
export default editUserSlice.reducer