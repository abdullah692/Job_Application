import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {postJob} from "../../slices/authSlice"
import { useSelector, useDispatch } from "react-redux";

import { Context } from "../../main";
const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    fixedSalary: "",
    salaryType: "default",
  });

  const { isAuthorized, user } = useContext(Context);

    const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobPost = async (e) => {
    e.preventDefault();

    try {
      const {
        title,
        description,
        category,
        country,
        city,
        location,
        salaryType,
        fixedSalary,
        salaryFrom,
        salaryTo,
      } = jobData;

      let jobPayload = {
        title,
        description,
        category,
        country,
        city,
        location,
      };

      if (salaryType === "Fixed Salary") {
        jobPayload.fixedSalary = fixedSalary;
      } else if (salaryType === "Ranged Salary") {
        jobPayload.salaryFrom = salaryFrom;
        jobPayload.salaryTo = salaryTo;
      } else {
        toast.error("Please select a salary type.");
        return;
      }

      console.log(jobPayload,"jobPayload");
      

      const response = await dispatch(postJob(jobPayload)).unwrap();
      console.log(response,"response");
      

      toast.success(response.message);

      setJobData({
        title: "",
        description: "",
        category: "",
        country: "",
        city: "",
        location: "",
        salaryFrom: "",
        salaryTo: "",
        fixedSalary: "",
        salaryType: "default",
      });
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to post job."
      );
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#1D2084]">
            Post a New Job
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details to publish your job opportunity.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleJobPost}
          className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
        >

          {/* Basic Information */}
          <div>
            <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-semibold text-[#1D2084]">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-nonefocus:border-[#1D2084] focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={jobData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                >
                  <option value="">Select Category</option>
                  <option value="Graphics & Design">Graphics & Design</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Frontend Web Development">Frontend Web Development</option>
                  <option value="MERN Stack Development">MERN Stack Development</option>
                  <option value="Account & Finance">Account & Finance</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Video Animation">Video Animation</option>
                  <option value="MEAN Stack Development">MEAN Stack Development</option>
                  <option value="MEVN Stack Development">MEVN Stack Development</option>
                  <option value="Data Entry Operator">Data Entry Operator</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-semibold text-[#1D2084]">
              Job Location
            </h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={jobData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-nonefocus:border-[#1D2084] focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={jobData.city}
                  name="city"
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-nonefocus:border-[#1D2084] focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={jobData.location}
                  name="location"
                  onChange={handleChange}
                  placeholder="Office location, Hybrid, or Remote"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-nonefocus:border-[#1D2084] focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                />
              </div>
            </div>
          </div>

          {/* Salary */}
          <div>
            <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-semibold text-[#1D2084]">
              Salary Details
            </h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Salary Type
                </label>
                
                

                  <select
                    value={jobData.salaryType}
                    name="salaryType"
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                  >
                    <option value="default">Select Salary Type</option>
                    <option value="Fixed Salary">Fixed Salary</option>
                    <option value="Ranged Salary">Ranged Salary</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {jobData.salaryType === "Ranged Salary"
                      ? "Salary Range"
                      : "Salary Amount"}
                  </label>

                  {jobData.salaryType === "default" ? (
                    <input
                      type="text"
                      value=""
                      placeholder="Select salary type first"
                      disabled
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400"
                    />
                  ) : jobData.salaryType === "Fixed Salary" ? (
                    <input
                      type="number"
                      name="fixedSalary"
                      value={jobData.fixedSalary}
                      onChange={handleChange}
                      placeholder="Fixed salary"
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                    />
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="salaryFrom"
                        
                        value={jobData.salaryFrom}
                        onChange={handleChange}
                        placeholder="From"
                        required
                        className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                      />

                      <input
                        type="number"
                        name="salaryTo"
                        value={jobData.salaryTo}
                        onChange={handleChange}
                        placeholder="To"
                        required
                        className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
                      />
                    </div>
                  )}
                  
                </div>
                
              </div>
            </div>
          

          {/* Description */}
          <div>
            <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-semibold text-[#1D2084]">
              Job Description
            </h3>

            <textarea
              rows={4}
              name ="description" 
              value={jobData.description}
              onChange={handleChange}
              placeholder="Describe the job responsibilities, skills, and requirements..."
              required
              className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:outline-none focus:ring-1 focus:ring-[#1D2084]/20"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setCategory("");
                setCountry("");
                setCity("");
                setLocation("");
                setSalaryType("default");
                setFixedSalary("");
                setSalaryFrom("");
                setSalaryTo("");
                setDescription("");
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Clear
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#1D2084] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#151865]" >
              + Create Job
            </button>
          </div>

        </form>
      </div>
    </div>
  );


};

export default PostJob;
