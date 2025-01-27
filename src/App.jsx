import React, { useContext, useEffect, useState } from "react";
import "./index.css"
import './App.css'
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { useDispatch,useSelector } from "react-redux";
import { getCurrentUser } from "./slices/authSlice";


const App = () => {
  const dispatch=useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  console.log("isAuthorized",isAuthorized);
  
  // const [isAuthorized,setIsAuthorized]=useState(false)
  // const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:4000/api/v1/user/getuser",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setUser(response.data.user);
  //       setIsAuthorized(true);
  //     } catch (error) {
  //       setIsAuthorized(false);
  //     }
  //   };
  //   fetchUser();
  // }, [isAuthorized]);

  // const fetchUser=()=>{
  //   try {
  //     debugger
  //     dispatch(getCurrentUser())
  //       .unwrap().then((x) => {
  //         if (x.success == true) {
  //           dispatch(checkUser({ 
  //             isAuthorized: true, 
  //             user: x.user // Assuming `user` is part of the response
  //           }));
  //         }
  //       })
  //       .catch((error) => {
  //       console.log("error",error);
        
  //       })
       

  //   } catch (error) {
  //     console.log("error",error);
      
  //   }
  // }


  // useEffect(()=>{
  //   fetchUser();
  // },[isAuthorized])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
