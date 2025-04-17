import { makeStyles } from "@mui/styles";
import { baseStyles } from "lib/styles";

export default makeStyles({
    ballotItem: {
        borderTop: '1px solid white',
        margin: '8px 0',
        padding: '8px 0 0'
    },
    ballotTop: {
        display: 'flex'
    },
    nameDescription: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    meta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 36,
        minWidth: 200
    },
    action: {
        ...baseStyles.flexCenter,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 36,
        width: 40
    }
});