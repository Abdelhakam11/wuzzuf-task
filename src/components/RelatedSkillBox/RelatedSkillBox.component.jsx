import React, { useEffect, useState } from 'react';
import "./RelatedSkillBox.styles.css";
import { Link } from 'react-router-dom';
import JobCardSkeleton from '../../skeleton/JobCardSkeleton/JobCardSkeleton.component';


export default function RelatedSkillBox({id,type}) {
  let [isLoading,setIsLoading]=useState(true);
  let [skill,setSkill]=useState({});

  async function getSkills() {
    await fetch(`https://skills-api-zeta.vercel.app/skill/${id}`)
      .then(response => response.json())
      .then(data => {
        setSkill(data.data.skill.attributes);
        setIsLoading(false)
      })
  }

  useEffect(()=>{
    getSkills()
  },[])

  return (
    <div className="related-card-contianer">
    {
      isLoading?
      <>
        <JobCardSkeleton />
      </>
      :
      <>
        <h3> <Link className='related-heading' to={type==='job'?`/skill/${id}`:`/job/${id}`}>{skill.name}</Link> </h3>
        <p className='related-subtitle'>the ability to communicate information and ideas in speaking so others will understand.</p>
        <div className="detials-box">
            {type==='job'?
            <div className="detials-item">
                <span className="item-title"><strong>Type:</strong> {skill.type} </span>
            </div>
            : null}
            
            <div className="detials-item">
                <span className="item-title"><strong>Importance: </strong> {skill.importance}</span>
            </div>
            <div className="detials-item">
                <span className="item-title"><strong>Level: </strong> {skill.level}</span>
            </div>
        </div>
      </>
    }
    </div>
  )
}
