import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Fifa Sports</h1>

            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
            <h3>Create new Player</h3>
              <form>
                <input type="text" name="playerName" placeholder="Enter a player name" />
                <button>Add Player</button>
              </form>
          </section>
          </div>
      </div>
    );
  }
}

export default App;
