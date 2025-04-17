import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        height: '100%'
    },
    pageWrapper: {
        display: 'flex',
        height: '100%',
        padding: ResponsiveWidth(16)
    },
    configPage: {
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    configBox: {
        maxWidth: '49%',
        backgroundColor: baseStyles.bgSecondary(),
        padding: ResponsiveWidth(8),
        flex: 1,
        maxHeight: 'calc(100% - 48px)',
        overflowY: 'auto',
        marginRight: ResponsiveWidth(8),
        paddingRight: ResponsiveWidth(8),
        borderRight: '2px solid black',
        '&:last-child': {
            marginRight: 0
        }
    },
    editBox: {
        marginTop: ResponsiveHeight(8),
        marginBottom: ResponsiveHeight(16),
        paddingTop: ResponsiveHeight(8),
        borderTop: '2px solid black'
    },
    buttons: {
        display: 'flex',
        paddingTop: ResponsiveHeight(8),
        marginBottom: ResponsiveHeight(8),
        '& div': {
            marginRight: ResponsiveWidth(16)
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center'
    },
    badgeCreator: {
        width: 400,
        display: 'flex',
        flexDirection: 'column'
    }
});