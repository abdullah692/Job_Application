import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import employeeLogo from "../../assets/images/employee.png"; // adjust path as needed
import { useSelector } from "react-redux";

const Navbar = () => {
  const [show, setShow] = useState(false);
  // const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  const { isAuthorized, user } = useSelector((state) => state.auth)
  console.log("user", user);


  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      // setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  // ${isAuthorized ? "block" : "hidden"}

  return (
    <nav className={` bg-[#18191c] px-3`}>
      <div className="max-w-[1500px] mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="w-[100px] h-[80px]">
          <img
            src={employeeLogo}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Menu */}
        <ul
          className={`${show
            ? "fixed left-0 top-[120px] flex flex-col justify-center items-start gap-8 pl-6 w-[400px] h-screen bg-[#f1f3f6] shadow-lg lg:static lg:flex-row lg:w-auto lg:h-auto lg:bg-transparent lg:shadow-none"
            : "hidden lg:flex"
            } items-center gap-6`}
        >

          {
            user?.role == "Employer" ? (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={() => setShow(false)}
                    className="text-[#184235] lg:text-[#f1f3f6] text-md font-semibold lg:font-light hover:text-[#2d5649] transition"
                  >
                    HOME
                  </Link>
                </li>

                <li>
                  <Link
                    to="/job/getall"
                    onClick={() => setShow(false)}
                    className="text-[#184235] lg:text-[#f1f3f6] text-md font-semibold lg:font-light hover:text-[#2d5649] transition"
                  >
                    ALL JOBS
                  </Link>
                </li>


                <li>
                  <Link
                    to="/job/getall"
                    onClick={() => setShow(false)}
                    className="text-[#184235] lg:text-[#f1f3f6] text-md font-semibold lg:font-light hover:text-[#2d5649] transition"
                  >
                    POST JOBS
                  </Link>
                </li>

                <li>
                  <Link
                    to="/job/getall"
                    onClick={() => setShow(false)}
                    className="text-[#184235] lg:text-[#f1f3f6] text-md font-semibold lg:font-light hover:text-[#2d5649] transition"
                  >
                    MY JOBS
                  </Link>
                </li>


                <li>
                  <Link
                    to="/applications/me"
                    onClick={() => setShow(false)}
                    className="text-[#184235] lg:text-[#f1f3f6] text-md font-semibold lg:font-light hover:text-[#2d5649] transition"
                  >
                    APPLICANTS
                  </Link>
                </li>
              </>

            ) : (

              <>

                <li>
                  <Link
                    to="/job/getall"
                    onClick={() => setShow(false)}
                    className="text-[#184235] lg:text-[#f1f3f6] text-md font-semibold lg:font-light hover:text-[#2d5649] transition"
                  >
                    ALL JOBS
                  </Link>
                </li>

                <li>
                  <Link
                    to="/applications/me"
                    onClick={() => setShow(false)}
                    className="text-[#184235] lg:text-[#f1f3f6] text-md font-semibold lg:font-light hover:text-[#2d5649] transition"
                  >
                    MY APPLICATIONS
                  </Link>
                </li>

              </>
            )
          }




          <button
            onClick={handleLogout}
            className="px-2 py-1 text-md border border-[#184235] lg:border-[#f1f3f6] text-[#184235] lg:text-[#f1f3f6] hover:bg-[#184235] hover:text-white transition"
          >
            LOGOUT
          </button>
        </ul>

        {/* Hamburger */}
        <div className="block lg:hidden text-[35px] text-[#f1f3f6] cursor-pointer">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
