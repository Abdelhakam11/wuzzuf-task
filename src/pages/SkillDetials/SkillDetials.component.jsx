import React, { useEffect, useState } from 'react';
import "./SkillDetials.styles.css";
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar.component';
import RelatedJobsBoxes from '../../components/RelatedJobsBoxes/RelatedJobsBoxes.component';
import NoResult from '../../components/NoResult/NoResult.component';


export default function SkillDetials() {
  const {id} = useParams();
  let [jobs,setJobs]= useState([]);
  let [skills,setSkills]= useState([]);
  let [skillAttributes,setAttributes]=useState({});
  let [skillTitle,setSkillTitle]= useState('');
  let [type,setType]= useState('');
  

  
  async function getSkill(){
    try{await fetch(`https://skills-api-zeta.vercel.app/skill/${id}`)
        .then(response => response.json())
        .then(data => {
          setType(data.data.skill.type);
          setSkillTitle(data.data.skill.attributes.name);
          setAttributes(data.data.skill.attributes)
          setJobs(data.data.skill.relationships.jobs);
          setSkills(data.data.skill.relationships.skills);
        });
    }catch{
      setJobs(undefined)
    }
  }

  useEffect(()=>{
    getSkill()
  },[id])

  return (
    <div className='detials-page detials-page'>
      {
      jobs === undefined?
      <NoResult />
      :
      <>
      <div className="title-box">
        <h1 className='page-title'>{skillTitle}</h1>
      </div>
      <div className='skill-detials-container'>
        <RelatedJobsBoxes 
          jobs={jobs}
          type={type} 
          skillAttributes={skillAttributes}/>
          <SideBar title={'Related Skills:'} sideBarItems={skills} type={type}/>
      </div>
      </>
      }
  
    </div>
  )
}
