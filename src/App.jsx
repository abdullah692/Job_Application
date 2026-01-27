import React, { useContext, useEffect, useState } from "react";
import "./index.css"
import './App.css'
// import { Context } from "./main";
import {
  Route, Routes
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./slices/authSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  // 🔥 TOKEN CHECK ON APP LOAD
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);



  if (loading) return null;

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* Protected */}
        <Route
          path="/application/:id"
          element={
            <ProtectedRoute>
              <Application />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications/me"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job/post"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job/me"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;


