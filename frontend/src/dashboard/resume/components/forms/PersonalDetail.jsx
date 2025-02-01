

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { LoaderCircle } from 'lucide-react';
// import React, { useContext, useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// function PersonalDetail() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

//   const [formData, setFormData] = useState(resumeInfo || {});
//   const [loading, setLoading] = useState(false);
//   const [nextEnabled, setNextEnabled] = useState(false);

//   // Validate form fields
//   const validateForm = (data) => {
//     const requiredFields = ["firstName", "lastName", "jobTitle", "address", "phone", "email"];
//     return requiredFields.every((field) => data[field]?.trim());
//   };

//   useEffect(() => {
//     setNextEnabled(validateForm(formData)); // Enable or disable "Next" button
//   }, [formData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const updatedFormData = { ...formData, [name]: value };

//     setFormData(updatedFormData); // Update local state
//     setResumeInfo(updatedFormData); // Update context state
//   };

//   const onSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Simulated API save logic
//       // Replace this with actual API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       toast.success("Personal details saved successfully!");
//       setLoading(false);
//       navigate(`/resume/${params.resumeId}/next-step`); // Navigate to the next step
//     } catch (error) {
//       toast.error("Failed to save details. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
//       <h2 className="font-bold text-lg">Personal Detail</h2>
//       <p>Get started with your basic information</p>

//       <form onSubmit={onSave}>
//         <div className="grid grid-cols-2 mt-5 gap-3">
//           <div>
//             <label className="text-sm">First Name</label>
//             <Input
//               name="firstName"
//               defaultValue={resumeInfo?.firstName}
//               required
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label className="text-sm">Last Name</label>
//             <Input
//               name="lastName"
//               defaultValue={resumeInfo?.lastName}
//               required
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="text-sm">Job Title</label>
//             <Input
//               name="jobTitle"
//               defaultValue={resumeInfo?.jobTitle}
//               required
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="text-sm">Address</label>
//             <Input
//               name="address"
//               defaultValue={resumeInfo?.address}
//               required
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label className="text-sm">Phone</label>
//             <Input
//               name="phone"
//               defaultValue={resumeInfo?.phone}
//               required
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label className="text-sm">Email</label>
//             <Input
//               name="email"
//               defaultValue={resumeInfo?.email}
//               required
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <div className="mt-5 flex justify-between">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => navigate(-1)} // Navigate back
//           >
//             Back
//           </Button>
//           <Button type="submit" disabled={!nextEnabled || loading}>
//             {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
//             {loading ? "Saving..." : "Save & Next"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default PersonalDetail;

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function PersonalDetail({ onNextStep }) {  // Added onNextStep prop
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState(resumeInfo || {});
  const [loading, setLoading] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  // Validate form fields
  const validateForm = (data) => {
    const requiredFields = ["firstName", "lastName", "jobTitle", "address", "phone", "email"];
    return requiredFields.every((field) => data[field]?.trim());
  };

  useEffect(() => {
    setNextEnabled(validateForm(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    
    setFormData(updatedFormData);
    setResumeInfo(updatedFormData);
  };

  const onSave = async (e) => {
    e.preventDefault();
    if (!nextEnabled) return;
    
    setLoading(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Personal details saved successfully!");
      onNextStep();  // Move to next form section
    } catch (error) {
      toast.error("Failed to save details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName || ''}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName || ''}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle || ''}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData.address || ''}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={formData.phone || ''}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData.email || ''}
              required
              onChange={handleInputChange}
              type="email"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!nextEnabled || loading}
            className="min-w-[120px]"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              'Save & Next'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;