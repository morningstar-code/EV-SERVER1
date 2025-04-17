import { makeStyles } from '@mui/styles';

export default makeStyles({
    wrapper: function (props: any) {
        return {
            '& .MuiChip-deleteIcon': {
                color: props.textColor
            },
            '& .MuiChip-label': {
                fontSize: '110%',
                overflow: 'visible'
            }
        }
    },
    chipNoLabel: {
        '& .MuiChip-label': {
            paddingLeft: 0,
        },
        '& .MuiChip-root': {
            backgroundColor: 'transparent !important'
        }
    }
});