import { useState, useEffect } from 'react';

import { createStage } from 'helpers/game';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [clearedRows, setRowsCleared] = useState(0);
    
    useEffect(() => {
        setRowsCleared(0);
        const sweepRows = newStage => {
            let sweepedStage = newStage.filter(row => row.some(cell => cell[0] === 0));
            const rows = newStage.length - sweepedStage.length;
            if (rows > 0) {
                const addRows = new Array(rows).fill(new Array(newStage[0].length).fill([0, 'clear']));
                sweepedStage = addRows.concat(sweepedStage);
            }
            setRowsCleared(rows);
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

    return [stage, setStage, clearedRows];
}