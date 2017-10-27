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
    getSeen,
    addMovieToSeen,
    removeMovieFromSeen,
} from './data'

import Logo from './components/Logo';
import Tile from './components/Tile';
import Stats from './components/Stats';
import Loader from './components/Loader';

class App extends Component {
    state = {
        pending: true,
        transition: false,
        movies: [],
        seenMovies: getSeen(),
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
        const { pending, transition, movies, seenMovies } = this.state;
        return (
            <div className={cx('app', { 'app--pending': pending, 'app--transition': transition })}>
                {pending || transition ? (
                        <Loader />
                    ) : ([
                        <Logo key="logo" />,
                        <Stats key="stats" seen={seenMovies.length} all={movies.length} />,
                        movies.map((props, index) => {
                            const { title } = props;
                            const seen = seenMovies.includes(title);
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
            </div>
        );
  }
}

export default App;
