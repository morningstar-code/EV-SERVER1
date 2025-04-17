import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import Game from "./game";
import useStyles from "./index.styles";

const Flip: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {!props.gameFinished && !props.introShown && (
                <div className={classes.introBox}>
                    <i className="fas fa-database fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }} />
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Data corrupted, checksum repair required...
                    </Typography>
                </div>
            )}
            {!props.gameFinished && props.introShown && (
                <div className={classes.innerContainer}>
                    <Game {...props} />
                </div>
            )}
            {props.gameFinished && (
                <div className={classes.introBox}>
                    <i className="fas fa-database fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }} />
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Data {props.gameWon ? 'Recovered' : 'Recovery Failed'}
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default Flip;