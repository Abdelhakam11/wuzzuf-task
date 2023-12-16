import React, { useState } from 'react';
import "./SideBar.styles.css";
import SideBarItem from '../../components/SideBarItem/SideBarItem.component';
import axios from 'axios';
import { useEffect } from 'react';

export default function SideBar({title,handleSearchHistory,sideBarItems,type}) {
  let [displayItems,setDisplayItems]=useState([]);

  
  async function getSkills(){
    let totalJobs=[];
    await sideBarItems.forEach(async({id}) => 
    {
      const {data}= await axios.get(`https://skills-api-zeta.vercel.app/skill/${id}`);
      const apiJobs = data.data.skill.relationships.jobs;
      const currentJobs=[...totalJobs]
      totalJobs=currentJobs.concat(apiJobs);
      const filterTotalJobs = totalJobs.filter( (ele, index) => index === totalJobs.findIndex( elem => elem.id === ele.id))
      setDisplayItems([...filterTotalJobs]);
    });
  }

  useEffect(()=>{
    if(type==='job'){
      getSkills()
    }else if(type==='skill'){
      setDisplayItems(sideBarItems);
    }else if(type==='search'){
      setDisplayItems((JSON.parse(localStorage.getItem('queries')) || [] ).reverse());
    }
  },[type])
  

  return (
    <div className='sidebar-container'>
      <h1>{title}</h1>
      {
        type==='search'?
        <>
          {
            displayItems.map((item,i)=><div key={i} onClick={(e)=>handleSearchHistory(e)} className='sidebar-item-container'>
              {item}
            </div>)
          }
        </>
        :
        <>
          {
            displayItems.map((item)=> <SideBarItem key={item.id} item={item} type={type}/>)
          }
        </>
      }
      
    </div>  
  )
}
