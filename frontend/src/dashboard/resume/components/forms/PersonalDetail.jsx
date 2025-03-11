import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function PersonalDetail({ onNextStep }) {
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
    if (!nextEnabled || loading) return;
  
    if (!resumeInfo?._id) {
      toast.error("Missing resume ID. Please try again.");
      console.error("Error: resumeId is undefined");
      return;
    }
  
    setLoading(true);
    console.log(resumeInfo)
    
    const apiUrl = (`${import.meta.env.VITE_API_BASE_URL}/api/v1/resumes/update/${resumeInfo._id}`);
    console.log("Sending update request to:", apiUrl, formData);
 
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to update resume");
      }
  
      toast.success("Personal details saved successfully!");
      onNextStep && onNextStep();
    } catch (error) {
      console.error("Network or API error:", error);
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
