import React from 'react';
import {Route,Switch} from "react-router-dom";
import './App.css';
import Home from './components/Home/home';
// import Result from './components/Result/result';


function App() {
 
  return (
     <Switch>
         <Route path="/" exact component={Home}/>
         {/* <Route path="/result" component={Result}/> */}
     </Switch>
  );
}

export default App;
