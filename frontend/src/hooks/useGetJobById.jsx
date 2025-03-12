import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const useGetJobById = (jobId) => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.singleJob);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSingleJob = useCallback(async () => {
    if (!jobId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });

      console.log(`Fetched job: ${JSON.stringify(res.data.job, null, 2)}`);

      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
      }
    } catch (err) {
      setError(err.message || "Failed to fetch job");
      console.error("Error fetching job by ID:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, jobId]);

  useEffect(() => {
    fetchSingleJob();
  }, [fetchSingleJob]);

  return { job, loading, error, refetch: fetchSingleJob };
};

export default useGetJobById;
