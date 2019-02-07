import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import PasteList from './components/list/PasteList';

class App extends Component {

  componentDidMount = () => {
    fetch('/api/download')
      .then(res => res.json())
      .then(res => console.log(res));
  }

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
