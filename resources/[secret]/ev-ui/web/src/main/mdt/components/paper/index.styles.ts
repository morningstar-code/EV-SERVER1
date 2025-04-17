import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: baseStyles.bgPrimary(),
        padding: ResponsiveWidth(8),
        marginBottom: ResponsiveHeight(8)
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    titleExtra: {
        textAlign: 'right'
    },
    timestamp: {
        textAlign: 'right'
    },
    bottomRow: {
        marginTop: ResponsiveHeight(8),
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    flexWrapper: {
        display: 'flex'
    },
    imageHolder: {
        maxWidth: '20%',
        marginRight: ResponsiveWidth(8),
        '& img': {
            maxWidth: '100%'
        }
    },
    description: {
        flex: 1,
        marginTop: ResponsiveHeight(8)
    }
});