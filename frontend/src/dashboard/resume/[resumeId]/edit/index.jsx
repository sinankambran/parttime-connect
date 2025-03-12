import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import axios from "axios";
import { RESUME_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!resumeId) {
      toast.error("Invalid resume ID. Redirecting...");
      navigate("/dashboard", { replace: true });
      return;
    }
    fetchResumeInfo();
  }, [resumeId]);

  const fetchResumeInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${RESUME_API_END_POINT}/get/${resumeId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
      });

      console.log(response);
      if (response.status == 200) {
        setResumeInfo(response.data);
      } else {
        toast.error(response.data.message || "Failed to fetch resume information.");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
      navigate("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {loading ? (
          <div className="col-span-2 text-center">Loading...</div>
        ) : resumeInfo ? (
          <>
            <FormSection />
            <ResumePreview />
          </>
        ) : (
          <div className="col-span-2 text-center">No resume data available.</div>
        )}
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;