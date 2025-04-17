import { makeStyles } from "@mui/styles";
import { baseStyles } from "lib/styles";
import { ResponsiveHeight, ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    '@global': {
        '@keyframes shapeshrinktonothing': {
            '0%': { transform: 'scale(4)' },
            '100%': { transform: 'scale(0)' },
        },
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
    },
    container: function (props: any) {
        return {
            height: '70vh',
            backgroundColor: baseStyles.bgPrimary(),
            pointerEvents: 'all',
            transform: props.requiredAnswers && props.requiredAnswers[2] ? 'scale(0.75)' : 'unset'
        }
    },
    shapes: {
        display: 'flex',
        alignItems: 'center',
        height: '50vh',
        width: '100%',
        padding: ResponsiveWidth(16),
    },
    shapeContainer: {
        height: ResponsiveHeight(280),
        width: ResponsiveHeight(280),
        margin: `0 ${ResponsiveWidth(16)}`,
        position: 'relative',
        backgroundColor: baseStyles.bgSecondary()
    },
    textStroke: {
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
        animation: '3s ease 1s 1 normal none running shapeshrinktonothing',
        fontSize: `${ResponsiveHeight(48)} !important`,
        transform: 'scale(0)',
        color: 'white'
    },
    shapeText: {
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        letterSpacing: `${ResponsiveWidth(0.7)} !important`,
        fontWeight: '600 !important',
        textDecoration: 'none !important',
        fontStyle: 'normal !important',
        fontVariant: 'small-caps !important',
        textTransform: 'none',
        width: '100% !important',
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
        fontSize: `${ResponsiveHeight(40)} !important`,
        textAlign: 'center',
        zIndex: 10
    },
    shapeIdContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10
    },
    shapeInnerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        padding: ResponsiveHeight(32)
    },
    shapeInnerContainerId: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100,
        '& p': {
            fontSize: ResponsiveHeight(80),
            textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F'
        }
    },
    circleContainer: {
        flexDirection: 'column',
        border: '1px solid black',
        borderRadius: '100%',
        position: 'relative'
    },
    circleContainerInner: {
        height: ResponsiveHeight(48),
        width: ResponsiveHeight(48),
        position: 'absolute',
        margin: '0 auto',
        zIndex: 2
    },
    squareContainer: {
        flexDirection: 'column',
        border: '1px solid black',
        position: 'relative'
    },
    squareContainerInner: {
        height: ResponsiveHeight(48),
        width: ResponsiveHeight(48),
        position: 'absolute',
        margin: '0 auto',
        zIndex: 2
    },
    rectangleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        height: '60%',
        border: '1px solid black',
        position: 'relative'
    },
    rectangleContainerInner: {
        height: '25%',
        width: '50%',
        position: 'absolute',
        margin: '0 auto',
        zIndex: 2
    },
    triangleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        position: 'relative'
    },
    triangleContainerInner: {
        height: '50%',
        width: '50%',
        position: 'absolute',
        margin: '0 auto',
        zIndex: 2
    },
    triangleContainerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10
    },
    triangleShape: function (props: any) {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            zIndex: 1,
            height: 0,
            borderLeft: `${ResponsiveHeight(((props.requiredAnswers && props.requiredAnswers[2] ? 110 : 140) - 32) / (props.inner ? 0.25 : 1))} solid transparent`,
            borderRight: `${ResponsiveHeight(((props.requiredAnswers && props.requiredAnswers[2] ? 110 : 140) - 32) / (props.inner ? 0.25 : 1))} solid transparent`,
            borderBottom: `${ResponsiveHeight(((props.requiredAnswers && props.requiredAnswers[2] ? 230 : 280) - 64) / (props.inner ? 0.25 : 1))} solid black`
        }
    },
    triangleShapeInner: function (props: any) {
        return {
            width: 0,
            height: 0,
            borderLeft: `${ResponsiveHeight(((props.requiredAnswers && props.requiredAnswers[2] ? 110 : 140) - 32) / 3)} solid transparent`,
            borderRight: `${ResponsiveHeight(((props.requiredAnswers && props.requiredAnswers[2] ? 110 : 140) - 32) / 3)} solid transparent`,
            borderBottom: `${ResponsiveHeight(((props.requiredAnswers && props.requiredAnswers[2] ? 230 : 280) - 64) / 3)} solid black`
        }
    },
    wrapperAnswersFlex: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: ResponsiveWidth(16),
        paddingRight: ResponsiveWidth(16),
        height: '5vh'
    },
    wrapperAnswers: function (props: any) {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '20vh',
            flexDirection: 'column',
            position: props.progressOnly ? 'absolute' : 'unset',
            top: props.progressOnly ? ResponsiveHeight(-12) : 'unset',
            left: props.progressOnly ? 0 : 'unset'
        }
    },
    wrapperAnswersInner: function (props: any) {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: 'auto',
            height: props.progressOnly ? 'unset' : 'auto',
            position: props.progressOnly ? 'absolute' : 'unset',
            top: props.progressOnly ? ResponsiveHeight(-8) : 'unset',
            left: props.progressOnly ? 0 : 'unset',
            minWidth: '50%'
        }
    },
    inputFieldWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    textWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 'auto',
        height: '100%',
    },
    inputText: {
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        letterSpacing: `${ResponsiveWidth(0.7)} !important`,
        fontWeight: '600 !important',
        textDecoration: 'none !important',
        fontStyle: 'normal !important',
        fontVariant: 'small-caps !important',
        textTransform: 'uppercase',
        width: 'auto !important',
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
        color: baseStyles.textColorGrey(),
        fontSize: `${ResponsiveHeight(18)} !important`,
        margin: `0 ${ResponsiveWidth(4)}`,
        display: 'inline'
    },
    inputTextBig: {
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        letterSpacing: `${ResponsiveWidth(0.7)} !important`,
        fontWeight: '600 !important',
        textDecoration: 'none !important',
        fontStyle: 'normal !important',
        fontVariant: 'small-caps !important',
        textTransform: 'uppercase',
        width: 'auto !important',
        textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
        color: baseStyles.textColorGrey(),
        fontSize: `${ResponsiveHeight(26)} !important`,
        margin: `0 ${ResponsiveWidth(4)}`
    },
    prePostWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        '& p': {
            fontFamily: 'Arial, Helvetica, sans-serif !important',
            letterSpacing: `${ResponsiveWidth(0.7)} !important`,
            fontWeight: '600 !important',
            textDecoration: 'none !important',
            fontStyle: 'normal !important',
            fontVariant: 'small-caps !important',
            textTransform: 'none !important',
            width: '100% !important',
            textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
            textAlign: 'center',
            fontSize: `${ResponsiveHeight(26)} !important`
        }
    },
    gameWonLostWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        color: baseStyles.textColorGrey()
    },
    progressWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: ResponsiveHeight(40),
        padding: `0 ${ResponsiveWidth(32)}`
    },
    progressBar: function (props: any) {
        return {
            transitionDuration: `${props.gameDuration / 1000}s !important`
        }
    }
});