import React from 'react';
import cx from 'classnames';
import Service from './Service';
import './Tile.css';

const Tile = ({ seen, rank, title, year, averageRating, filmweb, imdb, metacritic, rottenTomatoes, onClick }) => (
    <div key={rank} className={cx('tile', { 'tile--seen': seen })} onClick={onClick}>
        <h1 className="tile__rank">{rank}. </h1>
        <h3 className="tile__title">{title} ({year})</h3>
        <div className="tile__right">
            <h3 className="tile__rating">{averageRating.toFixed(2)}</h3>
            <Service
                service="Filmweb"
                rating={filmweb && filmweb.rating}
                href={filmweb && filmweb.link}
            />
            <Service
                service="IMDB"
                rating={imdb && imdb.rating}
                href={imdb && imdb.link}
            />
            <Service
                service="Metacritic"
                rating={metacritic && metacritic.rating}
                href={metacritic && metacritic.link}
            />
            <Service
                service="Rotten Tomatoes"
                rating={rottenTomatoes && rottenTomatoes.rating}
                href={rottenTomatoes && rottenTomatoes.link}
            />
        </div>
    </div>
);

export default Tile;