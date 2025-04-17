import { makeStyles } from '@mui/styles';

export default makeStyles({
    pixelBrowser: {
        width: '90%',
        height: '75%',
        top: '3%',
        left: '3%',
        background: '#dee1e6',
        position: 'absolute',
        border: '1px solid #ababab',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4), 0 0 60px rgba(0,0,0,.6)'
    },
    pixelSoonText: {
        fontSize: '30px !important',
        textAlign: 'center'
    },
    pixelBar: {
        zIndex: 3,
        position: 'relative',
        clear: 'both',
        padding: 6,
        background: '#eee',
        borderTop: '1px solid #aaa'
    },
    ul: {
        float: 'left',
        li: {
            position: 'relative',
            float: 'left',
            margin: '0 2px',
            'a, label': {
                display: 'block',
                width: 26,
                height: 26,
                color: '#444',
                textAlign: 'center',
                lineHeight: 26,
                fontSize: 20,
                borderRadius: 4,
                border: '1px solid #eee',
                '&:hover': {
                    border: '1px solid #ccc',
                    background: '#eee',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.8), 0 1px 1px rgba(0,0,0,.1)'
                }
            }
        }
    },
    pixelPage: {
        clear: 'both',
        height: '100%',
        background: '#c5c5c5',
        borderRadius: '0 0 5px 5px',
        overflow: 'scroll',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pixelControl: {
        background: '#fff',
        position: 'relative',
        display: 'flex',
        height: 50,
        alignItems: 'center',
        padding: '10px 1rem'
    },
    pixelUrl: {
        width: '100%',
        height: 30,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
        borderRadius: 50,
        backgroundColor: '#f0f0f0'
    }
});