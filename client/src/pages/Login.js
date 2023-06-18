import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css'
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/login', {user, password });
      alert('Login realizado com sucesso!');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao fazer login.');
    }
  };  

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
