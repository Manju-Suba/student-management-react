import React, { createContext, useContext, useState, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import axiosInstance from '../constants/Global';
import { jwtDecode } from 'jwt-decode';
import { API_AUTH_URL } from '../constants/constants';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState({
    username: '',
    permissions: []
  });

  const login = async (formData) => {
    try {
      const response = await axios.post(API_AUTH_URL + '/auth-signin', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let username = '';
      if (response.status == 200 ) {
        setUser({
          username: username,
        });
      }else{
        throw new Error('Login failed');
      }
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post(
        `/auth/signout`,
        {},
        {
          headers: {}
        }
      );
      return response;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      user,
      cookies,
      login,
      logout
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
