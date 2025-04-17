import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import useStyles from "../../index.styles";

const Circle: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);
    const [hidden, setHidden] = React.useState(true);

    React.useEffect(() => {
        Math.random() < 0.5 && setHidden(false);
    }, []);

    return (
        <>
            {props.inner ? (
                <div
                    className={`${classes.circleContainer} ${classes.circleContainerInner}`}
                    style={{ backgroundColor: props.innerShapeColor.color }}
                />
            ) : (
                <div
                    className={classes.circleContainer}
                    style={{ backgroundColor: props.shapeColor.color }}
                >
                    {hidden ? (
                        <>
                            <Typography className={classes.shapeText} style={{ color: props.textColorBgColor.color }}>
                                {props.textColor}
                            </Typography>
                            <br />
                            <Typography className={classes.shapeText} style={{ color: props.textShapeBgColor.color }}>
                                {props.textShape}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography className={classes.shapeText} style={{ color: props.textShapeBgColor.color }}>
                                {props.textShape}
                            </Typography>
                            <br />
                            <Typography className={classes.shapeText} style={{ color: props.textColorBgColor.color }}>
                                {props.textColor}
                            </Typography>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Circle;