import { makeStyles } from "@mui/styles";
import { ResponsiveHeight } from "../../../../utils/responsive";

export default makeStyles({
    gauge: function (props?: any) {
        return {
            width: ResponsiveHeight(props.height),
            height: ResponsiveHeight(props.height),
            position: 'relative',
        }
    },
    gaugeCircle: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    gaugeValue: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        '& p': {
            fontSize: ResponsiveHeight(20) + ' !important',
        },
        '& svg': {
            color: '#e43f5a'
        },
    },
    gaugeLabel: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
    },
});