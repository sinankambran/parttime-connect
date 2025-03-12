
import { setRecruiterJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetRecruiterJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchRecruiterJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getrecruiterjobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setRecruiterJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        }
        fetchRecruiterJobs();
    },[dispatch]);
}

export default useGetRecruiterJobs
