import { makeStyles } from '@mui/styles';

export default makeStyles({
    container: {
        height: '100%'
    },
    controlBar: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    listingBtn: {
        fontSize: '11px !important',
        color: '#fff !important',
        fontWeight: '500 !important',
        textTransform: 'none',
        backgroundColor: '#3787FF !important'
    },
    listingList: {
        marginTop: '1rem'
    },
    listingItem: {
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        marginBottom: '1rem',
        alignItems: 'center',
        backgroundColor: '#31394d',
        boxShadow: '1px 3px 4px 0px #00000024'
    },
    listingInfo: {
        marginLeft: '1rem',
        flex: 'auto'
    },
    listingThumbnail: {
        width: 115,
        height: 60,
        borderRadius: 5,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: 'inset rgb(0 0 0 / 34%) 1px 3px 4px 0px'
    },
    listingTitle: {
        fontSize: '13px !important',
        color: '#fff !important'
    },
    listingDesc: {
        fontSize: '12px !important',
        color: '#9ba4bb !important'
    },
    listingRentalBtn: {
        fontSize: '10px !important',
        alignSelf: 'end !important',
        color: '#9ba4bb !important',
        borderRadius: '50px !important',
        padding: '8px 15px !important',
        background: 'transparent !important',
        border: '2px solid #9ba4bb !important',
        '&:hover': {
            color: '#fff !important',
            border: '2px solid #3787FF !important',
            background: '#3787FF !important'
        }
    },
    listingRedBtn: {
        fontSize: '13x !important',
        alignSelf: 'end !important',
        minWidth: '0px !important',
        color: '#9ba4bb !important',
        borderRadius: '50px !important',
        padding: '8px 15px !important',
        marginRight: '0.65rem !important',
        background: 'transparent !important',
        border: '2px solid #9ba4bb !important',
        '&:hover': {
            color: '#fff !important',
            border: '2px solid #ad3b3b !important',
            background: '#ad3b3b !important'
        }
    },
    listingYellowBtn: {
        fontSize: '13x !important',
        alignSelf: 'end !important',
        minWidth: '0px !important',
        color: '#9ba4bb !important',
        borderRadius: '50px !important',
        padding: '8px 15px !important',
        marginRight: '0.65rem !important',
        background: 'transparent !important',
        border: '2px solid #9ba4bb !important',
        '&:hover': {
            color: '#fff !important',
            border: '2px solid #e4b11f !important',
            background: '#e4b11f !important'
        }
    },
    modalText: {
        fontSize: '15px !important',
        color: '#fff !important',
        textAlign: 'center',
        fontWeight: 'normal !important'
    }
});