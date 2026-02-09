import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
debugger
    const { isAuthorized, loading } = useSelector((state) => state.auth)
    
    // if (loading) return null;
     if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;


}

export default ProtectedRoute