import { makeStyles } from '@mui/styles';

export default makeStyles({
    container: {},
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionsLeft: {
        justifySelf: 'flex-start'
    },
    actionsRight: {
        justifySelf: 'flex-end'
    }
});