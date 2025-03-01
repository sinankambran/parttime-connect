import React, { useEffect, useState } from "react";
// import Navbar from '../shared/Navbar'
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetRecruiterCompanies from "@/hooks/useGetRecruiterCompanies";
import { useDispatch, useSelector } from "react-redux";

const Company = () => {
  useGetRecruiterCompanies();
  const { company } = useSelector((store) => store.company);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      {/* <Navbar /> */}
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          {!company && (
            <Button onClick={() => navigate("/sample-recruiter/create")}>
              New Company
            </Button>
          )}
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Company;
