import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <NavBar />
        <BrowserRouter>
          <div className='container'>
            <Route exact path='/dash' component={DashboardScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
