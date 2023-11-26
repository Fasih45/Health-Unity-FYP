import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import LoginForm1 from "./components/LoginForm1";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route exact path="/:user/signin" element={<LoginForm />} />
        <Route exact path="/:user/signup" element={<LoginForm />} />
        <Route exact path="welcome/:username/:user" element={<Welcome/>} />

        <Route exact path="/:username/:user/signin" element={<LoginForm verify={true}/>} />

      </Routes>
    </>
  );
}

export default App;
