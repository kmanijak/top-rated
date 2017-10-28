import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';
import cx from 'classnames';
import './App.css';
import {
    fetchFilmweb,
    fetchImdb,
    fetchMetacritic,
    fetchRottenTomatoes,
} from './fetch';
import {
    combine,
    compare,
    getSeen,
    markSeen,
    addMovieToSeen,
    removeMovieFromSeen,
    FILTERS,
} from './data'

import Logo from './components/Logo';
import Tile from './components/Tile';
import Box from './components/Box';
import Stats from './components/Stats';
import Loader from './components/Loader';
import {countMovies} from "./data/utils";

class App extends Component {
    state = {
        pending: true,
        transition: false,
        movies: [],
        seenMovies: getSeen(),
        filter: FILTERS.ALL,
    };

    componentDidMount() {
        Promise.all([
            fetchFilmweb(),
            fetchImdb(),
            fetchMetacritic(),
            fetchRottenTomatoes(),
        ])
            .then(([ filmweb, imdb, metacritic, rottenTomatoes ]) => combine({ filmweb, imdb, metacritic, rottenTomatoes }))
            .then(movies => {
                this.setState({
                    movies: (sortBy(movies, ({ averageRating }) => -averageRating)),
                    pending: false,
                    transition: true,
                });
                this.removeTransition();
            })
    }

    removeTransition = () => {
        setTimeout(() => this.setState({ transition: false }), 1000);
    };

    markAsSeen = (title) => {
        this.setState({ seenMovies: addMovieToSeen(title) });
    };

    unmarkAsSeen = (title) => {
        this.setState({ seenMovies: removeMovieFromSeen(title) });
    };

    render() {
        const { pending, transition, movies, seenMovies, filter } = this.state;
        const markedMovies = markSeen(movies, seenMovies);

        // filtering
        const filteredMovies = markedMovies;
        const filteredSeen = filteredMovies.filter(({ seen }) => seen);

        const filmwebTotal = countMovies(movies, 'filmweb');
        const filmwebSeen = countMovies(filteredSeen, 'filmweb');
        const imdbTotal = countMovies(movies, 'imdb');
        const imdbSeen = countMovies(filteredSeen, 'imdb');
        const metacriticTotal = countMovies(movies, 'metacritic');
        const metacriticSeen = countMovies(filteredSeen, 'metacritic');
        const rottenTomatoesTotal = countMovies(movies, 'rottenTomatoes');
        const rottenTomatoesSeen = countMovies(filteredSeen, 'rottenTomatoes');
        const total = filmwebTotal + imdbTotal + metacriticTotal + rottenTomatoesTotal;
        const seen = filmwebSeen + imdbSeen + metacriticSeen + rottenTomatoesSeen;

        return (
            <div className={cx('app', { 'app--pending': pending, 'app--transition': transition })}>
                {pending || transition ? (
                        <Loader />
                    ) : ([
                        <Logo key="logo" />,
                        <Box key="stats" title="Stats">
                            <Stats title="Total" seen={seen} all={total} />
                            <Stats title="Filmweb" seen={filmwebSeen} all={filmwebTotal} />
                            <Stats title="IMDB" seen={imdbSeen} all={imdbTotal} />
                            <Stats title="Metacritic" seen={metacriticSeen} all={metacriticTotal} />
                            <Stats title="Rotten Tomatoes" seen={rottenTomatoesSeen} all={rottenTomatoesTotal} />
                        </Box>,
                        markedMovies.map((props, index) => {
                            const { title } = props;
                            const seen = seenMovies.findIndex(movie => compare(movie, title)) > -1;
                            return (
                                <Tile
                                    key={index}
                                    {...props}
                                    rank={index + 1}
                                    seen={seen}
                                    onClick={seen ? () => this.unmarkAsSeen(title) : () => this.markAsSeen(title)}
                                />
                            )
                        })
                    ])
                }
                <link href="https://fonts.googleapis.com/css?family=Nixie+One" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Megrim" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Fascinate+Inline" rel="stylesheet" />
            </div>
        );
  }
}

export default App;
