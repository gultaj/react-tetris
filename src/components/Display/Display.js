import React from 'react';

import classes from './Display.module.css';

const Display = ({ title }) => (
    <div className={classes.Display}>{title}</div>
);

export default Display;