import { Typography } from '@mui/material';
import useStyles from '../index.styles';

interface HeistAppSquareProps {
    id: number;
    x: number;
    y: number;
    isClicked: boolean;
    failedClick: boolean;
    showNumber: boolean;
    highlight: boolean;
    gridX: number;
    gridY: number;
    clickSquare: (id: number) => void;
    highlightNeighbors: (id: number, highlight: boolean) => void;
}

export default (props: HeistAppSquareProps) => {
    const classes = useStyles(props);

    return (
        <div
            className={`${classes.clickSquare} ${props.highlight ? props.isClicked ? classes.clickedSquareHovered : classes.clickSquareHovered : ''} ${props.isClicked ? classes.clickSquareWasClicked : ''} ${props.failedClick ? classes.clickSquareFailedClick : ''}`}
            onMouseDown={() => props.clickSquare(props.id)}
            onMouseEnter={() => props.highlightNeighbors(props.id, true)}
            onMouseLeave={() => props.highlightNeighbors(props.id, false)}
        >
            <div className={classes.clickSquareNumber}>
                {props.showNumber ? (
                    <Typography variant="h4" style={{ color: 'white' }}>
                        {props.x} {props.y}
                    </Typography>
                ) : ''}
            </div>
        </div>
    )
}