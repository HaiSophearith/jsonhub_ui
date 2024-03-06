import React, { useEffect, useRef, useState } from 'react'
import team from "../../asset/img/teamUp.svg"
import { useNavigate, useParams } from 'react-router-dom';
import { acceptLink, getProjectName } from '../../redux/service/ProjectService';
import { getUsername, get_current_user_info, userId } from '../../redux/service/UserService';
import { NotifyError, NotifyInfo, NotifySucess } from '../../redux/Constants';
import { useSelector } from 'react-redux';

export default function PopupAcceptInvComponent() {

  const {userID,projectID} = useParams();
  const checkboxRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projectName, setProjectName] = useState(true);
  const [username,setUsername] = useState('')
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [storeUsername,setStoreUsername] = useState('')

  useEffect(()=>{
    get_current_user_info().then((response)=>{
      setStoreUsername(response.data.payload.userName)
    })
  },[])

  if(token === undefined || token === null){
    NotifyInfo("Please login and back to join.")
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  }

  useEffect(()=>{
    getProjectName(projectID).then((response)=>{
      setProjectName(response.data.payload)
    }).catch(()=>{
      navigate('/')
    })
    getUsername(userID).then((response)=>{
      setUsername(response.data.payload)
    }).catch(()=>{
      navigate('/')
    })
  },[])

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkboxElement = checkboxRef.current;
      if (checkboxElement) {
        checkboxElement.checked = true;
        setIsLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const accept = () =>{
    userId(storeUsername).then((response)=>{
      let userId = response.data.payload;
      acceptLink(userId,projectID).then(()=>{
      NotifySucess("Project joined successfully.")
      setTimeout(() => {
        navigate(`/project/${projectID}`);
      }, 5000);
    }).catch(()=>{
      NotifyError("Failed to joined.")
      navigate(`/`);
    })
    })
    
  }

  const goToLanding = () =>{
    navigate('/')
  }
  return (
    <div className="flex flex-row justify-between items-center">
      <input
        ref={checkboxRef}
        type="checkbox"
        id="my-modal-1"
        className="modal-toggle"
      />

      {isLoading ? (
        <div class="centered-div">
            <div class="spinner"></div>
        </div>
      ) : (
        checkboxRef.current && (
          <div className="modal">
            <div className="modal-box w-[420px] relative">
              <label
                htmlFor="my-modal-1"
                onClick={goToLanding}
                className="btn btn-sm btn-circle bg-dark-head hover:bg-dark-head hover:text-newYellow absolute right-2 top-2"
              >
                ✕
              </label>
              <div className="flex justify-center">
                <img
                  src={team}
                  className="w-[70%] h-[90%]"
                  alt="team"
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="font-bold font-poppins text-dark-head text-lg">
                  {username} 🥰 <span className="text-md">invited you to join</span>
                </div>
                <div className="text-xl font-poppins font-bold text-dark-head">
                  {projectName}
                </div>
                <div className="text-md font-semibold mb-4 font-poppins">
                  Would you like to collaborate with us?
                </div>
                <button
                 onClick={accept}
                 className="bg-dark-head font-poppins rounded-lg hover:text-yellow-200 px-20 text-white py-1.5">
                  Accept invite
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}
