import React, { useEffect } from "react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white py-4 z-10 border-b">
        <h1 className="font-bold text-2xl sm:text-3xl text-center sm:text-left">
          Search Results ({allJobs.length})
        </h1>
      </div>

      {/* Job Listings Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allJobs.length > 0 ? (
          allJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Job job={job} />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full flex flex-col items-center text-gray-600 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BriefcaseIcon className="w-20 h-20 text-gray-400" />
            <p className="mt-4 text-lg font-semibold">No jobs found</p>
            <p className="text-sm text-gray-500">Try adjusting your search filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Browse;
