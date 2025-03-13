import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Edit2,
  Trash2,
  Globe,
  MapPin,
  AlignLeft,
} from "lucide-react";

const CompanyDetails = () => {
  const { company } = useSelector((store) => store.company);
  const navigate = useNavigate();

  if (!company) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No company details available.
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      console.log("Company deleted:", company._id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-6">
      <div className="w-full md:w-1/4 bg-white shadow-md rounded-2xl p-6 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage
            src={company.file || company.logo || "/default-logo.png"}
            alt={company.name || "Company Logo"}
          />
        </Avatar>
        <CardTitle className="text-xl font-semibold">{company.name || "Company Name"}</CardTitle>
        <p className="text-gray-500 text-sm mt-1">
          Founded: {company.createdAt ? new Date(company.createdAt).toLocaleDateString() : "N/A"}
        </p>

        <div className="mt-6 space-y-3">
          <Button
            onClick={() => navigate(`/sample-recruiter/${company._id}`)}
            className="w-full"
            variant="outline"
            disabled={!company._id}
          >
            <Edit2 className="w-4 mr-2" />
            Edit Company
          </Button>
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 mr-2" />
            Delete Company
          </Button>
        </div>
      </div>
      <div className="w-full md:w-3/4 md:ml-6 mt-6 md:mt-0">
        <Card className="shadow-lg p-6 bg-white rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Company Details</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <h2 className="font-medium">{company.location || "N/A"}</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-gray-500 text-sm">Website</p>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {company.website}
                  </a>
                ) : (
                  <h2 className="font-medium">N/A</h2>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AlignLeft className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-gray-500 text-sm">Description</p>
                <h2 className="font-medium">
                  {company.description || "No description available"}
                </h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDetails;
