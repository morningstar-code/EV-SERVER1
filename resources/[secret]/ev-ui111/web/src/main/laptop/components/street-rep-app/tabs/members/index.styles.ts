import { makeStyles } from '@mui/styles';

export default makeStyles({
    membersPage: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: '"Crimson Pro", serif'
    },
    headerText: {
        color: '#fff !important',
        fontSize: '26px !important',
        fontWeight: '500 !important',
        marginTop: '2rem !important',
        fontFamily: '"Crimson Pro", serif !important',
        textShadow: '0px 0px 4px rgba(255, 255, 255, 0.87) !important'
    },
    membersList: {
        gap: '1rem',
        flex: 'auto',
        width: '80%',
        maxHeight: '39vh',
        display: 'grid',
        marginTop: '1rem',
        overflow: 'scroll',
        gridTemplateColumns: '1fr 1fr'
    },
    member: {
        display: 'flex',
        padding: '1rem',
        alignItems: 'center',
        boxSizing: 'border-box',
        border: '1px solid #033327',
        justifyContent: 'space-between',
        background: 'linear-gradient(0deg, #0C0D11 0%, rgba(28, 29, 35, 0.4) 100%)'
    },
    memberName: {
        fontFamily: '"Crimson Pro", serif !important',
        fontWeight: '500 !important',
        fontSize: '19px !important',
        color: '#fff'
    },
    kickMember: {
        fontSize: '17px !important',
        fontWeight: '500 !important',
        cursor: 'pointer !important',
        userSelect: 'none',
        color: 'rgba(144, 3, 20, 1) !important',
        transition: 'ease-in 120ms !important',
        fontFamily: '"Crimson Pro", serif !important',
        '&:hover': {
            transform: 'scale(1.02) !important'
        }
    },
    addMemberButton: {
        margin: '0.5rem 0 !important',
        background: '#0b604a !important',
        color: 'rgb(255 255 255) !important',
        '&:hover': {
            background: '#0b604a !important',
            color: 'rgb(255 255 255) !important'
        }
    }
});