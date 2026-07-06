import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../slices/authSlice";


const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const dispatch = useDispatch()

  const navigateTo = useNavigate();
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


  const handleMyJobs = () => {
    try {

      dispatch(getAllJobs())
        .unwrap().then((x) => {
          if (x.message == "All Jobs fetched successfully!!") {
            console.log("xjobxs", x);

            setJobs(x.jobs)
            setIsLoading(false)
          }
        })

    } catch (error) {

    }
  }

  console.log({
  isAuthorized,
  user,
  editingMode,
},"check update");


  // useEffect(() => {
  //   handleMyJobs()
  // }, [])

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

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  // return (
  //   <>
  //     <div className="myJobs page">
  //       <div className="container">
  //         <h1>Your Posted Jobs</h1>
  //         {myJobs.length > 0 ? (
  //           <>
  //             <div className="banner">
  //               {myJobs.map((element) => (
  //                 <div className="card" key={element._id}>
  //                   <div className="content">
  //                     <div className="short_fields">
  //                       <div>
  //                         <span>Title:</span>
  //                         <input
  //                           type="text"
  //                           disabled={
  //                             editingMode !== element._id ? true : false
  //                           }
  //                           value={element.title}
  //                           onChange={(e) =>
  //                             handleInputChange(
  //                               element._id,
  //                               "title",
  //                               e.target.value
  //                             )
  //                           }
  //                         />
  //                       </div>
  //                       <div>
  //                         {" "}
  //                         <span>Country:</span>
  //                         <input
  //                           type="text"
  //                           disabled={
  //                             editingMode !== element._id ? true : false
  //                           }
  //                           value={element.country}
  //                           onChange={(e) =>
  //                             handleInputChange(
  //                               element._id,
  //                               "country",
  //                               e.target.value
  //                             )
  //                           }
  //                         />
  //                       </div>
  //                       <div>
  //                         <span>City:</span>
  //                         <input
  //                           type="text"
  //                           disabled={
  //                             editingMode !== element._id ? true : false
  //                           }
  //                           value={element.city}
  //                           onChange={(e) =>
  //                             handleInputChange(
  //                               element._id,
  //                               "city",
  //                               e.target.value
  //                             )
  //                           }
  //                         />
  //                       </div>
  //                       <div>
  //                         <span>Category:</span>
  //                         <select
  //                           value={element.category}
  //                           onChange={(e) =>
  //                             handleInputChange(
  //                               element._id,
  //                               "category",
  //                               e.target.value
  //                             )
  //                           }
  //                           disabled={
  //                             editingMode !== element._id ? true : false
  //                           }
  //                         >
  //                           <option value="Graphics & Design">
  //                             Graphics & Design
  //                           </option>
  //                           <option value="Mobile App Development">
  //                             Mobile App Development
  //                           </option>
  //                           <option value="Frontend Web Development">
  //                             Frontend Web Development
  //                           </option>
  //                           <option value="MERN Stack Development">
  //                             MERN STACK Development
  //                           </option>
  //                           <option value="Account & Finance">
  //                             Account & Finance
  //                           </option>
  //                           <option value="Artificial Intelligence">
  //                             Artificial Intelligence
  //                           </option>
  //                           <option value="Video Animation">
  //                             Video Animation
  //                           </option>
  //                           <option value="MEAN Stack Development">
  //                             MEAN STACK Development
  //                           </option>
  //                           <option value="MEVN Stack Development">
  //                             MEVN STACK Development
  //                           </option>
  //                           <option value="Data Entry Operator">
  //                             Data Entry Operator
  //                           </option>
  //                         </select>
  //                       </div>
  //                       <div>
  //                         <span>
  //                           Salary:{" "}
  //                           {element.fixedSalary ? (
  //                             <input
  //                               type="number"
  //                               disabled={
  //                                 editingMode !== element._id ? true : false
  //                               }
  //                               value={element.fixedSalary}
  //                               onChange={(e) =>
  //                                 handleInputChange(
  //                                   element._id,
  //                                   "fixedSalary",
  //                                   e.target.value
  //                                 )
  //                               }
  //                             />
  //                           ) : (
  //                             <div>
  //                               <input
  //                                 type="number"
  //                                 disabled={
  //                                   editingMode !== element._id ? true : false
  //                                 }
  //                                 value={element.salaryFrom}
  //                                 onChange={(e) =>
  //                                   handleInputChange(
  //                                     element._id,
  //                                     "salaryFrom",
  //                                     e.target.value
  //                                   )
  //                                 }
  //                               />
  //                               <input
  //                                 type="number"
  //                                 disabled={
  //                                   editingMode !== element._id ? true : false
  //                                 }
  //                                 value={element.salaryTo}
  //                                 onChange={(e) =>
  //                                   handleInputChange(
  //                                     element._id,
  //                                     "salaryTo",
  //                                     e.target.value
  //                                   )
  //                                 }
  //                               />
  //                             </div>
  //                           )}
  //                         </span>
  //                       </div>
  //                       <div>
  //                         {" "}
  //                         <span>Expired:</span>
  //                         <select
  //                           value={element.expired}
  //                           onChange={(e) =>
  //                             handleInputChange(
  //                               element._id,
  //                               "expired",
  //                               e.target.value
  //                             )
  //                           }
  //                           disabled={
  //                             editingMode !== element._id ? true : false
  //                           }
  //                         >
  //                           <option value={true}>TRUE</option>
  //                           <option value={false}>FALSE</option>
  //                         </select>
  //                       </div>
  //                     </div>
  //                     <div className="long_field">
  //                       <div>
  //                         <span>Description:</span>{" "}
  //                         <textarea
  //                           rows={5}
  //                           value={element.description}
  //                           disabled={
  //                             editingMode !== element._id ? true : false
  //                           }
  //                           onChange={(e) =>
  //                             handleInputChange(
  //                               element._id,
  //                               "description",
  //                               e.target.value
  //                             )
  //                           }
  //                         />
  //                       </div>
  //                       <div>
  //                         <span>Location: </span>
  //                         <textarea
  //                           value={element.location}
  //                           rows={5}
  //                           disabled={
  //                             editingMode !== element._id ? true : false
  //                           }
  //                           onChange={(e) =>
  //                             handleInputChange(
  //                               element._id,
  //                               "location",
  //                               e.target.value
  //                             )
  //                           }
  //                         />
  //                       </div>
  //                     </div>
  //                   </div>
  //                   {/* Out Of Content Class */}
  //                   <div className="button_wrapper">
  //                     <div className="edit_btn_wrapper">
  //                       {editingMode === element._id ? (
  //                         <>
  //                           <button
  //                             onClick={() => handleUpdateJob(element._id)}
  //                             className="check_btn"
  //                           >
  //                             <FaCheck />
  //                           </button>
  //                           <button
  //                             onClick={() => handleDisableEdit()}
  //                             className="cross_btn"
  //                           >
  //                             <RxCross2 />
  //                           </button>
  //                         </>
  //                       ) : (
  //                         <button
  //                           onClick={() => handleEnableEdit(element._id)}
  //                           className="edit_btn"
  //                         >
  //                           Edit
  //                         </button>
  //                       )}
  //                     </div>
  //                     <button
  //                       onClick={() => handleDeleteJob(element._id)}
  //                       className="delete_btn"
  //                     >
  //                       Delete
  //                     </button>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </>
  //         ) : (
  //           <p>
  //             You've not posted any job or may be you deleted all of your jobs!
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Posted Jobs</h1>

        <div className="grid gap-6">
          {data.map((job) => (
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
                    disabled
                    className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Category
                  </label>
                  <input
                    value={job.category}
                    disabled
                    className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Country
                  </label>
                  <input
                    value={job.country}
                    disabled
                    className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    City
                  </label>
                  <input
                    value={job.city}
                    disabled
                    className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Salary
                  </label>

                  {job.fixedSalary ? (
                    <input
                      value={`Rs. ${job.fixedSalary}`}
                      disabled
                      className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                    />
                  ) : (
                    <div className="flex gap-3 mt-1">
                      <input
                        value={job.salaryFrom}
                        disabled
                        className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                      />
                      <input
                        value={job.salaryTo}
                        disabled
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
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${job.expired
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                        }`}
                    >
                      {job.expired ? "Expired" : "Active"}
                    </span>
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
                  disabled
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
                  disabled
                  className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 resize-none"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg" 
                onClick={()=>handleEnableEdit(job._id)}>
                  Edit
                </button>

                <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
