import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import '../RegisterPage.css'; 

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');  
  const [error, setError] = useState('');

  const navigate = useNavigate();  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await updateProfile(user, {
        displayName: name,  
      });

      console.log('User registered with name:', name);
      navigate('/');  // Redirect user to the homepage
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className="page-heading">Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
