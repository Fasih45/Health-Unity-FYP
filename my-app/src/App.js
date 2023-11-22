import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import LoginForm from './components/LoginForm';
import {Routes,Route} from 'react-router-dom';
import LoginForm1 from './components/LoginForm1';
import Login from './components/Login';



function App() {
  return (
    <>
     <ResponsiveAppBar/>
     <LoginForm/>
     <Login/>
    
    </>

  );
}

export default App;
