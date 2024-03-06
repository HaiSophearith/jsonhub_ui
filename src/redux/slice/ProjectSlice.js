import {
  configureStore,
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  useEffect,
  useState
} from "react";
import profile from "../../asset/img/profile.jpg";
import {
  instance
} from "../service/InstanceHeader";
import { json } from "react-router-dom";




const initialState = {
  members: [],
  projects: [],
  allProjects: [],
  listEndpoints:[],
  favoriteProjects: [],
  groupProjects: [],
  sortedProjectByName: [],
  sortedProjectByDate: [],
  sortedGroupProjectByName: [],
  sortedGroupProjectByDate: [],
  sortedFavoriteProjectByName: [],
  sortedFavoriteProjectByDate: [],
  projectInfoAsUser: [],
  privateProjectInfoAsUser: [],
  
}

export const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    getProjects: (state, action) => {
      state.projects = action.payload
    },
    getFavoriteProjects: (state, action) => {
      state.favoriteProjects = action.payload
    },
    addOrRemoveProjectToFavorite: (state, action) => {
      const projectIdToAddOrRemove = action.payload;
      console.log("projectIdToAddOrRemove: ", projectIdToAddOrRemove);
      const index = state.favoriteProjects.findIndex(item => item.projectId === projectIdToAddOrRemove);
      console.log("favoriteProjects : ", state.favoriteProjects);
      console.log("index: ", index);
      if (index != -1) {
        state.projects = state.projects.filter(item => item.projectId !== projectIdToAddOrRemove)
      } else{
        
        console.log("projectIdToAddOrRemove not include: ", projectIdToAddOrRemove);
      }
    },
    getGroupProjects: (state, action) => {
      state.groupProjects = action.payload
    },
    getSortedProjectsByName: (state, action) => {
      state.projects = []
      state.projects = action.payload
      state.sortedProjectByName = action.payload
    },

    getSortedProjectsByDate: (state, action) => {
      state.projects = []
      state.projects = action.payload
      // state.sortedProjectByDate = action.payload
    },
    getSortedGroupProjectsByName: (state, action) => {
      state.groupProjects = []
      state.groupProjects = action.payload
    },

    getSortedGroupProjectsByDate: (state, action) => {
      state.groupProjects = []
      state.groupProjects = action.payload
    },
    getSortedFavoriteProjectsByName: (state, action) => {
      state.favoriteProjects = []
      state.favoriteProjects = action.payload
      // state.sortedFavoriteProjectByName = action.payload
    },

    getSortedFavoriteProjectsByDate: (state, action) => {
      state.favoriteProjects = []
      state.favoriteProjects = action.payload
      // state.sortedFavoriteProjectByDate = action.payload
    },


    addProject: (state, action) => {
      state.projects.unshift(action.payload);
      console.log("add: ", state.projects);
    },
    
    deleteProject: (state, action) => {
      const {
        deleteId
      } = action.payload;
      state.projects = state.projects.filter(item => item.projectId !== deleteId)
    },
    deleteGroupProject: (state, action) => {
      const {
        deleteId
      } = action.payload;
      state.groupProjects = state.groupProjects.filter(item => item.projectId !== deleteId)
    },
    deleteFavoriteProject: (state, action) => {
      const {
        deleteId
      } = action.payload;
      state.favoriteProjects = state.favoriteProjects.filter(item => item.projectId !== deleteId)
    },
    updateProject: (state, action) => {
      const {
        projectId,
        newProjectName
      } = action.payload;

      const index = state.projects.findIndex(item => item.projectId === projectId);
      console.log("Index ", index);
      state.projects[index].info.projectInfo.projectInfo.projectName = newProjectName;
    },
    updateGroupProject: (state, action) => {
      const {
        projectId,
        newProjectName
      } = action.payload;

      const index = state.groupProjects.findIndex(item => item.projectId === projectId);
      console.log("updateGroupProject Index ", index);
      state.groupProjects[index].info.projectInfo.projectInfo.projectName = newProjectName;
    },
    updateFavoriteProject: (state, action) => {
      const {
        projectId,
        newProjectName
      } = action.payload;

      const index = state.favoriteProjects.findIndex(item => item.projectId === projectId);
      console.log("updateFavoriteProject Index ", index);
      state.favoriteProjects[index].info.projectInfo.projectInfo.projectName = newProjectName;
    },
    getInfoControllerOfProject: (state, action) => {
      console.log("payload from slice",action)
      state.projects=action.payload
    },
    listMember: (state, action) => {
      state.listMemberr = action.payload
    },
    endpointOfControllerName: (state, action) => {
      state.endpointOfControllerName = action.payload
    },
    listEndpoint: (state, action) => {
      state.listEndpoints = action.payload
    },
    endpointByController: (state, action) => {
      state.endpointsByController = action.payload
    },
    updateNewEndpoint: (state, action) => {
      const {
        endpointId,
        getRequestBody
      } = action.payload;
      const index = state.listEndpoints.findIndex(item => item.endpointId === endpointId);
      state.listEndpoints[index] = {
        ...state.listEndpoints[index],
        requestBody: JSON.parse(getRequestBody),
        responseBody: JSON.parse(getRequestBody),
      };
    },

    //User view side
    projectInfoAsUser: (state, action) => {
      state.projectInfoAsUser = action.payload
    },
    privateProjectInfoAsUser: (state, action) => {
      state.privateProjectInfoAsUser = action.payload
    },
    
  },
}); 

// export const {reducers} = counterSlice.actions;
export const {
  getProjects,
  addProject,
  deleteProject,
  deleteFavoriteProject,
  deleteGroupProject,
  updateProject,
  updateGroupProject,
  updateFavoriteProject,
  getFavoriteProjects,
  getGroupProjects,
  addOrRemoveProjectToFavorite,
  getInfoControllerOfProject,
  listMember,
  endpointOfControllerName,
  listEndpoint,
  endpointByController,
  updateNewEndpoint,
  getSortedProjectsByName,
  getSortedProjectsByDate,
  getSortedGroupProjectsByName,
  getSortedGroupProjectsByDate,
  getSortedFavoriteProjectsByName,
  getSortedFavoriteProjectsByDate,
  privateProjectInfoAsUser
} = ProjectSlice.actions;
export default ProjectSlice.reducer;