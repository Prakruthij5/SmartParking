import React,{useState} from 'react'

// import SideBar from '../components/SideBar';

// import {Bar, Doughnut, Radar, Scatter, PolarArea, Pie} from "react-chartjs-2";
import { IoIosArrowDown } from "react-icons/io";
import './dashboard.css';
import Form  from "react-bootstrap/Form";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button, Col, Row,Card, Alert, Container} from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';
import axios from 'axios';




ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {

  const[ entryGateNo, setEntryGateNo]=useState('');
  const[show, setShow]=useState(false);
const[userData,setUserData]=useState({ labels: [], datasets: [ { label: 'Parking Data', backgroundColor: ['#36A2EB', '#FF6384'], hoverBackgroundColor: ['#36A2EB', '#FF6384'], data: [], }, ], });
  // const data = [
  //   { slots: 2497, count: 4000 },
  //   { slots: 550, count: 4000 },
  // ];


 

let slots=[];
const displayChart=(data)=>{
    console.log(data,"display data");
    let available=2500 - data;
     slots = [
      { park: data, count: 2500 },
      { park: available, count: 2500 },
    ];
   setUserData({
      labels:slots.map((slot)=>slot.park),
      datasets: [
    
          {
    
          label:slots.Occupied,
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: [ '#36A2EB', '#FF6384'],
          data:slots.map((slot)=>slot.park),
      },
    
      ],
    
    },)
    
}
const handleSelect=(gate)=>{
 setEntryGateNo(gate);
  setShow(false);
  console.log("api call for number of slots");
 
axios.get(`http://localhost:9000/parkingDetails/available/${gate}`) 
.then(response => { 
  // Handle the successful response
  if (response.status==200){
    displayChart(response.data);
  }
    
  }) 
   .catch(error => {
     // Handle the error
      console.error(error); });
}


  return (

    <div className='dashboard'>
      
      {/* <SideBar/> */} 

      <Form>
        <Form.Group as={Row} className='row'>
        <Form.Label column md={{ span: 5, offset: 0 }} lg={5} sm={5} className="headingFont control" >

Entry Gate No

  <span className="asterisk">&#42;</span> :
  <div className="dropdown-container " style={{backgroundColor:'white',  width:'200px', padding:'5px'}}>
  <div className="selected-item" style={{display:'flex', justifyContent:'space-between'}} onClick={() => setShow(!show)}>
    {entryGateNo || <div >Select Gate No</div>}

    <IoIosArrowDown/>

  </div>
    {show && (
      <div className="dropdown-options dropDown">
        {[1,2,3,4].map((gate, index) => (
          <div
            key={index}
            className="dropdown-option"
            style={{cursor:'pointer', marginTop:'5px', justifyItems:'center'}}
            onClick={() => { handleSelect(gate)}}

          >

            Gate No {gate}

          </div>

        ))}

      </div>

    )}

  </div>

  </Form.Label>
        </Form.Group>
      </Form>
      <Pie data={userData}/>
    </div>

  )

}