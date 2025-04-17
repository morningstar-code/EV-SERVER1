import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import useStyles from "./index.styles";
import Game from "./game";

const Ddr: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {!props.gameFinished && !props.introShown && (
                <div className={classes.introBox}>
                    <i className="fas fa-keyboard fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }} />
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Pattern recognition required...
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
                    <i className="fas fa-keyboard fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }} />
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Access {props.gameWon ? 'Granted' : 'Denied'}
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default Ddr;