import React,{useState, useEffect} from 'react'
import Form  from "react-bootstrap/Form";
import { Button, Col, Row,Card, Alert, Container} from 'react-bootstrap';
import './entryPage.css';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import BillModal from './BillModal';


export default function Payment() {
  const[showModal, setShowModal]=useState(false);
  const[ paymentType, setPaymentType]=useState('');
  const[parkId,setParkId]=useState('');
  
  const[bill,setBill]=useState({
    entryId:"",
    entryTime:"",
    vehicleNum:"",
    parkingType:"",
    amount:"",
    hourlyCharge:"",
    paymentType:"",
    totalHour:""


  })
  const[data,setData]=useState();
  const options = [
    { label: 'Cash', value: 'cash' },
    { label: 'Card', value: 'card' },
  ];


  const handleChange=(e)=>{
    setPaymentType(e.value);
   }

   const handleParkIdChange=(e)=>{
    
    setParkId(e.value);
   }

   let navigate=useNavigate();
  
  const handlePayment=(e)=>{
    e.preventDefault();

    let payload={
      "parkId":parkId,
      "paymentType":paymentType,
    }

    console.log("data to be posted in the payment table",payload);
    axios.post('http://localhost:9000/payment/savePayment',payload,
    { "headers": {
      "content-type": "application/json",
  },})
     .then(response => { 
      // Handle the successful response 
      console.log(response); 
      if(response.status==200){
        alert("payment successful");
       // setShowModal(true);
        alert(response.data);
        axios.get(`http://localhost:9000/payment/getPaymentInfoById/${parkId}`,
    { "headers": {
      "content-type": "application/json",
  },})
     .then(response => { 
      // Handle the successful response 

      console.log(response.data); 
      if(response.status==200){
      setData(response.data);
      setShowModal(true);
      }
      else{
        alert("bill generation failed, try again !");
      }

    }) 
      }
      else{
        alert("payment failed");
      }
    }) 
  
      .catch(error => { 
        alert("payment unsuccessful");
         });

  }
  console.log("bill details",data);
  return (
    <div>
       <Card>
            <Card.Header as="h5" className="cardTitle fontFamilyCalibri">Payment</Card.Header>
            <Card.Body>
            <Container fluid >
                <Form >
                    <div className="purpleBar">
                        <Form.Label className="purpleBarText m-t-5rem m-l-10">Payment Details</Form.Label>
                    </div>

                    <Form.Group className='formGroup' >
                        <Form.Label className="headingFont" >
                            Park ID</Form.Label>
                            <span className="asterisk">&#42;</span> :
                            <Form.Control name="parkId" placeholder='Enter Park Id...' value={parkId}  onChange={(event) => setParkId(event.target.value)} size="sm" type="text"  maxLength={30}  />
                    </Form.Group>

                    <Form.Group className='formGroup' >
                        <Form.Label className="headingFont" >
                            Payment Type</Form.Label>
                            <span className="asterisk">&#42;</span> :
                            <Select options={options} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group style={{marginTop:'20px', marginLeft:'77px'}}>
                        <button type="submit" className="btn btn-primary" onClick={handlePayment} disabled={!parkId||!paymentType}>Proceed to payment</button>
                    </Form.Group >
                </Form>
                <BillModal showBillModal = {showModal} setShowBillModal = {setShowModal} data={data} />
  </Container>

            </Card.Body>
            </Card>
    </div>

  )

}