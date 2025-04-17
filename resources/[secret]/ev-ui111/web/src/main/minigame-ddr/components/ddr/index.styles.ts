import { makeStyles } from "@mui/styles";
import { baseStyles } from "lib/styles";
import { ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    container: {
        height: ResponsiveWidth(640),
        width: ResponsiveWidth(640),
        position: 'relative',
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: baseStyles.bgPrimary()
    },
    innerContainer: {
        height: ResponsiveWidth(640),
        width: ResponsiveWidth(640),
    },
    introBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    }
});