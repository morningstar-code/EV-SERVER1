import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
    dropdownItemActive: (props: any) => {
        return {
            fontWeight: 'bold',
        }
    }
}));