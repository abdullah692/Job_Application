import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { ClipLoader, DotLoader } from "react-spinners";
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
            console.log("xjobxs",x);
            
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
 <section className="jobs page py-8 bg-gray-50 min-h-screen">
  <div className="max-w-6xl mx-auto px-4">

    {/* Heading */}
    {!isLoading && jobs.length > 0 && (
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
        Available Jobs
      </h1>
    )}

    {/* Loader */}
    {isLoading ? (
        <div className="absolute inset-0 bg-gray-200/40 flex justify-center items-center z-10">
    <ClipLoader color="#1D2084" size={60} />
  </div>
    ) : jobs.length > 0 ? (

      /* Jobs Grid */
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-gray-300 rounded-lg p-5 hover:shadow-md transition flex flex-col justify-between cursor-pointer"
          >
            {/* Job Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {job.title}
              </h2>
              <p className="text-sm text-gray-600">{job.category}</p>
              <p className="text-sm text-gray-500">{job.country}</p>
            </div>

            {/* Button */}
            <Link
              to={`/job/${job._id}`}
              className="mt-4 inline-block text-center bg-blue-800 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

    ) : (

      /* Empty State */
      <div className="text-center mt-20">
        <p className="text-xl text-gray-700 mb-2">No jobs available</p>
        <p className="text-gray-500 text-sm">Please check back later</p>
      </div>

    )}
  </div>
</section>
  );
};

export default Jobs;
