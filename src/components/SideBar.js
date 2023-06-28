import React from 'react'
import './sideBar.scss'
import SidebarContent from './SidebarContent';

// //Import Scrollbar
import SimpleBar from "simplebar-react";
export default function Sidebar() {
  return (
    <React.Fragment>
        <div className='sidebar'>
         <SidebarContent/>
        </div>
      </React.Fragment>
  )
}
