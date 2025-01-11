import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
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
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
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
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
