import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    fetchFilmweb,
    fetchImdb,
    fetchMetacritic,
    fetchRottenTomatoes,
} from './fetch';

class App extends Component {
    componentDidMount() {
        fetchFilmweb()
            .then(movies => console.log('FILMWEB', movies));

        fetchImdb()
            .then(movies => console.log('IMDB', movies));

        fetchMetacritic()
            .then(movies => console.log('METACRITIC', movies));

        fetchRottenTomatoes()
            .then(movies => console.log('ROTTEN TOMATOES', movies));
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
