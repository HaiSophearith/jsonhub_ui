import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    isLogin : true,
    isLoginWithGoogleStatus: false,
    currentUser: {},
    isLocalImageStatus: false,
    isLocalImageStatusCover: false
}

export const AuthSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        login : (state, action) => {
            state.isLogin = action.payload
        },
        isLoginWithGoogle: (state, action) => {
            state.isLoginWithGoogleStatus = action.payload

        },
        getCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        
        updateUserInfo : (state, action) => {
            // state.category = state.category.map(item => item.categoryId==action.payload.categoryId?{...item,categoryName:action.payload.categoryName}:item)
            // state.userInfo = state.userInfo.map(item => item)
            // const userIndex = state.currentUser.findIndex(user => user.userName === action.payload.userName);
            // state.currentUser[userIndex] = action.payload;
            state.currentUser = action.payload

        },
        isLocalImage: (state, action) => {
            state.isLocalImageStatus = action.payload

        },
        isLocalImageCover: (state, action) => {
            state.isLocalImageStatusCover = action.payload

        }

    }
})

export const {login, isLoginWithGoogle, getCurrentUser, isLocalImage,updateUserInfo, isLocalImageCover} = AuthSlice.actions
export default AuthSlice.reducer