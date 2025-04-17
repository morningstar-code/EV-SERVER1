import { Typography } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';
import React from 'react';
import { Wait } from 'utils/misc';
import MinigameTimer from '../minigame-timer';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();
    const [gameActive, setGameActive] = React.useState<boolean>(false);
    const [showWantedSequence, setShowWantedSequence] = React.useState<boolean>(true);
    const [gameFinished, setGameFinished] = React.useState<boolean>(false);
    const [gameStatus, setGameStatus] = React.useState<string>('');
    const [randomIdx, setRandomIdx] = React.useState<number>(Math.floor(75 * Math.random()));
    const [index, moveIndex] = React.useState<number>(43);
    const [generatedLetters, setGeneratedLetters] = React.useState<any>((function (length: number, type: any) {
        const availableVariations = {
            letters: 'abcdefghijklmnopqrstuvwxyz',
            letters_greek: 'αβγδεζηθικλμνξοπρΣτυφχψω',
            numandletters: 'abcdefghijklmnopqrstuvwxyz1234567890',
            runic: 'ᚧᚨᚩᚬᚭᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᚠᚥᚻᛤ',
            numbers: '0123456789',
            symbols: '\u260E\u261A\u261B\u261C\u261E\u261F\u2622\u2623\u2668๑\u2740\u273Fψ\u2646\u266A\u2669\u266B\u266C\u2704\u2702\u2706\u2709\u2726\u2727\u2620\u262E\u262F'
        };

        const generated = [];

        for (let i = 0; i < length; i++) {
            const variation = availableVariations[type];

            const var1 = variation[Math.floor(Math.random() * variation.length)];
            const var2 = variation[Math.floor(Math.random() * variation.length)];

            generated.push(var1 + var2);
        }

        return generated;

    })(80, props.type));
    const [generatedLetterCopy, setGeneratedLetterCopy] = React.useState<any>(generatedLetters);
    const [timeEnd, setTimeEnd] = React.useState<number>(Date.now() + props.timeToComplete);
    const [timeLeft, setTimeLeft] = React.useState<number>(timeEnd);
    const timeout = React.useRef<any>(0);
    const [introActive, setIntroActive] = React.useState<boolean>(true);
    const [statusMessage, setStatusMessage] = React.useState<string>('');

    const doIntro = React.useCallback(async () => {
        setIntroActive(true);

        setStatusMessage('Initializing...');
        await Wait(5000);

        setStatusMessage('Preparing Interface...');
        await Wait(4500);

        setStatusMessage('Connected!');
        await Wait(1000);

        setTimeEnd(Date.now() + props.timeToComplete);
        setIntroActive(false);
        setGameActive(true);

        if (props.tempShow) {
            setTimeout(() => {
                setShowWantedSequence(false);
            }, 3500);
        }
    }, [props.timeToComplete, props.tempShow]);

    const handleKeyPressed = (e: any) => {
        const key = e.key.toLowerCase();

        if (!gameActive) return;

        if (key === 'w' || key === 'arrowup') {
            moveIndex(index < 10 ? 70 + (index % 10) : index - 10);
        }

        if (key === 's' || key === 'arrowdown') {
            moveIndex(index > 69 ? index % 10 : index + 10);
        }

        if (key === 'a' || key === 'arrowleft') {
            moveIndex(index < 1 ? 79 : index - 1);
        }

        if (key === 'd' || key === 'arrowright') {
            moveIndex(79 === index ? 0 : index + 1);
        }

        if (key === 'enter') {
            submitAnswer(index);
        }
    }

    const handleTimerEnd = async () => {
        if (!gameActive) return;

        setGameActive(false);
        setGameFinished(true);
        setGameStatus('Sequence failed!');

        await Wait(3000);

        endMinigame(false, props.timeToComplete - timeLeft);
    }

    const submitAnswer = async (idx: number) => {
        if (!gameActive) return;

        const result = [
            generatedLetterCopy[randomIdx] === generatedLetters[idx],
            generatedLetterCopy[(randomIdx + 1) % 80] === generatedLetters[(idx + 1) % 80],
            generatedLetterCopy[(randomIdx + 2) % 80] === generatedLetters[(idx + 2) % 80],
            generatedLetterCopy[(randomIdx + 3) % 80] === generatedLetters[(idx + 3) % 80],
        ].every((v) => v === true);

        if (result) {
            setGameActive(false);
            setGameFinished(true);
            setGameStatus('Sequence completed!');

            const audio = new Audio('https://freesound.org/data/previews/546/546083_7862587-lq.mp3');
            audio.volume = 0.35;
            audio.play();
        } else {
            setGameActive(false);
            setGameFinished(true);
            setGameStatus('Sequence failed!');

            const audio = new Audio('https://freesound.org/data/previews/572/572936_10182789-lq.mp3');
            audio.volume = 0.35;
            audio.play();
        }

        await Wait(3000);

        endMinigame(result, props.timeToComplete - timeLeft);
    }

    const endMinigame = (result: boolean, timeTaken: number) => {
        setGameActive(false);
        setIntroActive(false);
        props.updateState({ show: false });
        nuiAction(props.gameCompletedEvent, {
            success: result,
            parameters: props.parameters,
            timeTaken: timeTaken
        });
    }

    const shiftLetters = React.useCallback(() => {
        if (!gameActive) return;

        const slicedLetters = generatedLetters.slice();
        const shiftedLetters = slicedLetters.shift();

        slicedLetters.push(shiftedLetters);

        setGeneratedLetters(slicedLetters);
    }, [gameActive, generatedLetters]);

    React.useEffect(() => {
        timeout.current = setTimeout(() => {
            const tL = timeEnd - Date.now();
            if (tL <= 0) {
                handleTimerEnd();
                clearTimeout(timeout.current);
                return;
            }

            setTimeLeft(tL > 0 ? tL : 0);
        }, 50);

        return () => clearTimeout(timeout.current);
    });

    React.useEffect(() => {
        if (gameActive) {
            setTimeout(() => {
                shiftLetters();
            }, props.shiftInterval)
        }
    }, [generatedLetters, gameActive, shiftLetters, props.shiftInterval]);

    React.useEffect(() => {
        doIntro();
    }, [doIntro]);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPressed);

        return () => document.removeEventListener('keydown', handleKeyPressed);
    });

    function checkSequenceMatches(idx: number) {
        const sequenceLength = 4;

        for (let i = 0; i < sequenceLength; i++) {
            const shiftedIdx = (idx + i) % 80;
            const shiftedRandomIdx = (randomIdx + i) % 80;
            const generatedLetter = generatedLetters[shiftedIdx];
            const expectedLetter = generatedLetterCopy[shiftedRandomIdx];

            if (generatedLetter !== expectedLetter) {
                return false;
            }
        }

        return true;
    }

    return (
        <div className={classes.minigameSequenceGame}>
            {!gameActive && (
                <div className={classes.header}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    {introActive && !gameActive && (
                        <Typography variant="h6" style={{ color: 'white' }}>
                            {statusMessage}
                        </Typography>
                    )}
                    {gameFinished && !gameActive && (
                        <Typography variant="h6" style={{ color: 'white' }}>
                            {gameStatus}
                        </Typography>
                    )}
                </div>
            )}
            {gameActive && !introActive && (
                <>
                    <div className={classes.header}>
                        <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                        <Typography variant="h6" style={{ color: 'white' }}>
                            Connecting to the Host
                        </Typography>
                    </div>
                    <div className={classes.ipContainer}>
                        {showWantedSequence && (
                            <Typography className={props.upsideDown ? classes.upsideDownText : ''} variant="h4" style={{ color: 'white' }}>
                                {`${generatedLetterCopy[randomIdx]} ${generatedLetterCopy[(randomIdx + 1) % 80]} ${generatedLetterCopy[(randomIdx + 2) % 80]} ${generatedLetterCopy[(randomIdx + 3) % 80]}`}
                            </Typography>
                        )}
                    </div>
                    <MinigameTimer timeLeft={timeLeft} />
                    <div className={classes.numberMatrix}>
                        {generatedLetters.map((letter, idx) => {
                            const isHighlighted = checkSequenceMatches(idx);
                            return (
                                <Typography
                                    variant="body1"
                                    className={`
                                    ${classes.numColor} ${idx} ${index === idx || (idx - index < 4 && index < idx) || (index > 76 && idx < index - 76) ? classes.red : ''} ${props.upsideDown ? classes.upsideDownText : ''}
                                    ${props.withDebug && isHighlighted ? classes.blue : ''}
                                    `}
                                    key={idx}
                                >
                                    {letter}
                                </Typography>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}