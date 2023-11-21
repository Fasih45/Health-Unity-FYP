import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import HealthUnityContent from './components/HealthUnityContent';
// import Login from './components/Login';
import LoginForm from './components/LoginForm';
import {Routes,Route} from 'react-router-dom';
import LoginForm1 from './components/LoginForm1';
import Footer from './components/Footer';


function App() {
  return (
    // <div className="App">
      
    //   <HealthUnityContent/>
    //   {/* <Login/> */}
   
    // </div>
    <>
   
    <ResponsiveAppBar/>
     <LoginForm/>
     {/* <Footer/> */}
    {/* <Routes>
      <Route path="/" element={<HealthUnityContent/>}/>
      <Route path='LoginForm' element={<LoginForm/>}/>
        
    </Routes> */}
    </>

  );
}

export default App;
