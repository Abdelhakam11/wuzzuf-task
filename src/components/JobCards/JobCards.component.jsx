import React from 'react';
import "./JobCards.styles.css";
import JobCard from '../JobCard/JobCard.component';



export default function JobCards({jobs,style}) {
  return (

    <div className={`job-cards-container ${style}`}>
      { jobs.map((job)=> <JobCard job={job} key={job.id}/>)}
    
    </div>
  )
}
