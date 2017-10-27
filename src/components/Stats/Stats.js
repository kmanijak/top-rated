import React from 'react';
import './Stats.css';

const Stats = ({ seen, all }) => (
    <h3 className="stats">Seen: {seen} / {all}</h3>
);

export default Stats;