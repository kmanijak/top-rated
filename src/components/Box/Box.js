import React from 'react';
import cx from 'classnames';
import './Box.css';

const Box = ({ className, title, children }) => (
    <div className={cx('box', className)}>
        <h3 className="box__title">{title}</h3>
        <div className="box__content">
            {children}
        </div>
    </div>
);

export default Box;