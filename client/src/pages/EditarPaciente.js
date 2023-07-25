import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';


function EditarPaciente() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pegando o parâmetro 'id' da URL
  const [paciente, setPaciente] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    contato: '',
    email: ''
  });

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/pacientes/editar/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const pacienteData = response.data;
        // Convertendo a data de nascimento para o formato adequado (AAAA-MM-DD)
        const dataNascimentoFormatada = pacienteData.data_nascimento.slice(0, 10);
        setPaciente({
          nome: pacienteData.nome,
          cpf: pacienteData.cpf,
          dataNascimento: dataNascimentoFormatada,
          contato: pacienteData.contato,
          email: pacienteData.email
        });
      } catch (error) {
        console.error('Erro ao obter paciente:', error);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaciente((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3001/pacientes/editar/${id}`, {
        nome: paciente.nome,
        cpf: paciente.cpf,
        dataNascimento: paciente.dataNascimento, // Adjust the field name as needed in the API
        contato: paciente.contato,
        email: paciente.email
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Dados do paciente atualizados:', response.data);
      navigate('/pacientes');
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
    }
  };

  return (
    <div className='full-screen-components'>
      <div className='form-container'>
        <Dashboard />
        <div className='formulario-cadastro'>
          <h2 className='title'>Cadastro de Paciente</h2>
          <form onSubmit={handleSubmit}>
            <div className='patient-details'>
              <div className='input-box'>
                <label className='details'>Nome Completo:</label>
                <input
                  type="text"
                  name="nome"
                  value={paciente.nome}
                  onChange={handleChange}
                  required
                  placeholder='Nome completo'
                />
              </div>
              <div className='input-box'>
                <label className='details'>CPF:</label>
                <input
                  type="text"
                  name="cpf"
                  value={paciente.cpf}
                  onChange={handleChange}
                  required
                  placeholder='CPF'
                />
              </div>
              <div className='input-box'>
                <label className='details'>Data de Nascimento:</label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={paciente.dataNascimento}
                  onChange={handleChange}
                  required
                  placeholder='Data de nascimento'
                />
              </div>
              <div className='input-box'>
                <label className='details'>Contato:</label>
                <input
                  type="text"
                  name="contato"
                  value={paciente.contato}
                  onChange={handleChange}
                  required
                  placeholder='Contato'
                />
              </div>
              <div className='input-box'>
                <label className='details'>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={paciente.email}
                  onChange={handleChange}
                  required
                  placeholder='Email'
                />
              </div>
            </div>
            <div className='button'>
              <button type="submit">Atualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarPaciente;
