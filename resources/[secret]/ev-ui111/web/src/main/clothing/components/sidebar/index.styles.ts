import { makeStyles } from "@mui/styles";
import { baseStyles } from "lib/styles";
import { ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    container: {
        pointerEvents: 'all',
        userSelect: 'unset',
        width: ResponsiveWidth(480),
        height: '100vh',
        backgroundColor: baseStyles.bgSecondary(),
        display: 'flex',
        color: baseStyles.textColor(),
        position: 'relative'
    },
    left: {
        flex: 6,
        backgroundColor: baseStyles.bgPrimary(),
        maxHeight: '100vh',
        overflowY: 'scroll'
    },
    right: {
        flex: 1,
        maxHeight: '100vh',
        overflowY: 'scroll'
    },
    menuItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: '100%',
        cursor: 'pointer',
        '& p': {
            width: '100%',
            textAlign: 'left',
            padding: 16,
        }
    },
    menuItemActive: {
        backgroundColor: baseStyles.bgPrimary()
    },
    logo: {
        height: ResponsiveWidth(56),
        cursor: 'default',
        '& img': { height: ResponsiveWidth(32) }
    }
});