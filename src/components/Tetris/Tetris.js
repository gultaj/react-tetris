import React from 'react';

import classes from './Tetris.module.css';
import { createStage } from  'helpers/game';

import Stage from 'components/Stage/Stage';
import Display from 'components/Display/Display';
import StartButton from 'components/StartButton/StartButton';

const Tetris = () => {

    return (
        <div className={classes.TetrisWrapper}>
            <div className={classes.Tetris}>
                <Stage stage={createStage()} />
                <aside className={classes.TetrisAside}>
                    <div>
                        <Display title="Score" />
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