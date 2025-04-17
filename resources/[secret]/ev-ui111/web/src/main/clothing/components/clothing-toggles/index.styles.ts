import { makeStyles } from "@mui/styles";
import { baseStyles } from "lib/styles";
import { ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    container: {
        position: 'absolute',
        right: ResponsiveWidth(480),
        top: 0,
        pointerEvents: 'all',
        cursor: 'pointer',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none'
    },
    toggle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: ResponsiveWidth(32),
        height: ResponsiveWidth(32),
        backgroundColor: baseStyles.bgPrimary(),
        margin: 3,
        borderRadius: '10%'
    },
    toggleActive: {
        backgroundColor: baseStyles.bgSecondary()
    }
});