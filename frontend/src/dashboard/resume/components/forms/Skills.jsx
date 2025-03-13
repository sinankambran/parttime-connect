
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'


import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {
    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }])
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        
        if (resumeInfo && resumeInfo.skills) {
            setSkillsList(resumeInfo.skills);
        }
    }, [resumeInfo]);

    

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0
        }])
    }

    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1))
    }

    const onSave = async () => {
        if (loading) return; 
        setLoading(true);
      
        if (!resumeInfo?._id) {
          toast.error("Missing resume ID. Please try again.");
          return;
        }
      
        const data = {
            skillsList: skillsList.map(({ id, ...rest }) => rest),
        };
        console.log(data);
      
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/resumes/update/${resumeInfo._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
          });
      
          const responseData = await response.json();
      
          if (!response.ok) throw new Error(responseData.error || "Failed to update skills");
      
          toast.success("Skills updated successfully!");
        } catch (error) {
          console.error("Error updating skills:", error);
          toast.error(error.message || "Error saving skills.");
        } finally {
          setLoading(false);
        }
      };
      


    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])
    
    

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>

            <div>
                {/* Ensure that skillsList is always an array */}
                {(skillsList && Array.isArray(skillsList)) && skillsList.map((item, index) => (
                    <div className='flex justify-between mb-2 border rounded-lg p-3 ' key={index}>
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input className="w-full"
                                defaultValue={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)} />
                        </div>
                        <div>
                            <label className='text-xs'>Rating</label>
                            <Rating style={{ maxWidth: 120 }} value={item.rating}
                                onChange={(v) => handleChange(index, 'rating', v)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
                    <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>
                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Skills;


