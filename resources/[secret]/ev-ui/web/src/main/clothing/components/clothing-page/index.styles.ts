import { makeStyles } from "@mui/styles";
import { ResponsiveHeight } from "utils/responsive";

export default makeStyles({
    container: {
        pointerEvents: 'all'
    },
    colorContainer: {
        display: 'grid',
        maxWidth: '50%',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)'
    },
    innerContainer: {
        padding: 12
    },
    colorSquare: {
        width: ResponsiveHeight(43),
        height: ResponsiveHeight(43),
        cursor: 'pointer',
        border: '1px solid #fff',
        backgroundColor: 'rgba(0, 0, 255, 1.0)'
    }
});