import { Typography } from "@mui/material";
import useStyles from "../index.styles";

const chessPieces = {
    1: 'chess-pawn',
    2: 'chess-knight',
    3: 'chess-bishop',
    4: 'chess-rook',
    5: 'chess-queen',
    6: 'chess-king'
}

export default (props: any) => {
    const classes = useStyles(props);
    const idIsZero = props.id === 0;
    const numberIsZero = props.number === 0;

    return (
        <div
            className={`${classes.clickSquare} ${props.blink ? classes.clickableSquare : ''} ${numberIsZero ? '' : classes.clickSquareShouldClick} ${props.isClicked && !numberIsZero ? classes.clickSquareWasClicked : ''} ${numberIsZero || idIsZero ? classes.clickSquareLast : ''} ${props.failedClick ? classes.clickSquareFailedClick : ''}`}
            onMouseDown={() => props.isClicked || props.clickSquare(props.id)}
        >
            <div className={classes.clickSquareNumber}>
                {numberIsZero || idIsZero ? (
                    <i className={`fas fa-${idIsZero ? 'ethernet' : 'network-wired'} fa-fw fa-2x`} style={{ color: (numberIsZero && props.gameWon) || idIsZero ? 'green' : 'red' }}></i>
                ) : props.showNumber ? props.useChessPieces && chessPieces[props.number] ? (
                    <i className={`fas fa-${chessPieces[props.number]} fa-fw fa-2x`} style={{ color: 'white' }}></i>
                ) : (
                    <Typography variant="h4" style={{ color: 'white' }}>
                        {props.number}
                    </Typography>
                ) : ''}
            </div>
        </div>
    )
}