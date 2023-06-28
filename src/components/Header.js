import React from 'react';
import './header.css';
import { Link } from "react-router-dom";
import Logo from '../Assets/images/logo.png';
export default function Header() {

  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
}

  return (
    <div className='header'>
            <div className="d-flex">
            <div className="navbar-brand-box">
             <Link to="/" className="logo logo-light ">
                <span className="logo-lg">
                  <img src={Logo} alt="" height="55" width='55' style={{borderRadius:'50px'}}/>
                </span>

              </Link>

              <span
              type="button"
              className=" px-3 font-size-16 header-item sliderMenu"
              data-toggle="collapse"
              onClick={() =>tToggle()}>
              <i className="fa fa-fw fa-bars" />
            </span>
  </div>
            </div>
      <div className="d-flex" style={{margin:'auto'}}>
      <div>Parking Management</div>
        </div>
    </div>

  )

}