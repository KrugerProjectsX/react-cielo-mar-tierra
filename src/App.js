import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileUpdate from "./pages/ProfileUpdate";
import Users from "./pages/Users";
import FlatEdit from "./pages/FlatEdit";
import FlatsFavorites from "./pages/FlatsFavorites";
import MyFlats from "./pages/MyFlats";
import Flat from "./pages/Flat";
import RegisterFlat from './pages/RegisterFlat';
import Flats from "./pages/Flats";


function App() {
  return (
  <>
  
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path={"/dashboard"} element={<Home/>}  />
      <Route path={"/my-flats"} element={<MyFlats/>}/>
      <Route path={"/my-favorites-flats"} element={<FlatsFavorites/>}/>
      <Route path={"/users"} element={<Users/>}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path={"/profile/edit"} element={<ProfileUpdate/>}/>
      <Route path={"/profile/edit/:userId"} element={<ProfileUpdate/>}/>
      <Route path="/registerFlat" element={<RegisterFlat />}/>
      <Route path={"/flat/:id"} element={<Flat/>} />
      <Route path={"/flats"} element={<Flats/>}  />
      <Route path={"/flat/edit/:id"} element={<FlatEdit/>} />
      
    </Routes>
  </>
    
  );
}

export default App;