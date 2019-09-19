import React from 'react';
import { TETROMINOS } from 'helpers/tetrominos';

import StyledCell from './StyledCell';

const Cell = ({ type }) => {
    return (
        <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>
    );
}

export default Cell;