import { makeStyles } from '@mui/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

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
    }
});