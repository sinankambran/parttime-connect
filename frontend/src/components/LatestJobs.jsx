import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job) || { allJobs: [] };

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-3xl md:text-4xl font-bold text-center mb-10'>
                <span className='text-[#3575e2]'>Latest & Top </span> Job Openings
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {allJobs?.length > 0 ? (
                    allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                ) : (
                    <span className='text-center col-span-full text-gray-500'>No Job Available</span>
                )}
            </div>
        </div>
    );
};
export default LatestJobs;
