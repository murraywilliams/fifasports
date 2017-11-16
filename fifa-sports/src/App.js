import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

// Components
import CreateTournament from './CreateTournament.js';

class App extends Component {

  constructor(){
    super();
    this.state = {
      tournamentName: '',
      tournamentID: '',
      redirect : false,
      tournamentsList: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      tournamentName: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const tournamentRef = firebase.database().ref('tournaments');
    const newTournament = {
      name : this.state.tournamentName
    }

    let newRef =tournamentRef.push(newTournament);
    /*this.setState ({
      tournamentName : ''
    })*/
    this.setState({
      tournamentID:newRef.key,
      redirect:true
    });
  }



  render() {
    if (this.state.redirect) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/createTournament/" component={CreateTournament}/>
            <Redirect from="/" to={{
              pathname:`/createTournament/${this.state.tournamentName}`,
              state: this.state.tournamentID
              }} />
          </Switch>
        </BrowserRouter>
      );
    }
    else {
      return (
          <div className='app'>
            <header>
                <div className='wrapper'>
                  <h1>Fifa Sports</h1>
                </div>
            </header>
                <div className="container">
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Please enter a tournament name" value={this.state.tournamentName} onChange={this.handleChange} />
                    <button>Create Tournament</button>
                  </form>
                  <div className="tournamentList">
                  </div>
                </div>
          </div>
      );
    }
  }
}

export default App;
