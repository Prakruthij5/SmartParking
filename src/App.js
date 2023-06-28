
import './App.css';
import Register from './Pages/Register';
import background from "./Assets/images/BackgroundImage2.jfif";
import EntryPage from './Pages/EntryPage';
import ExitPage from './Pages/ExitPage';
import Dashboard from './Pages/Dashboard';
import Parking from './Pages/Parking';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from './components/SideBar';
import PageLayout from './Pages/PageLayout';
import Login from './Pages/Login';
import Payment from './Pages/Payment';

function App() {
  return (
    
    <div className="App" style={{ 
    // backgroundRepeat: 'no-repeat',
    backgroundSize:'cover',
    width: '100vw',
    height: '100vh',
    backgroundPosition:'center'
     }}>
      <BrowserRouter>
   
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/sign-up" element={<Register/>}/>
      <Route path='/' element={<PageLayout/>}>
             
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/entry" element={<EntryPage/>}/>
          <Route path="/exit" element={<ExitPage/>}/>
          <Route path="/parking" element={<Parking/>}/>
          <Route path="/payment" element={<Payment/>}/>
              
      </Route>
    
      </Routes>
      
    </BrowserRouter>
    </div>

    
  
   
 
  );
}

export default App;
