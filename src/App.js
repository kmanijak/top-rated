import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';
import logo from './logo.svg';
import './App.css';
import {
    fetchFilmweb,
    fetchImdb,
    fetchMetacritic,
    fetchRottenTomatoes,
} from './fetch';
import combine from './data/combine';

class App extends Component {
    componentDidMount() {
        Promise.all([
            fetchFilmweb(),
            fetchImdb(),
            fetchMetacritic(),
            fetchRottenTomatoes(),
        ])
            .then(([ filmweb, imdb, metacritic, rottenTomatoes ]) => combine({ filmweb, imdb, metacritic, rottenTomatoes }))
            .then(movies => console.log(sortBy(movies, ({ averageRating }) => averageRating)));
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
