import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      playerName: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // create space in FDB to store form submits
    const playersRef = firebase.database().ref('players');
    // grab values inputted into form
    const player = {
      name: this.state.playerName
    }
    // send copy of object up to Firebase
    playersRef.push(player);
    // clear out form input
    this.setState({
      playerName: '',
    });
  }

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
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="playerName" placeholder="Enter a player name" onChange={this.handleChange} value={this.state.playerName} />
                <button>Add Player</button>
              </form>
          </section>
          </div>
      </div>
    );
  }
}

export default App;
