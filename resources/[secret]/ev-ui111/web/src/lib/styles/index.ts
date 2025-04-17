import { ResponsiveHeight, ResponsiveWidth } from "../../utils/responsive";

export const baseStyles = {
    bgPrimary: function () {
        return '#222831'
    },
    bgSecondary: function () {
        return '#30475e'
    },
    bgTertiary: function () {
        return '#1e3a56'
    },
    textColor: function () {
        return 'white'
    },
    textColorGrey: function () {
        return '#E0E0E0'
    },
    colorCurrencyIn: function () {
        return '#95ef77'
    },
    colorCurrencyOut: function () {
        return '#f2a365'
    },
    colorTwat: function () {
        return '#1565C0'
    },
    colorWarning: function () {
        return '#FFA726'
    },
    colorYellow: function () {
        return '#FFEE58'
    },
    blueText: '#4DD0E1',
    greenText: '#AED581',
    redText: '#FF4081',
    cashGreen: 'green',
    cashRed: 'red',
    pStylee: {
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        letterSpacing: `${ResponsiveWidth(0.7)} !important`,
        fontWeight: '600 !important',
        textDecoration: 'none !important',
        fontStyle: 'normal !important',
        fontVariant: 'small-caps !important',
        textTransform: 'none !important',
        width: '100% !important',
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
    },
    flex: {
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textStroke: {
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
    },
    responsiveHeight: ResponsiveHeight,
    responsiveWidth: ResponsiveWidth,
}