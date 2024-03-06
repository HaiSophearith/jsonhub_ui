import "./App.css";
import ProjectPage from './pages/ProjectPage';
import SearchPage from './pages/SearchPage';
import ControllerPage from './pages/ControllerPages';
import Landing_page from './pages/Landing_page';
import AboutPage from './pages/AboutPage';
import { Route, Routes, useParams } from 'react-router-dom';
import Layout from './pages/Layout';
import DocumentationPage from './pages/DocumentationPage';
import SignInComponent from './components/auth_page/SignInComponent';
import CreateMyFirstProjectPage from "./pages/CreateMyFirstProjectPage";
import RegisterComponent from "./components/auth_page/RegisterComponent";
import ProfileView from './components/userprofilecomponents/ProfileView.jsx';
import ProjectPages from './pages/ProjectPages';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from "./utils/ProtectedRoutes";
import { useEffect } from "react";
import { login } from "./redux/slice/AuthSlice";
import EditProfile from "./components/userprofilecomponents/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import PopupEditProject from "./components/userprofilecomponents/PopupEditProject";
import MyProjectProfileComponent from './components/MyProjectProfileComponent';
import { get_current_user_info, get_user_info } from "./redux/service/UserService";
import CreateNewEndPointPage from "./components/CreateNewEndPointPage";
import PopupAcceptInvComponent from "./components/invitatation_popup/PopupAcceptInvComponent";
import ExpireToken from "./components/ExpireToken";
import { useState } from "react";
import Skelington from "./components/Skelington";
import SkeletonHappy from "./components/SkeletonHappy";

function App() {

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser);
  let [isOpen, setIsOpen] = useState(false)
  const { userId, projectID } = useParams();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(login(!!token));

    get_current_user_info().then((res) => {
      if (res === 401) {
        dispatch(login(false));
      }
      if (!!token && res === 401) {
        openModal();
        dispatch(login(false));
      }
    });
  }, [userId, projectID]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Landing_page />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/documentation' element={<DocumentationPage />} />
          <Route path='/manage-project' element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route path='/project/:projectId' element={<ProtectedRoute><ProjectPages /></ProtectedRoute>} />
          <Route path='/my-project' element={<ProtectedRoute><MyProjectProfileComponent /></ProtectedRoute>} />
          <Route path='/create-project' element={<ProtectedRoute><CreateMyFirstProjectPage /></ProtectedRoute>} />
          <Route path='/createEndpoint' element={<CreateNewEndPointPage/>} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path="/profile/:username" element={<ProfileView/>} />
          <Route path='/createEndpoint' element={<CreateNewEndPointPage/>} />

          {/* profile */}
          <Route path="/editProfile" element={<EditProfile/>} />
          <Route path="/popupEditProject" element={<PopupEditProject/>} />
          <Route path="/ok" element={<SkeletonHappy/>} />
       

          
       
          
          {/* <Route path="/edit-profile" element={<EditProfile />}/>

          <Route path='/profile' element={<ProfileView />} /> */}
          {/* <Route path='/groupProject' element={<GroupProjectComponent />} /> */}

        </Route>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path='/login' element={<SignInComponent />} />
        <Route path='/register' element={<RegisterComponent />} />
        <Route path='/expire' element={<ExpireToken />}/>
        <Route path="/invitation/:userID/:projectID" element={<PopupAcceptInvComponent/>} />
        {/* <Route path="/invitation" element={<PopupAcceptInvComponent/>} /> */}

      </Routes>
      <ExpireToken openModal={openModal} closeModal={closeModal} isOpen={isOpen}/>
    </>

  );
}

export default App;