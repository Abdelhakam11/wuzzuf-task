import React from 'react';
import "./Layout.styles.css";
import Navbar from '../../components/Navbar/Navbar.component';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return <>
    <Navbar />
    <Outlet></Outlet>
  </>
}
