import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 lg:px-8 h-16">
        <a
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>PartTime-Connect</span>
        </a>
        <button
          className="md:hidden block text-gray-700 dark:text-gray-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-12 absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-gray-800 shadow-md md:shadow-none z-50 p-4 md:p-0`}
        >
          <ul className="flex flex-col md:flex-row font-medium items-start md:items-center gap-4 md:gap-6 text-gray-600 dark:text-gray-300">
            {user && user.role === "admin" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/sample-recruiter"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recruiterjobs"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Browse
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link
                      to="/dashboard"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 ring-blue-600 dark:ring-blue-400">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white dark:bg-gray-700 shadow-lg border rounded-md p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User Avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-100">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-700 dark:text-gray-300">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer mt-2">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900 rounded-md"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 rounded-md">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
