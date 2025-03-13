import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit2, Eye, MoreHorizontal, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetRecruiterJobs from "@/hooks/useGetRecruiterJobs";

const AdminJobsTable = () => {
  useGetRecruiterJobs();
  const { RecruiterJobs } = useSelector((store) => store.job);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    if (RecruiterJobs) {
      const filtered = RecruiterJobs.filter((job) =>
        searchTerm
          ? job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job?.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      );
      setFilteredJobs(filtered);
    }
  }, [RecruiterJobs, searchTerm]);


  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search jobs..."
            className="pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableCaption>List of Recently Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-gray-50 transition">
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 bg-white shadow-md rounded-md">
                      <div
                        onClick={() => navigate(`/recruiterjobs/${job._id}`)}
                        className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/recruiterjobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-4">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {filteredJobs.length > jobsPerPage && (
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="mx-3 text-gray-600">
            Page {currentPage} of {Math.ceil(filteredJobs.length / jobsPerPage)}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={indexOfLastJob >= filteredJobs.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminJobsTable;
