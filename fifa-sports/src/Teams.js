import React, { Component } from 'react';
import firebase from './firebase.js';

class Teams extends Component {

  constructor() {
    super();
    this.state = {
      teamName: '',
      teams: []
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
    const teamsRef = firebase.database().ref('tournaments/teams');
    // grab values inputted into form
    const team = {
      name: this.state.teamName
    }
    // send copy of object up to Firebase
    teamsRef.push(team);
    // clear out form input
    this.setState({
      teamName: '',
    });
  }

  componentDidMount() {
    const teamsRef = firebase.database().ref('teams');
    teamsRef.on('value', (snapshot) => {
      let teams = snapshot.val();
      let newState = [];
      for (let team in teams) {
        newState.push({
          id: team,
          name: teams[team].name
        });
      }
      this.setState({
        teams: newState
      });
    });
  }

  removeTeam(teamId) {
    const teamRef = firebase.database().ref(`/teams/${teamId}`);
    teamRef.remove();
  }

  render() {
    return (
          <div className='container'>
            <div className="col-md-6">
              <section className='add-item'>
                <h3>Create new Team</h3>
                  <form onSubmit={this.handleTeamSubmit}>
                    <input type="text" name="teamName" placeholder="Enter a team name" onChange={this.handleTeamChange} value={this.state.teamName} />
                    <button>Add Team</button>
                  </form>
              </section>
            </div>
            <div className='col-md-6'>
            <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.teams.map((team) => {
                    return (
                      <li key={team.id}>
                        <h3>{team.name}</h3>
                        <div className="right-side">
                          <button className="delete--btn" onClick={() => this.removeTeam(team.id)}><span className="fa fa-lg fa-trash"></span></button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          </div>
        </div>
    );
  }
}

export default Teams;
