import React from 'react';
import './Box.css';

const Box = ({ title, children }) => (
    <div className="box">
        <h3 className="box__title">{title}</h3>
        <div className="box__content">
            {children}
        </div>
    </div>
);

export default Box;