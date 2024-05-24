import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const LogoutButton = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8800/api/auth/logout',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;