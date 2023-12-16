import React, { useEffect, useState } from 'react';
import "./JobDetials.styles.css";
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar.component';
import RelatedSkillsBoxes from '../../components/RelatedSkillsBoxes/RelatedSkillsBoxes.component';
import NoResult from '../../components/NoResult/NoResult.component';




export default function JobDetials() {
  const {id} = useParams();
  let [skills,setSkills]= useState([]);
  let [jobTitle,setJobTitle]= useState([]);
  let [type,setType]= useState('');

  async function getJob(){
    try{await fetch(`https://skills-api-zeta.vercel.app/job/${id}`)
        .then(response => response.json())
        .then(data => {
          setType(data.data.job.type);
          setJobTitle(data.data.job.attributes.title);
          setSkills(data.data.job.relationships.skills);
        }); 
      }catch{
        setSkills(undefined)
      } 
  }

  useEffect(()=>{
    getJob()
  },[id])

  return (
    <div className='detials-page'>
      {
      skills === undefined?
      <NoResult />
      :
      <>
        <div className="title-box">
        <h1>{jobTitle}</h1>
        </div>
        <div className='job-detials-container'>
          <RelatedSkillsBoxes skills={skills} type={type} />
          <SideBar title={'Related Jobs:'} sideBarItems={skills} type={type}/>
        </div>
      </>
      }
    </div>
  )
}
