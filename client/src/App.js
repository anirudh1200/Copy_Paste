import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PasteList from './components/list/PasteList';
import UploadForm from './components/forms/Upload';
import Home from './components/layout/Home';
import NotFound from './components/misc/NotFound';
import View from './components/forms/View';
import Edit from './components/forms/Edit'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/panel' component={PasteList} />
          <Route exact path='/uploadform' component={UploadForm} />
          <Route exact path='/' component={Home} />
          <Route exact path='/error' component={NotFound} />
          <Route path='/view' component={View} />
          <Route path='/edit' component={Edit} />
        </Switch>
        <span style={{ position: 'fixed', bottom: 0 }}>
          Made with
          <span role="img" aria-label="heart">❤️</span>
          by anirudh1200
        </span>
      </div>
    );
  }
}

export default App;
