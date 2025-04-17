import { makeStyles } from "@mui/styles";
import { baseStyles } from "lib/styles";

export default makeStyles({
    wrapper: {
        padding: 8
    },
    modalWrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 100
    },
    formWrapper: {
        pointerEvents: 'all',
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        maxHeight: '90%',
        overflowY: 'scroll',
        backgroundColor: baseStyles.bgSecondary()
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 16
    },
    inputFieldWrapper: {
        padding: 8
    },
    actionsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 16
    },
    burgerWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    loading: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    itemWrapper: {
        padding: 8,
        marginTop: 8,
        width: '100%',
        backgroundColor: baseStyles.bgSecondary()
    },
    itemHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    itemHeadingInner: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    itemHeadingActions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
        width: 'auto'
    }
});