import { API_HEADER } from "../Constants"

export const get_member_role = async (projectId) => {
    try {
        const response = await API_HEADER.get(`/projects/role/${projectId}`)

        return response
    }
    catch (e) {
        console.log(e)
    }
}