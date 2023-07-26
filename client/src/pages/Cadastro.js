import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';
import axios from 'axios';
import Dashboard from '../components/Dashboard';

function CadastroPaciente() {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCPF] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/pacientes/cadastro', {
        nomeCompleto, 
        cpf,
        dataNascimento,
        contato,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setNomeCompleto('');
      setCPF('');
      setDataNascimento('');
      setContato('');
      setEmail('');
      alert('Paciente cadastrado com sucesso!');
      navigate('/pacientes')
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      setMessage('Ocorreu um erro ao cadastrar paciente');
    }
    setMessage('');
  };

  return (
    <div className='full-screen-components'>
      <div className='form-container'>
        <Dashboard />
        <div className='formulario-cadastro'>
          <h2 className='title'>Cadastro de Paciente</h2>
          {message && alert({ message })}
          <form onSubmit={handleSubmit}>
            <div className='patient-details'>
              <div className='input-box'>
                <label className='details'>Nome Completo:</label>
                <input
                  type="text"
                  value={nomeCompleto}
                  required
                  placeholder='Nome completo'
                  onChange={(e) => setNomeCompleto(e.target.value)}
                />
              </div>
              <div className='input-box'>
                <label className='details'>CPF:</label>
                <input
                  type="text"
                  value={cpf}
                  required
                  placeholder='CPF'
                  onChange={(e) => setCPF(e.target.value)}
                />
              </div>
              <div className='input-box'>
                <label className='details'>Data de Nascimento:</label>
                <input
                  type="date"
                  value={dataNascimento}
                  required
                  placeholder='Data de nascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>
              <div className='input-box'>
                <label className='details'>Contato:</label>
                <input
                  type="text"
                  value={contato}
                  required
                  placeholder='Contato'
                  onChange={(e) => setContato(e.target.value)}
                />
              </div>
              <div className='input-box'>
                <label className='details'>Email:</label>
                <input
                  type="text"
                  value={email}
                  required
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='button'>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroPaciente;
