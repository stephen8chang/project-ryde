import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import axios from 'axios'
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen'
import DashboardScreen from './components/screens/DashboardScreen'

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('https://project-ryde.herokuapp.com/', {mode: 'no-cors'}).then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

    // axios.get('http://localhost:5000/flask/hello').then(response => {
    //   console.log("SUCCESS", response)
    //   setGetMessage(response)
    // }).catch(error => {
    //   console.log(error)
    // })
  }, [])

  return (
    <div className="container">
    <BrowserRouter>
      <div className='container'>
        {/* <Header /> */}
        <Route exact path="/" component={DashboardScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/login" component={LoginScreen} />
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
