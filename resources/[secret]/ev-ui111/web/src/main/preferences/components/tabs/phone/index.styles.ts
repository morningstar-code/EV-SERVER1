import { makeStyles } from "@mui/styles";
import { ResponsiveHeight } from "../../../../../utils/responsive";

export default makeStyles({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: ResponsiveHeight(16)
    },
    flex: {
        display: 'flex',
        minHeight: ResponsiveHeight(48),
        '& > div': {
            flex: 1
        }
    },
    preference: {
        marginBottom: ResponsiveHeight(16)
    },
    preferenceBolder: {
        padding: ResponsiveHeight(16),
        marginBottom: ResponsiveHeight(16),
        backgroundColor: '#30475e',
    },
    cmd: {
        backgroundColor: '#CCC',
        padding: 4,
        color: 'black'
    }
});