import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    container: {
        display: 'flex',
        height: 'auto',
        position: 'relative',
        width: 'calc(100% - 64px)',
        minHeight: '30%',
        maxHeight: '90%', //80%
        overflow: 'hidden',
        backgroundColor: baseStyles.bgSecondary(),
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
        overflowY: 'scroll',
        padding: ResponsiveHeight(16)
    },
    spinner: {
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: baseStyles.bgSecondary(),
        '& > div': {
            margin: `${ResponsiveHeight(16)} 0`,
        },
        '& > div:first-child': { margin: 0 },
        '& > div:last-child': { margin: 0 }
    },
    errorText: {
        textAlign: 'center',
        padding: `0 ${ResponsiveHeight(16)} !important`,
    },
    icon: {
        color: baseStyles.colorWarning()
    },
    actions: {
        width: '100%',
        marginTop: `${ResponsiveHeight(32)} !important`,
        padding: `0 ${ResponsiveHeight(16)} !important`,
        display: 'flex',
        justifyContent: 'space-between'
    }
});