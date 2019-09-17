import React, { useState } from 'react';

import classes from './Tetris.module.css';

import { useStage } from 'hooks/useStage';
import { usePlayer } from 'hooks/usePlayer';

import Stage from 'components/Stage/Stage';
import Display from 'components/Display/Display';
import StartButton from 'components/StartButton/StartButton';

const Tetris = () => {

    return (
        <div className={classes.TetrisWrapper}>
            <div className={classes.Tetris}>
                <Stage stage={[]} />
                <aside className={classes.TetrisAside}>
                    <div>
                        <Display title="Score" gameOver/>
                        <Display title="Rows" />
                        <Display title="Level" />
                    </div>
                    <StartButton />
                </aside>
            </div>
        </div>
    );
}

export default Tetris;