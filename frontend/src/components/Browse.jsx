import React, { useEffect } from "react";
// import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

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
    <div>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="font-bold text-2xl sm:text-3xl text-center sm:text-left my-6">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length > 0 ? (
            allJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">
              No jobs found. Try searching with different criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
