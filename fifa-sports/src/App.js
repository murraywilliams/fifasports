import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      playerName: '',
      players: [],
      teamName: '',
      teams: []
    }
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handlePlayerSubmit = this.handlePlayerSubmit.bind(this);
  }
  // manage changes on our form input
  handlePlayerChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // method to grab form values and push to Firebase on
  // submit of our form
  handlePlayerSubmit(e) {
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

  componentDidMount() {
    const playersRef = firebase.database().ref('players');
    playersRef.on('value', (snapshot) => {
      let players = snapshot.val();
      let newState = [];
      for (let player in players) {
        newState.push({
          id: player,
          name: players[player].name
        });
      }
      this.setState({
        players: newState
      });
    });
  }

  removePlayer(playerId) {
    const playerRef = firebase.database().ref(`/players/${playerId}`);
    playerRef.remove();
  }

  render() {
    return (
        <div className='app'>
          <header>
              <div className='wrapper'>
                <h1>Fifa Sports</h1>

              </div>
          </header>
          <div className="container">
            <div className='col-md-6'>
              <section className='add-item'>
                <h3>Create new Player</h3>
                  <form onSubmit={this.handlePlayerSubmit}>
                    <input type="text" name="playerName" placeholder="Enter a player name" onChange={this.handlePlayerChange} value={this.state.playerName} />
                    <button>Add Player</button>
                  </form>
              </section>
            </div> {/*end of col-6*/}
            <div className='col-md-6'>
              <section className='display-item'>
                <div className="wrapper">
                  <ul>
                    {this.state.players.map((player) => {
                      return (
                        <li key={player.id}>
                          <h3>{player.name}</h3>
                          <div className="right-side">
                            <button className="edit--btn" onClick={() => this.removePlayer(player.id)}><span className="fa fa-lg fa-edit"></span></button>
                            <button className="delete--btn" onClick={() => this.removePlayer(player.id)}><span className="fa fa-lg fa-trash"></span></button>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </section>
            </div> {/*end of col 6*/}
          </div>
          <div className='container'>
            <div className="col-md-6">
              <section className='add-item'>
                <h3>Create new Team</h3>
                  <form onSubmit={this.handlePlayerSubmit}>
                    <input type="text" name="teamName" placeholder="Enter a team name" onChange={this.handlePlayerChange} value={this.state.playerName} />
                    <button>Add Team</button>
                  </form>
              </section>
            </div>
            <div className='col-md-6'>

            </div>
          </div> {/*end of container */}
        </div> 
    );
  }
}

export default App;
