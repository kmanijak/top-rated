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
import combine from './data/combine';

import Logo from './components/Logo';
import Tile from './components/Tile';
import Loader from './components/Loader';

class App extends Component {
    state = {
        pending: true,
        transition: false,
        movies: [],
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

    render() {
        const { pending, transition, movies } = this.state;
        return (
            <div className={cx('app', { 'app--pending': pending, 'app--transition': transition })}>
                {pending || transition ? (
                        <Loader />
                    ) : ([
                        <Logo key="logo" />,
                        movies.map((props, index) => (
                            <Tile key={index} {...props} rank={index + 1} seen={index % 4 !== 0} />
                        ))
                    ])
                }
                <link href="https://fonts.googleapis.com/css?family=Nixie+One" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Megrim" rel="stylesheet" />
            </div>
        );
  }
}

export default App;
