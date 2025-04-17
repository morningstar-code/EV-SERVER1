import { makeStyles } from '@mui/styles';

export default makeStyles({
    card: function (props: any) {
        return {
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
            transformStyle: 'preserve-3d',
            transform: `perspective(600px) rotateY(${props.offset.x}deg rotateX(${props.offset.y}deg)`
        }
    },
    front: function (props: any) {
        return {
            display: 'flex',
            height: '100%',
            background: '#ceab84',
            zIndex: '0',
            top: '0px',
            justifyContent: 'center',
            alignItems: 'center',
            left: '0',
            bottom: '0',
            right: '0',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'all 500ms ease-out',
            transformStyle: 'preserve-3d',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            backgroundImage: 'url(https://i.imgur.com/B9qs2nl.png)'
        }
    },
    back: function (props: any) {
        return {
            background: '#ceab84',
            zIndex: -1,
            flexDirection: 'column',
            position: 'absolute',
            top: '0px',
            left: '0',
            bottom: '0',
            right: '0',
            transform: props.flipped ? 'rotateY(360deg)' : 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            transition: 'all 500ms ease-out',
            transformStyle: 'preserve-3d',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#222',
            fontWeight: 'bold',
            fontSize: '2em',
            letterSpacing: 15,
            backgroundImage: 'url(https://i.imgur.com/B9qs2nl.png)'
        }
    },
    circleShape: {
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        border: '9px solid #222',
        width: '6.25rem',
        height: '6.25rem',
        borderRadius: '10rem',
        marginRight: '10rem'
    },
    triangleShape: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        width: 0,
        left: '14.7rem',
        borderBottom: 'solid 100px #222',
        borderRight: 'solid 60px transparent',
        borderLeft: 'solid 60px transparent',
        background: 'transparent'
    },
    innerTriangle: {
        position: 'absolute',
        top: 17,
        left: -44,
        width: 0,
        borderBottom: 'solid 74px #ceab84',
        borderRight: 'solid 44px transparent',
        borderLeft: 'solid 44px transparent',
        borderImage: 'url(https://i.imgur.com/B9qs2nl.png) 50 fill',
        clipPath: 'polygon(50% 5%, 0% 100%, 100% 100%)'
    },
    squareShape: {
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        border: '9px solid #222',
        width: '6.25rem',
        height: '6.25rem'
    },
    cardNumber: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 'auto'
    },
    instructions: {
        fontSize: 14,
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom: '1rem'
    }
});