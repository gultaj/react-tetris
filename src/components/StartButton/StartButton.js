import React from 'react';

import classes from './StartButton.module.css';

const StartButton = ({ callback }) => (
    <button className={classes.StartButton} onClick={callback}>Start Game</button>
);

export default StartButton;