import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";
import Letter from "./letter";
import qteclick from "assets/qteclick.ogg";
import short_double_beep from "assets/short_double_beep.ogg";

const Game: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);
    const [state, setState] = React.useState<any>(null);

    const successes = React.useRef<number>(0);
    const failures = React.useRef<number>(0);

    const handleKeyDown = React.useCallback((e: any) => {
        const key = e.key.toLowerCase();

        if (props.letters.includes(key)) {
            const now = Date.now();
            let bool = false;

            const foundState = state.find((s: any) => {
                return s.letter === key && !s.hit && !s.miss && s.ref.current.clientHeight >= 75 && s.ref.current.clientHeight <= 175;
            });

            if (
                (foundState && ((foundState.hit = true), (bool = true)),
                    !bool)
            ) {
                const filtered = state.filter((s: any) => {
                    return !s.hit && !s.miss && s.windowMin - props.timeBetweenLetters + 100 < now;
                }).sort((a: any, b: any) => {
                    return Math.abs(a.windowMax - now) - Math.abs(b.windowMax - now);
                })[0];

                if (!filtered) {
                    return;
                }

                filtered.miss = true;

                const sound = new Audio(short_double_beep);
                sound.load();
                sound.volume = 0.1;
                sound.controls = false;
                sound.play();

                setTimeout(() => {
                    sound.remove();
                }, 300);

                failures.current++;

                if (failures.current >= props.failureCount) {
                    props.gameCallback(false);
                } else {
                    setState([...state]);
                }
            } else {
                const sound = new Audio(qteclick);
                sound.load();
                sound.volume = 0.1;
                sound.controls = false;
                sound.play();

                setTimeout(() => {
                    sound.remove();
                }, 300);

                successes.current++;

                if (successes.current >= state.length - failures.current) {
                    props.gameCallback(true);
                } {
                    setState([...state]);
                }
            }

        }
    }, [state, props]);

    const missLetter = () => {
        failures.current++;

        const sound = new Audio(short_double_beep);
        sound.load();
        sound.volume = 0.1;
        sound.controls = false;
        sound.play();

        setTimeout(() => {
            sound.remove();
        }, 300);

        if (failures.current >= props.failureCount) {
            props.gameCallback(false);
        } else {
            setState([...state]);
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    React.useEffect(() => {
        const columns = Array.from(Array(props.columns).keys());
        const _0x4ad62f = Math.floor(props.gameTimeoutDuration / props.timeBetweenLetters);
        const generated = [];
        const now = Date.now();

        for (let i = 0; i < _0x4ad62f; i++) {
            const selectedColumn = columns[Math.floor(Math.random() * columns.length)];
            const selectedLetter = props.letters[Math.floor(Math.random() * props.letters.length)];
            const startTime = (i + 1) * props.timeBetweenLetters;
            const windowMax = now + startTime + 0.9 * props.timeToTravel;
            const windowMin = now + startTime - 0.75 * props.timeToTravel;

            generated.push({
                key: i,
                column: selectedColumn,
                letter: selectedLetter,
                windowMax: windowMax,
                windowMin: windowMin,
                startTime: startTime,
                ref: React.createRef()
            });
        }

        setState(generated);
    }, [props]);

    return (
        <div className={classes.boxClickBox}>
            <div className={classes.targetArea}></div>
            {Array.from(Array(props.columns).keys()).map((column: number) => {
                return (
                    <div key={column} className={classes.columnWrapper}>
                        {state && state.filter((s: any) => s.column === column).map((s: any) => {
                            return (
                                <Letter {...props} key={s.key} ref={s.ref} letter={s} missLetter={missLetter} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
}

export default Game;