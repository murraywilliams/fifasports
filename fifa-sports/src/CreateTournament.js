import React, { Component } from 'react';
import './App.css';

// Components
import Players from './Players';
import Teams from './Teams';

class CreateTournament extends Component {

  componentDidMount() {
    //let receivedMessage = this.props.location.state
  console.log(this.props.location.state);
  }

  render() {
    return (
        <div className='app'>
          <header>
              <div className='wrapper'>
                <h1>Fifa Sports</h1>
              </div>
          </header>
          <Players tournamentID={this.props.location.state} />
          <Teams tournamentID={this.props.location.state} />
          </div>
    );
  }
}

export default CreateTournament;
