import React from 'react'
import { useState } from 'react';
import {Navigate} from "react-router-dom"
import { NotifyInfo } from '../redux/Constants';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    //  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token'));
     const islogin = useSelector((state) => state.auth.isLogin)
    
     if (!islogin) {
      return <Navigate replace to="/login" />;
    } else {
       return children;
     }
   };
   
   export default ProtectedRoute;