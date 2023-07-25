import React from 'react';
import UserInfo from './UserInfo';

const Header = ({ userName, handleLogout }) => {
  return (
    <div>
      <UserInfo userName={userName} handleLogout={handleLogout} />
    </div>
  )
}

export default Header