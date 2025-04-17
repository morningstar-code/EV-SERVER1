import { makeStyles } from '@mui/styles';

export default makeStyles({
    transactions: {
        width: '100%',
        height: '100%',
        maxHeight: 'calc(100% - 32px)',
        backgroundColor: '#222831',
        flex: '1',
        padding: '16px',
        overflowY: 'auto'
    },
    transaction: {
        width: '100%',
        padding: '16px',
        borderRadius: '4px',
        marginTop: '16px',
        backgroundColor: '#30475e'
    },
    title: {
        display: 'flex'
    }
})