import React from 'react';

import classes from './Display.module.css';

const Display = ({ title, gameOver }) => {
    let classNames = [classes.Display, gameOver ? classes.GameOver : null];

    return (
        <div className={classNames.join(' ')}>{title}</div>
    );
};

export default Display;