import { FunctionComponent } from 'react';
import { CircularProgress } from '@mui/material';
import useStyles from './index.styles';
import Button from 'components/button/button';
import Text from 'components/text/text';

interface MethAppConfirmProps {
    message: string;
    onCancel: () => void;
    onAccept: () => void;
    loading: boolean;
}

const MethAppConfirmPopup: FunctionComponent<MethAppConfirmProps> = (props) => {
    const classes = useStyles();

    const message = props.message;
    const onCancel = props.onCancel;
    const onAccept = props.onAccept;
    const loading = props.loading;

    return (
        <div className={classes.confirmPopup}>
            <Text variant="h1" className={classes.text}>
                {message}
            </Text>
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
                <div className="loading-icon">
                    <CircularProgress />
                </div>
            )}
        </div>
    );
}

export default MethAppConfirmPopup;