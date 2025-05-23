
import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  console.log({ resumeInfoPreviewssssssssss: resumeInfo })

  return (
    <div
      className='shadow-lg h-full p-14 border-t-[20px]'
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      {resumeInfo?.summery && <SummeryPreview resumeInfo={resumeInfo} />}

      {/* Professional Experience */}
      {resumeInfo?.experienceList?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo}/>}

      {/* Education */}
      {resumeInfo?.educationList?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}

      {/* Skills */}
      {resumeInfo?.skillsList?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
    </div>
  );
}

export default ResumePreview;
