import React from 'react';
import cx from 'classnames';
import './Service.css';

const Service = ({ service, rating, href, onMouseEnter, onMouseLeave}) => (
    <a
        className={cx('service', `service--${service}`)}
        href={href}
        target="_blank"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="service__name">{service}:</div>
        <div className={cx('service__rating', { 'service__rating--empty': !rating })}>
            {rating || '-'}
        </div>
    </a>
);

export default Service;