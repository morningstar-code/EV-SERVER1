import React from 'react';
import Draggable from 'react-draggable';
import useStyles from './index.styles';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import { LinearProgress, Typography } from '@mui/material';
import Button from 'components/button/button';
import Game from './game';

interface HeistAppProps {
    gameData: { code: string };
}

export default (props: HeistAppProps) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [decrypting, setDecrypting] = React.useState(false);
    const [gameFinished, setGameFinished] = React.useState(false);
    const [gameResult, setGameResult] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <Draggable handle="#app-header">
            <div className={classes.appContainer}>
                <AppHeader appName="SecureGuard Decrypter - v2.1.3 - Licensed to Henry Hackermans" color="#232426" onClose={() => updateLaptopState({ showHeistApp: false })} style={{ color: '#ffffff' }} />
                <div className={classes.appCenter}>
                    {loading ? (
                        <>
                            <div className={classes.loading}>
                                <LinearProgress />
                                <Typography variant="body2" style={{ color: 'white' }}>
                                    Loading...
                                </Typography>
                            </div>
                        </>
                    ) : gameFinished ? (
                        <div className={classes.loading}>
                            <Typography variant="h4" style={{ color: 'white' }}>
                                {gameResult ? `Code Decrypted: ${props?.gameData?.code}` : 'Decryption Failed'}
                            </Typography>
                        </div>
                    ) : decrypting ? (
                        <div className={classes.gameContainer}>
                            <Game
                                {...Object.assign({
                                    gridX: 15, gridY: 7, gameCallback: (result: boolean) => {
                                        setGameFinished(true);
                                        setGameResult(result);
                                    }
                                }, props)}
                            />
                        </div>
                    ) : (
                        <div className={classes.appHeading}>
                            <Button.Secondary size="large" onClick={() => setDecrypting(true)}>
                                Decrypt
                            </Button.Secondary>
                        </div>
                    )}
                </div>
            </div>
        </Draggable>
    )
}