import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchAllJobs = async () => {
            if (!user?.token) {
                console.log("No authentication token found.");
                return;
            }

            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${user.token}`,
                        },
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("API Error:", error.response?.data || error.message);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, user?.token]);
};

export default useGetAllJobs;
