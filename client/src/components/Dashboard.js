import React from 'react';
import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';
import { FiUser, FiHome, FiFileText } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <ul className="menu">
          <li>
            <FiHome />
            <Link to={'/profile'}>Tela Inicial</Link>
          </li>
          <li>
            <FiUser />
            <Link to={'/pacientes'}>Pacientes</Link>
          </li>
          <li>
            <FiFileText />
            <Link to={'/exames'}>Exames</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
