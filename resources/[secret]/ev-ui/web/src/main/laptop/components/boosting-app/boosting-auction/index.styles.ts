import { makeStyles } from '@mui/styles';

export default makeStyles({
    auctionItem: {
        display: 'flex',
        padding: '1.5rem',
        borderRadius: '2px',
        marginBottom: '0.5rem',
        backgroundColor: '#21212B',
        justifyContent: 'space-between',
        fontFamily: 'Roboto, sans-serif'
    },
    auctionItemInfo: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    auctionItems: {
        marginTop: '1rem'
    },
    empty: {
        fontSize: '14px !important',
        color: '#a7a7a7 !important',
        textAlign: 'center'
    }
});