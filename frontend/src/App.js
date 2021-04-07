import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import NavBar from './components/NavBar';

function App() {
  // const [getMessage, setGetMessage] = useState({});

  // useEffect(() => {
  //   axios
  //     .get('https://project-ryde.herokuapp.com/', { mode: 'no-cors' })
  //     .then(response => {
  //       console.log('SUCCESS', response);
  //       setGetMessage(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  //   // axios.get('http://localhost:5000/flask/hello').then(response => {
  //   //   console.log("SUCCESS", response)
  //   //   setGetMessage(response)
  //   // }).catch(error => {
  //   //   console.log(error)
  //   // })
  // }, []);

  return (
    <div className='container'>
      <NavBar />
      <BrowserRouter>
        <div className='container'>
          <Route exact path='/' component={DashboardScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
