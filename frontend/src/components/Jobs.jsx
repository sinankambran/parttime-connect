import React, { useMemo, useState } from "react";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [searchQuery, setSearchQuery] = useState("");

  const filterJobs = useMemo(() => {
    if (!searchQuery) return allJobs;
    return allJobs.filter((job) =>
      [job.title, job.description].some((field) =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [allJobs, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-5 px-4">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-h-[70vh] overflow-y-auto pb-5 scroll-smooth">
          {filterJobs.length === 0 ? (
            <div className="flex flex-col items-center text-gray-500">
              <span className="text-lg font-semibold">No jobs found</span>
              <p className="text-sm">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filterJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  key={job._id}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
