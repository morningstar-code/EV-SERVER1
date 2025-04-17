import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles({
    wrapper: {
        pointerEvents: 'all',
        color: 'white',
        transition: 'all 800ms ease',
        backgroundColor: baseStyles.bgPrimary(),
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        position: 'relative',
        padding: '16px'
    },
    title: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    optionsWrapper: {
        marginTop: '8px',
        borderTop: '1px solid white',
        padding: '16px 0'
    },
    optionsTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    options: {
        maxHeight: '75vh',
        height: '75vh',
        overflowY: 'auto'
    },
    option: {
        backgroundColor: baseStyles.bgSecondary(),
        width: '100%',
        display: 'flex',
        padding: '4px 16px',
        marginTop: '16px',
        borderRadius: '4px'
    },
    info: {
        flex: 1,
        '& h5, h6': {
            fontWeight: 'bold !important'
        },
        '& h5': {
            marginBottom: '8px !important'
        },
        '& h6': {
            marginTop: '16px !important'
        }
    },
    icon: {
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap-reverse',
        margin: '24px 0 0',
        '& p': {
            lineHeight: 36
        }
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});