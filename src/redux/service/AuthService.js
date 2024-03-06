import { wait } from "@testing-library/user-event/dist/utils";
import { API } from "../Constants";
import { instance } from './InstanceHeader';

export const Auth_login = async (values, setIsLoading) => {
    try {
        const response = await API.post(`/v1/auth/login`, values)
        localStorage.setItem('token', response.data.payload.token)
        return response

    } catch (e) {
        // console.log(e)
        setIsLoading(false)
    }
};

export const Forgot_password = async (email) => {
    try{
        const response = await API.post(`/v1/auth/forget-password?email=${email}`)

        return response
    }catch (e) {

    }
}
export const Reset_password = async (resetInfo, optCode) => {
    try{
        // http://localhost:8080/api/v1/auth/reset-password?otpCode=5678
        const response = await API.post(`/v1/auth/reset-password?otpCode=${optCode}`,resetInfo)

        return response
    }
    catch (e){
        console.log(e)
    }
}

export const generateTokenApi = async (values) => {
    try {
        const response = await instance.post(`/v1/auth/login`, values)
        return response
    } catch (e) {
        console.log(e)
    }
};