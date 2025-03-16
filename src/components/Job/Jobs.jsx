import React, { useContext, useEffect, useState, useRef } from "react";
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
    // <section className="jobs page">
    //   <div className="container">
    //     <h1>ALL AVAILABLE JOBS</h1>

    //     {isLoading ? (
    //       <div className="flex items-center justify-center m-20 h-20 w-20">
    //         <DotLoader color={'darkblue'}
    //           loading={isLoading}
    //           size={50}
    //           aria-label="Loading Spinner"
    //         // data-testid="loader" 

    //         />

    //       </div>
    //     ) : (
    //       <div className="banner">
    //         {jobs &&
    //           jobs.map((element) => {
    //             return (
    //               <div className="card" key={element._id}>
    //                 <p>{element.title}</p>
    //                 <p>{element.category}</p>
    //                 <p>{element.country}</p>
    //                 <Link to={`/job/${element._id}`}>Job Details</Link>
    //               </div>
    //             );
    //           })}
    //       </div>
    //     )}
    //   </div>
    // </section>
    <section className="jobs page py-6 bg-gray-100 min-h-screen">
      {/* <div className=" mx-auto px-4">
    {!isLoading && jobs.length > 0 && (
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        All Available Jobs
      </h1>
    )} */}

      <div className="container mx-auto px-4">
        {!isLoading && jobs.length > 0 && (
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            All Available Jobs
          </h1>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-52 w-full">
            <DotLoader color="#1D2084" loading={isLoading} size={60} />
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-10">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white shadow-md rounded-lg p-8 md:p-10 hover:shadow-lg transition w-full h-52 flex flex-col justify-between"
              >
                <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
                <p className="text-gray-600">{job.category}</p>
                <p className="text-gray-500">{job.country}</p>
                <Link
                  to={`/job/${job._id}`}
                  className="mt-3 bg-blue-900 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-[26px] text-gray-600">🚀 No jobs available at the moment.</p>
            <p className="text-gray-500">Please check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
