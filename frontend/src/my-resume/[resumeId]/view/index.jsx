import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

function ViewResume() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  console.log({ resumeInfo });


  // Fetch resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/resumes/get/${resumeId}`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
        );
        const data = await response.json();
        console.log(data);
        setResumeInfo(data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  const HandleDownload = () => {
    window.print();
  };

  return (
    <div>
      <div id="no-print">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI-generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and share the unique URL
            with your friends and family.
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>

            {resumeInfo && (
              <RWebShare
                data={{
                  text: "Hello Everyone, this is my resume! Click the URL to view it.",
                  url: `${import.meta.env.VITE_API_BASE_URL}/my-resume/${resumeId}/view`,
                  title: `${resumeInfo.firstName} ${resumeInfo.lastName}'s Resume`,
                }}
                onClick={() => console.log("Shared successfully!")}
              >
                <Button>Share</Button>
              </RWebShare>
            )}
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

export default ViewResume;
