import { Typography } from "@mui/material";
import Game from "./game";
import useStyles from "./index.styles";

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.container}>
            {!props.gameFinished && !props.introShown && (
                <div className={classes.introBox}>
                    <i className="fas fa-server fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Firewall active... Decryption required...
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
                    <i className="fas fa-server fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Firewall {props.gameWon ? 'Breached' : 'Breach Failed'}
                    </Typography>
                </div>
            )}
        </div>
    )
}