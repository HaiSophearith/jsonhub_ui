import { API, API_HEADER } from "../Constants";
import { instance } from "./InstanceHeader";


export const get_current_user_info = async () => {
    try {
        const response = await instance.get(`/v1/user-info`)
        return response

    } catch (e) {
        return e.response.status
    }
};

export const get_user_info = async (username) => {
    try {
        const response = await instance.get(`/v1/user-detail/${username}`)
        return response

    } catch (e) {
        return e.response.status
    }
};

export const edit_username = async (userName) => {
    try {
        const response = await instance.put(`/username?username=${userName}`)
        return response
    }
    catch (e) {
        console.log(e)
    }
}

export const edit_profile = async (formData, fullName) => {
    try {

        const endpoint = fullName
            ? `http://localhost:8080/api/v1/info-update?fullName=${fullName}`
            : 'http://localhost:8080/api/v1/info-update';

        const responses = await API_HEADER.put(endpoint, formData)

        return responses
    }
    catch (e) {
        console.log(e)
    }
}

export const reset_password = async (userPass) => {
    const response = await API_HEADER.post(`v1/auth/change-password`, userPass)
    return response
}


export const getUsername = async (userId) => {
    const reponseUsername = await API_HEADER.get(`/v1/username/${userId}`)
    return reponseUsername
}

export const userId = async (username) => {
    const getUserId = await API_HEADER.get(`/v1/user-id/${username}`)
    return getUserId
}

