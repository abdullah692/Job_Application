import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
  <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
    
    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
      Application Form
    </h2>

    <form onSubmit={handleApplication} className="space-y-5">

      {/* Name */}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Phone */}
      <input
        type="number"
        placeholder="Your Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Address */}
      <input
        type="text"
        placeholder="Your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Cover Letter */}
      <textarea
        placeholder="Cover Letter..."
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        rows="4"
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* File Upload */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Upload Resume
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-xl bg-gray-50"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full  bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-500 transition duration-300"
      >
        Send Application
      </button>

    </form>
  </div>
</section>
  );
};

export default Application;
