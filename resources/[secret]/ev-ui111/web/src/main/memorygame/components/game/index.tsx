import { Typography } from "@mui/material";
import useStyles from "./index.styles";
import Square from "./square";

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.container}>
            {!props.gameFinished && !props.introShown && (
                <div className={classes.introBox}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Remote Sequencing Required
                    </Typography>
                </div>
            )}
            {!props.gameFinished && props.introShown && (
                <div className={classes.boxClickBox}>
                    {props.randomIds && props.randomIds.map((square: any) => (
                        <Square key={square} {...props} isClickable={props.squareIds.includes(square)} />
                    ))}
                </div>
            )}
            {props.gameFinished && (
                <div className={classes.introBox}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Remote Sequencing {props.gameWon ? 'Complete' : 'Failed'}
                    </Typography>
                </div>
            )}
        </div>
    )
}