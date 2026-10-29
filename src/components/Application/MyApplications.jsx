import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

import { RiProfileLine } from "react-icons/ri";
import { getJobSeekerResumes } from "../../slices/authSlice";


const MyApplications = () => {
  // const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthorized, user } = useSelector((state) => state.auth)

  const navigateTo = useNavigate();

  const dispatch = useDispatch();


  const handleApplications = () => {

    try {
      dispatch(getJobSeekerResumes())
        .unwrap().then((x) => {
          if (x.success == true) {
            console.log("xjobxs", x);

            setApplications(x.applications)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          if (!hasErrorToastShown) {
            toast.error(error);
            // setMessage(error)
            setIsLoading(false)


            // hasErrorToastShown = true; // Prevent further error toasts
          }
        })

    } catch (error) {
      console.log("error", error);
      toast.error(error)
      // setMessage(error)
      // // setHasFetched(true);
      setIsLoading(false)
    }
  }





  // const deleteApplication = (id) => {
  //   try {
  //     axios
  //       .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         setApplications((prevApplication) =>
  //           prevApplication.filter((application) => application._id !== id)
  //         );
  //       });
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };


  useEffect(() => {
    handleApplications()
  }, []);



  console.log(resumeImageUrl, "resumeImageUrl");
  const uniqueJobs = [];

  applications.forEach((application) => {
    const job = application.jobId;

    if (
      job &&
      !uniqueJobs.some((item) => item._id == job._id)
    ) {
      uniqueJobs.push(job);
    }
  });

  console.log(uniqueJobs, "uniqueJobs");


  const filteredApplications =
    selectedJob === "all"
      ? applications
      : applications.filter(
        (application) => application.jobId?._id === selectedJob
      );


  return (
    <section className="min-h-screen bg-gray-50 px-4 py-6 sm:px-5">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            EmployerHub / Applications
          </p>

          <h1 className="text-2xl font-bold text-gray-900">
            {user ? "Applications From Job Seekers" : "My Submitted Applications"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {user
              ? "Review candidate information and explore their resumes."
              : "Track the applications you have submitted."}
          </p>
        </div>


        <div>
          {isLoading ? (
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <ClipLoader color="#1D2084" size={60} />
            </div>
          ) : (
            <>


              {/* Application count */}
              <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                <div>
                  <p className="text-xs text-gray-500">
                    {user ? "Received Applications" : "My Submitted Applications"}
                  </p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {applications.length}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-xl">
                  📄
                </div>
              </div>


              {/* Application Filter */}
              <div className="mb-4 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-800">
                    Filter Applications
                  </h2>
                  <p className="text-xs text-gray-500">
                    Filter applicants by job position
                  </p>
                </div>

                <select
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500 sm:w-64"
                  // defaultValue="all"
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                >
                  <option value="all">All Jobs</option>

                  {uniqueJobs.map((job) => (
                    <option key={job._id} value={job._id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Applications */}
              {applications.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-10 text-center">
                  <div className="mb-2 text-4xl">📭</div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    No Applications Found
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {user
                      ? "You have not submitted any job applications yet."
                      : "There are no applications for your posted jobs yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((element) => (
                    <div
                      key={element._id}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      {/* Card header */}
                      <div className="flex flex-col gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h2 className="text-base font-bold text-gray-900">
                            {element.name}
                          </h2>
                          <p className="mt-1 text-xs text-gray-500">
                            Applied On {new Date(element.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                        <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          Application Received
                        </span>
                      </div>

                      {/* Card content */}
                      <div className="grid gap-4 p-4 lg:grid-cols-3">

                        {/* Applicant details */}
                        <div className="space-y-3 lg:col-span-2">
                          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Applicant Information
                          </h3>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <InfoItem label="Full Name" value={element.name} />
                            <InfoItem label="Email Address" value={element.email} />
                            <InfoItem label="Phone Number" value={element.phone} />
                            <InfoItem label="Address" value={element.address} />
                          </div>

                          {/* Job information for employer */}
                          {!user && (
                            <div className="rounded-lg bg-indigo-50 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                Applied Position
                              </p>
                              <p className="mt-1 text-sm font-semibold text-gray-900">
                                {element.jobId.title}
                              </p>
                              {/* <p className="mt-1 text-xs text-gray-600">
                          {element.jobInfo.companyName}
                        </p> */}
                            </div>
                          )}

                          {/* Cover letter */}
                          <div>
                            <h3 className="mb-1 text-xs font-semibold text-gray-700">
                              Cover Letter
                            </h3>
                            <p className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm leading-5 text-gray-600">
                              {element.coverLetter}
                            </p>
                          </div>
                        </div>

                        {/* Resume */}
                        <div className="flex flex-col rounded-lg border border-gray-200 p-3">
                          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Resume
                          </h3>

                          <div className="my-3 flex flex-1 flex-col items-center justify-center rounded-lg bg-gray-50 p-4 text-center">
                            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-2xl">
                              📄
                            </div>

                            <p className="text-sm font-semibold text-gray-800">
                              {element.name.split(" ")[0]}'s Resume
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              PDF Document
                            </p>


                            <a
                              href={element.resume.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                            >
                              <span>View Resume</span>
                              <RiProfileLine />
                            </a>

                          </div>

                          {/* Delete for Job Seeker */}
                          {user && (
                            <button
                              type="button"
                              // onClick={() => deleteApplication(element._id)}
                              className="rounded-md border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              Delete Application
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </>
          )}

        </div>
      </div>


    </section>
  );

}


export default MyApplications;