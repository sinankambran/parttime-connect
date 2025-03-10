import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience() {
  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      resumeInfo?.Experience &&
      Array.isArray(resumeInfo.Experience) &&
      resumeInfo.Experience.length > 0
    ) {
      setExperinceList(resumeInfo.Experience);
    }
  }, [resumeInfo]); // Fix the dependency array

  const handleChange = useCallback((index, event) => {
    setExperinceList((prev) => {
      const newEntries = [...prev];
      newEntries[index] = {
        ...newEntries[index],
        [event.target.name]: event.target.value,
      };
      return newEntries;
    });
  }, []);

  const AddNewExperience = useCallback(() => {
    setExperinceList((prev) => [...prev, { ...formField }]);
  }, []);

  const RemoveExperience = useCallback(() => {
    setExperinceList((prev) => prev.slice(0, -1));
  }, []);

  const handleRichTextEditor = useCallback((e, name, index) => {
    setExperinceList((prev) => {
      const newEntries = [...prev];
      newEntries[index] = { ...newEntries[index], [name]: e.target.value };
      return newEntries;
    });
  }, []);

  useEffect(() => {
    setResumeInfo((prev) => {
      if (JSON.stringify(prev.Experience) !== JSON.stringify(experinceList)) {
        return { ...prev, Experience: experinceList };
      }
      return prev;
    });
  }, [experinceList, setResumeInfo]);

  const onSave = useCallback(
    async (e) => {
      e.preventDefault();

      if (loading) return;
      if (!resumeInfo?._id) {
        toast.error("Missing resume ID. Please try again.");
        console.error("Error: resumeId is undefined", resumeInfo);
        return;
      }

      setLoading(true);

      const apiUrl =(`${import.meta.env.VITE_BASE_URL}/api/v1/resumes/update/${resumeInfo._id}`);

      console.log("Updating resume at:", apiUrl, experinceList);

      try {
        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ experinceList }), 
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to update resume");

        toast.success("Experience updated successfully!");
      } catch (error) {
        toast.error(error.message || "Error saving experience.");
      } finally {
        setLoading(false);
      }
    },
    [loading, resumeInfo?._id, experinceList]
  );

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experinceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    value={item.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    value={item.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    value={item.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item.workSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
