import React,{useState, useEffect} from 'react'
import Form  from "react-bootstrap/Form";
import { Button, Col, Row,Card, Alert, Container} from 'react-bootstrap';
import './entryPage.css';
import axios from 'axios';

export default function EntryPage() {

  
  const[ vehicleType, setVehicleType]=useState('compact');
  const [data, setData] = useState('');
  const [parkIdEmpty, setParkIdEmpty] = useState(true);
  const [vehicleNoEmpty, setVehicleNoEmpty] = useState(true);
  // const[ entryGateNo, setEntryGateNo]=useState('4');
 
  const[state,setState]=useState({

    vehicleNo:'',
    vehicleType:'fetch',
    parkId:"",
    entryGateNO:'fetch'
  });
   



  useEffect(() => { 
  //  fetchData();
   });

   let parkId=state.parkId;
  const fetchData=async()=>{ 
    //  wrie call to fetch the Vehicle Type and Entry Gate No
    console.log("fetchData data function");
    await axios.get(`http://localhost:9000/parkingDetails/getParkingSlotById/${parkId}` , {
      "headers": {
          "Authorization": "Bearer " ,
      }

  })
      .then(function (response) {
          if (response.status === 200) {
           console.log("from the call",response.data);
           setData(response.data);
          }
          else {
         console.log(response.status);
          }

      })
      .catch(function (error) {


      });
  }

  const handleChange=(e)=>{
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value?.trim()
  }))
  if (e.target.name === 'parkId') {
    setParkIdEmpty(e.target.value.trim() === '');
  } else if (e.target.name === 'vehicleNo') {
    setVehicleNoEmpty(e.target.value.trim() === '');
  }
  }

  const handleAddNewEntry=async(e)=>{
    console.log("entry calll");
    
      e.preventDefault();
      const userData = {
        "parkId": state.parkId,
        "vehicleNum": state.vehicleNo,
      };
      console.log("userdata",userData);
      if (!parkIdEmpty && !vehicleNoEmpty) {
        const userData = {
          parkId: state.parkId,
          vehicleNum: state.vehicleNo,
        };
      }
      try {
        const response = await fetch('http://localhost:9000/entryInfo/saveEntryInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  

        if (response.ok) {
          // User created successfully
          alert("slot booked successfully");
          
        } else {
         alert("slot booking failed, try again.");
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    

  }
  const handleCancel=()=>{
    console.log('cancel logic')
    if (!parkIdEmpty || !vehicleNoEmpty) {
      console.log('cancel logic');
    } else {
      alert('Please fill in all the required fields.');
    }
    
  }
console.log(data);

  return (
    <div className='entryPage'>
       {/* Park ID ad Vehical no */}
       <Card className='card'>
            <Card.Header as="h5" className="cardTitle fontFamilyCalibri">Add New Entry</Card.Header>
            <Card.Body>
            <Container fluid>
                <Form style={{height:'340px'}}>
                    <div className="purpleBar">
                        {/* <Form.Label className="purpleBarText m-t-5rem m-l-10">User Details</Form.Label> */}
                    </div>
                  
                    
                    <Form.Group as={Row} className='row'>
                      <Form.Label column md={{ span: 5, offset: 0 }} lg={5} sm={5}  className="headingFont" >
                            Park ID
                            <span className="asterisk">&#42;</span> :
                            <Form.Control  placeholder='Enter Park ID...' name="parkId" value={state.parkId} onChange={handleChange} size="sm" type="text"  maxLength={30} className=' alarmHeight'  />
                      </Form.Label>

                      <Form.Label column md={{ span: 5, offset: 0 }} lg={5} sm={5}  className="headingFont" >
                           Vehicle No
                            <span className="asterisk">&#42;</span> :
                            <Form.Control placeholder='Enter Vehicle No...' name="vehicleNo" value={state.vehicleNo} onChange={handleChange} size="sm" type="text"  maxLength={30}  className=' alarmHeight' />
                      </Form.Label>
                    </Form.Group>

                    {/* <Form.Group as={Row} className='row'> */}
                     
                    {/* <Form.Label column md={{ span: 5, offset: 0 }} lg={5} sm={5} className="headingFont" >
                           Parking Type
                            <span className="asterisk">&#42;</span> 
                            <Form.Control name="vehicleType" value={state.vehicleType} disabled size="sm" type="text"  maxLength={30}  className=' alarmHeight' />
                            
                            </Form.Label>
                            <Form.Label column md={{ span: 5, offset: 0 }} lg={5} sm={5} className="headingFont" >
                           Entry Gate
                            <span className="asterisk">&#42;</span> :
                            <Form.Control  name="entryGateNo" value={state.entryGateNO} disabled size="sm" type="text"  maxLength={30} className=' alarmHeight'  />
                            </Form.Label> */}
                     
                    {/* </Form.Group> */}

                    <Form.Group as={Row} className='row'>      
<Button onClick={handleAddNewEntry} size="sm" type="Submit" variant="primary" disabled={parkIdEmpty || vehicleNoEmpty} >Save</Button>

<Button size="sm" variant="primary" onClick={handleCancel} disabled={parkIdEmpty && vehicleNoEmpty}>Cancel</Button>

</Form.Group>

          
               
      </Form>

               
  </Container>
            </Card.Body>
            </Card>
     
    </div>
  )
}
