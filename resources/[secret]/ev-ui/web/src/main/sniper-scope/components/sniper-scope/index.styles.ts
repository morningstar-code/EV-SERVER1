import { makeStyles } from '@mui/styles';

export default makeStyles({
    container: function (props: any) {
        return {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: props.show ? 1 : 0
        }
    },
    scope: {
        width: '100vw',
        height: '100vh'
    }
});