import React, { useContext, useEffect, useState, useRef } from "react";

import ConfirmDialog from "../DialogBox/DialogBox";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useSelector, useDispatch } from "react-redux";
import { getEmployerJobs, deleteJobByJobId } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { TbCategory, TbWorld } from "react-icons/tb";
import { GoOrganization } from "react-icons/go";
import { MdDelete } from "react-icons/md";

import { IoLocationOutline } from "react-icons/io5";

import { ClipLoader, DotLoader } from "react-spinners";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);

  const { isAuthorized, user } = useSelector((state) => state.auth)


  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  let hasErrorToastShown = false;
  const handleJobs = () => {

    try {
      dispatch(getEmployerJobs())
        .unwrap().then((x) => {
          if (x.message == "Jobs fetched successfully!") {
            console.log("xjobxs", x);

            setJobs(x.jobPostedBy)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          if (!hasErrorToastShown) {
            toast.error(error);
            setMessage(error)
            setIsLoading(false)


            hasErrorToastShown = true; // Prevent further error toasts
          }
        })

    } catch (error) {
      console.log("error", error);
      // toast.error(error)
      setMessage(error)
      // setHasFetched(true);
      setIsLoading(false)
    }
  }


  // const handleDeleteJob = async (jobId) => {
  //   try {
  //     debugger
  //     await dispatch(deleteJobByJobId({
  //       id: jobId,
  //     }))
  //       .unwrap().then((x) => {
  //         console.log("xjobxs", x);
  //         debugger
  //         if (x.message == "Job deleted successfully!!") {


  //           setJobs((prevJobs) =>
  //             prevJobs.filter((job) => job._id !== jobId)
  //           );



  //         }
  //       })

  //   } catch (error) {
  //     debugger
  //     console.log("errormessage", error);

  //     // toast.error(error.response.data.message);
  //     setMessage(error)
  //     setIsLoading(false)
  //     // setJobs([])

  //   }
  // };


  const handleDeleteJob = async () => {
    if (!selectedJobId) return;

    try {
      setDeletingJobId(selectedJobId);

      const response = await dispatch(
        deleteJobByJobId({ id: selectedJobId })
      ).unwrap();



      if (response.message === "Job deleted successfully!!") {
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== selectedJobId)
        );

        setShowDeleteDialog(false);
        setSelectedJobId(null);
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
    } finally {
      setDeletingJobId(null);
    }
  };



  useEffect(() => {
    handleJobs()
  }, []);


  return (
    <>
      <section className="jobs page py-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">

          {/* Heading */}
          {!isLoading && jobs.length > 0 && (
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
              {user?.role === "Employer"
                ? "Your Posted Jobs"
                : "Available Jobs"}
            </h1>
          )}

          {/* Loader */}
          {isLoading ? (
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <ClipLoader color="#1D2084" size={60} />
            </div>
          ) : jobs.length > 0 ? (
            // {/* Jobs Grid */ }
            < div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition flex flex-col justify-between cursor-pointer"
                >
                  {/* Job Info */}
                  <div>
                    {/* Job Title and Delete Icon */}
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {job.title}
                      </h2>

                      {user?.role === "Employer" && (
                        <button
                          onClick={() => {
                            setSelectedJobId(job._id);
                            setShowDeleteDialog(true);
                          }}
                          className="text-gray-500 transition hover:text-red-600"
                          title="Delete Job"
                        >
                          <MdDelete size={22} />
                        </button>
                      )}
                    </div>

                    {/* Company Name */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100">
                        <GoOrganization size={18} className="text-[#1D2084]" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Company</p>
                        <p className="text-sm font-bold text-gray-800 truncate">
                          {job.companyName ? job.companyName : "Teresol Technologies"}
                        </p>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <TbCategory className="shrink-0 text-gray-500" />
                      <p className="text-sm text-gray-600">{job.category}</p>
                    </div>

                    {/* City and Country */}
                    <div className="flex items-center gap-2 mb-3">
                      <TbWorld className="shrink-0 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        {job.city} - {job.country}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <IoLocationOutline className="shrink-0 text-gray-500" />
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/employer/jobs/${job._id}`}
                    className="mt-5 inline-block text-center bg-[#1D2084] text-white py-2 rounded-md text-sm hover:bg-blue-800 transition"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>

          ) : (
            /* Empty State */
            < div className="text-center mt-20">
              {user?.role === "Employer" ? (
                <>
                  <p className="text-xl text-gray-700 mb-2">
                    You haven't posted any jobs yet
                  </p>

                  <p className="text-gray-500 text-sm">
                    Start hiring by posting your first job today!
                  </p>

                  <Link
                    to="/job/post"
                    className="mt-4 inline-block text-center bg-blue-900 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-500 transition"
                  >
                    Post a Job
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-xl text-gray-700 mb-2">
                    No jobs available
                  </p>

                  <p className="text-gray-500 text-sm">
                    Please check back later
                  </p>

                  <Link
                    to="/"
                    className="mt-4 inline-block text-center bg-blue-900 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-500 transition"
                  >
                    Back to Homepage
                  </Link>
                </>
              )}
            </div>

          )}
        </div>
      </section >


      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Job?"
        message="Are you sure you want to delete this job?"
        confirmText="Delete Job"
        cancelText="Cancel"
        onConfirm={handleDeleteJob}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedJobId(null);
        }}
        loading={deletingJobId !== null}
        variant="danger"
      />

    </>

  );
};

export default Jobs;
