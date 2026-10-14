import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";

import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobById, updateJobByJobId, deleteJobByJobId } from "../../slices/authSlice";
import { ClipLoader } from "react-spinners";



const MyJobs = () => {

  const [myJobs, setMyJobs] = useState(null);
  const [originalJob, setOriginalJob] = useState(null);
  const [editingMode, setEditingMode] = useState(null);
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [updatingJobId, setUpdatingJobId] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const dispatch = useDispatch()

  const { id } = useParams();



  const navigateTo = useNavigate();




  const handleMyJobs = async () => {
    try {

      await dispatch(getJobById(id))
        .unwrap().then((x) => {
          if (x.success == true) {
            setMyJobs(x.job)
            setIsLoading(false)
            setMessage('')
          }
        })

    } catch (error) {
      debugger
      console.log("errormessage", error);

      // toast.error(error.response.data.message);
      setMessage(error)
      setIsLoading(false)
      setMyJobs(null)

    }
  }


  useEffect(() => {
    handleMyJobs()
  }, [])

  // if (!isAuthorized || (user && user.role !== "Employer")) {
  //   navigateTo("/");
  // }

const handleEnableEdit = () => {
  // Store the original job before editing
  setOriginalJob({ ...myJobs });

  console.log("editOriginal", myJobs);

  // Enable editing for this job
  setEditingMode(myJobs._id);
};
  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };



  console.log("message", message);

  // const handleInputChange = (jobId, field, value) => {
  //   // Update the job object in the jobs state with the new value
  //   debugger
  //   setMyJobs((prevJobs) =>
  //     prevJobs.map((job) =>
  //       job._id === jobId ? { ...job, [field]: value } : job
  //     )
  //   );
  // };

  const handleInputChange = (id, field, value) => {
  setMyJobs((prev) => ({
    ...prev,
    [field]: value,
  }));
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




  const handleDeleteJob = async () => {
    try {

      await dispatch(deleteJobByJobId({
        id: id,
      }))
        .unwrap().then((x) => {
          console.log("xjobxs", x);
          debugger
          if (x.message == "Job deleted successfully!!") {


            setMyJobs((prevJobs) =>
              prevJobs.filter((job) => job._id !== jobId)
            );

            setEditingMode(null);
            setMessage('')

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
              {myJobs && (
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Title
                      </label>
                      <input
                        value={myJobs.title || ""}
                        disabled={editingMode !== myJobs._id}
                        onChange={(e) =>
                          handleInputChange(myJobs._id, "title", e.target.value)
                        }
                        className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Category
                      </label>
                      <input
                        value={myJobs.category || ""}
                        disabled={editingMode !== myJobs._id}
                        onChange={(e) =>
                          handleInputChange(myJobs._id, "category", e.target.value)
                        }
                        className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Country
                      </label>
                      <input
                        value={myJobs.country || ""}
                        disabled={editingMode !== myJobs._id}
                        onChange={(e) =>
                          handleInputChange(myJobs._id, "country", e.target.value)
                        }
                        className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        City
                      </label>
                      <input
                        value={myJobs.city || ""}
                        disabled={editingMode !== myJobs._id}
                        onChange={(e) =>
                          handleInputChange(myJobs._id, "city", e.target.value)
                        }
                        className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                      />
                    </div>

                    {/* Salary */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Salary
                      </label>

                      {myJobs.fixedSalary ? (
                        <input
                          value={myJobs.fixedSalary}
                          disabled={editingMode !== myJobs._id}
                          onChange={(e) =>
                            handleInputChange(
                              myJobs._id,
                              "fixedSalary",
                              e.target.value
                            )
                          }
                          className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                        />
                      ) : (
                        <div className="flex gap-3 mt-1">
                          <input
                            value={myJobs.salaryFrom ?? ""}
                            disabled={editingMode !== myJobs._id}
                            onChange={(e) =>
                              handleInputChange(
                                myJobs._id,
                                "salaryFrom",
                                e.target.value
                              )
                            }
                            placeholder="Salary From"
                            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                          />

                          <input
                            value={myJobs.salaryTo ?? ""}
                            disabled={editingMode !== myJobs._id}
                            onChange={(e) =>
                              handleInputChange(
                                myJobs._id,
                                "salaryTo",
                                e.target.value
                              )
                            }
                            placeholder="Salary To"
                            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                          />
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Status
                      </label>

                      {editingMode === myJobs._id ? (
                        <select
                          value={String(myJobs.expired)}
                          onChange={(e) =>
                            handleInputChange(
                              myJobs._id,
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
                        <div className="mt-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${myJobs.expired
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                              }`}
                          >
                            {myJobs.expired ? "Expired" : "Active"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <label className="text-sm font-semibold text-gray-600">
                      Description
                    </label>

                    <textarea
                      rows={4}
                      value={myJobs.description || ""}
                      disabled={editingMode !== myJobs._id}
                      onChange={(e) =>
                        handleInputChange(
                          myJobs._id,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 resize-none"
                    />
                  </div>

                  {/* Location */}
                  <div className="mt-6">
                    <label className="text-sm font-semibold text-gray-600">
                      Location
                    </label>

                    <textarea
                      rows={2}
                      value={myJobs.location || ""}
                      disabled={editingMode !== myJobs._id}
                      onChange={(e) =>
                        handleInputChange(
                          myJobs._id,
                          "location",
                          e.target.value
                        )
                      }
                      className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 resize-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    {editingMode === myJobs._id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleUpdateJob(myJobs._id)}
                          disabled={updatingJobId === myJobs._id}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-60 flex items-center gap-2"
                        >
                          {updatingJobId === myJobs._id ? (
                            <>
                              <ClipLoader color="#fff" size={18} />
                              Updating...
                            </>
                          ) : (
                            "Update"
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleDisableEdit}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={handleEnableEdit}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={handleDeleteJob}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
