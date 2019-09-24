import React, { useState } from 'react';

import classes from './Tetris.module.css';

import { useStage } from 'hooks/useStage';
import { usePlayer } from 'hooks/usePlayer';
import { useInterval } from 'hooks/useInterval';
import { useStatus } from 'hooks/useStatus';

import { createStage, checkCollision } from 'helpers/game';

import Stage from 'components/Stage/Stage';
import Display from 'components/Display/Display';
import StartButton from 'components/StartButton/StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, clearedRows] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useStatus(clearedRows);

    const movePlayer = dir => {
        const newPos = {x: dir, y: 0};
        if (!checkCollision(player, stage, newPos)) updatePlayerPos(newPos);  
    };
    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
        setDropTime(1000);
        setScore(0);
        setRows(0);
        setLevel(1);
    };
    const drop = () => {
        if (rows > level * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 - level * 50)
        }

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
        setDropTime(null);
        drop();
    };
    const move = ({ keyCode }) => {
        if(!gameOver) {
            switch (keyCode) {
                case 32: dropPlayer();
                    break;
                case 37: movePlayer(-1);                    
                    break;
                case 38: rotatePlayer(stage, 1);
                    break;
                case 39: movePlayer(1);
                    break;
                case 40: rotatePlayer(stage, -1);
                    break;
                default:
                    break;
            }
        }
    };

    const keyUp = ({ keyCode }) => {
        if(!gameOver) {
            if (keyCode === 32) {
                setDropTime(1000);
            }
        }
    }

    useInterval(() => drop(), dropTime);

    return (
        <div className={classes.TetrisWrapper} role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={e => keyUp(e)}>
            <div className={classes.Tetris}>
                <Stage stage={stage} />
                <aside className={classes.TetrisAside}>
                    { gameOver ? 
                        (<Display title="Game Over" gameOver={gameOver} />
                    ) : (
                        <div>
                            <Display title={"Score: " + score} />
                            <Display title={"Rows: " + rows} />
                            <Display title={"Level: " + level} />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </div>
        </div>
    );
}

export default Tetris;