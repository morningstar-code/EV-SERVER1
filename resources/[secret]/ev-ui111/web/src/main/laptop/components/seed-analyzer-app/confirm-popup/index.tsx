import { Typography } from '@mui/material';
import Button from 'components/button/button';
import Spinner from 'components/spinner/spinner';
import useStyles from './index.styles';

interface SeedAnalyzerConfirmPopupProps {
    message: string;
    onCancel: () => void;
    onAccept: () => void;
    loading: boolean;
}

export default (props: SeedAnalyzerConfirmPopupProps) => {
    const message = props.message;
    const onCancel = props.onCancel;
    const onAccept = props.onAccept;
    const loading = props.loading;

    const classes = useStyles();

    return (
        <div className={classes.confirmPopup}>
            <Typography variant="h1" className={classes.text}>
                {message}
            </Typography>
            {!loading && (
                <div className={classes.buttons}>
                    <Button.Primary className={`${classes.btn} ${classes.green}`} onClick={onAccept}>
                        Continue
                    </Button.Primary>
                    <Button.Primary className={`${classes.btn} ${classes.red}`} onClick={onCancel}>
                        Cancel
                    </Button.Primary>
                </div>
            )}
            {loading && (
                <div className={classes.loadingIcon}>
                    <Spinner />
                </div>
            )}
        </div>
    )
}