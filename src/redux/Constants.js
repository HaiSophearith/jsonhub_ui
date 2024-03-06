
import axios from "axios"
import { useEffect } from "react";
import { toast } from "react-hot-toast";
export const BASE_URL = `http://localhost:8080/api`
export const token = localStorage.getItem("token");
const currentURI = `http://localhost:3000`;
export const shareLinkURL = `${currentURI}/invitation`;


export const API = axios.create({
    baseURL: `${BASE_URL}`,
})

export const API_HEADER = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        'Authorization': `Bearer ${token}`,
    },
})

export const NotifySucess = (e) => {
    toast.success(e)
};


export const NotifyError = (e) => {
    toast.error(e)
};

export const NotifyInfo = (e) => {
    toast(e, {
        icon: '⚠️',
      });
};