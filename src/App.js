import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import MyFlats from './pages/MyFlats';
import AllFlats from './pages/AllFlatsPage';
import Navbar from './components/Navbar';
import Favorites from './Favorites';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Ingreso from './pages/Register';
import Register from './pages/RegisterPage';


function App() {
  return (
  <>
  <Navbar/>
  <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/my-flats" element={<MyFlats />} />
      <Route path="/all-flats" element={<AllFlats />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/ingreso" element={<Ingreso />} />
      <Route path="/profile" element={<Profile />} />
     
      <Route path="/register" element={<Register />} />
    </Routes>
  </>
    
  );
}

export default App;