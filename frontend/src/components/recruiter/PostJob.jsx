import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

const PostJob = () => {
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
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value.trimStart() });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !input.title ||
      !input.description ||
      !input.requirements ||
      !input.salary ||
      !input.location ||
      !input.jobType ||
      !input.experience ||
      input.position <= 0 ||
      !input.companyId
    ) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiterjobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="flex items-center gap-5 p-8">
            <Button
              type="button"
              onClick={() => navigate("/recruiterjobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Post New Job</h1>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Description", name: "description", type: "text" },
              { label: "Requirements", name: "requirements", type: "text" },
              { label: "Salary", name: "salary", type: "text" },
              { label: "Location", name: "location", type: "text" },
              { label: "Job Type", name: "jobType", type: "text" },
              { label: "Experience Level", name: "experience", type: "text" },
              { label: "No of Positions", name: "position", type: "number" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <Label>{label}</Label>
                <Input
                  type={type}
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
              </div>
            ))}

            {companies.length > 0 ? (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-red-600 font-bold my-3 col-span-2 text-center">
                *Please register a company before posting a job.
              </p>
            )}
          </div>

          <Button type="submit" className="w-full my-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </>
            ) : (
              "Post New Job"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
