import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import useStyles from "../../index.styles";

const Triangle: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);
    const [hidden, setHidden] = React.useState(true);

    React.useEffect(() => {
        Math.random() < 0.5 && setHidden(false);
    }, []);

    return (
        <>
            {props.inner ? (
                <div className={classes.triangleContainerWrapper}>
                    <div
                        className={classes.triangleShapeInner}
                        style={{ borderBottomColor: props.innerShapeColor.color }}
                    />
                </div>
            ) : (
                <div className={classes.triangleContainer}>
                    <div
                        className={classes.triangleShape}
                        style={{ borderBottomColor: props.shapeColor.color }}
                    />
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

export default Triangle;