import { makeStyles } from '@mui/styles';
import { ResponsiveHeight, ResponsiveWidth } from '../../../../utils/responsive';

export default makeStyles({
    '@global': {
        '@keyframes pulseheart': {
            '0%': { transform: 'scale(1)' },
            '100%': { transform: 'scale(1.25)' }
        }
    },
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 100,
        userSelect: 'none',
        width: '100%',
        minHeight: 40,
        height: ResponsiveHeight(40),
        '& div': {
            margin: 0,
            marginLeft: ResponsiveWidth(16),
            marginRight: ResponsiveWidth(16),
        },
        borderTop: '1px solid rgba(1, 1, 1, 0.5)',
        backgroundColor: 'rgba(1, 1, 1, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    pulse: {
        animation: 'pulseheart',
        animationDuration: '1s',
        animationIterationCount: 'infinite'
    }
});