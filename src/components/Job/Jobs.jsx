import React, { useContext, useEffect, useState,useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { DotLoader } from "react-spinners";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  let hasErrorToastShown = false;
  const handleJobs = () => {
    
    try {
      dispatch(getAllJobs())
        .unwrap().then((x) => {
          if (x.message == "All Jobs fetched successfully!!") {
            setJobs(x.jobs)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          if (!hasErrorToastShown) {
            toast.error(error);
            hasErrorToastShown = true; // Prevent further error toasts
          }
        })
       
    } catch (error) {
      console.log("error", error);
      toast.error(error)
      // setHasFetched(true);
      setIsLoading(false)
    }
  }


  useEffect(() => {
    handleJobs()
  }, []);


  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>

        {isLoading ? (
          <div className="flex items-center justify-center m-20 h-20 w-20">
            <DotLoader color={'darkblue'}
              loading={isLoading}
              size={50}
              aria-label="Loading Spinner"
            // data-testid="loader" 

            />

          </div>
        ) : (
          <div className="banner">
            {jobs &&
              jobs.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p>{element.title}</p>
                    <p>{element.category}</p>
                    <p>{element.country}</p>
                    <Link to={`/job/${element._id}`}>Job Details</Link>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
