import { makeStyles } from '@mui/styles';

export default makeStyles({
    root: (props?: any) => {
        return {
            '& .Mui-focused, .MuiFormControlLabel-root, .MuiInput-underline:after, .MuiInputAdornment-root': {
                color: 'rgba(255, 255, 255, 0.7) !important',
                borderColor: 'rgba(255, 255, 255, 0.7) !important'
            },
            '& .MuiChip-root.MuiAutocomplete-tag.MuiChip-outlined.MuiChip-deletable': {
                height: '24px',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
            },
            '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"]': {
                overflowY: 'auto',
                maxHeight: props.isEditingCC ? 'initial' : '36px'
            }
        }
    }
});