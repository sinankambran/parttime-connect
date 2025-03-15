import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Briefcase, MapPin, DollarSign, Calendar, Users } from "lucide-react"; 

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        toast.error("Failed to load job details.");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {singleJob?.title || "Job Title"}
        </h1>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`mt-4 sm:mt-0 px-6 py-2 rounded-lg text-white font-medium transition ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-blue-100 text-blue-800">
          {singleJob?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-red-800">{singleJob?.jobType}</Badge>
        <Badge className="bg-green-100 text-green-800">
          {singleJob?.salary} LPA
        </Badge>
      </div>

      <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Job Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-3">
            <Briefcase className="text-gray-500" size={22} />
            <div>
              <p className="text-gray-600">Role</p>
              <p className="text-gray-800 font-medium">
                {singleJob?.title || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-gray-500" size={22} />
            <div>
              <p className="text-gray-600">Location</p>
              <p className="text-gray-800 font-medium">
                {singleJob?.location || "Remote"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="text-gray-500" size={22} />
            <div>
              <p className="text-gray-600">Salary</p>
              <p className="text-gray-800 font-medium">
                {singleJob?.salary ? `${singleJob.salary} LPA` : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="text-gray-500" size={22} />
            <div>
              <p className="text-gray-600">Total Applicants</p>
              <p className="text-gray-800 font-medium">
                {singleJob?.applications?.length || 0}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="text-gray-500" size={22} />
            <div>
              <p className="text-gray-600">Posted On</p>
              <p className="text-gray-800 font-medium">
                {singleJob?.createdAt
                  ? singleJob.createdAt.split("T")[0]
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
        <p className="text-gray-700 mt-2">
          {singleJob?.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
