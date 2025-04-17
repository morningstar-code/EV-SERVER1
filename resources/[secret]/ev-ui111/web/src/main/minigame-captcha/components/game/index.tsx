import React, { FunctionComponent } from "react";
import useStyles from "../index.styles";
import Square from "./shapes/square";
import Rectangle from "./shapes/rectangle";
import Triangle from "./shapes/triangle";
import Circle from "./shapes/circle";
import ShapeWrapper from "./shape-wrapper";
import Captcha from "./captcha";

const Game: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);
    const [started, setStarted] = React.useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <div className={classes.shapes}>
                {props.shapes && props.shapes.map((shape) => {
                    let Component: any = null;

                    shape.shape === 'square' && (Component = Square);
                    shape.shape === 'rectangle' && (Component = Rectangle);
                    shape.shape === 'triangle' && (Component = Triangle);
                    shape.shape === 'circle' && (Component = Circle);

                    return (
                        <ShapeWrapper key={shape.id} {...props} {...shape}>
                            <Component {...props} {...shape} />
                        </ShapeWrapper>
                    )
                })}
            </div>
            {started && (
                <Captcha {...props} />
            )}
        </>
    )
}

export default Game;