/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';

export default function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem('Bearer')) {
  //     axios.get('/refresh')
  //       .then((response) => {
  //         console.log('!!!!!!!!!!!!!!!!!!!!', response);
  //         if (response.status !== 200) {
  //           navigate('/login');
  //           throw new Error('Failed to refresh access token');
  //         }
  //         localStorage.setItem('accessToken', response.accessToken);
  //       });
  //   }
  // }, []);
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute forAuthUser redirectTo="/login" />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route element={<ProtectedRoute forAuthUser={false} user redirectTo="/home" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}
