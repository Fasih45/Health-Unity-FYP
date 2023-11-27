import "./App.css";
import CarouselPage from "./components/CarouselPage";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer"
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import MyProfile from "./components/MyProfile";



function App() {

  useEffect(() => {
    AOS.init();
  }, []);



  return (
    <>
    {/* <CarouselPage/>
    <About/>
    <Services/>
    <Footer/> */}
      <Dashboard/>
      {/* <MyProfile/> */}
      {/* <Profile/> */}
    </>
  );
}

export default App;
