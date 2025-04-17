import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    '@global': {
        '@keyframes blink': {
            '50%': {
                backgroundColor: '#6ACF65',
            }
        }
    },
    container: {
        height: '64vh',
        width: '64vh',
        position: 'relative',
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'center',
        padding: ResponsiveWidth(16),
        backgroundColor: baseStyles.bgPrimary()
    },
    introBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    clickSquare: function (props: any) {
        return {
            height: `calc(${64 / (props.gridSize + (props.gridSize % 2 ? 0 : props.gridSize > 9 ? 0.5 : 1))}vh - ${ResponsiveHeight(16)})`,
            width: `calc(${64 / (props.gridSize + (props.gridSize % 2 ? 0 : props.gridSize > 9 ? 0.5 : 1))}vh - ${ResponsiveHeight(16)})`,
            margin: ResponsiveHeight(4),
            borderRadius: '0.2vh'
        }
    },
    clickSquareShouldClick: {
        backgroundColor: '#094D1C',
    },
    clickSquareFailedClick: {
        backgroundColor: '#FF0000'
    },
    boxClickBox: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    clickableSquare: {
        animation: 'blink',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
    },
    clickSquareWasClicked: {
        backgroundColor: '#3DEC55'
    },
    clickSquareLast: {
        backgroundColor: '#6ACF65'
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