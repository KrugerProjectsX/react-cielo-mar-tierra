import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import MyFlats from './pages/MyFlatsPage';
import AllFlats from './pages/AllFlatsPage';
import Navbar from './components/Navbar';

import Profile from './pages/Profile';
import Login from './pages/Login';
import Ingreso from './pages/Ingreso';
import Register from './pages/RegisterPage'


function App() {
  return (
  <>
  <Navbar/>
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-flats" element={<MyFlats />} />
      <Route path="/all-flats" element={<AllFlats />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ingreso" element={<Ingreso />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </>
    
  );
}

export default App;
