import React, { useState, useEffect } from "react";
// import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import useGetJobById from "@/hooks/useGetJobById";

const EditJob = () => {
  const params = useParams();
  useGetJobById(params.id);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);

  // Input change handler
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error("Failed to update the job. Please try again.");
      }
    } catch (error) {
      console.error("Error during job update:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experience || "",
        position: singleJob.position || 0,
        companyId: singleJob.companyId || "",
      });
    }
  }, [singleJob]);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center w-screen my-10">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="flex items-center gap-5 p-8">
            <Button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Edit Job</h1>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              "title",
              "description",
              "requirements",
              "salary",
              "location",
              "jobType",
              "experience",
            ].map((field) => (
              <div key={field}>
                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  type="text"
                  name={field}
                  value={input[field]}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
            ))}
            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full my-4 bg-[#3575e2]"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
