import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    setIsLoggedIn(true)
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false)
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const authContextValue = {
    token,
    userId,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;