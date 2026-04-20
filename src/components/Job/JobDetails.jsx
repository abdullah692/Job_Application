import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobById } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { MdWork, MdLocationOn, MdAttachMoney, MdDateRange } from "react-icons/md";
import { ClipLoader, DotLoader } from "react-spinners";


import { useDispatch, useSelector } from "react-redux";
const JobDetails = () => {
  const { id } = useParams();
  console.log("id", id);

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  let hasErrorToastShown = false;
  const handleJobs = () => {
    try {
      debugger
      dispatch(getJobById(id))
        .unwrap().then((x) => {
          console.log("jobs", x.job);
          if (x.success == true) {
            setJob(x.job)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          if (!hasErrorToastShown) {
            console.log("errors", error);
            toast.error(error);
            hasErrorToastShown = true; // Prevent further error toasts
          }
        })

    } catch (error) {
      console.log("error", error);
      toast.error(error)
      setIsLoading(false)

      // setHasFetched(true);
      // setIsLoading(false)
    }
  }


  useEffect(() => {
    if (id) handleJobs()
  }, [id]);

  // if (!isAuthorized) {
  //   navigateTo("/login");
  // }

  return (
    <section className="jobs page py-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">


        {/* Heading */}
        {!isLoading  && (
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
            Job Details
          </h1>
        )}

        {
        isLoading ? (
          <div className="absolute inset-0 bg-gray-200/40 flex justify-center items-center z-10">
            <ClipLoader color="#1D2084" size={60} />
          </div>
        ) :  job && job._id ? (
            <div className="bg-white border border-gray-300 rounded-lg p-6 md:p-8 shadow-sm">

              {/* Header */}
              <div className="border-b pb-4 mb-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  {job.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <MdWork />
                    <span>{job.category}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MdLocationOn />
                    <span>{job.city}, {job.country}</span>
                  </div>
                </div>
              </div>

              {/* Info Grid (same vibe as cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">

                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border">
                  <MdLocationOn className="text-blue-900" />
                  <span>
                    <strong>Location:</strong> {job.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border">
                  <MdAttachMoney className="text-blue-900" />
                  <span>
                    <strong>Salary:</strong>{" "}
                    {job.fixedSalary
                      ? job.fixedSalary
                      : `${job.salaryFrom} - ${job.salaryTo}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border sm:col-span-2">
                  <MdDateRange className="text-blue-900" />
                  <span>
                    <strong>Posted:</strong> {new Date(job.jobPostedOn).toLocaleDateString()}
                  </span>
                </div>

              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Job Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Button (same style as cards) */}
              <div className="mt-8">
                <Link
                  to={`/application/${job._id}`}
                  className="inline-block w-full text-center bg-blue-900 text-white py-2 rounded-md text-sm hover:bg-blue-500 transition"
                >
                  Apply Now
                </Link>
              </div>

            </div>
          ) : (
            <div className="text-center mt-20">
              <p className="text-xl text-gray-500">🔍 Job not found</p>
            </div>
          )}

      </div>
    </section>
  );
};

export default JobDetails;
