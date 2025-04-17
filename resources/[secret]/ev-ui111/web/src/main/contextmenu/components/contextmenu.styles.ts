import { makeStyles } from '@mui/styles';

export default makeStyles({
    contextFlexContainer: {
        flex: '1 1 0%',
        display: 'flex',
        padding: '20vh 0px 64px',
    },
    contextLeftInnerContainer: {
        width: 'auto',
        display: 'inline-block',
        padding: '8px',
        maxHeight: 'calc(100vh - 128px)',
        overflowY: 'auto',
    },
    contextRightInnerContainer: {
        width: 'auto',
        display: 'inline-block',
        padding: '8px',
        maxHeight: 'calc(100vh - 128px)',
        overflowY: 'auto',
    },
    contextButton: {
        color: 'rgb(224, 224, 224)',
        cursor: 'pointer',
        display: 'flex',
        padding: '8px',
        position: 'relative',
        minWidth: '300px',
        boxShadow: 'black 0px 0px 4px 1px',
        borderRadius: '4px',
        marginBottom: '8px',
        pointerEvents: 'all',
        backgroundColor: 'rgb(34, 40, 49)', //34, 40, 49 //24, 24, 32
        "&:hover": {
            color: 'white',
            backgroundColor: 'rgb(48, 71, 94)', //48, 71, 94 //71, 71, 86
            //need a border underline
            //borderBottom: '2px solid rgb(141, 9, 250)', //red //146, 39, 88
        },
    },
    contextButtonDisabled: {
        color: 'rgb(224, 224, 224)',
        cursor: 'pointer',
        display: 'flex',
        padding: '8px',
        position: 'relative',
        minWidth: '300px',
        boxShadow: 'black 0px 0px 4px 1px',
        borderRadius: '4px',
        marginBottom: '8px',
        pointerEvents: 'none',
        backgroundColor: 'rgb(132, 132, 134)',
    },
    contextButtonFlex: {
        flex: '1 1 0%',
        display: 'flex',
    },
    contextButtonChevron: {
        width: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});