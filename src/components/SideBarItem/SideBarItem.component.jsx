import React, { useEffect, useState } from 'react';
import "./SideBarItem.styles.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function SideBarItem({item,type}) {
  let[idItem ,setIdItem]= useState('');
  let[itemName ,setItemName]= useState('');

  async function getJobs(){
    const {data}= await axios.get(`https://skills-api-zeta.vercel.app/job/${item.id}`)
    setIdItem(data.data.job.id)
    setItemName(data.data.job.attributes.title);
  }
  async function getSkills(){
    const {data}= await axios.get(`https://skills-api-zeta.vercel.app/skill/${item.id}`)
    setIdItem(data.data.skill.id)
    setItemName(data.data.skill.attributes.name);
  }
  useEffect(()=>{
    if(type==='job'){
      getJobs()
    }else if(type==='skill'){
      getSkills()
    }else if(type==='search'){
      setItemName()
    }
  },[])

  return (
    <div className='sidebar-item-container'>
      {
        type==='job'?
        <Link className='sidebar-link' to={`/job/${idItem}`}>{itemName}</Link>
        :
        <Link className='sidebar-link' to={`/skill/${idItem}`}>{itemName}</Link>
      }
    </div>
  )
}
