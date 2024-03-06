import axios from 'axios'
import { instance } from './InstanceHeader';


const getProjectsApi = async () => {
    try {
        const response = await instance.get(`/all-info-project`)
        return response

    } catch (e) {
        console.error(e);
    }
};
const getProjectsApiKeyApi = async (projectId) => {
    try {
        const response = await instance.get(`/projects/apikey/${projectId}`)
        return response

    } catch (e) {
        console.error(e);
    }
};
const updateProjectsApiKeyApi = async (projectName, newApiKey) => {
    try {
        const response = await instance.put(`/apikey/${projectName}?newApiKey=${newApiKey}`)
        return response

    } catch (e) {
        console.error(e);
    }
};

const getSortedProjectsByNameApi = async () => {
    console.log("How are you?");
    try {
        const response = await instance.get(`/sortByName/myProject`)
        return response

    } catch (e) {
        console.error(e);
    }
};
const getSortedProjectsByDateApi = async () => {
    try {
        const response = await instance.get(`/sortByDate/myProject`)
        return response

    } catch (e) {
        console.error(e);
    }
};
const getSortedGroupProjectsByDateApi = async () => {
    try {
        const response = await instance.get(`/sortByDate/groupProject`)
        return response

    } catch (e) {
        console.error(e);
    }
};
const getSortedGroupProjectsByNameApi = async () => {
    try {
        const response = await instance.get(`/sortByName/groupProject`)
        return response

    } catch (e) {
        console.error(e);
    }
};
const getSortedFavoriteProjectsByNameApi = async () => {
    try {
        const response = await instance.get(`/sortByName/favoriteProject`)
        return response

    } catch (e) {
        console.error(e);
    }
};

const getSortedFavoriteProjectsByDateApi = async () => {
    try {
        const response = await instance.get(`/sortByDate/favoriteProject`)
        return response

    } catch (e) {
        console.error(e);
    }
};

const addOrRemoveProjectToFavoriteAPI = async (projectId) => {
    try {
        await instance.post(`/favourite-projects?projectId=${projectId}`)
        return projectId

    } catch (e) {
        console.error(e);
    }
}



const getAllMemberByProjectIdAPI = async (projectId) => {
    try {
      const response = await instance.get(
        `/list-member?projectId=${projectId}`
      );
      return response;
    } catch (e) {
      console.error(e);
    }
  };
const inviteMemberToProject = async (emailAddUser, projectId, userRole) => {
    try {
        await instance.post(`/invite/${emailAddUser}/${projectId}?roleUser=${userRole.toUpperCase()}`)
    } catch(e) {
        console.log(e)
    }
}
const getAllFavoriteProjectsAPI = async () => {
    try {
      const response = await instance.get(
        `/favorite-project`
      );
      return response;
    } catch (e) {
      console.error(e);
    }
  };

const postProjectApi = async (projectName, isPrivate, authenticationMethod) => {
   
    try {

        if (isPrivate) {
           return await instance.post(
              `/projects?projectName=${projectName}&isPublic=${!isPrivate}&authenticationMethod=${authenticationMethod}`
            );
          } else {
            return  await instance.post(
              `/projects?projectName=${projectName}&isPublic=${!isPrivate}`
            );
          }
        //   console.log("Successfully.");
        // return response;
    } catch (e) {
        console.error(e);
    }
};
const putProjectApi = async (projectId, newProjectName) => {
    console.log(
        "id",projectId
    )
    try {
        const response = await instance.put(`/projects/${projectId}?newProjectName=${newProjectName}`);
        console.log("Response : ",response)
        return response;
    } catch (e) {
        console.error(e);
    }
};
const isPrivateProject = async (projectId, isPrivate, authenticationMethod) => {
    try {
        await instance.put(`/privacy/${projectId}?isPublic=${!isPrivate}&authenticationMethod=${authenticationMethod}`)
    } catch (e) {
        console.log(e)
    }
}
const isPublicProject = async (projectId, isPrivate) => {
    try {
        await instance.put(`/privacy/${projectId}?isPublic=${!isPrivate}`)
    } catch(e) {
        console.log(e)
    }
}
const deleteProjectApi = async (projectName) => {

    try {
        await instance.delete(`/projects/${projectName}`)  

    } catch (e) {
        console.error(e);
    }
}
const infoControllerApi = async (projectId) => {
    try {
        const infoController = await instance.get(`/info-controller/${projectId}`)  
        return infoController;
    } catch (e) {
        console.error(e);
    }
}
const listMemberApi = async (projectId) => {
    try {
        const listMember = await instance.get(`/list-member?projectId=${projectId}`)
        return listMember;
    } catch (e) {
        console.error(e);
    }
}
const inviteMemberApi = async (emailAddUser,projectId,userRole) => {
    try {
        const inviteMember = await instance.post(`/invite/${emailAddUser}/${projectId}?roleUser=${userRole.toUpperCase()}`
          )
        return inviteMember;
    } catch (e) {
        console.error(e);
    }
}
const createControllerApi = async (projectId,newControllerName) => {
    try {
        const createController = await instance.post(`/insert?projectId=${projectId}`,newControllerName)
        return createController;
    } catch (e) {
        console.error(e);
    }
}
const listControllerApi = async (projectId) => {
    try {
        const listController = await instance.get(`/info-controller/${projectId}`)
        return listController;
    } catch (e) {
        console.error(e);
    }
}
// const projectIdApi = async (projectName) => {
//     try {
//         const projectId = await instance.get(`/project-id/${projectName}`)
//         return projectId;
//     } catch (e) {
//         console.error(e);
//     }
// }
const listEndpointApi = async (controllerName,projectId) => {
    try {
        const listEndpoint = await instance.get(`/list-endpoint/${controllerName}/${projectId}`)
        return listEndpoint;
    } catch (e) {
        console.error(e);
    }
}
const deleteEndpointApi = async (cardId) => {
    try {
        console.log("Work or not....")
        const deleteEndpoint = await instance.delete(`/endpoint/${cardId}`)
        return deleteEndpoint;
    } catch (e) {
        console.error(e);
    }
}
const filterMethod = async (projectId,method) => {
    try {
        const filterMethod = await instance.get(`/filter-endpoint/${projectId}?method=${method.toUpperCase()}`)
        return filterMethod;
    } catch (e) {
        console.error(e);
    }
}
const listEndpointOfController = async (projectId,controllerName) => {
    try {
        const listEndpoint = await instance.get(`/list-endpoint/${controllerName}/${projectId}`)
        return listEndpoint;
    } catch (e) {
        console.error(e);
    }
}
const updateEndpoint = async (endpointId,method,getRequestBody) => {
    try {
        const modifyEndpoint = await instance.put(`/update-endpoint/${endpointId}?httpMethod=${method}`,getRequestBody)
        return modifyEndpoint;
    } catch (e) {
        console.error(e);
    }
}


//View as USER
const getProjectAsUser = async (username) => {
    try {
        const getProjectInfoAsUser = await instance.get(`/public/projects/${username}`)
        return getProjectInfoAsUser;
    } catch (e) {
        console.error(e);
    }
}

const getSizePrivateProject = async (username) => {
    try {
        const getPrivateProjectInfoAsUser = await instance.get(`/private/projects/${username}`)
        return getPrivateProjectInfoAsUser;
    } catch (e) {
        console.error(e);
    }
}

const getProjectName = async (projectId) => {
    try {
        const projectName = await instance.get(`/project-name/${projectId}`)
        return projectName;
    } catch (e) {
        console.error(e);
    }
}

const remove_member = async (projectId, username) => {
    try{
        const response = await instance.delete(`/remove-member/${projectId}?username=${username}
        `)
        return response
    }
    catch (e) {
        console.log(e)
    }
}
const removeMemberApi = async (projectId, username) => {
    try{
        const response = await instance.delete(`/remove-member/${projectId}?username=${username}
        `)
        return response
    }
    catch (e) {
        console.log(e)
    }
}
const getApikey = async (projectId) => {
    try{
        const apikey = await instance.get(`/get-apikey/${projectId}`)
        return apikey
    }
    catch (e) {
        console.log(e)
    }
}
const deleteController = async (controllerId) => {
    try{
        const controller = await instance.delete(`/delete/${controllerId}`)
        return controller
    }
    catch (e) {
        console.log(e)
    }
}

const acceptLink = async (userId,projectId) => {
    try{
        const accpet = await instance.post(`/link/${userId}/${projectId}`)
        return accpet
    }
    catch (e) {
        console.log(e)
    }
}




export {
    getProjectsApi,
    removeMemberApi,
    getProjectsApiKeyApi,
    updateProjectsApiKeyApi,
    postProjectApi,
    putProjectApi,
    acceptLink,
    deleteProjectApi,
    getAllMemberByProjectIdAPI,
    getAllFavoriteProjectsAPI,
    addOrRemoveProjectToFavoriteAPI,
    isPrivateProject,
    isPublicProject,
    inviteMemberToProject,
    getSortedFavoriteProjectsByDateApi,
    getSortedFavoriteProjectsByNameApi,
    getSortedGroupProjectsByDateApi,
    getSortedGroupProjectsByNameApi,
    getSortedProjectsByDateApi,
    getSortedProjectsByNameApi,
    infoControllerApi,
    listMemberApi,
    inviteMemberApi,
    getApikey,
    createControllerApi,
    deleteController,
    listControllerApi,
    // projectIdApi,
    listEndpointApi,
    deleteEndpointApi,
    filterMethod,
    listEndpointOfController,
    updateEndpoint,
    getProjectAsUser,
    getProjectName,
    getSizePrivateProject,
    remove_member
}