import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setJobs(res.data.jobs));
        n;
      }
    } catch (err) {
      setError(err.message || "Failed to fetch jobs");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, searchedQuery]);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  return { loading, error, refetch: fetchAllJobs };
};

export default useGetAllJobs;
