
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import { LoaderCircle } from 'lucide-react';
// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// // import GlobalApi from './../../../../../service/GlobalApi';
// import { toast } from 'sonner';

// function PersonalDetail({enabledNext}) {

//     const params=useParams();
//     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

//     const [formData,setFormData]=useState();
//     const [loading,setLoading]=useState(false);
//     useEffect(()=>{
//         console.log("---",resumeInfo)
//     },[])

//     const handleInputChange=(e)=>{
//         enabledNext(false)
//         const {name,value}=e.target;

//         setFormData({
//             ...formData,
//             [name]:value
//         })
//         setResumeInfo({
//             ...resumeInfo,
//             [name]:value
//         })
//     }

//     const onSave=(e)=>{
//         e.preventDefault();
//         setLoading(true)
//         const data={
//             data:formData
//         }
//         // GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
//         //     console.log(resp);
//         //     enabledNext(true);
//         //     setLoading(false);
//         //     toast("Details updated")
//         // },(error)=>{
//         //     setLoading(false);
//         // })
        
//     }
//   return (
//     <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//         <h2 className='font-bold text-lg'>Personal Detail</h2>
//         <p>Get Started with the basic information</p>

//         <form onSubmit={onSave}>
//             <div className='grid grid-cols-2 mt-5 gap-3'>
//                 <div>
//                     <label className='text-sm'>First Name</label>
//                     <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}  />
//                 </div>
//                 <div>
//                     <label className='text-sm'>Last Name</label>
//                     <Input name="lastName" required onChange={handleInputChange} 
//                     defaultValue={resumeInfo?.lastName} />
//                 </div>
//                 <div className='col-span-2'>
//                     <label className='text-sm'>Job Title</label>
//                     <Input name="jobTitle" required 
//                     defaultValue={resumeInfo?.jobTitle}
//                     onChange={handleInputChange}  />
//                 </div>
//                 <div className='col-span-2'>
//                     <label className='text-sm'>Address</label>
//                     <Input name="address" required 
//                     defaultValue={resumeInfo?.address}
//                     onChange={handleInputChange}  />
//                 </div>
//                 <div>
//                     <label className='text-sm'>Phone</label>
//                     <Input name="phone" required 
//                     defaultValue={resumeInfo?.phone}
//                     onChange={handleInputChange}  />
//                 </div>
//                 <div>
//                     <label className='text-sm'>Email</label>
//                     <Input name="email" required 
//                     defaultValue={resumeInfo?.email}
//                     onChange={handleInputChange}  />
//                 </div>
//             </div>
//             <div className='mt-3 flex justify-end'>
//                 <Button type="submit"
//                 disabled={loading}>
//                     {loading?<LoaderCircle className='animate-spin' />:'Save'}
//                     </Button>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default PersonalDetail

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function PersonalDetail() {
  const params = useParams();
  const navigate = useNavigate();
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
    setNextEnabled(validateForm(formData)); // Enable or disable "Next" button
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData); // Update local state
    setResumeInfo(updatedFormData); // Update context state
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulated API save logic
      // Replace this with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Personal details saved successfully!");
      setLoading(false);
      navigate(`/resume/${params.resumeId}/next-step`); // Navigate to the next step
    } catch (error) {
      toast.error("Failed to save details. Please try again.");
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
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              defaultValue={resumeInfo?.lastName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              defaultValue={resumeInfo?.address}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              defaultValue={resumeInfo?.phone}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              defaultValue={resumeInfo?.email}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)} // Navigate back
          >
            Back
          </Button>
          <Button type="submit" disabled={!nextEnabled || loading}>
            {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
            {loading ? "Saving..." : "Save & Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;

