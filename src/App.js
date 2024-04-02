import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyFlats from './pages/MyFlats';
import AllFlats from './pages/AllFlatsPage';
import Navbar from './components/Navbar';
import Favorites from './Favorites';
import Profile from './pages/Profile';
import Login from './pages/Login';

import Register from './pages/Register';
import ProfileUpdate from "./pages/ProfileUpdate";
import Users from "./pages/Users";

function App() {
  return (
  <>
  
  <Routes>
     
      <Route path="/" element={<Login />} />
      <Route path={"/dashboard"} element={<Home/>}  />
     
      <Route path="/favorites" element={<Favorites />} />
      <Route path={"/users"} element={<Users/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path={"/profile/edit"} element={<ProfileUpdate/>}/>
      <Route path={"/profile/edit/:userId"} element={<ProfileUpdate/>}/>
      <Route path="/register" element={<Register />} />
    </Routes>
  </>
    
  );
}

export default App;