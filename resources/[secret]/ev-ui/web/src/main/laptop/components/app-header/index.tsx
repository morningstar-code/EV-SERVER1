import { FunctionComponent } from 'react';
import useStyles from './index.styles';
import { Typography } from '@mui/material';
import Button from '../../../../components/button/button';

interface AppHeaderProps {
    appName: string;
    color: string;
    onClose: () => void;
    style?: any;
    textColor?: string;
}

const AppHeader: FunctionComponent<AppHeaderProps> = (props) => {
    const classes = useStyles();

    return (
        <section id="app-header" className={classes.appControls} style={{ backgroundColor: props.color, boxShadow: 'hsl(0deg 0% 0% / 8%) 0px -1px 5px 4px', ...props.style }}>
            <Typography variant="h1" className={classes.appControlsTitle}>
                {props.appName}
            </Typography>
            <div className={classes.appControlButtons}>
                <Button.Primary className={classes.appControlMinimizeBtn}>
                    <div></div>
                </Button.Primary>
                <Button.Primary onClick={props.onClose} className={classes.appControlCloseBtn}>
                    <div></div>
                </Button.Primary>
            </div>
        </section>
    );
}

export default AppHeader;