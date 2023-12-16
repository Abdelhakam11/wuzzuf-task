import React from 'react';
import "./SearchBox.styles.css";


export default function SearchBox({searchRef,handleSubmit,handleAutoComplete,handleSearch,searchJobs=[],query=''}) {
  
  return (
    <div className='search-box-container'>
      <form 
        action='/jobs/search' 
        onSubmit={handleSubmit}
        >
          
        <input  
          autoComplete="off" 
          id='search-bar' 
          value={query} 
          className="job-search" 
          type="search" 
          placeholder="Search..." 
          onChange={(e)=>handleSearch(e.target.value.toLowerCase())}
          />

        <input  type="submit" value=""/>

        <div ref={searchRef} id='autocomplete-box' className={searchJobs.length===0 || query==='' ? `hide-box` : `autocomplete-box`}>
          { 
          searchJobs.map((job)=> {
          return (<div 
            onClick={(e)=>handleAutoComplete(e)} 
            className='autocomplete-item' 
            key={job.id}>
              {job.attributes.title.toLowerCase()}
          </div>)
          })
          }
        </div>

      </form>
    </div>
  )
}
