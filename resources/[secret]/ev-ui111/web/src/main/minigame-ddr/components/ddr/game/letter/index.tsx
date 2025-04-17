import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import useStyles from "../index.styles";

const Letter = React.forwardRef((props: any, ref: any) => {
    const classes = useStyles(props);
    const [maxHeight, setMaxHeight] = React.useState(640);
    const [opacity, setOpacity] = React.useState(1);
    const letter = props.letter;

    React.useEffect(() => {
        var _0x51aa15, _0x54307f
        setMaxHeight(
            null !==
                (_0x51aa15 =
                    null === ref ||
                        void 0 === ref ||
                        null === (_0x54307f = ref.current) ||
                        void 0 === _0x54307f
                        ? void 0
                        : _0x54307f.clientHeight) && void 0 !== _0x51aa15
                ? _0x51aa15
                : 0
        )
    }, [letter.hit, letter.miss, ref]);

    React.useEffect(() => {
        const timeout1 = setTimeout(() => {
            setMaxHeight(0);
        }, letter.startTime + 32);

        const timeout2 = setTimeout(() => {
            setOpacity(0);
        }, letter.startTime + 32 + props.timeToTravel - 100);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        }
    }, [letter, props.timeToTravel]);

    return (
        <div
            key={letter.key}
            ref={ref}
            className={classes.letterWrapper}
            onTransitionEnd={function (e) {
                return (
                    'max-height' !== e.propertyName ||
                        letter.hit ||
                        letter.miss ||
                        ((letter.miss = true), props.missLetter(letter))
                )
            }}
            style={{ opacity: opacity, maxHeight: maxHeight }}
        >
            <Typography
                variant="h2"
                style={{
                    opacity: maxHeight > 0 ? 0 : 1,
                    transition: letter.hit ? 'opacity 500ms linear' : 'opacity 100ms linear',
                    color: letter.miss ? '#ff0000' : letter.hit ? '#00ff00' : '#fff'
                }}
            >
                {letter.letter}
            </Typography>
        </div>
    )
});

export default Letter;