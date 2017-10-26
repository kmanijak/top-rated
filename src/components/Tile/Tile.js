import React from 'react';
import './Tile.css';

const Tile = ({ rank, title, year, averageRating, filmweb, imdb, metacritic, rottenTomatoes }) => (
    <div key={rank} className="tile">
        <h4>
            <span className="tile__rank">{rank}. </span>
            <span className="tile__title">{title} </span>
            <span className="tile__year">({year}) - {averageRating.toFixed(2)}</span>
        </h4>
        <p>Filmweb: {filmweb ? filmweb.rating : '-'}</p>
        <p>IMDB: {imdb ? imdb.rating : '-'}</p>
        <p>Metacritic: {metacritic ? metacritic.rating : '-'}</p>
        <p>Rotten Tomatoes: {rottenTomatoes ? rottenTomatoes.rating : '-'}</p>
        <hr />
    </div>
);

export default Tile;