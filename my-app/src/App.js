import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import LoginForm1 from "./components/LoginForm1";
import Login from "./components/Login";
import CarouselPage from "./components/CarouselPage";
import About from "./components/About"

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <CarouselPage/>
      <About/>
      <Routes>
        <Route exact path="/patient/signin" element={<LoginForm />} />
        <Route exact path="/patient/signup" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
