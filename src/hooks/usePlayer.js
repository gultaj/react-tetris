import { useState, useCallback } from 'react';

import { randomTetromino, TETROMINOS } from 'helpers/tetrominos';
import { STAGE_WIDTH, checkCollision } from 'helpers/game';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        position: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const rotate = (matrix, dir) => {
        const rotatedTetro = matrix.map((_, i) => matrix.map(col => col[i]));
        if (dir > 0) {
            return rotatedTetro.map(row => row.reverse());
        }
        return rotatedTetro.reverse();
    }

    const rotatePlayer = (stage, dir) => {
        let clonedPlayer = {...player};
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        let offset = 1;
        while (checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
            clonedPlayer.position.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                clonedPlayer = {...player};
                return;
            }
        }

        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({ x, y, collided = false}) => {
        setPlayer(prev => ({
            ...prev,
            position: {
                x: (prev.position.x + x),
                y: (prev.position.y + y)
            },
            collided
        }));
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
            position: {
                x: STAGE_WIDTH / 2 - 2,
                y: 0 
            },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, []);

    return [player, updatePlayerPos, resetPlayer, rotatePlayer];
};