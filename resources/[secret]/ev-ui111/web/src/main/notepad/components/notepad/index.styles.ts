import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    container: {
        width: '50vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        pointerEvents: 'all',
        justifyContent: 'center'
    },
    header: {
        width: '50vw',
        height: '3vh',
        margin: '0px auto',
        display: 'flex',
        padding: ResponsiveWidth(24),
        alignItems: 'center',
        justifyContent: 'end',
        backgroundColor: baseStyles.bgPrimary()
    },
    textarea: {
        color: 'rgb(0, 0, 0)',
        width: '50vw',
        border: '1px solid rgb(238, 238, 238)',
        height: '35vh',
        resize: 'none',
        padding: '11px 20px 0px 70px',
        fontSize: '22px',
        boxShadow: 'rgb(221 221 221) 1px 1px 0px',
        overflowY: 'auto',
        lineHeight: '50px',
        backgroundSize: '100% 50px',
        backgroundImage: '-webkit-linear-gradient(top, rgb(255, 255, 255), rgb(255, 255, 255) 49px, rgb(231, 239, 248) 0px), -webkit-radial-gradient(4% 50%, circle closest-corner, rgb(245, 245, 245), rgb(245, 245, 245) 39%, rgb(255, 255, 255) 0%), -webkit-radial-gradient(3.9% 46%, circle closest-corner, rgb(204, 204, 204), rgb(204, 204, 204) 43.5%, rgb(255, 255, 255) 0%)'
    }
});