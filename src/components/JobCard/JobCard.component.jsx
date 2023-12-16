import React, { useEffect, useState } from 'react';
import "./JobCard.styles.css";
import { Link } from 'react-router-dom';
import SkillBox from '../SkillBox/SkillBox.component';


export default function JobCard({job}) {
  const skills=job.relationships.skills;
  
  return (
    <div className='job-card-container'>
        <h2 className='related-skills-title'>
            {job.attributes.title}
        </h2>

        <div className="related-skills-container">
            <div className="related-skills-heading">
                <p>Related Skills:</p>
            </div>
            <div className="related-skills-body">
                {
                    skills.map((skill)=> <SkillBox key={skill.id} id={skill.id}/>)
                }
            </div>
        </div>

        <span><Link className="related-skill-subtitle" to={`/job/${job.id}`}>View Job details</Link></span>
    </div>
  )
}
