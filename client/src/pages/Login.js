import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth', {user, password });
      const { token, redirectUrl } = response.data;
      alert('Login realizado com sucesso!');
      setUsername('');
      setPassword('');
      navigate(redirectUrl);
      localStorage.setItem('token', token);
    } catch (error) {
      const errorMessage = error.response.data.error;
      alert(errorMessage);
    }
  };  

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form className='form-auth' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to={'/register'}>Registrar</Link>
    </div>
  );
};

export default Login;
