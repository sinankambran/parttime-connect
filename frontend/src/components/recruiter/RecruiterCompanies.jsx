import React, { useState } from "react";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetRecruiterCompany from "@/hooks/useGetRecruiterCompanies";
import { useSelector } from "react-redux";

const Company = () => {
  useGetRecruiterCompany();
  const { company } = useSelector((store) => store.company);
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      {!company && (
        <div className="flex justify-center mt-6">
          <Button
            className="px-6 py-3 text-lg font-medium rounded-xl shadow-md hover:bg-blue-600 transition"
            onClick={() => navigate("/sample-recruiter/create")}
          >
            Register Company
          </Button>
        </div>
      )}

      <div className="mt-8">
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Company;
