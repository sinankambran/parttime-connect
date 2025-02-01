

// import React, { useState } from 'react';
// import PersonalDetail from './forms/PersonalDetail';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
// import Summery from './forms/Summery';
// import Experience from './forms/Experience';
// import Education from './forms/Education';
// import Skills from './forms/Skills';
// import { Link, Navigate, useParams } from 'react-router-dom';
// import ThemeColor from './ThemeColor';

// function FormSection() {
//   const [activeFormIndex, setActiveFormIndex] = useState(1);
//   const [enableNext, setEnableNext] = useState(false);
//   const { resumeId } = useParams();

//   const handleNextStep = () => {
//     if (activeFormIndex < 6) {
//       setActiveFormIndex(prev => prev + 1);
//     }
//   };

//   const handlePreviousStep = () => {
//     if (activeFormIndex > 1) {
//       setActiveFormIndex(prev => prev - 1);
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex gap-5">
//           <Link to="/dashboard">
//             <Button variant="outline" size="sm">
//               <Home className="h-4 w-4" />
//             </Button>
//           </Link>
//           <ThemeColor />
//         </div>
//         <div className="flex gap-2">
//           {activeFormIndex > 1 && (
//             <Button 
//               variant="outline" 
//               size="sm" 
//               onClick={handlePreviousStep}
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back
//             </Button>
//           )}
//           {activeFormIndex !== 1 && (
//             <Button
//               size="sm"
//               onClick={handleNextStep}
//               disabled={!enableNext}
//             >
//               Next
//               <ArrowRight className="h-4 w-4 ml-2" />
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Form Sections */}
//       {activeFormIndex === 1 && (
//         <PersonalDetail 
//           onNextStep={handleNextStep} 
//           enabledNext={setEnableNext}
//         />
//       )}
//       {activeFormIndex === 2 && (
//         <Summery 
//           enabledNext={setEnableNext} 
//           onNextStep={handleNextStep}
//         />
//       )}
//       {activeFormIndex === 3 && <Experience />}
//       {activeFormIndex === 4 && <Education />}
//       {activeFormIndex === 5 && <Skills />}
//       {activeFormIndex === 6 && <Navigate to={`/my-resume/${resumeId}/view`} />}
      
//     </div>
//   );
// }

// export default FormSection;

import React, { useState } from 'react';
import PersonalDetail from './forms/PersonalDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();

  const handleNextStep = () => {
    if (activeFormIndex < 6) {
      setActiveFormIndex(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(prev => prev - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-5">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviousStep}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          {activeFormIndex < 6 && (
            <Button
              size="sm"
              onClick={handleNextStep}
              disabled={!enableNext}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Form Sections */}
      {activeFormIndex === 1 && (
        <PersonalDetail 
          onNextStep={handleNextStep} 
          enabledNext={setEnableNext}
        />
      )}
      {activeFormIndex === 2 && (
        <Summery 
          enabledNext={setEnableNext} 
          onNextStep={handleNextStep}
        />
      )}
      {activeFormIndex === 3 && <Experience />}
      {activeFormIndex === 4 && <Education />}
      {activeFormIndex === 5 && <Skills />}
      {activeFormIndex === 6 && <Navigate to={`/my-resume/${resumeId}/view`} />}
    </div>
  );
}

export default FormSection;
