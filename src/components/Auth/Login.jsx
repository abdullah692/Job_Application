import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import Employhub from '../../assets/images/employee.png'
import { Form, Input, Button, Select } from 'antd';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const { Option } = Select;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState("");


  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
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

      <section className="grid place-items-center min-h-screen pt-3 bg-gray-100">
        <div className="bg-white px-8 pb-6 rounded-md shadow-md w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={Employhub}
              alt="Employee Hub Logo"
              className="w-[55%] h-[30%]"
            />
            <h1 className="text-xl font-bold text-blue-900 text-center">
              Login to your account
            </h1>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-6">
            {/* Login As */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Login As</label>
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

            {/* Email Address */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="zk@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border rounded-md bg-gray-100 focus:outline-none "
              />
            </div>

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
              onClick={handleLogin}
              className="py-3 bg-blue-900 text-white font-bold rounded-md hover:bg-blue-800"
            >
              Login
            </button>

            {/* Register Link */}
            <Link
              to="/register"
              className="py-3 text-center font-bold text-blue-900 border border-blue-900 rounded-md hover:bg-blue-100"
            >
              Register Now
            </Link>
          </form>
        </div>
      </section>




    </>
  );
};

export default Login;
