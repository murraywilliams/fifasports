import React, { Component } from 'react';
import './App.css';
import {Route,Link} from 'react-router-dom'
// Components
import Players from './Players';
import Teams from './Teams';
import StartTournament from './StartTournament'

const CreateTournament = (props) => {

  /*componentDidMount() {
    //let receivedMessage = this.props.location.state
  console.log(this.props);
  }*/
    console.log(props);
    return (
        <div className='app'>
          <header>
              <div className='wrapper'>
                <h1>Fifa Sports</h1>
              </div>
          </header>
          <Players tournamentID={props.location.state.tournamentID} />
          <Teams tournamentID={props.location.state.tournamentID} />
          </div>
    );
}

export default CreateTournament;
