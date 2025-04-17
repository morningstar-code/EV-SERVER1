import { makeStyles } from '@mui/styles';

export default makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'start',
        width: '100%',
        paddingLeft: 0,
        pointerEvents: 'all'
    },
    cardWrapper: function (props: any) {
        return {
            backgroundColor: '#fff !important',
            backgroundImage: "url('https://gta-assets.subliminalrp.net/images/polaroid.png') !important",
            color: 'black !important',
            width: `${props?.cardSize ?? '20vw'} !important`
        }
    },
    photoDateWrapper: {
        padding: '0.6rem 1.5rem !important' //0.2rem
    },
    photoDate: {
        fontSize: '0.5em !important',
        fontFamily: 'Quantico !important',
        fontWeight: 'bold !important',
        textAlign: 'right',
        margin: '0 !important',
        padding: '0 !important',
        color: '#9f9f9f !important'
    },
    photoWrapper: {
        width: '100%',
        padding: '0 1.5rem'
    },
    photo: {
        backgroundColor: 'black',
        paddingTop: '100%',
        boxShadow: '0px 0px 1px #000 inset',
        maxHeight: '100%'
    },
    photoDescription: function (props: any) {
        return {
            color: '#000 !important',
            fontSize: '1.4rem !important',
            textAlign: 'center',
            marginTop: '0.25rem !important',
            fontFamily: 'Caveat !important',
            fontWeight: 'bold !important',
            lineHeight: '1.5rem !important',
            overflow: 'hidden !important',
            textOverflow: 'ellipsis !important',
            display: '-webkit-box !important',
            WebkitLineClamp: props?.lineLimit ?? '3',
            WebkitBoxOrient: 'vertical',
            minHeight: '4.5rem !important',
            wordBreak: 'break-word'
        }
    },
    photoDescriptionButton: {
        display: 'flex',
        justifyContent: 'center'
    }
});