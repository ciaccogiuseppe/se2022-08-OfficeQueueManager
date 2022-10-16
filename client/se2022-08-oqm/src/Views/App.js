import React, {useState} from 'react';
import '../App.css';
import { routeIndex } from '../Route/route';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginManager from './LoginManager';
import LoginOfficer from './LoginOfficer';
import ManagerPage from './ManagerPage';



const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });

function App() {
  const [token, setToken] = useState(null);

  const handleLoginManager = async () => {
    const token = await fakeAuth();
    setToken(token);
    <Navigate replace to="/manager"/>

  };

  const handleLoginOfficer = async () => {
    const token = await fakeAuth();
    setToken(token);
    <Navigate replace to="/officer"/>

  };

  const handleLogout = () => {
    setToken(null);
    <Navigate replace to="/manager-login"/>

  };

  return (
    <div className="App">
      <BrowserRouter>        
          <Routes>
            {routeIndex.map((item)=>{
                return(<Route key={item.name} exact path={item.path} element={item.component}/>)
              })}
              <Route path="/manager-login" element={<LoginManager onLogin={handleLoginManager} />} />
              <Route path="/officer-login" element={<LoginOfficer onLogin={handleLoginOfficer} />} />
              <Route path="/manager" element={<ManagerPage token={token} onLogout={handleLogout} />} />

          </Routes>
      </BrowserRouter>
      
      
    </div>
    
  );
}

export default App;
