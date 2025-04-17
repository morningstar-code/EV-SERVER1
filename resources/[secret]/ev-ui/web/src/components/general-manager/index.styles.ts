import { makeStyles } from "@mui/styles";
import { ResponsiveHeight, ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    container: {
        pointerEvents: 'all',
        userSelect: 'unset',
        width: ResponsiveWidth(800),
        height: ResponsiveHeight(600),
        backgroundColor: '#30475e',
        display: 'flex',
        color: 'white',
        position: 'relative'
    },
    left: {
        width: '25%'
    },
    right: {
        flex: 1,
        backgroundColor: '#222831',
        maxHeight: ResponsiveHeight(600),
        overflowY: 'scroll'
    },
    menuItem: {
        height: 56,
        width: '100%',
        cursor: 'pointer',
        '& p': {
            width: '100%',
            textAlign: 'left',
            padding: 16
        }
    },
    menuItemActive: {
        backgroundColor: '#222831'
    }
});