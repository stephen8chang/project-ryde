import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import DatasetScreen from './screens/DatasetScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import NavBar from './components/NavBar';
import { connect } from 'react-redux';
import * as actions from './actions';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className='container'>
        <NavBar />
        <Router>
          <Switch>
            
          </Switch>
        </Router>
      </div>
    );
  }
}
export default connect(null, actions)(App);
