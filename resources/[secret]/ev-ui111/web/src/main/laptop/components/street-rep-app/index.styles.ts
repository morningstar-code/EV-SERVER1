import { makeStyles } from '@mui/styles';

export default makeStyles({
    container: {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        fontFamily: '"Crimson Pro", serif',
        width: '80%',
        height: '80%',
        margin: 'auto',
        position: 'absolute',
        backgroundSize: 'contain',
        backgroundImage: 'linear-gradient(rgba(12, 13, 17, 0.99), rgba(12, 13, 17, 0.99)), url(https://i.imgur.com/0jWoTmn.png)'
    },
    header: {
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        height: '4vh'
    },
    levelWrapper: {
        width: '100%',
        display: 'flex',
        marginLeft: '2rem',
        flexDirection: 'column'
    },
    levelText: {
        fontSize: '1.5vh',
        marginBottom: '0.25rem'
    },
    gangInfoContainer: {
        display: 'flex',
        padding: '1rem 2rem',
        flexDirection: 'column',
        position: 'relative',
        height: '82%'
    },
    gangInfoHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    gangHeader: {
        fontSize: '2vh'
    },
    highlightText: {
        color: '#e9a101c7'
    },
    addMembers: {
        display: 'flex'
    },
    orangeButton: {
        color: '#fff',
        backgroundColor: '#e9a101c7',
        '&:hover': {
            backgroundColor: '#e9a101c7'
        }
    },
    streetProgressionParent: {
        background: '#9fa0a2',
        height: 5,
        flex: 'auto',
        borderRadius: 5
    },
    streetProgression: {
        borderRadius: 5,
        background: '#e9a101c7'
    },
    gangMembers: {
        marginTop: '1rem',
        height: '100%',
        overflow: 'scroll'
    },
    member: {
        display: 'flex',
        marginBottom: '1rem',
        justifyContent: 'space-between'
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        justifyContent: 'space-between',
        background: 'rgba(12, 13, 17, 0.5)',
        borderBottom: '1px solid rgba(133, 152, 159, 0.5)'
    },
    menuItems: {
        display: 'flex'
    },
    menuItem: {
        color: '#fff',
        fontWeight: 400,
        marginRight: 50,
        cursor: 'pointer',
        fontSize: '20px',
        transition: 'ease-in 100ms',
        '&:hover': {
            textShadow: '0px 0px 4px rgba(255, 255, 255, 0.87)'
        }
    },
    menuItemActive: {
        color: '#fff',
        fontWeight: 400,
        marginRight: 50,
        cursor: 'pointer',
        fontSize: '20px',
        transition: 'ease-in 100ms',
        textShadow: '0px 0px 4px rgba(0, 249, 185, 0.90)'
    }
});