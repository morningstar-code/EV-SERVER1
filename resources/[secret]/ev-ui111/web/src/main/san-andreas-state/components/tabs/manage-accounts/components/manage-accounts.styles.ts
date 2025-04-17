import { makeStyles } from "@mui/styles";

export default makeStyles({
    accountCharacters: {
        borderTop: '1px solid white',
        margin: '8px 0'
    },
    accessList: {
        display: 'flex',
        '& p': {
            textTransform: 'capitalize',
            marginRight: 8
        }
    },
    detailsWrapper: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});