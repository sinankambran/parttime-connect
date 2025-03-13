
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';
import { useCallback } from 'react';
let PROMPT = `position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array)
Also follow the below instructions:
1. Should be pure text as a paragraph, not a markdown style.
2. Should be first person.
3. 25 words.`;


const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY; // Use environment variable


function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false);
  const GenerateSummeryFromAI = useCallback(async () => {
    console.log(resumeInfo.experienceList);

    if (!resumeInfo?.experienceList[index]?.title) {
      toast('Please Add Position Title');
      return;
    }
    setLoading(true)
    console.log(resumeInfo.experienceList);

    if (resumeInfo?.experienceList.length > 0)
      PROMPT = PROMPT.replace('{positionTitle}', resumeInfo.experienceList?.[index].title);
    console.log(PROMPT);

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

    setValue(rawText);
    setLoading(false);
    let resumeInfoUpdated = resumeInfo;
    resumeInfoUpdated.experienceList[index].workSummery = rawText;
    console.log({
      resumeInfoUpdated
    });


    const apiUrl = (`${import.meta.env.VITE_API_BASE_URL}/api/v1/resumes/update/${resumeInfo._id}`);

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeInfoUpdated),
        credentials: "include",
      });
      const res= await response.json()
      setResumeInfo(resumeInfoUpdated);
      console.log({res});
      

      if (!response.ok) throw new Error("Failed to update resume");

      toast.success("Experience updated successfully!");
    } catch (error) {
      toast.error(error.message || "Error saving experience.");
    } finally {
      setLoading(false);
    }
  }, [resumeInfo, setResumeInfo])

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary">
          {loading ?
            <LoaderCircle className='animate-spin' /> :
            <>
              <Brain className='h-4 w-4' /> Generate from AI
            </>
          }
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e)
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />


          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
