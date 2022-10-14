import * as React from 'react';
import '../App.css';
import Test from './Test';
import { routeIndex } from '../Route/route';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
/*
      <BrowserRouter>
        <Routes>
          <Route path="/test">
            <Test />
          </Route>
        </Routes>
      </BrowserRouter>
*/

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
