import React, { useState } from "react";
import { Loader2, PlusSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RESUME_API_END_POINT } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const validateTitle = (title) => {
    if (!title.trim()) {
      toast.error("Resume title cannot be empty.");
      return false;
    }
    if (title.length < 5) {
      toast.error("Resume title must be at least 5 characters long.");
      return false;
    }
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(title)) {
      toast.error("Resume title can only contain letters, numbers, and spaces.");
      return false;
    }
    return true;
  };

  const onCreate = async () => {
    if (!user) {
      toast.error("Please log in to create a resume.");
      return;
    }

    if (!validateTitle(resumeTitle)) return;

    const uuid = uuidv4();
    const data = {
      title: resumeTitle,
      resumeId: uuid,
      userEmail: user?.email,
      userName: user?.fullname,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${RESUME_API_END_POINT}/create`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        const data = response.data;

        toast.success(data.message || "Resume created successfully!");
        setOpenDialog(false);
        navigate(`/dashboard/resume/${data.data.resumeId}/edit`);
      } else {
        toast.error(data.message || "Failed to create resume.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
        role="button"
        tabIndex={0}
        aria-label="Open Add Resume Dialog"
        onKeyDown={(e) => e.key === "Enter" && setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <Input
                className="my-2"
                placeholder="e.g., Full Stack Developer Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                aria-label="Resume title input"
                aria-describedby="title-error"
              />
              <p id="title-error" className="text-red-500 text-sm">{resumeTitle && !validateTitle(resumeTitle) && "Title must be at least 5 characters and contain only letters, numbers, and spaces."}</p>
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={onCreate}
                className="flex items-center"
                aria-label="Create resume"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
