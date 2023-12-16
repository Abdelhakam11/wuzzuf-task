import React, { useEffect } from 'react';
import "./RelatedSkillsBoxes.styles.css";
import RelatedSkillBox from '../RelatedSkillBox/RelatedSkillBox.component';


export default function RelatedSkillsBoxes({jobTitle,skills,type}) {

  return (
    <div className='related-boxes-container'>
      {skills.map( (skill) => <RelatedSkillBox key={skill.id} id={skill.id} type={type} />)}  
    </div>
  )
}
