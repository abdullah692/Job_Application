import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  // const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("all");
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const user = {
    role: "Employer",
  };

  // Dummy applications
  const dummyApplications = [
    {
      _id: "app101",
      name: "Ali Ahmed",
      email: "ali.ahmed@example.com",
      phone: "+92 300 1234567",
      address: "DHA Phase 6, Karachi, Pakistan",
      coverLetter:
        "I am a passionate frontend developer with 3 years of experience in React.js, JavaScript, and Tailwind CSS. I would love to contribute to your team.",
      resume: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      jobInfo: {
        jobId: "122",
        title: "Frontend Developer",
        companyName: "Tech Solutions",
      },
      createdAt: "2026-10-12",
    },
    {
      _id: "app102",
      name: "Sara Khan",
      email: "sara.khan@example.com",
      phone: "+92 321 9876543",
      address: "Gulshan-e-Iqbal, Karachi, Pakistan",
      coverLetter:
        "I have experience building responsive web applications using React, TypeScript, and modern frontend tools. I am excited to apply for this position.",
      resume: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      jobInfo: {
        jobId:"123",
        title: "React Developer",
        companyName: "Digital Agency",
      },
      createdAt: "2026-10-10",
    },
    {
      _id: "app103",
      name: "Usman Malik",
      email: "usman.malik@example.com",
      phone: "+92 333 7654321",
      address: "Clifton, Karachi, Pakistan",
      coverLetter:
        "I am a JavaScript developer interested in creating scalable, user-friendly applications. My experience includes React.js, Node.js, and REST APIs.",
      resume: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      jobInfo: {
        jobId: "124",
        title: "MERN Stack Developer",
        companyName: "Software House",
      },
      createdAt: "2026-10-08",
    },
  ];


  // useEffect(() => {
  //   try {
  //     if (user && user.role === "Employer") {
  //       axios
  //         .get("http://localhost:4000/api/v1/application/employer/getall", {
  //           withCredentials: true,
  //         })
  //         .then((res) => {
  //           setApplications(res.data.applications);
  //         });
  //     } else {
  //       axios
  //         .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
  //           withCredentials: true,
  //         })
  //         .then((res) => {
  //           setApplications(res.data.applications);
  //         });
  //     }
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // }, [isAuthorized]);

  // if (!isAuthorized) {
  //   navigateTo("/");
  // }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

const filteredApplications =
  selectedJob === "all"
    ? dummyApplications
    : dummyApplications.filter(
        (application) => application.jobInfo.jobId === selectedJob
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
            {user ? "My Applications" : "Applications From Job Seekers"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {user
              ? "Track the applications you have submitted."
              : "Review candidate information and explore their resumes."}
          </p>
        </div>

        {/* Application count */}
        <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <div>
            <p className="text-xs text-gray-500">
              {user ? "Total Applications" : "Received Applications"}
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {/* {applications.length} */}
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
            <option value="122">Frontend Developer</option>
            <option value="123">React Developer</option>
            <option value="124">MERN Stack Developer</option>
          </select>
        </div>

        {/* Applications */}
        {dummyApplications.length === 0 ? (
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
                      Applied on {element.createdAt}
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
                          {element.jobInfo.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                          {element.jobInfo.companyName}
                        </p>
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

                      <button
                        type="button"
                        onClick={() => openModal(element.resume.url)}
                        className="mt-3 w-full rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                      >
                        View Resume
                      </button>
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
      </div>

      {/* Resume Modal */}
      {modalOpen && (
        <ResumeModal
          resumeUrl={resumeUrl}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p className="mt-1 break-words text-sm font-medium text-gray-800">
      {value || "Not provided"}
    </p>
  </div>
);

const ResumeModal = ({ resumeUrl, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    onClick={onClose}
  >
    <div
      className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-bold text-gray-900">
          Resume Preview
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close resume preview"
          className="rounded-lg px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          &times;
        </button>
      </div>

      <iframe
        src={resumeUrl}
        title="Resume Preview"
        className="min-h-[65vh] w-full flex-1"
      />

      <div className="flex justify-end border-t border-gray-200 p-4">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Open in New Tab
        </a>
      </div>
    </div>
  </div>
);

export default MyApplications;