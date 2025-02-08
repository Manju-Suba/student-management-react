import React, { createContext, useContext, useState, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import axiosInstance from '../constants/Global';
import { jwtDecode } from 'jwt-decode';
import { PERMISSIONS, API_AUTH_URL, ROLE_LIST } from '../constants/constants';
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
          // permissions: [
          //   PERMISSIONS.CAN_VIEW_DASHBOARD,
          //   PERMISSIONS.CAN_VIEW_ASSET_LIST,
          //   // PERMISSIONS.CAN_VIEW_ASSET_ALLOCATION,
          //   // PERMISSIONS.CAN_VIEW_ASSET_TRANSFER,
          //   // PERMISSIONS.CAN_VIEW_MASTER,
          //   // PERMISSIONS.CAN_VIEW_ASSET_AUDIT,
          //   // PERMISSIONS.CAN_VIEW_DISPOSED_AUDIT,
          //   // PERMISSIONS.CAN_VIEW_REPORT
          // ]
        });
        // setCookie('permissions', [
        //   PERMISSIONS.CAN_VIEW_DASHBOARD,
        //   PERMISSIONS.CAN_VIEW_ASSET_LIST,
        //   // PERMISSIONS.CAN_VIEW_ASSET_ALLOCATION,
        //   // PERMISSIONS.CAN_VIEW_ASSET_TRANSFER,
        //   // PERMISSIONS.CAN_VIEW_MASTER,
        //   // PERMISSIONS.CAN_VIEW_ASSET_AUDIT,
        //   // PERMISSIONS.CAN_VIEW_DISPOSED_AUDIT,
        //   // PERMISSIONS.CAN_VIEW_REPORT,
        //   // PERMISSIONS.CAN_VIEW_PROFILE
        // ]);
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
