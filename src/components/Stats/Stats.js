import React from 'react';
import './Stats.css';

const Stats = ({ title, seen, all }) => (
    <h3 className="stats">{title}: {seen} / {all}</h3>
);

export default Stats;