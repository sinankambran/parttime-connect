import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY; // Use environment variable


function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, summery }));
  }, [summery, setResumeInfo]);

  const generateSummeryFromAI = async () => {
    try {
      setLoading(true);
      const promptObj = {...resumeInfo};
      delete promptObj.summery;
      delete promptObj.id;

      const promptTemplate =
  `Job Title: {jobTitle}, Based on the job title and the information provided below, provide a summary this candidate. Information candidate provided so far as \`JSON.stringify\`: ${JSON.stringify(promptObj)}
  
  Also follow the below instructions:
  1. Should be pure text as a paragraph, not a markdown style.
  2. Should be first person.
  3. 300 words.`;
  console.log(promptTemplate);
  
      const PROMPT = promptTemplate.replace(
        "{jobTitle}",
        resumeInfo?.jobTitle || "N/A"
      );

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: PROMPT }] }],
        }),
      });
     

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
      // const parsedResult = JSON.parse(rawText);
      console.log({rawText});
      

      setSummery(rawText);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate AI summary.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => { 
    e.preventDefault();
  
    if (loading) return; 
    if (!resumeInfo?._id) {
      toast.error("Missing resume ID. Please try again.");
      console.error("Error: resumeId is undefined", resumeInfo);
      return;
    }
  
    setLoading(true);
  
    const apiUrl = (`${import.meta.env.VITE_API_BASE_URL}/api/v1/resumes/update/${resumeInfo._id}`);
  
    console.log("Updating resume at:", apiUrl, summery);
  
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summery: summery }), 
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to update resume");
      }
  
      toast.success("Summary updated successfully!");
      enabledNext(true); // Ensure next step is enabled
    } catch (error) {
      console.error("Error updating resume:", error);
      toast.error(error.message || "Failed to save summary.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={generateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Brain className="h-4 w-4" /> Generate from AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
{/* 
      {summery && (
        <div className="my-5">
          <div
            className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <p>{summery}</p>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Summery;
