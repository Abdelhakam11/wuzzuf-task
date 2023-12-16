import React from 'react';
import "./JobCardSkeleton.styles.css";




export default function JobCardSkeleton() {

  
  return (
    <div className='job-card-container-skeleton'>
        <h2 className='related-skills-title-skeleton'>
        </h2>

        <div className="related-skills-container-skeleton">
            <div className="related-skills-heading-skeleton">
            </div>
            <div className="related-skills-body-skeleton">
            </div>
        </div>

        <span className="related-skill-subtitle-skeleton" ></span>
    </div>
  )
}
