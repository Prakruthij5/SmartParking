import React,{useState} from 'react'
import Form  from "react-bootstrap/Form";
import { Button, Col, Row,Card, Alert, Container, Modal} from 'react-bootstrap';
import './entryPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BillModal from './BillModal';

export default function ExitPage() {

  const[ vehicleNo, setVehicleNo]=useState('');
  const[vehicleType, setVehicleType]=useState('');
  const[entryTime, setEntryTime]=useState('');
  const [rates, setRate] = useState({ compact: 20, Handicrap: 10, Large: 30, TwoWheeler: 15  });
 


  const[parkId,setParkId]=useState('');
  const handleChange=(e)=>{
    setParkId(e.target.value);
  }

  let navigate=useNavigate();
  let data;
  const handleExit= async(e)=> {
    e.preventDefault();
    axios.post('http://localhost:9000/exit/saveExitInfo',{parkId},
    { "headers": {
      "content-type": "application/json",
  },})
     .then(response => { 
      navigate('/payment');
      // Handle the successful response 

      console.log(response); 
      if(response.status==200){
        
     
        alert(response.data);


      }
    }) 

  }


  const isParkIdEmpty = parkId.trim() === '';
return (
  <div>
     {/* Park ID ad Vehical no */}
     <Card>
          <Card.Header as="h5" className="cardTitle fontFamilyCalibri">Exit page</Card.Header>
          <Card.Body>
          <Container fluid>
              <Form>
                  <div className="purpleBar">
                  </div>
                  <Form.Group className='formGroup' >
                      <Form.Label className="headingFont" >
                          PARK ID</Form.Label>
                          <span className="asterisk">&#42;</span> :
                          <Form.Control  placeholder='Enter Park ID...' name="parkId" value={parkId} onChange={handleChange} size="sm" type="text"  maxLength={30}  />
      </Form.Group>

      <Form.Group style={{marginTop:'20px', marginLeft:'77px'}}>
  <button type="submit" className="btn btn-primary" onClick={handleExit} disabled={isParkIdEmpty}>
                      Exit Parking
                  </button>
</Form.Group >
              </Form>     

</Container>
          </Card.Body>
          </Card>
  </div>

)
}
