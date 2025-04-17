import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import useStyles from "../index.styles";

const Square: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);

    return (
        <div
            className={`${classes.clickSquare} ${props.square.isClicked ? classes.clickSquareWasClicked : ''} ${props.failedClick ? classes.clickSquareFailedClick : ''}`}
            onMouseDown={() => props.clickSquare(props.square.id)}
            onMouseEnter={() => props.highlightNeighbors(props.square.id, true)}
            onMouseLeave={() => props.highlightNeighbors(props.square.id, false)}
        >
            <div className={classes.clickSquareNumber}>
                {props.square.showNumber ? (
                    <Typography variant="h4" style={{ color: 'white' }}>
                        {props.square.number}
                    </Typography>
                ) : ''}
            </div>
        </div>
    );
}

export default Square;