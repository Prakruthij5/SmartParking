import React,{useState} from 'react';
import './register.css';
import Form  from "react-bootstrap/Form";
import { Button, Col, Row, Alert, Container} from 'react-bootstrap';
import { IoIosArrowDown } from "react-icons/io";
import validator from 'validator';
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
export default function Register() {


    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
   
    const options = ['Admin', 'User'];
    const [role,setRole]=useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState({
      userName:"",  
      email: "",
        role:"",
        password: "",
        userName:"",
        confirmPassword:"",
        successMessage: null,
      });
    
    const handleChange=(e)=>{
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }));
          if(e.target.name==='email'){
            validateEmail(e.target.value);
            }
            else if(e.target.name==='password'){
              validatePassword(e.target.value);
              }
              else if(e.target.name==='confirmPassword'){
                validateConfirmPassword(e.target.value);
                }
    } 
    
    const handleSelect = (option) => {
        setRole(option);
        
        setIsOpen(false);
      };
      const validateEmail=(email)=>{
        if(validator.isEmail(email)){
          setEmailError('')}
        else{
            setEmailError('Invalid Email Address')}
     }

     const validatePassword = (password) => {
      if (validator.isStrongPassword(password, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
          setPasswordError('')
         
        } else {
          setPasswordError('Please choose a stronger password')
          
        }
    }
    
    const validateConfirmPassword=(confirmPassword)=>{
      if(confirmPassword===state.password)
      {
        setConfirmPasswordError("")
      }else{
        setConfirmPasswordError("Password dosen't match")
      }
    }
  
    let navigate=useNavigate();
      const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
          "userName":state.userName,
          "email": state.email,
          "password": state.password,
         "role": role,
        };

       
        try {
          const response = await fetch("http://localhost:9000/userDetails/saveUser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
    
          if (response.ok) {
            const data = await response.json();
            const loginToken = data.token; 
            // Store the authentication token in local storage
            localStorage.setItem('loginToken', loginToken);
            console.log('call successfull');
            navigate("/");
          }
          else {
            // Handle error response
            console.log('Error creating user');
            alert("Registration Failed !");
          }
        } catch (error) {
          // Handle network error
          //alert("Registration Failed !");
           navigate("/");
           alert("Registration successful");
          //console.error('An error occurred:', error);
        }
      };

  return (
    <div className='registerPage'>
        <div className='title'>Register</div>
        <div className='form'>
        <Form>
        <Form.Group >
                        <Form.Label className="headingFont" >
                            UserName</Form.Label>
                            <span className="asterisk">&#42;</span> :
                            <Form.Control  placeholder='Enter user Name...' name="userName" value={state.userName} onChange={handleChange} size="sm" type="text"  maxLength={30} className=" form-control " />
                           <br/>
                     
        </Form.Group>
        <Form.Group >
                        <Form.Label className="headingFont" >
                            Email</Form.Label>
                            <span className="asterisk">&#42;</span> :
                            <Form.Control  placeholder='Enter email...' name="email" value={state.email} onChange={handleChange} size="sm" type="text"  maxLength={30} className=" form-control " />
                            <span className='errorMessage'><small>{emailError}</small></span>
                     
        </Form.Group>
        <Form.Group >
                        <Form.Label className="headingFont" >
                           Password</Form.Label>
                            <span className="asterisk">&#42;</span> :
                            <Form.Control placeholder='Enter password...' name="password" value={state.password} onChange={handleChange} size="sm" type="password"  maxLength={30} className="form-control" />
                            <span className='errorMessage'><small>{passwordError}</small></span>
        </Form.Group>
        <Form.Group>
                        <Form.Label className="headingFont" >
                            Confirm Password</Form.Label>
                            <span className="asterisk">&#42;</span> :
                            <Form.Control placeholder='Re-enter password...' name="confirmPassword" value={state.confirmPassword} onChange={handleChange}  size="sm" type="password"  maxLength={30} className="form-control" />
                            <span className='errorMessage'><small>{confirmPasswordError}</small></span>
        </Form.Group>

        <Form.Group >
                        <Form.Label className="headingFont" >
                            Role</Form.Label>
                            <span className="asterisk">&#42;</span> :

                            <div className="dropdown-container inputHeight" style={{ borderBottom:"1px solid gray"}}>
                            <div className="selected-item" style={{display:'flex', width:'300px', justifyContent:'space-between'}} onClick={() => setIsOpen(!isOpen)}>
                              {role || <div style={{color:'gray'}}>Select Role</div>}
                              <IoIosArrowDown/>
                            </div>
      {isOpen && (
        <div className="dropdown-options dropDown">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              style={{cursor:'pointer', marginTop:'5px', justifyItems:'center'}}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
                            
                            
        </Form.Group>

        <Form.Group style={{marginTop:'20px', marginLeft:'77px'}}>
                       <Button  size='sm' onClick={handleSubmit} disabled={ (!state.email || !role || !state.password|| !state.confirmPassword)}>Register</Button>
                      
        </Form.Group>
        
        <p className="account">
                   <label style={{marginTop:'4px'}}>Already have an account?</label> <a href="/">Login Here</a>
                </p>
      </Form>
     
        </div>

        
     
    </div>
  )
}
