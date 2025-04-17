import { makeStyles } from "@mui/styles";
import { baseStyles } from "lib/styles";
import { ResponsiveHeight } from "utils/responsive";

export default makeStyles({
    container: {
        pointerEvents: 'all'
    },
    center: () => {
        return baseStyles.flexCenter;
    },
    paperContainer: {
        width: '100%',
        marginTop: '7.5%',
        borderBottom: 'none'
    },
    flexInline: {
        color: baseStyles.textColorGrey(),
        width: '50%',
        display: 'inline-flex'
    },
    colorContainer: {
        display: 'grid',
        maxWidth: '50%',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)'
    },
    colorSquare: {
        width: ResponsiveHeight(43),
        height: ResponsiveHeight(43),
        cursor: 'pointer',
        border: '1px solid #fff',
        backgroundColor: 'rgba(0, 0, 255, 1.0)'
    }
});