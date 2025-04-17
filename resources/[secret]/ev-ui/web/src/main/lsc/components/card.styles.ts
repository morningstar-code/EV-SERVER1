import { makeStyles } from '@mui/styles';

export default makeStyles({
    card: {
        display: 'flex',
        position: 'relative',
        pointerEvents: 'all',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 600,
        height: 300,
        borderRadius: 5,
        padding: '0 5rem',
        transition: 'all 200ms ease-out',
        transformStyle: 'preserve-3d'
    },
    front: (props: any) => {
        return {
            display: 'flex',
            height: '100%',
            background: '#b5baea',
            zIndex: '0',
            top: '0px',
            left: '0',
            bottom: '0',
            right: '0',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'all 500ms ease-out',
            transformStyle: 'preserve-3d',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            backgroundImage: 'url(https://i.imgur.com/wYyCKzW.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }
    },
    stateId: {
        color: '#222',
        top: '4.5rem',
        left: '15rem',
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: '0.75em'
    },
    lastName: {
        color: '#222',
        top: '8.5rem',
        left: '13.4rem',
        position: 'absolute',
        fontWeight: 'bolder',
        fontSize: '0.75em'
    },
    firstName: {
        color: '#222',
        top: '10rem',
        left: '13.4rem',
        position: 'absolute',
        fontWeight: 'bolder',
        fontSize: '0.75em'
    },
    sex: {
        color: '#222',
        top: '14rem',
        left: '13.9rem',
        position: 'absolute',
        fontWeight: 'bolder',
        fontSize: '0.75em'
    },
    dob: {
        color: '#222',
        top: '12.5rem',
        left: '13.9rem',
        position: 'absolute',
        fontWeight: 'bolder',
        fontSize: '0.75em'
    },
    eyeColor: {
        color: '#222',
        top: '12.5rem',
        left: '23rem',
        position: 'absolute',
        fontWeight: 'bolder',
        fontSize: '0.75em'
    },
    height: {
        color: '#222',
        top: '14rem',
        left: '24rem',
        position: 'absolute',
        fontWeight: 'bolder',
        fontSize: '0.75em'
    },
    expiration: {
        color: '#222',
        top: '6.1rem',
        left: '14.6rem',
        position: 'absolute',
        fontWeight: 'bolder',
        fontSize: '0.75em'
    },
    class: {
        color: '#222',
        top: '6rem',
        left: '27.4rem',
        position: 'absolute',
        fontWeight: 'bolder',
        fontSize: '0.75em'
    }
});