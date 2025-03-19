import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <div className="text-center bg-white py-20 px-6 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Find Your <span className="text-[#3575e2] dark:text-[#4a90e2]">Remote Job</span> Fast
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover thousands of job opportunities tailored to your skills.
        </p>
        <div className="relative flex flex-wrap items-center w-full sm:w-3/4 mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg px-3 py-2 gap-2">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 ml-2" />
          <input
            type="text"
            id="job-search"
            placeholder="Search job title, keyword..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 w-full sm:w-auto"
            aria-label="Job search input"
          />
          <Button
            type="button"
            onClick={searchJobHandler}
            className="px-4 sm:px-6 py-2 rounded-full bg-[#3575e2] text-whitehover:bg-[#285bb5] dark:bg-[#285bb5] dark:hover:bg-[#20468f] transition-all min-w-[8rem] sm:min-w-[10rem] text-sm sm:text-base"
            aria-label="Search jobs"
          >
            Find Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
