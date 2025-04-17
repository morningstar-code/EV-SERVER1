import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    '@global': {
        '@keyframes static': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '0 0' },
            '10%': { backgroundPosition: '-5% -10%' },
            '20%': { backgroundPosition: '-15% 5%' },
            '30%': { backgroundPosition: '7% -25%' },
            '40%': { backgroundPosition: '20% 25%' },
            '50%': { backgroundPosition: '-25% 10%' },
            '60%': { backgroundPosition: '15% 5%' },
            '70%': { backgroundPosition: '0% 15%' },
            '80%': { backgroundPosition: '25% 35%' },
            '90%': { backgroundPosition: '-10% 10%' }
        }
    },
    container: {
        height: ResponsiveWidth(640),
        width: ResponsiveWidth(640),
        position: 'relative',
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: baseStyles.bgPrimary()
    },
    innerContainer: {
        position: 'relative',
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#002200',
        boxSizing: 'content-box',
        border: `35px solid ${baseStyles.bgPrimary()}`,
        borderRadius: '0.5vh',
        '&:after': {
            content: "''",
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            background: 'url(https://becky.dev/assets/images/whitenoise-e05ce92bb85e9688f3fd742c6e4eb6bf.png) repeat',
            animation: 'static',
            animationDuration: '120s',
            animationIterationCount: 'infinite',
            opacity: 0.05,
            pointerEvents: 'none',
            zIndex: 5
        }
    },
    introBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    }
});