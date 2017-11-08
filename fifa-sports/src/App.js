import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

// Components
import Players from './Players';
import Teams from './Teams';

class App extends Component {

  render() {
    return (
        <div className='app'>
          <header>
              <div className='wrapper'>
                <h1>Fifa Sports</h1>
              </div>
          </header>
          <Players />
          <Teams />
          </div>
    );
  }
}

export default App;
