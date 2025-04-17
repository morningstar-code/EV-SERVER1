import { makeStyles } from '@mui/styles';

export default makeStyles({
    appControls: {
        display: 'flex',
        padding: '8px 20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
            cursor: 'grab'
        }
    },
    appControlsTitle: {
        padding: `0px !important`,
        fontWeight: `600 !important`,
        fontSize: `13px !important`,
    },
    appControlButtons: {
        display: 'flex'
    },
    appControlCloseBtn: {
        border: `none !important`,
        minWidth: `17px !important`,
        minHeight: `17px !important`,
        borderRadius: `50px !important`,
        backgroundColor: `#FF6060 !important`,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    appControlMinimizeBtn: {
        border: `none !important`,
        minWidth: `17px !important`,
        minHeight: `17px !important`,
        borderRadius: `50px !important`,
        marginRight: '0.5rem !important',
        backgroundColor: `#FFBF60 !important`,
        '&:hover': {
            cursor: 'pointer'
        }
    }
});