import { makeStyles } from '@mui/styles';

export default makeStyles({
    seedApp: {
        position: 'absolute',
        width: '70%',
        top: '10%',
        left: '15%',
        minHeight: 500,
        backgroundColor: '#E7E9EB',
        animation: 'ease-in fadeIn 250ms',
        fontFamily: 'Poppins, sans-serif'
    },
    seedAppContainer: {
        padding: '2rem',
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
    },
    strain: {
        display: 'flex',
        marginBottom: '1rem',
        flexDirection: 'column'
    },
    strainNameWrapper: {
        display: 'flex'
    },
    strainName: {
        flex: 1,
        fontWeight: 500,
        color: '#3E3E3E',
        fontSize: '1.8vh',
        marginRight: 20
    },
    clipboard: {
        cursor: 'pointer'
    },
    cloneDNA: {
        cursor: 'pointer'
    },
    genome: {
        display: 'grid',
        borderRadius: 3,
        padding: '0.5rem',
        marginTop: '0.25rem',
        backgroundColor: 'rgba(205, 206, 208, 0.5)',
        gap: '0.25rem',
        gridAutoRows: 'minmax(1fr, auto)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(1.5vw, auto))'
    },
    letter: {
        color: '#fff',
        display: 'flex',
        height: '1.5vw',
        fontWeight: 500,
        borderRadius: 3,
        fontSize: '1.65vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    letter_G: {
        backgroundColor: '#465C97'
    },
    letter_A: {
        backgroundColor: '#469766'
    },
    letter_T: {
        backgroundColor: '#974646'
    },
    letter_C: {
        backgroundColor: '#D0B733'
    },
    seedTabText: {
        color: '#737373 !important',
        fontWeight: '600 !important',
        fontSize: '1.55vh !important',
        borderRadius: '3px !important',
        padding: '0.35rem 1rem !important',
    },
    seedTab: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    seedTabs: {
        display: 'grid',
        width: '100%',
        overflow: 'scroll',
        paddingBottom: '1rem',
        borderBottom: '3px solid rgba(155, 155, 155, 0.24)',
        gap: '0.5rem',
        gridAutoRows: 'minmax(1fr, auto)',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, auto))'
    },
    seedList: {
        marginTop: '1rem',
        heigth: '50vh',
        overflow: 'scroll'
    },
    active: {
        background: 'rgba(205, 206, 208, 0.5) !important'
    }
});