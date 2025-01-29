import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "react-toastify"; // For showing toast notifications
import { Loader2 } from "lucide-react"; // Loading spinner for the delete action

function ResumeCardItem({ resume, refreshData }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle deletion of the resume
  const onDelete = async () => {
    setLoading(true);
    try {
      // Assuming there's a global API function to delete the resume
      const response = await axios.delete(`/api/resumes/${resume.documentId}`); // Adjust this to your API endpoint
      if (response.data.success) {
        toast.success("Resume deleted successfully!");
        refreshData(); // Refresh the data after deletion
        setOpenAlert(false); // Close the confirmation dialog
      } else {
        toast.error("Failed to delete resume.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the resume.");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };

  return (
    <div>
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4"
          style={{ borderColor: resume?.themeColor }}
        >
          <div className="flex items-center justify-center h-[180px]">
            <img src="/cv.png" width={80} height={80} alt="Resume Icon" />
          </div>
        </div>
      </Link>

      {/* Resume Info Section */}
      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{ background: resume?.themeColor }}
      >
        <h2 className="text-sm">{resume.title}</h2>

        {/* Dropdown Menu for Resume Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="h-4 w-4 cursor-pointer">
              <MoreVertical />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/download`)}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Alert Dialog for Deletion Confirmation */}
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCardItem;
