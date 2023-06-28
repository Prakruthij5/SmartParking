
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link , useNavigate} from 'react-router-dom'

import "./register.css"



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  

  let navigate=useNavigate();
  const handleLogin= async(e)=> {
  e.preventDefault();

    //  if(validateEmail && validatePassword){
    //  console.log("logged in successfully");
      // toast.warning("please enter email address")
let userId = 57;
      try {
        await fetch(`http://localhost:9000/userDetails/login?email=${email}&password=${password}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
         // body: JSON.stringify({ email, password }),

        }).then(function (response)
         
        {
          console.log(response);
          if (response.status==200){
            const token = response.headers.get('Authorization');
            
            console.log(token);
            alert("login successful");
           // const authToken = data.token;
          //  localStorage.setItem('authToken', authToken);
          
          navigate('/dashboard');
        }else{
            alert("login unsuccessful! try again");
        }}
        );
  
             
      } catch (error) {
        
      }
    }
    
  const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  
  };

  const validatePassword = () => {
    const re = /^(?=.*[@_$])(?=.*[a-zA-Z0-9])[a-zA-Z0-9@_$]{6,}$/;
    if (!re.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and contain at least one special character (@, $, _)"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (!emailError && !passwordError) {
      setEmailError && setEmailError ("login Failed")
    }
    
  };

    
  return (
    <div className="loginPage">
    <div className="title">LOGIN</div>
       <div className="form">
       <Form>
      <Form.Group className='formGroup'>
        <Form.Label className="headingFont">Email</Form.Label>
               
       
        <span className="asterisk">&#42;</span> 
        <Form.Control
        
          type="email"
           className={`form-control ${emailError ? "is-invalid" : ""}`}
          value={email}
          placeholder="Enter email" required 
          
          onChange={(e) => setEmail(e.target.value)} onSubmit={handleSubmit}
          onBlur={validateEmail}
          
        />
         {emailError && <span className="invalid-feedback">{emailError}</span>} 
        
        
      </Form.Group>
      

      <Form.Group className="formGroup">
        <Form.Label className="headingFont">Password</Form.Label>
      
        <span className="asterisk">&#42;</span> 
        <Form.Control
          type="password"
          className={`form-control ${passwordError ? "is-invalid" : ""}`}
          value={password}
          placeholder="Enter password" required
          onChange={(e) => setPassword(e.target.value)}onSubmit={handleSubmit}
          onBlur={validatePassword}
          
        />
         {passwordError && <span className="invalid-feedback">{passwordError}</span>} 
      </Form.Group>
    
    
   <Form.Group style={{marginTop:'20px', marginLeft:'77px'}}>
    <button type="submit" className="btn btn-primary" onClick={handleLogin}
    disabled={(!email || !password )} >
                        Submit
                    </button>
      
</Form.Group >

                <p className="account">
                   <label style={{marginTop:'4px'}}>Don't have an account?</label> <a href="/sign-up">Register Here</a>
                </p>

    </Form>
    </div>
    </div>
  );
}

export default Login;

