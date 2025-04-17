import { makeStyles } from "@mui/styles";
import { ResponsiveHeight, ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    root: {
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        maxWidth: "100vw",
        minWidth: "100vw",
        maxHeight: "100vh",
        minHeight: "100vh",
        pointerEvents: "none",
        border: "0px",
        margin: "0px",
        outline: "0px",
        padding: "0px",
        overflow: "hidden",
        "& .MuiInput-root": {
            color: "white",
            fontSize: '1.3vmin'
        },

        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderColor: "darkgray"
        },
        "& .MuiInput-underline:before": {
            borderColor: "darkgray",
            color: "blue"
        },
        "& .MuiInput-underline:after": {
            borderColor: "white",
            color: "blue"

        },
        "& .MuiInputLabel-animated": {
            color: "darkgray",
            fontSize: '1.5vmin'

        },
        "& .MuiInputAdornment-root": {
            color: "darkgray",

        }
    },
    checkbox: {
        '&:hover': {
            backgroundColor: 'transparent !important'
        }
    },
    hudOuterContainer: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        zIndex: '50',
        position: 'relative',
        flexDirection: 'column'
    },
    hudIconWrapper: {
        width: '54px',
        height: '54px',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        maxWidth: ResponsiveWidth(54)
    },
    hudIcon: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconWrapper: {
        width: '34px',
        height: '34px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgb(33, 33, 33)'
    },
    radioChannelWrapper: {
        color: 'white',
        zIndex: '250',
        position: 'absolute'
    },
    vehicleHudContainer: {
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        position: 'absolute'
    },
    minimapBorder: {
        top: 'calc(74vh - 4px)',
        left: '0.3125vw',
        width: '13.125vw',
        border: '4px solid rgb(189, 189, 189)',
        height: '20vh',
        position: 'absolute',
        boxSizing: 'content-box',
        borderRadius: '100%'
    },
    wrapper: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 50,
    },
    hudInnerContainer: function (props: any) {
        return {
            display: 'flex',
            alignItems: 'flex-end',
            position: 'absolute',
            left: props.preferences && props.preferences['hud.vehicle.minimap.default'] ? '0.4vw' : 0,
            top: '0px',
            width: '100vw',
            height: '100vh',
        }
    },
    crosshairWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    crosshair: {
        width: ResponsiveWidth(6),
        height: ResponsiveWidth(6),
        borderRadius: '100%',
        backgroundColor: 'white',
        border: `${ResponsiveWidth(2)} solid black`
    },
    carhudWrapper: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '100vw',
        height: '100vh',
    },
    distanceWaypoint: {
        position: 'absolute',
        left: ResponsiveWidth(8),
        bottom: '6vh',
        width: '100%',
        height: '2vh',
        '& p': {
            fontFamily: 'Arial, Helvetica, sans-serif !important',
            letterSpacing: `${ResponsiveWidth(0.7)} !important`,
            fontWeight: '600 !important',
            textDecoration: 'none !important',
            fontStyle: 'normal !important',
            fontVariant: 'small-caps !important',
            textTransform: 'none !important',
            width: '100% !important',
        }
    },
    radarCircle: {
        position: 'absolute',
        left: '0.3125vw',
        top: 'calc(74vh - 4px)',
        width: '13.125vw',
        height: '20vh',
        borderRadius: '100%',
        border: '4px solid #BDBDBD',
        boxSizing: 'content-box',
    },
    gauges: function (props: any) {
        return {
            position: 'absolute',
            left: props.preferences && props.preferences['hud.vehicle.minimap.default'] ? 'calc((0.3125vw * 4) + 15vw)' : 'calc((0.3125vw * 4) + 13.125vw)',
            bottom: '6vh',
            width: '100%',
            height: '20vh',
            display: 'flex',
            alignItems: 'flex-end',
            '& p': {
                fontFamily: 'Arial, Helvetica, sans-serif !important',
                letterSpacing: ResponsiveWidth(0.7) + ' !important',
                fontWeight: '600 !important',
                textDecoration: 'none !important',
                fontStyle: 'normal !important',
                fontVariant: 'small-caps !important',
                textTransform: 'none !important',
                width: '100% !important',
                textAlign: 'center',
                textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
            },
            '& > div': {
                marginRight: ResponsiveWidth(16),
            }
        }
    },
    mphGauge: {
        position: 'relative',
        width: ResponsiveWidth(62),
        height: ResponsiveWidth(62),
        marginRight: ResponsiveWidth(32),
    },
    mphHolder: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px',
    },
    fuelGauge: {
        position: 'absolute',
        width: ResponsiveWidth(32),
        height: ResponsiveWidth(32),
        bottom: ResponsiveWidth(-4),
        right: ResponsiveWidth(-15),
        '& .svg-inline--fa': {
            color: 'white',
            height: 14,
            width: 14
        }
    },
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
            fontSize: `${ResponsiveHeight(20)} !important`,
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
    iconHolder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: ResponsiveWidth(32),
        height: ResponsiveHeight(62),
        '& path': {
            stroke: 'black',
            strokeWidth: 4,
        },
    },
});