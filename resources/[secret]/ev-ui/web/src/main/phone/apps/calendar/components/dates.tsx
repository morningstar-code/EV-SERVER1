import React from 'react';
import useStyles from './dates.styles';
//import { CalendarPicker } from '@mui/x-date-pickers';
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default (props: any) => {
    const classes = useStyles();
    const [date, setDate] = React.useState(new Date());

    return (
        <div className={classes.container}>
        </div>
    )
}