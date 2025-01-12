import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetJobById = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      console.log('Fetching single job');
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(`return job is: ${JSON.stringify(res.data.job, null, 2)}`);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job)); // Correct action for single job
        }
      } catch (error) {
        console.error('Error fetching job by ID:', error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId]); // Simplified dependency array
};

export default useGetJobById;
