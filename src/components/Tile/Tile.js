import React, { Component } from 'react';
import cx from 'classnames';
import Service from './Service';
import './Tile.css';

const MESSAGES = {
    markAsSeen: 'Mark as seen',
    markAsUnseen: 'Mark as unseen',
    goTo: (service) => `Go to ${service}`,
};

class Tile extends Component {
    state = {
        message: '',
    };

    componentWillReceiveProps({ seen }) {
        if (seen !== this.props.seen && this.state.message) {
            this.setMessage(seen ? MESSAGES.markAsUnseen : MESSAGES.markAsSeen);
        }
    }

    setMessage = (message) => {
        this.setState({ message });
    };

    removeMessage = () => {
        this.setState({ message: '' });
    };

    render() {
        const { seen, rank, title, year, averageRating, filmweb, imdb, metacritic, rottenTomatoes, onClick } = this.props;
        const { message } = this.state;

        return (
            <div key={rank} className={cx('tile', { 'tile--seen': seen })}>
                <div
                    className="tile__left"
                    onClick={onClick}
                    onMouseEnter={() => this.setMessage(seen ? MESSAGES.markAsUnseen : MESSAGES.markAsSeen)}
                    onMouseLeave={this.removeMessage}
                >
                    <h1 className="tile__rank">{rank}. </h1>
                    <h3 className="tile__title">{title} ({year})</h3>
                    <h3 className="tile__rating">{averageRating.toFixed(2)}</h3>
                </div>
                <div className="tile__right">
                    <Service
                        service="Filmweb"
                        rating={filmweb && filmweb.rating}
                        href={filmweb && filmweb.link}
                        onMouseEnter={() => this.setMessage(MESSAGES.goTo('Filmweb'))}
                        onMouseLeave={this.removeMessage}
                    />
                    <Service
                        service="IMDB"
                        rating={imdb && imdb.rating}
                        href={imdb && imdb.link}
                        onMouseEnter={() => this.setMessage(MESSAGES.goTo('IMDB'))}
                        onMouseLeave={this.removeMessage}
                    />
                    <Service
                        service="Metacritic"
                        rating={metacritic && metacritic.rating}
                        href={metacritic && metacritic.link}
                        onMouseEnter={() => this.setMessage(MESSAGES.goTo('Metacritic'))}
                        onMouseLeave={this.removeMessage}
                    />
                    <Service
                        service="Rotten Tomatoes"
                        rating={rottenTomatoes && rottenTomatoes.rating}
                        href={rottenTomatoes && rottenTomatoes.link}
                        onMouseEnter={() => this.setMessage(MESSAGES.goTo('Rotten Tomatoes'))}
                        onMouseLeave={this.removeMessage}
                    />
                </div>
                <div className={cx('tile__message', { 'tile__message--visible': message })}>{message}</div>
            </div>
        );
    }
}

export default Tile;