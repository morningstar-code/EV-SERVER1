import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 1000
    },
    wrapperFlex: {
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        position: 'relative',
        padding: ResponsiveWidth(8),
        minWidth: '20%',
        maxWidth: '60%',
        backgroundColor: baseStyles.bgPrimary(),
        minHeight: ResponsiveHeight(200),
        maxHeight: '90%',
        overflow: 'scroll'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        '& > div': {
            display: 'inline'
        }
    },
    modalGroup: {
        padding: ResponsiveWidth(8),
        marginBottom: ResponsiveHeight(8),
        width: '100%'
    },
    modalItem: {
        marginBottom: ResponsiveHeight(16),
        width: '100%'
    },
    modalItemButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        '& > div': {
            display: 'inline'
        }
    },
    modalTagItems: {
        minHeight: ResponsiveHeight(140),
        maxHeight: ResponsiveHeight(140),
        overflowY: 'scroll'
    },
    loadingSpinner: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20000,
        backgroundColor: baseStyles.bgPrimary()
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    verticalStack: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '100%',
        overflowY: 'scroll',
        '& > div': { marginBottom: ResponsiveHeight(8) }
    }
});