import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppliedJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAppliedJobs(res.data.application));
      }
    } catch (err) {
      setError(err.message || "Failed to fetch applied jobs");
      console.error("Error fetching applied jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAppliedJobs();
  }, [fetchAppliedJobs]);

  return { loading, error, refetch: fetchAppliedJobs };
};

export default useGetAppliedJobs;
