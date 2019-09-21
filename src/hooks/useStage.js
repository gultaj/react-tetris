import { useState, useEffect } from 'react';

import { createStage } from 'helpers/game';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);
    
    useEffect(() => {

        const sweepRows = newStage => {
            const sweepedStage = newStage.filter(row => row.some(cell => cell[0] === 0));
            setRowsCleared(newStage.length - sweepedStage.length);
            sweepedStage.unshift(new Array(rowsCleared).fill(new Array(newStage[0].length).fill([0, 'clear'])));
            return sweepedStage;
        }

        const updateStage = prevStage => {
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)));

            player.tetromino.forEach((row, y) =>
                row.forEach((value, x) => {
                    if(value !== 0) {
                        newStage[y + player.position.y][x + player.position.x] = [value, (player.collided ? 'merge' : 'clear')];
                    }
                }));
            
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }
            
            return newStage;
        };

        setStage(prev => updateStage(prev));
    }, [player, resetPlayer]);

    return [stage, setStage];
}