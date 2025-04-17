import { makeStyles } from "@mui/styles";
import { ResponsiveHeight } from "utils/responsive";

export default makeStyles({
    container: {
        pointerEvents: 'all'
    },
    componentInput: {
        textAlign: 'center',
        '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none'
        },
        '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none'
        }
    },
    componentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    componentSquare: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: ResponsiveHeight(53.2),
        height: ResponsiveHeight(53.2),
        cursor: 'pointer',
        border: '1px solid #fff',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
});