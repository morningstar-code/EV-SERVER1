import { makeStyles } from "@mui/styles";
import { ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    boxClickBox: function (props: any) {
        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
            gridGap: ResponsiveWidth(16),
            width: '100%',
            height: '100%'
        }
    },
    columnWrapper: {
        height: '100%',
        position: 'relative'
    },
    letterWrapper: function (props: any) {
        return {
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            textTransform: 'uppercase',
            transition: `max-height ${props.timeToTravel}ms linear, opacity 100ms linear`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
        }
    },
    targetArea: {
        position: 'absolute',
        width: '100%',
        height: '10%',
        top: '10%',
        backgroundColor: 'rgba(0, 200, 0, 0.25)'
    }
});