import React, { useEffect, useState } from 'react';
import "./RelatedJobsBoxes.styles.css";
import RelatedJobBox from '../RelatedJobBox/RelatedJobBox.component';


export default function RelatedJobsBoxes ({jobs,skillAttributes,type}) {
  return (
    <div className='related-boxes-container'>
      {type==='skill'?
      <div className="description-container">
        <h3>Description:</h3>
        <p>knowledge of principles and methods for moving people or goods by 
          air, rail, sea, or road, including the relative costs and benefits.</p>
      </div>
      :
      null
      }
      {jobs.map( (job) => <RelatedJobBox key={job.id} id={job.id} skillAttributes={skillAttributes}/>)}   
    </div>
  )
}
