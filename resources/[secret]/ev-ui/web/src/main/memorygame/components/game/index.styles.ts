import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight } from 'utils/responsive';

export default makeStyles({
    container: {
        height: '50vh',
        width: '50vh',
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
    clickSquare: function (props: any) {
        const size = 50 / Number(props.gridSize);

        return {
            height: `calc(${size}vh - ${baseStyles.responsiveHeight(16)})`,
            width: `calc(${size}vh - ${baseStyles.responsiveHeight(16)})`,
            margin: ResponsiveHeight(8),
            backgroundColor: baseStyles.bgSecondary()
        }
    },
    clickSquareShouldClick: {
        backgroundColor: '#CCC !important'
    },
    boxClickBox: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    clickSquareWasClicked: {
        backgroundColor: '#CCC !important'
    },
    clickSquareWasClickedFail: {
        backgroundColor: 'red !important'
    }
});