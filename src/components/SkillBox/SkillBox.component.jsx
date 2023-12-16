import React, { useEffect, useState } from 'react';
import "./SkillBox.styles.css";



export default function SkillBox({id}) {
  let [skillName,setSkillName]=useState('');
  async function getSkills() {
    await fetch(`https://skills-api-zeta.vercel.app/skill/${id}`)
      .then(response => response.json())
      .then(data => {
        setSkillName(data.data.skill.attributes.name);
      })
  }
  useEffect(()=>{
    getSkills()
  },[])
  return (
    <div className="related-skill">
      <span className="skill-title">{skillName}</span>
    </div>
  )
}
