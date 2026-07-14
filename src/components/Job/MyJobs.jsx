import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployerJobs } from "../../slices/authSlice";


const MyJobs = () => {
  const data = [
    {
      _id: "1",
      title: "Frontend React Developer",
      country: "Pakistan",
      city: "Karachi",
      category: "Frontend Web Development",
      fixedSalary: 120000,
      salaryFrom: null,
      salaryTo: null,
      expired: false,
      description:
        "We are looking for a React developer with 2+ years of experience in React, Redux, and Tailwind CSS.",
      location: "PECHS, Karachi",
    },
    {
      _id: "2",
      title: "MERN Stack Developer",
      country: "Pakistan",
      city: "Lahore",
      category: "MERN Stack Development",
      fixedSalary: null,
      salaryFrom: 100000,
      salaryTo: 180000,
      expired: true,
      description:
        "Looking for a MERN developer with experience in Node.js, Express.js, MongoDB, and React.",
      location: "Gulberg, Lahore",
    },
  ];
  const [myJobs, setMyJobs] = useState([]);
  const [message, setMessage] = useState(null)
  const [editingMode, setEditingMode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthorized, user } = useContext(Context);

  const dispatch = useDispatch()

  const navigateTo = useNavigate();

  //Fetching all jobs
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:4000/api/v1/job/getmyjobs",
  //         { withCredentials: true }
  //       );
  //       setMyJobs(data.myJobs);
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //       setMyJobs([]);
  //     }
  //   };
  //   fetchJobs();
  // }, []);


  const handleMyJobs = async () => {
    try {

      await dispatch(getEmployerJobs())
        .unwrap().then((x) => {
          if (x.message == "All Jobs fetched successfully!!") {
            console.log("xjobxs", x);

            setMyJobs(x.jobs)
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
  }
  // }

  // console.log({
  //   isAuthorized,
  //   user,
  //   editingMode,
  // }, "check update");


  useEffect(() => {
    handleMyJobs()
  }, [])

  // if (!isAuthorized || (user && user.role !== "Employer")) {
  //   navigateTo("/");
  // }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // //Function For Updating The Job
  // const handleUpdateJob = async (jobId) => {
  //   const updatedJob = myJobs.find((job) => job._id === jobId);
  //   await axios
  //     .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       toast.success(res.data.message);
  //       setEditingMode(null);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //     });
  // };

  // //Function For Deleting Job
  // const handleDeleteJob = async (jobId) => {
  //   await axios
  //     .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       toast.success(res.data.message);
  //       setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //     });
  // };


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

  const handleUpdateJob = (jobId) => {
    console.log(
      "Updated Job:",
      myJobs.find((job) => job._id === jobId)
    );

    toast.success("Job updated successfully!");

    setEditingMode(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {message ? (
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
            <h1 className="text-3xl font-bold mb-8">Your Posted Jobs</h1>

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
                  {/* 
              <div className="flex justify-end gap-4 mt-6">
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  onClick={() => handleEnableEdit(job._id)}>
                  Edit
                </button>

                <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                  Delete
                </button>
              </div> */}

                  <div className="flex gap-3">
                    {editingMode === job._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(job._id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Save
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
