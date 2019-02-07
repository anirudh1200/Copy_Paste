import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import PasteList from './components/list/PasteList';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <PasteList />
      </div>
    );
  }
}

export default App;
