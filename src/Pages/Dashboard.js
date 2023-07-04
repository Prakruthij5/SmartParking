import React,{useState} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import './dashboard.css';
import Form  from "react-bootstrap/Form";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button, Col, Row,Card, Alert, Container} from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';
import axios from 'axios';
import SeatMap from '../components/SeatMap';
ChartJS.register(ArcElement, Tooltip, Legend);


export default function Dashboard() {


  const[ entryGateNo, setEntryGateNo]=useState('');
  const[show, setShow]=useState(false);
const[userData,setUserData]=useState({ labels: [], datasets: [ { label: 'Parking Data', backgroundColor: ['#36A2EB', '#FF6384'], hoverBackgroundColor: ['#36A2EB', '#FF6384'], data: [], }, ], });
const[data,setData]=useState([]);
const [isSwitchOn, setSwitchOn] = useState(false); 
const handleToggle = () => { 
  setSwitchOn(prevState => !prevState);
 };

let slots=[];
const displayChart=(data)=>{
    console.log(data,"display data");
    let available=10000 - data;
     slots = [
      { park: data, count: 10000 },
      { park: available, count: 10000 },
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
useEffect(() => {
   fetchData();
  }, []); 

async function fetchData() { try {
   const response = await axios.get(`http://localhost:9000/parkingDetails/parkingSlotList`);
    const data = response.data;
    console.log(response.data.length) ;
    setData(data);
    displayChart(response.data.length); 
    
  console.log(response.data);
  console.log("data to be passed to seatmap",data);
  // {data.map(item => ( slots.push(item.slotNum) ))}
// slots = data.map(item => item.slotNum);
  } 
    catch (error) { console.error('Error:', error); } 
  
  }


  return (
    <div className='dashboard'>

      <h4>Parking slots</h4>
      <button onClick={handleToggle}> {isSwitchOn ? 'pie Chart' : 'view details'} </button>
      <Container>
    {isSwitchOn && <SeatMap  data = {data}/>} {!isSwitchOn && <Pie data={userData}/> }
      
      {/* <Pie data={userData}/> */}
      </Container>

    

     

    </div>




  )




}