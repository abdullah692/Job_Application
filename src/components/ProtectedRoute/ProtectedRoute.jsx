import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {

    const { isAuthorized, loading } = useSelector((state) => state.auth)
    const location = useLocation();
    console.log("isAuth", isAuthorized);
    console.log("loading", loading);

    if (loading) return null;

    if (!isAuthorized) {
        toast.error("Login first to access  this page")
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children


}

export default ProtectedRoute