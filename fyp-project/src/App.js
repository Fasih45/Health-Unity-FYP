import React from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";

import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SearchDoc from "./components/SearchDoc";
import RegistrationForm from "./components/RegistrationForm";
import Welcome from "./components/Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="" element={<Navbar />}>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/:user/signin" element={<LoginForm />} />
          <Route exact path="/:user/signup" element={<RegistrationForm />} />
        </Route>

        <Route exact path="/welcome/:user/:username/:fullname" element={<Dashboard/>}>
        <Route exact path="" element={<Welcome />} />
        
        
        </Route>
        <Route exact path="/dic" element={<SearchDoc />} />

      </Routes>
    </>
  );
}

export default App;
