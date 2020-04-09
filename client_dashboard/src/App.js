import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard.js';
import IOTDevices from './IOTDevices.js';
import Error from './Error.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Dashboard } exact />
        <Route path="/iot-devices" component={ IOTDevices } />
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
