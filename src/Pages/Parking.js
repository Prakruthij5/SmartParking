import React,{useState} from 'react'
import Form  from "react-bootstrap/Form";
import { Button, Col, Row,Card, Alert, Container} from 'react-bootstrap';
import './entryPage.css';
import axios from 'axios';
import { IoIosArrowDown } from "react-icons/io";
import './parking.css';


export default function Parking() {

  const[ vehicleType, setVehicleType]=useState('');
  const[ entryGateNo, setEntryGateNo]=useState('');
  const[ userId, setUserId]=useState('');
  const[isOpen, setIsOpen] = useState(false);
  const[show, setShow]=useState(false);

  // Handle Change
  const handleChange=(e)=>{
    setUserId(e.target.value);
  }

  // Handle Select Vehicle Type
  const handleSelect = (type) => {
    setVehicleType(type);
    setIsOpen(false);
  };

  // Handle Check slot
  const handleCheckSlot=(e)=>{
    e.preventDefault();

    // payload for parking tale reserve

    const payload=JSON.stringify({
      "parkingType": vehicleType,
      "entranceNum":entryGateNo,
      "userId":userId,
    })

    //call Post to post data into Parking Table

    console.log('check availability logic', payload);
    axios.post('http://localhost:9000/parkingDetails/saveParkingInfo', payload, {
      "headers": {
          "content-type": "application/json",

      }, }).then(function (response)
      {
         if (response.status === 200) {
          alert(response.data);
          console.log(response);
        }
        else{
          alert("slot checking failed !");
        }
      })
  }

  const isFormValid = userId && vehicleType && entryGateNo;
  return (
    <div className='entryPage'>
       {/* Park ID ad Vehical no */}
       <Card className='card'>
            <Card.Header as="h5" className="cardTitle fontFamilyCalibri">Check Available Slot</Card.Header>
            <Card.Body>
            <Container fluid>
                <Form style={{backgroundColor:'rgba(20, 104, 197 , 0.1)',height:'340px'}}>
                    <div className="purpleBar">
                        {/* <Form.Label className="purpleBarText m-t-5rem m-l-10">User Details</Form.Label> */}
                    </div>
                  
                    <Form.Group as={Row} className='row'>
                    <Form.Label column md={{ span: 5, offset: 0 }} lg={5} sm={5}  className="headingFont control" >
                           User ID
                            <span className="asterisk">&#42;</span> :
                            <Form.Control placeholder='Enter user Id...' name="vehicleNo" value={userId} onChange={handleChange} size="sm" type="text"  maxLength={30}  className=' alarmHeight' />
                      </Form.Label>    
                      </Form.Group>
                    
                    <Form.Group as={Row} className='row'>
                      <Form.Label column md={{ span: 12, offset: 0 }} lg={12} sm={12}  className="headingFont control" >
                            Vehicle Type
                            <span className="asterisk">&#42;</span> :

  

  
                            <div className="dropdown-container " style={{backgroundColor:'white',  width:'200px', padding:'10px'}}>
                            <div className="selected-item" style={{display:'flex', justifyContent:'space-between'}} onClick={() => setIsOpen(!isOpen)}>
                              {vehicleType || <div >Select Type</div>}
                              <IoIosArrowDown/>
                            </div>
                              {isOpen && (
                                <div className="dropdown-options dropDown">
                                  {['Large', 'Compact', 'Handicrap', 'Two Wheeler'].map((type, index) => (
                                    <div
                                      key={index}
                                      className="dropdown-option"
                                      style={{cursor:'pointer', marginTop:'5px', justifyItems:'center'}}
                                      onClick={() => handleSelect(type)}
                                    >
                                      {type}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                                  
                      </Form.Label>


                      <Form.Label column md={{ span: 5, offset: 0 }} lg={5} sm={5} className="headingFont control" >
                          Entry Gate No
                            <span className="asterisk">&#42;</span> :
                            <div className="dropdown-container " style={{backgroundColor:'white',  width:'200px', padding:'10px'}}>
                            <div className="selected-item" style={{display:'flex', justifyContent:'space-between'}} onClick={() => setShow(!show)}>
                              {entryGateNo || <div >Select Type</div>}
                              <IoIosArrowDown/>
                            </div>
                              {show && (
                                <div className="dropdown-options dropDown">
                                  {[1,2,3,4].map((gate, index) => (
                                    <div
                                      key={index}
                                      className="dropdown-option"
                                      style={{cursor:'pointer', marginTop:'5px', justifyItems:'center'}}
                                      onClick={() => {setEntryGateNo(gate);setShow(false)}}
                                    >
                                      Gate No {gate}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>


                            </Form.Label>
                      
                    </Form.Group>

                    <Form.Group as={Row} className='row'>
                     
              
                      
                     
                    </Form.Group>
                    
                    <Form.Group as={Row} className='row'>
                      
                            <Button onClick={handleCheckSlot} size="sm" type="Submit" variant="primary" disabled={!isFormValid}>Check Available Slot</Button> 
                          
                           
                       
                    </Form.Group>               
      </Form>

               
  </Container>
            </Card.Body>
            </Card>
     
    </div>
  )
}
