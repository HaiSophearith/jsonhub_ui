import { API } from "../Constants";
import { instance } from "./InstanceHeader";


const getAllUsername = async () => {
    try {
       const response = await API.get(`/api/list-username`)
        return response

    } catch (e) {
        console.error(e);
    }
};

export {
    getAllUsername
}