import { makeStyles } from '@mui/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    clickSquare: {
        height: '100%',
        width: '100%',
        backgroundColor: '#3DEC55',
        borderRadius: '0.2vh',
        transition: 'background-color 0.1s ease'
    },
    clickableSquare: {
        backgroundColor: '#3DEC55'
    },
    clickSquareWasClicked: {
        backgroundColor: '#094D1C'
    },
    clickSquareHovered: {
        backgroundColor: '#469751'
    },
    clickedSquareHovered: {
        backgroundColor: '#bef3c5'
    },
    clickSquareFailedClick: {
        backgroundColor: '#FF0000'
    },
    boxClickBox: function (props: { gridX: number, gridY: number }) {
        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${props.gridX}, 1fr)`,
            gridTemplateRows: `repeat(${props.gridY}, 1fr)`,
            gridGap: ResponsiveWidth(16),
            width: '100%',
            height: '100%',
            padding: props.gridX > 7 ? '2%' : '4%'
        }
    },
    clickSquareNumber: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none'
    }
});