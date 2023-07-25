import React from 'react';
import '../styles/InfoUser.css';
import { FiLogOut } from 'react-icons/fi';

const UserInfo = ({ userName, handleLogout }) => {
  return (
    <div className='info-user'>
      <h4>usuário: {userName}</h4>
      <div className='button-box'>
        <button onClick={handleLogout}>Sair <FiLogOut /></button>
      </div>
    </div>
  );
};

export default UserInfo;
