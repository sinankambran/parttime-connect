import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetRecruiterJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.allJobs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecruiterJobs = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${JOB_API_END_POINT}/getrecruiterjobs`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(setAllJobs(response.data.jobs));
      } else {
        throw new Error(
          response.data.message || "Failed to fetch recruiter jobs"
        );
      }
    } catch (err) {
      console.error("Error fetching recruiter jobs:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRecruiterJobs();
  }, [fetchRecruiterJobs]);

  return { jobs, loading, error, refetch: fetchRecruiterJobs };
};

export default useGetRecruiterJobs;
