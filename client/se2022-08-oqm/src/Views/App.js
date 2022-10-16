import React, {useState} from 'react';
import '../App.css';
import { routeIndex } from '../Route/route';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';




function App() {

  return (
    <div className="App">
      <BrowserRouter>        
          <Routes>
            {routeIndex.map((item)=>{
                return(<Route key={item.name} exact path={item.path} element={item.component}/>)
              })}


          </Routes>
      </BrowserRouter>
      
      
    </div>
    
  );
}

export default App;
