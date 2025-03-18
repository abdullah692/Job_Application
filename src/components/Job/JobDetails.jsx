import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobById } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const dispatch = useDispatch();


  const { isAuthorized, user } = useContext(Context);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/api/v1/job/${id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setJob(res.data.job);
  //     })
  //     .catch((error) => {
  //       navigateTo("/notfound");
  //     });
  // }, []);
  let hasErrorToastShown = false;
  const handleJobs = () => {
    try {
      dispatch(getJobById(id))
        .unwrap().then((x) => {
          console.log("jobs", x);
          if (x.success == true) {
            setJob(x.job)
            // setIsLoading(false)
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
      // setHasFetched(true);
      // setIsLoading(false)
    }
  }


  useEffect(() => {
    handleJobs()
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    // <section className="jobDetail page">
    //   <div className="container">
    //     <h3>Job Details</h3>
    //     <div className="banner">
    //       <p>
    //         Title: <span> {job.title}</span>
    //       </p>
    //       <p>
    //         Category: <span>{job.category}</span>
    //       </p>
    //       <p>
    //         Country: <span>{job.country}</span>
    //       </p>
    //       <p>
    //         City: <span>{job.city}</span>
    //       </p>
    //       <p>
    //         Location: <span>{job.location}</span>
    //       </p>
    //       <p>
    //         Description: <span>{job.description}</span>
    //       </p>
    //       <p>
    //         Job Posted On: <span>{job.jobPostedOn}</span>
    //       </p>
    //       <p>
    //         Salary:{" "}
    //         {job.fixedSalary ? (
    //           <span>{job.fixedSalary}</span>
    //         ) : (
    //           <span>
    //             {job.salaryFrom} - {job.salaryTo}
    //           </span>
    //         )}
    //       </p>
    //       {user && user.role === "Employer" ? (
    //         <></>
    //       ) : (
    //         <Link to={`/application/${job._id}`}>Apply Now</Link>
    //       )}
    //     </div>
    //   </div>
    // </section>
<section className="py-8 bg-gray-100 min-h-screen">
  <div className="mx-10 px-4 sm:px-6 lg:px-8">
    {job ? (
      <div className=" mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8 w-full">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Job Details
        </h3>
        <div className="space-y-3 text-gray-700">
          <p><strong>Title:</strong> <span className="text-blue-900">{job.title}</span></p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Country:</strong> {job.country}</p>
          <p><strong>City:</strong> {job.city}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Job Posted On:</strong> {job.jobPostedOn}</p>
          <p><strong>Salary:</strong> {job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}</p>
        </div>

        {/* {user && user.role !== "Employer" && ( */}
          <div className="mt-6 text-center">
            <Link
              to={`/application/${job._id}`}
              className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md text-lg  hover:bg-blue-700 transition"
            >
              Apply Now
            </Link>
          </div>
        {/* )} */}
      </div>
    ) : (
      <div className="text-center mt-10">
        <p className="text-xl text-gray-600">🔍 Job not found!</p>
      </div>
    )}
  </div>
</section>

  );
};

export default JobDetails;
