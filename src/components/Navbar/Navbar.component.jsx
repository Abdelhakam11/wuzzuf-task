import React from 'react';
import "./Navbar.styles.css";
import { NavLink } from 'react-router-dom';


export default function Navbar() {

  return (
    <div className='navbar-container'>
      <div className="icon-box">
        <h1>jobsNow</h1>
      </div>
      <ul>
        <li><NavLink end to="/jobs">Home</NavLink></li>
        <li><NavLink end to="/jobs/search">search</NavLink></li>
        <li><NavLink to="/jobs/history">history</NavLink></li>
      </ul>
    </div>
  )
}
