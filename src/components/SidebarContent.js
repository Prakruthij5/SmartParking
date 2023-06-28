import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../Assets/images/logo.png';
export default function SidebarContent() {

 
  return (
    <div>
            {/* <div className="navbar-brand-box">
             <Link to="/" className="logo logo-light ">
                <span className="logo-lg">
                  <img src={Logo} alt="" height="55" width='55' style={{borderRadius:'50px'}}/>
                </span>

               
               
              </Link>
            </div> */}
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title"> <Link to='/dashboard'>
            <i className="bx bx-home-circle"></i>
            Dashboard</Link></li>
            <li className="menu-title"> <Link to="/parking">Slot Availability</Link></li>
            <li className="menu-title"> <Link to='/entry'>Entry </Link></li>
            <li className="menu-title"> <Link to="/exit">Exit</Link></li>
           
            
        
          </ul>
        </div>
    </div>
  )
}
