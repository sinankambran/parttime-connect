import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-5 rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start'
        >
            <div className='flex-1'>
                <div className='mb-2'>
                    <h1 className='font-semibold text-lg text-gray-800'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
                <div className='mb-4'>
                    <h1 className='font-bold text-xl text-gray-900 mb-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
                </div>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4 sm:mt-0'>
                <Badge className='text-blue-700 font-bold bg-blue-50' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-red-600 font-bold bg-red-50' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-purple-700 font-bold bg-purple-50' variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
