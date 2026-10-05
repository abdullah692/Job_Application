import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployerJobs, updateJobByJobId, deleteJobByJobId } from "../../slices/authSlice";
import { ClipLoader, DotLoader } from "react-spinners";



const MyJobs = () => {

  const [myJobs, setMyJobs] = useState([]);
  const [originalJob, setOriginalJob] = useState(null);
  const [editingMode, setEditingMode] = useState(null);
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [updatingJobId, setUpdatingJobId] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const dispatch = useDispatch()


  const navigateTo = useNavigate();




  const handleMyJobs = async () => {
    try {

      await dispatch(getEmployerJobs())
        .unwrap().then((x) => {
          console.log("xjobxs", x);
          if (x.message == "Jobs fetched successfully!") {

            setMyJobs(x.jobPostedBy)
            setMessage('')
            setIsLoading(false)

            setIsLoading(false)
          }
        })

    } catch (error) {
      debugger
      console.log("errormessage", error);

      // toast.error(error.response.data.message);
      setMessage(error)
      setIsLoading(false)
      setMyJobs([])

    }
  }


  useEffect(() => {
    handleMyJobs()
  }, [])

  // if (!isAuthorized || (user && user.role !== "Employer")) {
  //   navigateTo("/");
  // }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    const job = myJobs.find((job) => job._id === jobId);

    // Store the original job before editing
    setOriginalJob({ ...job });

    console.log("editOriginal", job);
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };



  console.log("message", message);

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    debugger
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  const handleUpdateJob = async (jobId) => {


    // toast.success("Job updated successfully!")
    // ;
    debugger

    const jobToUpdate = myJobs.find((job) => job._id === jobId);
    console.log("jobToUpdate", jobToUpdate);
    setOriginalJob({ ...jobToUpdate });


    const updatedFields = {};
    Object.keys(jobToUpdate).forEach((key) => {
      if (jobToUpdate[key] !== originalJob[key]) {
        updatedFields[key] = jobToUpdate[key];
      }
    });
    setUpdatingJobId(jobId);


    try {

      await dispatch(updateJobByJobId({
        id: jobId,
        updateFields: updatedFields
      }))
        .unwrap().then((x) => {
          console.log("xjobxs", x);
          debugger
          if (x.message == "Job updated successfully!!") {

            setMyJobs((prevJobs) =>
              prevJobs.map((job) =>
                job._id === x.job._id ? x.job : job
              )
            );
            setEditingMode(null);
            setMessage('')
            setIsLoading(false)

          }
        })

    } catch (error) {
      debugger
      console.log("errormessage", error);

      // toast.error(error.response.data.message);
      setMessage(error)
      setIsLoading(false)
      setMyJobs([])

    }
    finally {

      setUpdatingJobId(null);

    }

  };




  const handleDeleteJob = async(jobId) => {
    try {

      await dispatch(deleteJobByJobId({
        id: jobId,
      }))
        .unwrap().then((x) => {
          console.log("xjobxs", x);
          debugger
          if (x.message == "Job deleted successfully!!") {

            setMyJobs((prevJobs) =>
              prevJobs.map((job) =>
                job._id === x.job._id ? x.job : job
              )
            );
            setEditingMode(null);
            setMessage('')
            setIsLoading(false)

          }
        })

    } catch (error) {
      debugger
      console.log("errormessage", error);

      // toast.error(error.response.data.message);
      setMessage(error)
      setIsLoading(false)
      setMyJobs([])

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        {!isLoading && myJobs.length > 0 && (
          <h1 className="text-3xl font-bold mb-8">Your Posted Jobs</h1>
        )}

        {/* Loader */}
        {isLoading ? (
          <div className="absolute inset-0  flex justify-center items-center z-10">
            <ClipLoader color="#1D2084" size={60} />
          </div>
        ) : message ? (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-semibold text-gray-600">
              {message}
            </h2>

            <p className="text-gray-500 mt-2">
              Click on <span className="font-semibold">Post Job</span> to create your first job.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {myJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Title
                      </label>
                      <input
                        value={job.title}
                        disabled={editingMode != job._id}
                        onChange={(e) =>
                          handleInputChange(job._id, "title", e.target.value)
                        }
                        className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Category
                      </label>
                      <input
                        value={job.category}
                        disabled={editingMode != job._id}
                        onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Country
                      </label>
                      <input
                        value={job.country}
                        disabled={editingMode != job._id}
                        onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        City
                      </label>
                      <input
                        value={job.city}
                        disabled={editingMode != job._id}
                        onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Salary
                      </label>

                      {job.fixedSalary ? (
                        <input
                          value={`${job.fixedSalary}`}
                          disabled={editingMode != job._id}
                          onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                          className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                        />
                      ) : (
                        <div className="flex gap-3 mt-1">
                          <input
                            value={job.salaryFrom}
                            disabled={editingMode != job._id}
                            onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                          />
                          <input
                            value={job.salaryTo}
                            disabled={editingMode != job._id}
                            onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Status
                      </label>

                      <div className="mt-2">

                        {editingMode === job._id ? (
                          <select
                            value={job.expired.toString()}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "expired",
                                e.target.value === "true"
                              )
                            }
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                          >
                            <option value="false">Active</option>
                            <option value="true">Expired</option>
                          </select>
                        ) : (
                          <div className="mt-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${job.expired
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                                }`}
                            >
                              {job.expired ? "Expired" : "Active"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-semibold text-gray-600">
                      Description
                    </label>

                    <textarea
                      rows={4}
                      value={job.description}
                      disabled={editingMode != job._id}
                      onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                      className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 resize-none"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-semibold text-gray-600">
                      Location
                    </label>

                    <textarea
                      rows={2}
                      value={job.location}
                      disabled={editingMode != job._id}
                      onChange={(e) => handleInputChange(job._id, "location", e.target.value)}
                      className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 resize-none"
                    />
                  </div>


                  <div className="flex gap-3">
                    {editingMode === job._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(job._id)}
                          disabled={updatingJobId === job._id}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          {updatingJobId === job._id ? (
                            <>
                              <ClipLoader color="#fff" size={18} />
                              Updating...
                            </>
                          ) : (
                            "Update"
                          )}
                        </button>

                        <button
                          onClick={handleDisableEdit}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEnableEdit(job._id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
