import { makeStyles } from '@mui/styles';

export default makeStyles({
    auctionItem: {
        display: 'table',
        width: '100%',
        padding: '1.5rem',
        borderRadius: '2px',
        marginBottom: '0.5rem',
        tableLayout: 'fixed',
        backgroundColor: '#21212B',
        justifyContent: 'space-between',
        fontFamily: 'Roboto, sans-serif'
    },
    auctionItemInfo: {
        display: 'table-cell',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    auctionItemHeading: {
        textAlign: 'center'
    },
    auctionItemInfoText: {
        textAlign: 'center'
    }
});