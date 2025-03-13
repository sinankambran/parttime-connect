import React from 'react'
import { useEffect } from 'react';

function ExperiencePreview({ resumeInfo }) {
    console.log({ jasirPottansss: resumeInfo });

    useEffect(() => {
        console.log({ jettyJasir: resumeInfo });
    }, [resumeInfo])

    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >
                Professional Experience</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.experienceList?.map((expr, index) => {
                console.log({ expr });

                return (
                    <div key={expr} className='my-5'>
                        <h2 className='text-sm font-bold'
                            style={{
                                color: resumeInfo?.themeColor
                            }}>{expr?.title}</h2>
                        <h2 className='text-xs flex justify-between'>{expr?.companyName},
                            {expr?.city},
                            {expr?.state}
                            <span>{expr?.startDate} To {expr?.currentlyWorking ? 'Present' : expr.endDate} </span>
                        </h2>
                        {/* <p className='text-xs my-2'>
                            {experience.workSummery}
                        </p> */}

                        <p className='text-xs my-2'>
                            {expr.workSummery}
                        </p>
                    </div>
                );
            })}
        </div>
    )
}

export default ExperiencePreview