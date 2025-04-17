import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";

const introText = [
    {
        audio: null,
        audioRepeat: false,
        text: 'Device booting up...',
        timeout: 500,
        timeoutExtra: true,
    },
    {
        audio: null,
        audioRepeat: false,
        text: 'Access code flagged; requires human captcha input...',
        timeout: 500,
        timeoutExtra: true,
    },
]

const Intro: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);
    const gameLost = props.gameLost;
    const gameWon = props.gameWon;
    const startGame = props.startGame;

    const [curIntroIdx, setCurIntroIdx] = React.useState(0);
    const audioRef = React.useRef(null);

    React.useEffect(() => {
        let timeout = null;

        if (!gameLost && !gameWon) {
            const text = introText[curIntroIdx];
            clearTimeout(timeout);

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }

            timeout = setTimeout(() => {
                introText[curIntroIdx + 1] ? setCurIntroIdx(curIntroIdx + 1) : startGame();
            }, text.timeout + (text.timeoutExtra ? Math.floor(5500 * Math.random()) + 1000 : 0));
        }

        return () => clearTimeout(timeout);

    }, [audioRef, curIntroIdx, gameLost, gameWon, startGame]);

    const text = introText[curIntroIdx];

    return (
        <div className={classes.prePostWrapper}>
            {gameLost && (
                <div className={classes.gameWonLostWrapper}>
                    <i className="fas fa-ban fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }} />
                    <Typography style={{ color: 'white' }}>
                        The system didn't accept your answers
                    </Typography>
                </div>
            )}
            {gameWon && (
                <div className={classes.gameWonLostWrapper}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }} />
                    <Typography style={{ color: 'white' }}>
                        The system has been bypassed.
                    </Typography>
                </div>
            )}
            {!gameLost && !gameWon && !!text && (
                <div className={classes.gameWonLostWrapper}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }} />
                    <Typography style={{ color: 'white' }}>
                        {text.text}
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default Intro;