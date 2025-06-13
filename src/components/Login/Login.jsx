import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';


import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {email,password})
    .then(result => {
        console.log(result);
        if(result.data === "success") {
          navigate('/dashboard'); // or wherever you want to navigate after login
        }
        
      })
      .catch(err => console.log(err));
  }
  

  return (
    <section className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Welcome back! Please sign in to your account.</p>
        
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Sign In</button>  {/* normal submit handled by form */}

        <button type="button" onClick={() => navigate('/register')}> Dont have an account? Register Now </button>  {/* prevent form submission */}

        
        
      </form>
    </section>

  );
};

export default Login;
