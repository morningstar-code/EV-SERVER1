import { makeStyles } from "@mui/styles";
import { ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    hudIconWrapper: function () {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: ResponsiveWidth(54),
            height: ResponsiveWidth(54),
        }
    },
    hudIcon: function () {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '0px',
            top: '0px',
        }
    },
    iconWrapper: function () {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: ResponsiveWidth(34),
            height: ResponsiveWidth(34),
            backgroundColor: '#212121',
            borderRadius: '100%',
        }
    },
    circleTestInnerText: function () {
        return {
            position: 'absolute',
            color: 'white',
            zIndex: '250',
        }
    }
});