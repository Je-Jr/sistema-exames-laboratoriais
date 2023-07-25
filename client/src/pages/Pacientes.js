import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import '../styles/Pacientes.css';
import Dashboard from '../components/Dashboard';
import { FiEdit, FiSkipBack, FiSkipForward } from "react-icons/fi";

function Pacientes() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/pacientes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { pacientes } = response.data;
        setPacientes(pacientes);
      } catch (error) {
        console.error('Erro ao obter pacientes:', error);
      }
    };

    const token = localStorage.getItem('token');

    if (token) {
      setAuthenticated(true);
    } else {
      navigate('/login');
    }

    if (authenticated) {
      fetchPacientes();
    }
  }, [authenticated, navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPacientes = pacientes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='full-screen-components'>
      <Dashboard />
      <div className='background-patients-list'>
        <div className='box-patients-list'>
          <div className='container-header'>
            <h2 className='title'>Pacientes</h2>
            <Link to='/pacientes/cadastro'>
              <button className='button'>
                <p>Adicionar</p>
              </button>
            </Link>
          </div>
          <table className='table-patients'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Contato</th>
                <th>Email</th>
                <th>Edição</th>
              </tr>
            </thead>
            <tbody>
              {currentPacientes.map((paciente) => (
                <tr key={paciente.paciente_id}>
                  <td>{paciente.nome}</td>
                  <td>{paciente.cpf}</td>
                  <td>{format(new Date(paciente.data_nascimento), 'dd/MM/yyyy')}</td>
                  <td>{paciente.contato}</td>
                  <td>{paciente.email}</td>
                  <td>
                    <Link to={`/pacientes/editar/${paciente.paciente_id}`}>
                      <button>
                        <p className='edit-button'><FiEdit/></p>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='pagination'>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <FiSkipBack />
            </button>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPacientes.length < itemsPerPage}>
              <FiSkipForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pacientes;
