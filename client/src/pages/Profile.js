import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../components/Dashboard';
import '../styles/Profile.css';
import TelaInicial from '../components/TelaInicial';
import Header from '../components/Header';

const Profile = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');



  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name } = response.data;
        setUserName(name);
      } catch (error) {
        console.error('Erro ao obter o nome do usuário:', error);
      }
    };



    const token = localStorage.getItem('token');

    if (token) {
      setAuthenticated(true);
    } 
    if (authenticated) {
      fetchUserName();
    }

  }, [authenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container-tela-inicial">
      <Dashboard />
      <div className='main-content'>
        <Header userName={userName} handleLogout={handleLogout} />
        <TelaInicial />
      </div>
    </div>
  );
};

export default Profile;
