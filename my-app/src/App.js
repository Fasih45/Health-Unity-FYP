import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import LoginForm1 from "./components/LoginForm1";
import Login from "./components/Login";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route exact path="/:user/signin" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
