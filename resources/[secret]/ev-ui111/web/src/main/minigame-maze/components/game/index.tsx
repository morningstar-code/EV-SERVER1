import { Typography } from "@mui/material";
import useStyles from "./index.styles";
import Square from "./square";

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.container}>
            {!props.gameFinished && !props.introShown && (
                <div className={classes.introBox}>
                    <i className="fas fa-network-wired fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Network Access Blocked... Override Required
                    </Typography>
                </div>
            )}
            {!props.gameFinished && props.introShown && (
                <div className={classes.boxClickBox}>
                    {props.squares && props.squares.map((square: any) => (
                        <Square key={square.id} {...square} {...props} />
                    ))}
                </div>
            )}
            {props.gameFinished && (
                <div className={classes.introBox}>
                    <i className="fas fa-network-wired fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Network Access {props.gameWon ? 'Granted' : 'Denied'}
                    </Typography>
                </div>
            )}
        </div>
    )
}