import React, { Component } from 'react';
import Register from './register';
import Login from './login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello Guest
        <Login/>
        <Register/>
      </div>
    );
  }
}

export default App;
