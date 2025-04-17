import { makeStyles } from '@mui/styles';
import { ResponsiveHeight, ResponsiveWidth } from '../../../utils/responsive';

export default makeStyles({
    android: {
        boxSizing: 'border-box',
        position: 'absolute',
        top: ResponsiveHeight(-8),
        left: ResponsiveWidth(-4),
        zIndex: 10,
        height: ResponsiveHeight(668),
        width: ResponsiveWidth(288),
        padding: `${ResponsiveHeight(10)} ${ResponsiveWidth(6)}`,
        background: 'black',
        borderRadius: ResponsiveWidth(12)
    },
    androidInner: {
        width: '100%',
        height: `calc(100% - ${ResponsiveHeight(8)})`,
        position: 'absolute',
        top: ResponsiveHeight(2),
        left: 0,
        content: '""',
        borderRadius: ResponsiveWidth(12),
        borderTop: `${ResponsiveHeight(2)} solid #9fa0a2`,
        borderBottom: `${ResponsiveHeight(2)} solid #9fa0a2`,
        background: 'black',
        zIndex: 1,
        boxShadow: `inset 0 0 ${ResponsiveHeight(6)} 0 rgba(255,255,255,0.5)`
    },
    androidOverflow: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: ResponsiveWidth(12),
        overflow: 'hidden'
    },
    androidOverflowShadow: {
        boxShadow: '\n      inset 0 0 '
            .concat(
                ResponsiveHeight(60) as any,
                ' 0 white,\n      inset 0 0 '
            )
            .concat(
                ResponsiveWidth(30) as any,
                ' 0 rgba(255,255,255,0.5),\n      0 0 '
            )
            .concat(
                ResponsiveHeight(20) as any,
                ' 0 white,\n      0 0 '
            )
            .concat(
                ResponsiveWidth(20) as any,
                ' 0 rgba(255,255,255,0.5)\n    '
            ),
        height: '101%',
        position: 'absolute',
        top: '-0.5%',
        content: '""',
        width: `calc(100% - ${ResponsiveWidth(20)})`,
        left: ResponsiveWidth(10),
        borderRadius: ResponsiveWidth(24),
        zIndex: 5,
        pointerEvents: 'none'
    },
    iphone: {
        position: 'absolute',
        zIndex: 10,
        top: ResponsiveHeight(-20),
        left: ResponsiveWidth(-20),
        boxSizing: 'border-box',
        height: ResponsiveHeight(692),
        width: ResponsiveWidth(320),
        padding: `${ResponsiveHeight(20)} ${ResponsiveWidth(20)}`,
        background: '#fdfdfd',
        boxShadow: `inset 0 0 ${ResponsiveWidth(9)} 0 black`,
        borderRadius: ResponsiveWidth(30),
        transformStyle: 'preserve-3d',
        '&::before': {
            width: `calc(100% - ${ResponsiveWidth(10)})`,
            height: `calc(100% - ${ResponsiveHeight(10)})`,
            position: 'absolute',
            top: ResponsiveHeight(5),
            content: '""',
            left: ResponsiveWidth(5),
            borderRadius: ResponsiveWidth(26),
            backgroundColor: 'black'
        }
    },
    iphoneNotch: {
        position: 'absolute',
        top: 0,
        left: `calc(50% - ${ResponsiveWidth(122)} / 2)`,
        height: ResponsiveHeight(24),
        width: ResponsiveWidth(122),
        borderBottomLeftRadius: ResponsiveWidth(20),
        borderBottomRightRadius: ResponsiveWidth(20),
        backgroundColor: 'black',
        display: 'flex',
        zIndex: '200',
        transform: 'translateZ(200px)',
        '&::before': {
            background: 'radial-gradient(circle at bottom right, transparent 0, transparent 70%, black 70%, black 100%)',
            right: ResponsiveWidth(-8),
            content: '""',
            height: ResponsiveHeight(8),
            position: 'absolute',
            top: 0,
            width: ResponsiveWidth(8),
        },
        '&::after': {
            background: 'radial-gradient(circle at bottom left, transparent 0, transparent 70%, black 70%, black 100%)',
            left: ResponsiveWidth(-8),
            content: '""',
            height: ResponsiveHeight(8),
            position: 'absolute',
            top: '0',
            width: ResponsiveWidth(8),
        }
    },
    iphoneSpacer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    iphoneSpeakerWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    iphoneSpeaker: {
        height: ResponsiveHeight(6),
        background: '#171818',
        borderRadius: ResponsiveWidth(6),
        width: '100%'
    },
    iphoneCamera: {
        width: ResponsiveWidth(6),
        height: ResponsiveHeight(6),
        borderRadius: '100%',
        background: '#0d4d71'
    },
    iphoneTopBar: {
        top: ResponsiveHeight(64),
        width: '100%',
        position: 'absolute',
        height: ResponsiveHeight(8),
        background: 'rgba(0,0,0,0.1)',
        left: '0'
    },
    iphoneSleep: {
        width: ResponsiveWidth(3),
        background: '#b5b5b5',
        position: 'absolute',
        height: ResponsiveHeight(77),
        top: ResponsiveHeight(154),
        right: ResponsiveWidth(-3),
        borderTopRightRadius: ResponsiveWidth(4),
        borderBottomRightRadius: ResponsiveWidth(4)
    },
    iphoneBottomBar: {
        bottom: ResponsiveHeight(64),
        width: '100%',
        position: 'absolute',
        height: ResponsiveHeight(8),
        background: 'rgba(0,0,0,0.1)',
        left: '0'
    },
    iphoneVolume: {
        left: ResponsiveWidth(-3),
        top: ResponsiveHeight(92),
        height: ResponsiveHeight(26),
        width: ResponsiveWidth(3),
        background: '#b5b5b5',
        position: 'absolute',
        borderTopLeftRadius: ResponsiveWidth(4),
        borderBottomLeftRadius: ResponsiveWidth(4),
        '&::before, &::after': {
            height: ResponsiveHeight(50),
            content: '""',
            left: '0',
            width: ResponsiveWidth(3),
            background: '#b5b5b5',
            position: 'absolute',
            borderTopLeftRadius: ResponsiveWidth(4),
            borderBottomLeftRadius: ResponsiveWidth(4),
        },
        '&::before': { top: ResponsiveHeight(50) },
        '&::after': { top: ResponsiveHeight(112) }
    },
    iphoneInnerShadow: {
        width: `calc(100% - ${ResponsiveWidth(20)})`,
        height: `calc(100% - ${ResponsiveHeight(20)})`,
        position: 'absolute',
        top: ResponsiveWidth(10),
        overflow: 'hidden',
        left: ResponsiveWidth(10),
        borderRadius: ResponsiveWidth(24),
        boxShadow: `inset 0 0 ${ResponsiveHeight(15)} 0 rgba(255,255,255,0.66)`,
        zIndex: 101,
        '> .inner-shadow-bg': {
            margin: `${ResponsiveHeight(10)} ${ResponsiveWidth(10)}`,
            width: `calc(100% - ${ResponsiveWidth(20)})`,
            height: `calc(100% - ${ResponsiveHeight(20)})`,
            borderRadius: ResponsiveWidth(24),
            background: 'linear-gradient(to bottom, #ff268e 0%, #ff694f 100%)'
        },
        '&::before': {
            boxShadow: `inset 0 0 ${ResponsiveWidth(20)} 0 #FFFFFF`,
            width: '100%',
            height: '116%',
            position: 'absolute',
            top: '-8%',
            content: '""',
            left: '0'
        }
    }
});