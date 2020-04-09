import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import FireHome from './containers/FireHome';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        {/* <PrivateRoute path="/vendorForm" component={Post} /> */}
        <Route path="/" exact component={FireHome} />
        {/* <Route path="/adventures" exact component={Adventures} />
        <Route path="/adventures/:id" exact component={Adventure} />
        <Route path="/login" exact component={LogIn} /> */}
        {/* <Redirect from="/redirect" to="/adventures" />
        <Redirect from="*" to="/" /> */}
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
