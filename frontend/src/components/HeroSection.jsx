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
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  return (
    <div className="text-center bg-gray-50 py-16 px-4 dark:bg-gray-900">
      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Search, Apply & <br className="hidden sm:block" /> Get Your{" "}
          <span className="text-[#3575e2] dark:text-[#4a90e2]">Dream Job</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
          Explore thousands of job opportunities tailored just for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center w-full lg:w-[60%] shadow-lg border border-gray-300 dark:border-gray-700 rounded-full gap-3 px-4 py-2 mx-auto bg-white dark:bg-gray-800 transition-all">
          <input
            type="text"
            placeholder="Find your dream job..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 sm:py-3 outline-none"
            aria-label="Job search input"
          />
          <Button
            onClick={searchJobHandler}
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#3575e2] text-white hover:bg-[#285bb5] dark:bg-[#285bb5] dark:hover:bg-[#20468f] transition-all flex items-center justify-center"
            aria-label="Search jobs"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
