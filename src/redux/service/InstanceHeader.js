import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8080/api'
})

instance.interceptors.request.use(
    config => {
        var token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
            config.headers['Content-Type'] = 'application/json';
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)