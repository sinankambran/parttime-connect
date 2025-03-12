import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetRecruiterCompany from "@/hooks/useGetRecruiterCompanies";
import { useDispatch, useSelector } from "react-redux";

const Company = () => {
  useGetRecruiterCompany();
  const { company } = useSelector((store) => store.company);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      {/* <Navbar /> */}
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5 ">
          <Input
            className="w-full sm:w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          {!company && (
            <Button className="flex flex-col items-center gap-4 my-5" onClick={() => navigate("/sample-recruiter/create")}>
              Register Company
            </Button>
          )}
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Company;
