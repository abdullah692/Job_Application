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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState("");

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

  if (isAuthorized) {
    return <Navigate to={'/'} />
  }


  return (
    <>
      <section className="grid place-items-center min-h-screen bg-gray-100 p-5">
        <div className="bg-white px-8 pb-6 rounded-md shadow-md w-full max-w-md">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={Employhub}
              alt="Employee Hub Logo"
              className="w-[55%] h-[30%]"
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
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>

            {/* Name */}

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Jack"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border rounded-md bg-gray-100 focus:outline-none "
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border rounded-md bg-gray-100 focus:outline-none "
              />
            </div>

            {/* Phone Number */}

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Phone Number</label>
              <input
                type="number"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-3 border rounded-md bg-gray-100  "
              />
            </div> 
            {/* Password */}
                        <div className="relative">
                          <label className="mb-1 text-gray-700 font-medium">Password</label>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 border rounded-md bg-gray-100 focus:outline-none w-full"
                          />
                          {/* Eye Icon */}
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute pt-6 right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? (
                              <AiFillEye className="w-6 h-6" />
                            ) : (
                              <AiFillEyeInvisible className="w-6 h-6" />
                            )}
                          </button>
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
