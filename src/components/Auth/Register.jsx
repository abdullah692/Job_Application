import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import Employhub from '../../assets/images/employee.png'

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }


  return (
    <>
      <section className="grid place-items-center min-h-screen bg-gray-100 px-4">
  <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
    {/* Logo and Header */}
    <div className="flex flex-col items-center mb-6">
      <img
        src={Employhub}
        alt="Employee Hub Logo"
        className="w-[55%] h-[30%] mb-2"
      />
      <h3 className="text-xl font-bold text-blue-900 text-center">
        Create a new account
      </h3>
    </div>

    {/* Register Form */}
    <form className="flex flex-col gap-5">
      {/* Register As */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Register As</label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 flex-1 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Employer">Employer</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>
          <FaRegUser className="text-gray-500 p-3" />
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Name</label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Zeeshan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 flex-1 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaPencilAlt className="text-gray-500 p-3" />
        </div>
      </div>

      {/* Email Address */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Email Address</label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="email"
            placeholder="zk@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 flex-1 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdOutlineMailOutline className="text-gray-500 p-3" />
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Phone Number</label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="number"
            placeholder="12345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 flex-1 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaPhoneFlip className="text-gray-500 p-3" />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Password</label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 flex-1 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <RiLock2Fill className="text-gray-500 p-3" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleRegister}
        className="py-3 bg-blue-900 text-white font-bold rounded-md hover:bg-blue-800"
      >
        Register
      </button>

      {/* Login Link */}
      <Link
        to="/login"
        className="py-3 text-center font-bold text-blue-900 border border-blue-900 rounded-md hover:bg-blue-100"
      >
        Login Now
      </Link>
    </form>
  </div>
</section>

    </>
  );
};

export default Register;
