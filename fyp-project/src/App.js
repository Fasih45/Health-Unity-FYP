import React from 'react';
import './App.css';
import './index.css'
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard'

import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SearchDoc from './components/SearchDoc';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <>


    <Navbar />
    <Routes>
      <Route exact path="/" element={< Homepage/>} />
      <Route exact path="/:user/signin" element={<LoginForm />} />
      <Route exact path="welcome/:user/:username" element={<Dashboard/>} />
      <Route exact path="/:user/signup" element={<RegistrationForm />} />
      <Route exact path="/dic" element={<SearchDoc/>} />
      

      <Route
        exact
        path="/:username/:user/signin"
        element={<LoginForm verify={true} />}
      />
    </Routes>
    
  </>


  );
}

export default App;
