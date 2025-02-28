import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { singleCompany = {} } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  useGetCompanyById(params.id); // Fetch company data when editing

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // Update input fields when singleCompany is available
  useEffect(() => {
    if (params.id && singleCompany?.name) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [params.id, singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !input.name.trim() ||
      !input.description ||
      !input.website ||
      !input.location
    ) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("companyName", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("logo", input.file);

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        const companyId = res.data.company._id;

        // Fetch the newly created/updated company
        const companyRes = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );

        if (companyRes.data.success) {
          dispatch(setSingleCompany(companyRes.data.company));
        } else {
          dispatch(setSingleCompany(null));
          console.warn("Failed to fetch company:", companyRes.data.message);
        }

        toast.success(res.data.message);
        navigate(`/sample-recruiter/${companyId}`);
      } else {
        toast.error(res.data.message || "Failed to register company.");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-5 p-8">
          <Button
            type="button"
            onClick={() => navigate("/sample-recruiter")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">
            {params.id ? "Edit Company" : "Register Company"}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} />
          </div>
        </div>

        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            {params.id ? "Update Company" : "Register Company"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default CompanyCreate;
