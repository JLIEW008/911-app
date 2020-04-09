import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


import FireHome from './containers/FireHome';
import FiremenIoT from './containers/FiremenIoT';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        {/* <PrivateRoute path="/vendorForm" component={Post} /> */}
        <Route path="/" exact component={FireHome} />
        <Route path="/:id" exact component={FiremenIoT} />
        <Redirect from="/redirect" to="/" />
        {/* <Route path="/adventures" exact component={Adventures} />
        <Route path="/login" exact component={LogIn} /> */}
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
