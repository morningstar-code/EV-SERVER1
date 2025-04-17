import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';

export default makeStyles((theme: Theme) => ({
    root: {
        '& .Mui-focused, .MuiFormControlLabel-root, .MuiInput-underline:after, .MuiInputAdornment-root':
        {
            color: 'rgba(255, 255, 255, 0.7) !important',
            borderColor: 'rgba(255, 255, 255, 0.7) !important',
        },
    },
    imageListContainer: () => ({
        display: 'flex',
        flexDirection: 'column',
        maxHeight: baseStyles.responsiveHeight(384),
        overflowY: 'scroll',
        gap: baseStyles.responsiveHeight(8),
    }),
    pageImageContainer: () => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    }),
    pageImage: () => ({
        width: baseStyles.responsiveWidth(200),
    }),
    pageUrlInputContainer: () => ({
        display: 'flex',
        gap: baseStyles.responsiveWidth(8),
    }),
    addButton: () => ({
        minWidth: `${baseStyles.responsiveWidth(32)} !important`,
    }),
    removeButton: () => ({
        minWidth: `${baseStyles.responsiveWidth(32)} !important`,
        marginTop: `${baseStyles.responsiveWidth(14)} !important`,
    }),
    pageUrlInput: () => ({
        flexGrow: '1',
    }),
}))