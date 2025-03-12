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
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center bg-gray-50 py-16 dark:bg-gray-900">
      <div className="flex flex-col gap-5 px-4 lg:px-0 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
          Search, Apply & <br className="hidden sm:block" /> Get Your{" "}
          <span className="text-[#3575e2]">Dream Jobs</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
          Explore thousands of job opportunities tailored just for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center w-full lg:w-[60%] shadow-md border border-gray-200 dark:border-gray-700 rounded-full gap-4 px-3 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 sm:py-0"
          />
          <Button
            onClick={searchJobHandler}
            className="w-full sm:w-auto rounded-full bg-[#3575e2] text-white hover:bg-[#285bb5] dark:bg-[#285bb5] dark:hover:bg-[#20468f] transition-all"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
