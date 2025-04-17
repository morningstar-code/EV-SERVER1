import { makeStyles } from '@mui/styles';
import { calculatePos } from '.';
import { ResponsiveHeight, ResponsiveWidth } from '../../utils/responsive';

export default makeStyles({
    '@global': {
        '@keyframes fadeinpls': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
        },
        '@keyframes fadeoutpls': {
            '0%': { opacity: 1 },
            '100%': { opacity: 0 }
        },
        '@keyframes rotateportrait': {
            '0%': { transform: 'rotate(-90deg) scale(1.5)' },
            '100%': { transform: 'rotate(0deg) scale(1)' }
        },
        '@keyframes rotatelandscape': {
            '0%': { transform: 'rotate(0) scale(1)' },
            '100%': { transform: 'rotate(-90deg) scale(1.5)' }
        }
    },
    wrapper: (data: any) => {
        return {
            position: data.landscape ? 'relative' : 'absolute',
            right: ResponsiveWidth(32),
            bottom: calculatePos(data),
            display: 'flex',
            flexWrap: 'wrap',
            minHeight: data.landscape ? ResponsiveHeight(250) : ResponsiveHeight(652),
            minWidth: data.landscape ? ResponsiveWidth(500) : ResponsiveWidth(280)
        };
    },
    rotateWrapper: (data: any) => {
        return {
            position: 'absolute',
            bottom: calculatePos(data),
            left: data.status === 'show' && (data.dev || data.landscape) ? 0 : 'unset',
            right: data.dev || data.landscape ? 0 : ResponsiveWidth(data.shell === 'ios' ? 18 : 16),
            top: data.status === 'show' && (data.dev || data.landscape) ? 0 : 'unset',
            margin: data.status === 'show' && (data.dev || data.landscape) ? 'auto' : 'unset',
            minHeight: 652,
            minWidth: 280,
            height: ResponsiveHeight(652),
            width: ResponsiveWidth(280),
            animation: `500ms ease 0s 1 normal none running ${data.landscape ? 'rotatelandscape' : 'rotateportrait'}`,
            transition: data.hasNotification ? 'none' : 'bottom 800ms ease',
            transform: data.landscape ? 'rotate(-90deg) scale(1.5)' : 'rotate(0deg) scale(1)',
            transformStyle: 'preserve-3d'
        };
    },
    innerWrap: (data: any) => {
        return {
            position: 'absolute',
            bottom: calculatePos(data),
            left: data.status === 'show' && (data.dev || data.landscape) ? 0 : 'unset',
            right: data.dev || data.landscape ? 0 : ResponsiveWidth(data.shell === 'ios' ? 18 : 16),
            top: data.status === 'show' && (data.dev || data.landscape) ? 0 : 'unset',
            margin: data.status === 'show' && (data.dev || data.landscape) ? 'auto' : 'unset',
            pointerEvents: 'all',
            background: `url(${data.wallpaper})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: data.landscape && !data.isChanging ? ResponsiveHeight(420) : ResponsiveHeight(652),
            minWidth: data.landscape && !data.isChanging ? ResponsiveWidth(978) : ResponsiveWidth(280),
            height: data.landscape && !data.isChanging ? ResponsiveHeight(420) : ResponsiveHeight(652),
            width: data.landscape && !data.isChanging ? ResponsiveWidth(978) : ResponsiveWidth(280),
            borderRadius: ResponsiveHeight(data.shell === 'ios' ? 16 : 6),
            overflow: 'hidden',
            zIndex: 20,
            animation: `500ms ease 0s 1 normal none running ${data.landscape ? 'rotatelandscape' : 'rotateportrait'}`,
            transition: data.hasNotification ? 'none' : 'bottom 800ms ease'
        };
    }
});