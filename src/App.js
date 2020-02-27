import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignupPage from './Screens/signupPage'
import Home from './Screens/home'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path = '/'>
            <Home />
          </Route>
          <Route path = '/signup'>
            <SignupPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
