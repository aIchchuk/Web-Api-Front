import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

import './register.css'; 

const Register = () => {
   const navigate = useNavigate();

   const [fullName, setName] = useState();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5000/auth/register', {fullName, email, password})
      .then(result => {console.log(result)
        navigate('/login')
      })
      .catch(err=> console.log(err))
    }
  
  return (
    <section className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <p>Sign Up</p>

        <input type="full name" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
        
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Sign Up</button>  {/* this is correct */}

        <button type="button" onClick={() => navigate('/')}> Already have an account? Sign In </button>  {/* prevent form submission */}


        
      </form>
    </section>
  );
};

export default Register;
