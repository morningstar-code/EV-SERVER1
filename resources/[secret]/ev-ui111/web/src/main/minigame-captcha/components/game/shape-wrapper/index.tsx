import { Typography } from "@mui/material";
import React from "react";
import useStyles from "../../index.styles";

export default (props) => {
    const classes = useStyles(props);
    const [_0x549acf, _0x42d19d] = React.useState(false);
    const [_0x14f079, _0x3b848e] = React.useState(true);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            _0x42d19d(true);
        }, 5000);
        const timeout2 = setTimeout(() => {
            _0x3b848e(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        }
    }, []);

    const shapeContainerStyle = _0x549acf
        ? { backgroundColor: props.backgroundColor.color }
        : {};

    return (
        <div className={classes.shapeContainer} style={shapeContainerStyle}>
            <div className={classes.shapeIdContainer}>
                <Typography className={classes.textStroke} style={_0x14f079 ? { transform: 'scale(4)' } : { transform: 'scale(0)' }}>
                    {props.id}
                </Typography>
            </div>
            {_0x549acf && (
                <div className={classes.shapeInnerContainer}>
                    <div className={classes.shapeInnerContainerId}>
                        <Typography style={{ color: props.numberColor.color }}>
                            {props.altId}
                        </Typography>
                    </div>
                    {props.children}
                </div>
            )}
        </div>
    );
}