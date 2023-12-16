import React, { useEffect, useState } from 'react';
import "./RelatedJobBox.styles.css";
import { Link } from 'react-router-dom';



export default function RelatedJobBox({id,skillAttributes}) {
  let [isLoading,setIsLoading]=useState(true);
  let [job,setJob]=useState({});

  async function getJobs() {
    await fetch(`https://skills-api-zeta.vercel.app/job/${id}`)
      .then(response => response.json())
      .then(data => {
        setJob(data.data.job.attributes)
        setIsLoading(false)
      })
  }

  useEffect(()=>{
    getJobs()
  },[])

  return (
    <div className="related-card-contianer">
        <h3> <Link className='related-heading' to={`/job/${id}`}>{job.title}</Link> </h3>
        <p className='related-subtitle'>the ability to communicate information and ideas in speaking so others will understand.</p>
        <div className="detials-box">
            <div className="detials-item">
                <span className="item-title"><strong>Importance: </strong> {skillAttributes.importance} </span>
            </div>
            <div className="detials-item">
                <span className="item-title"><strong>Level: </strong> {skillAttributes.level} </span>
            </div>
        </div>
    </div>
  )
}
