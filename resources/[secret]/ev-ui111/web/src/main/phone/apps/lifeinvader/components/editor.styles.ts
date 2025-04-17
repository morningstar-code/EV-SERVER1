import { makeStyles } from '@mui/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    markdownWrapper: {
        backgroundColor: '#fff',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        flex: 1,
        minHeight: 'calc(100% - 15rem)',
        '> textarea': {
            height: '100%',
            borderBottom: 0,
        },
        '& > div, > div div': {
            minHeight: '100%',
            height: '100%',
            maxHeight: '100%',
            overflowY: 'scroll',
            backgroundColor: '#fff',
            color: '#000',
        },
        '& .heading-name': { color: '#000 !important' }
    },
    searchContainer: {
        width: '100%',
        display: 'flex',
        marginBottom: '1rem'
    },
    backButton: {
        display: 'flex',
        width: ResponsiveWidth(40),
        alignItems: 'center'
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        '& > div': { marginBottom: '0.25rem' },
        marginBottom: '0.75rem'
    }
});