import React from 'react';
import './App.css';
import './index.css'
import CarouselSlider from './components/CarouselSlider';
import Aboutus from './components/Aboutus';
import Features from './components/Features';
import Contactus from './components/Contactus';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard'
import Editprofile from './components/Editprofile';

function App() {
  return (
    <div className="App">
      {/* <Homepage/> */}
      {/* <Dashboard/> */}
      <Editprofile/>
      {/* <Footer/> */}
      {/* <Navbar/>
      <CarouselSlider/>
      <Aboutus/>
      <Features/>
      <Contactus/>
      <Footer/> */}
    </div>
  );
}

export default App;
