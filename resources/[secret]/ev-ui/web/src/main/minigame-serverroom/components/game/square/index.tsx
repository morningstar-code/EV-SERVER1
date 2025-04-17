import { Typography } from "@mui/material";
import React from "react";
import { GetRandom } from "utils/misc";
import useStyles from "../index.styles";

const colors = [
    '#7393B3',
    '#088F8F',
    '#0047AB',
    '#6495ED',
    '#00008B',
    '#6F8FAF',
    '#1434A4'
];

export default (props: any) => {
    const classes = useStyles(props);
    const color = React.useRef(colors[Math.floor(Math.random() * colors.length)]);
    const [showNumbers, setShowNumbers] = React.useState<boolean>(true);
    const [style, setStyle] = React.useState<any>({
        x: `${GetRandom(0, 75)}vw`,
        y: `calc(${GetRandom(10, 80)}vh - 5vw)`,
        xSpeed: '1s',
        ySpeed: '1s'
    });

    const handleStyle = React.useCallback(() => {
        const xSpeed = GetRandom(props.intervalMin, props.intervalMax);
        const ySpeed = GetRandom(props.intervalMin, props.intervalMax);

        setStyle({
            x: `${GetRandom(0, 75)}vw`,
            y: `calc(${GetRandom(10, 80)}vh - 5vw)`,
            xSpeed: `${xSpeed}ms`,
            ySpeed: `${ySpeed}ms`
        });

        setTimeout(() => {
            handleStyle();
        }, Math.min(xSpeed, ySpeed));
    }, [props.intervalMin, props.intervalMax]);

    React.useEffect(() => {
        handleStyle();

        setTimeout(() => {
            setShowNumbers(false);
        }, props.numberTimeout);
    }, [handleStyle, props.numberTimeout]);

    const defaultStyle = {
        left: style.x,
        top: style.y,
        transition: `top ${style.xSpeed} linear, left ${style.ySpeed} linear`,
        zIndex: GetRandom(1, 100),
        backgroundColor: color.current
    }

    return (
        <>
            <div
                className={`${classes.clickSquare} ${props.clickTarget > props.digit ? classes.clickSquareClicked : ''}`}
                onMouseDown={showNumbers ? () => { } : props.clickSquare}
                style={defaultStyle}
            >
                {showNumbers && (
                    <Typography variant="h2" style={{ color: 'white' }}>
                        {props.digit}
                    </Typography>
                )}
            </div>
        </>
    )
}