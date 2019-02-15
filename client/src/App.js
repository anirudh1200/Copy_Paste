import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PasteList from './components/list/PasteList';
import UploadForm from './components/forms/upload';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/panel' component={PasteList} />
          <Route path='/upload' component={UploadForm} />
        </Switch>
        <span style={{position:'absolute', bottom:0}}>
          Made with
          <span role="img" aria-label="heart">❤️</span>
          by anirudh1200
        </span>
      </div>
    );
  }
}

export default App;
