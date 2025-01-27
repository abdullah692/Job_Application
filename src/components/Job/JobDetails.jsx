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
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span> {job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
