import { makeStyles } from '@mui/styles';

export default makeStyles({
    '@global': {
        '@keyframes gonuts': {
            '0%': { transform: 'rotate(-2deg)' },
            '50%': { transform: 'rotate(2deg)' },
            '100%': { transform: 'rotate(-2deg)' },
        },
    },
    wrapper: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    pager: {
        width: '400px',
        height: '300px',
        backgroundSize: 'cover',
        animation: 'gonuts',
        animationDuration: '200ms',
        animationIterationCount: 'infinite'
    },
    pagerPillbox: {
        backgroundImage: 'url(https://gta-assets.subliminalrp.net/images/dr-pager.png)'
    },
    pagerViceroy: {
        backgroundImage: 'url(https://gta-assets.subliminalrp.net/images/dr-pager-viceroy.png)'
    },
    pagerSandy: {
        backgroundImage: 'url(https://gta-assets.subliminalrp.net/images/dr-pager-sandy.png)'
    },
    pagerCentral: {
        backgroundImage: 'url(https://gta-assets.subliminalrp.net/images/dr-pager-central.png)'
    }
});