import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    '@global': {
        '@keyframes serverroomx': {
            '100%': {
                transform: 'translateX(75vw)'
            }
        },
        '@keyframes serverroomy': {
            '100%': {
                transform: 'translateY(calc(80vh - 5vw))'
            }
        }
    },
    container: {
        height: '80vh',
        width: '80vw',
        position: 'relative',
        pointerEvents: 'all',
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
    squareContainer: {
        position: 'relative'
    },
    clickSquare:  {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid white',
        flexDirection: 'column',
        height: '5vw',
        width: '5vw',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'absolute'
    },
    clickSquareClicked: {
        backgroundColor: `${baseStyles.bgSecondary()} !important`,
        border: 'unset'
    },
    clickSquareInner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        userSelect: 'none'
    }
});