import React, { Component } from 'react';
import Register from './register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello Guest
        <Register/>
      </div>
    );
  }
}

export default App;
