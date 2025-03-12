import React, { useState } from "react";
// import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector, useDispatch } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        setUploading(true);
        const res = await axios.post(
          `${USER_API_END_POINT}/profile/avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setUser(res.data.user)); // Update Redux state with new user data
          toast.success("Profile picture updated successfully!");
        } else {
          toast.error("Failed to update profile picture.");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 relative group">
              {user?.profile?.avatar ? (
                <AvatarImage src={user.profile.avatar} alt="Profile" />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gray-300">
                  <span className="text-xl font-bold text-white">U</span>
                </div>
              )}
              <label
                htmlFor="avatarUpload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                {uploading ? "Uploading..." : "Change"}
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
                disabled={uploading}
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-xl">
                {user?.fullname || "User Name"}
              </h1>
              <p className="text-gray-600">
                {user?.profile?.bio || "No bio available."}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Pen />
            Edit
          </Button>
        </div>

        {/* Contact Details */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <Mail />
            <span>{user?.email || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber || "Not provided"}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h1 className="text-lg font-semibold">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-600">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600">No skills added.</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <Label className="text-md font-semibold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {user.profile.resumeOriginalName || "Download Resume"}
            </a>
          ) : (
            <span className="text-gray-600">No resume uploaded.</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6">
        <h1 className="font-bold text-xl mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
