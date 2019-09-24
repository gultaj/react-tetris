import React from 'react';

import Cell from 'components/Cell/Cell';
import StyledStage from './StyledStage';

const Stage = ({ stage }) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map((row, y) => 
            row.map((cell, x) => 
                <Cell type={cell[0]} key={""+y+x} />
            )
        )}
    </StyledStage>
);

export default Stage;