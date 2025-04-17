import { Typography } from '@mui/material';
import Button from 'components/button/button';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            {!props.textOnly && !props.opened && (
                <>
                    <div className={classes.clueIcon}>
                        <i className={`fas fa-${props.clueIcon} fa-fw fa-4x`} style={{ color: 'white' }}></i>
                        <i className={`fas fa-${props.icon} fa-fw fa-4x`} style={{ color: 'white' }}></i>
                        {!!props.secondaryIcon && (
                            <i className={`fas fa-${props.secondaryIcon} fa-fw fa-4x`} style={{ color: 'white' }}></i>
                        )}
                    </div>
                    <div className={classes.openButton}>
                        <Button.Primary onClick={props.openEnvelope}>
                            Open
                        </Button.Primary>
                    </div>
                </>
            )}
            {!props.textOnly && props.opened && props.gameFailed && (
                <div className={classes.openButton}>
                    <Typography variant="h4" style={{ color: 'white' }}>
                        Override Failure
                    </Typography>
                </div>
            )}
            {(props.textOnly || (props.opened && !props.gameFailed)) && (
                <div className={classes.openButton}>
                    <Typography variant="h4" style={{ color: 'white' }}>
                        {props.value}
                    </Typography>
                </div>
            )}
        </div>
    )
}