import React  from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom'; 
import "./App.css"

import Dashboard from './page/Dashboard'

function App(){
  return(
    <div>
    <Dashboard />
    </div>
  )
}


export default App;
