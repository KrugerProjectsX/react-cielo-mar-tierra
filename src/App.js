import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import MyFlats from './pages/MyFlatsPage';
import AllFlats from './pages/AllFlatsPage';
import Profile from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-flats" element={<MyFlats />} />
      <Route path="/all-flats" element={<AllFlats />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
