import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from "react-hot-toast";
import Navbar from '../Layout/Navbar';

function ProtectedRoute({ children }) {
debugger
    const { isAuthorized, loading } = useSelector((state) => state.auth)
    
  //  if (loading) return <div>Loading...</div>; // or spinner

  // return isAuthorized ? children : <Navigate to="/login" replace />;
  // // return children;
   if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );


}

export default ProtectedRoute