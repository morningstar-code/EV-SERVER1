import { makeStyles } from '@mui/styles';

export default makeStyles({
    accounts: {
        width: '25%',
        height: '100%',
        padding: '16px'
    },
    accountsHolder: {
        flex: 1,
        height: 'calc(100% - 80px)',
        overflowY: 'auto'
    },
    account: {
        padding: '8px',
        width: '100%',
        borderRadius: '4px',
        backgroundColor: '#30475e',
        margin: '16px 0',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:first-child': {
            marginTop: 0
        },
        '&:last-child': {
            marginBottom: 0
        }
    },
    accountActive: {
        backgroundColor: '#1e3a56',
        border: '1px solid #78a8d8'
    },
    balanceContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        '& div': {
            flex: 1
        }
    }
});