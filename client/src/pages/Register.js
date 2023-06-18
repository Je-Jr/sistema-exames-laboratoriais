import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/register', { user, password });
      alert('Usuário registrado com sucesso!');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao registrar o usuário.');
    }
  };

  return (
    <div className='login-container'>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      <Link to={'/login'}>Fazer login</Link>
    </div>
  );
};

export default Register;
