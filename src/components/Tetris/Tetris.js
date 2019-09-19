import React, { useState } from 'react';

import classes from './Tetris.module.css';

import { useStage } from 'hooks/useStage';
import { usePlayer } from 'hooks/usePlayer';

import { createStage, checkCollision } from 'helpers/game';

import Stage from 'components/Stage/Stage';
import Display from 'components/Display/Display';
import StartButton from 'components/StartButton/StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = dir => {
        const newPos = {x: dir, y: 0};
        if (!checkCollision(player, stage, newPos)) updatePlayerPos(newPos);  
    };
    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    };
    const drop = () => {
        const newPos = {x: 0, y: 1};
        if(!checkCollision(player, stage, newPos)) {
            updatePlayerPos(newPos);
        } else {
            if (player.position.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x: 0, y: 0, collided: true});
        }
    };
    const dropPlayer = () => {
        drop();
    };
    const move = ({ keyCode }) => {
        if(!gameOver) {
            switch (keyCode) {
                case 37: movePlayer(-1);                    
                    break;
                case 39: movePlayer(1);
                    break;
                case 40: dropPlayer();
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className={classes.TetrisWrapper} role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <div className={classes.Tetris}>
                <Stage stage={stage} />
                <aside className={classes.TetrisAside}>
                    { gameOver ? 
                        (<Display title="Game Over" gameOver={gameOver} />
                    ) :(
                        <div>
                            <Display title="Score"/>
                            <Display title="Rows" />
                            <Display title="Level" />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </div>
        </div>
    );
}

export default Tetris;