import { Typography } from '@mui/material';
import Button from 'components/button/button';
import { nuiAction } from 'lib/nui-comms';
import useStyles from './dev.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Developer Actions
                </Typography>
                <Button.Primary onClick={() => nuiAction('ev-clothing:dev:saveClothing')}>
                    Save clothing as item
                </Button.Primary>
                <br />
                <Button.Primary onClick={() => nuiAction('ev-clothing:dev:saveBarber')}>
                    Save barber as item
                </Button.Primary>
            </div>
        </div>
    )
}