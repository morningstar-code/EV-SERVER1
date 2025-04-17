import { Typography } from "@mui/material";
import useStyles from "./index.styles";
import Square from "./square";

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.container}>
            {!props.introComplete && (
                <div className={classes.introBox}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="h5" style={{ color: 'white' }}>
                        Finger Print Not Recognized
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Proof of Training Required
                    </Typography>
                </div>
            )}
            {props.introComplete && !props.gameFinished && (
                <div className={classes.squareContainer}>
                    {props.squares && Array.from(Array(Number(props.squares) + 1).keys()).filter((square: any) => square !== 0).map((square: any) => (
                        <Square key={square} {...props} digit={square} clickSquare={() => props.clickSquare(square)} />
                    ))}
                </div>
            )}
            {props.introComplete && props.gameFinished && (
                <div className={classes.introBox}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="h5" style={{ color: 'white' }}>
                        {props.gameWon ? 'Security Clearance Accepted' : 'Failed Security Clearance'}
                    </Typography>
                </div>
            )}
        </div>
    )
}