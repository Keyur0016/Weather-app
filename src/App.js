import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import WetaherLayout from './Component/Main_layout/layout' ; 
import Search from './Component/Search/Search' ; 

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  
  return (
    <>
      <BrowserRouter>

        <Navbar Navbarname="Weather" Option1="Signup" Option2="Login"/>
      
          <Routes>
      
            <Route path='/' element={<WetaherLayout/>}/>
            <Route path='Login' element={<Login/>}/>
            <Route path='Signup' element={<Signup/>}/>
            <Route path='search' element={<Search/>} />
      
          </Routes>        
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
