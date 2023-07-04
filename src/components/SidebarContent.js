import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../Assets/images/logo.png';

export default function SidebarContent() {

  return (
    <div>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title"> <Link to='/dashboard'>
            <span className="icon">
            <i class='bx bxs-dashboard'></i>
                </span>
                <span className='menuTitle'>
               Dashboard
                </span>
            </Link></li>
            <li className="menu-title">
              <Link to="/parking" >
                <span className="icon">
                <i class='bx bxs-parking'></i>
                </span>
                <span className='menuTitle'>
                Slot Availability
                </span>
              </Link>
            </li>
            <li className="menu-title">
              <Link to='/entry'>  
                <span className="icon">
                <i class='bx bxs-bookmark-alt-plus'></i>
                </span>
                <span className='menuTitle'>
                Entry
                </span></Link></li>
            <li className="menu-title"> <Link to="/exit">
            <span className="icon">
            <i class='bx bxs-exit'></i>
                </span>
                <span className='menuTitle'>
                Exit
                </span>
            </Link></li>
          </ul>
        </div>
    </div>
  )
}