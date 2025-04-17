import { makeStyles } from '@mui/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    },
    icon: {
        width: ResponsiveWidth(54),
        height: ResponsiveHeight(54),
        margin: ResponsiveHeight(8),
        borderRadius: ResponsiveHeight(14),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '& i': {
            fontSize: ResponsiveHeight(32),
            stroke: '#222831',
            strokeWidth: 8
        }
    },
    notification: {
        position: 'absolute',
        top: ResponsiveHeight(-6),
        right: ResponsiveHeight(-6),
        width: ResponsiveWidth(20, true),
        height: ResponsiveHeight(20),
        borderRadius: '100%',
        backgroundColor: 'red',
        '&::before': {
            content: "''",
            width: ResponsiveWidth(6, true),
            height: ResponsiveHeight(6),
            backgroundColor: 'white',
            position: 'absolute',
            top: ResponsiveHeight(7),
            left: ResponsiveHeight(7),
            borderRadius: '100%'
        }
    },
    burnerAppContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        opacity: 1,
        overflow: 'hidden',
        position: 'relative',
        animation: 'fadeinpls',
        animationIterationCount: 1,
        animationDuration: '800ms',
        flexWrap: 'wrap',
        backgrond: 'rgb(34, 40, 49)',
        boxShadow: 'none',
        paddingTop: '32px',
        paddingBottom: '40px'
    }
});