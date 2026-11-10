
import React, { useEffect, useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  // Replace this sample data with your API response
  const sampleApplications = [
    {
      _id: "1",
      jobTitle: "Frontend Developer",
      companyName: "Tech Solutions",
      location: "Karachi, Pakistan",
      salary: "80k - 120k",
      createdAt: "2026-11-01",
      applicationStatus: "Pending",
      resume: { url: "#" },
    },
    {
      _id: "2",
      jobTitle: "MERN Stack Developer",
      companyName: "Digital Agency",
      location: "Lahore, Pakistan",
      salary: "100k - 150k",
      createdAt: "2026-11-03",
      applicationStatus: "Reviewed",
      resume: { url: "#" },
    },
    {
      _id: "3",
      jobTitle: "React Developer",
      companyName: "Software House",
      location: "Remote",
      salary: "90k - 130k",
      createdAt: "2026-11-05",
      applicationStatus: "Accepted",
      resume: { url: "#" },
    },
  ];

  useEffect(() => {
    setApplications(sampleApplications);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Reviewed":
        return "bg-blue-100 text-blue-700";
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = (id) => {
    setApplications((prev) =>
      prev.filter((application) => application._id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            My Applications
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Track and manage the jobs you have applied for.
          </p>
        </div>

        {/* Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {applications.length > 0 ? (
            applications.map((application) => (
              <div
                key={application._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                {/* Job Information */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {application.jobTitle}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {application.companyName}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(
                      application.applicationStatus
                    )}`}
                  >
                    {application.applicationStatus}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <p>📍 {application.location}</p>
                  <p>💰 {application.salary}</p>
                  <p>
                    Applied on:{" "}
                    {new Date(application.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-gray-100 mt-5 pt-4">
                  <a
                    href={application.resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1D2084] font-medium hover:text-blue-700"
                  >
                    <FaEye />
                    View Resume
                  </a>

                  <button
                    onClick={() => handleDelete(application._id)}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl border border-gray-200 py-16 text-center">
              <h2 className="text-lg font-semibold text-gray-700">
                No Applications Yet
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                You haven't applied for any jobs yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
