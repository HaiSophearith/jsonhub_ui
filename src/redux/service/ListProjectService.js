import axios from 'axios'
import { instance } from './InstanceHeader';
import { API_HEADER, BASE_URL } from '../Constants';


 export const postProfileImage = async () => {
    try{
        const response = await instance.post(`/upload-images`, Image)
        return response
    } catch (error) {
        return Error
    }
 };
//  list my project
export const getListProjectsApi = async () => {
    try {
        const response = await instance.get(`/all-info-project`)
        return response

    } catch (e) {
        console.error(e);
    }
};
//  list group project
 export const getListGroupProjectsApi = async () => {
    try{
        const response = await instance.get(`/group-projects`)
        return response
    } catch (error) {
        return Error
    }
 };
//  list favorite projects
 export const getFavoriteProjectsApi = async () => {
    try{
        const response = await instance.get(`/favorite-project`)
        return response
    } catch (error) {
        return Error
    }
 };

// post list my project
export const postStarMyProjectsApi = async (projectId) => {
    try{
        const response = await instance.post(`/favourite-projects?projectId=${projectId}`)
        return response
    } catch (error) {
        return Error
    }
 };

// get favorite project
export const getFavoriteProjectApi = async () => {
    try{
        const response = await instance.get(`/favorite-project`)
        return response
    } catch (error) {
        return Error
    }
 };

// get Group project
export const getGroupProjectApi = async () => {
    try{
        const response = await instance.get(`/group-projects`)
        return response
    } catch (error) {
        return Error
    }
 };