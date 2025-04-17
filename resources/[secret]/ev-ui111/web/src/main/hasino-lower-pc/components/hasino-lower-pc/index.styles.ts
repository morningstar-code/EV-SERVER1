import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        minWidth: ResponsiveWidth(256),
        maxWidth: ResponsiveWidth(720),
        padding: ResponsiveWidth(32),
        backgroundColor: baseStyles.bgPrimary(),
        pointerEvents: 'all'
    },
    abc: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20%',
        marginBottom: ResponsiveHeight(82),
        position: 'relative'
    },
    roundedFieldset: {
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        width: ResponsiveWidth(64),
        margin: '0 auto',
        border: '3px solid #fff',
        borderRadius: '50%',
        transform: 'translateY(-50%)'
    },
    inner: {
        '& fieldset': {
            height: ResponsiveWidth(40),
            width: ResponsiveWidth(32)
        }
    },
    middle: {
        '& fieldset': {
            height: ResponsiveWidth(96),
            width: ResponsiveWidth(88)
        }
    },
    outer: {
        '& fieldset': {
            height: ResponsiveWidth(136),
            width: ResponsiveWidth(128)
        }
    },
    prompt: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: ResponsiveHeight(16)
    },
    closeButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
    }
});