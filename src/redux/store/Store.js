import loginAuth from "../slice/AuthSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slice/AuthSlice";
import ProjectSlice from "../slice/ProjectSlice";
import UserSlice from "../slice/UserSlice";
import EditProfile from "../../components/userprofilecomponents/EditProfile";
import EditProfileSlice from "../slice/EditProfileSlice";



export const store = configureStore({
    reducer : {
        auth : AuthSlice,
        projects: ProjectSlice,
        userInfo: UserSlice,
        editProfile: EditProfileSlice,
        // favorite: FavoriteSlice
    }
})