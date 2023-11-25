import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import LoginForm1 from "./components/LoginForm1";
import Login from "./components/Login";
import CarouselPage from "./components/CarouselPage";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";


function App() {

  useEffect(() => {
    AOS.init();
  }, []);



  return (
    <>
      {/* <ResponsiveAppBar />
      <CarouselPage/>
      <About/>
      <Services/>
      <Footer/>
      
      <Routes>
        <Route exact path="/patient/signin" element={<LoginForm />} />
        <Route exact path="/patient/signup" element={<LoginForm />} />
      </Routes> */}

      <Dashboard/>
    </>
  );
}

export default App;
