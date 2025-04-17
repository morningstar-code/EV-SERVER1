import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';
import { Typography } from '@mui/material';
import ContractButton from '../contract-button';
import Spinner from '../../../../../components/spinner/spinner';

interface ConfirmPopupProps {
    message: string;
    onCancel: () => void;
    onAccept: () => void;
    loading: boolean;
}

const ConfirmPopup: FunctionComponent<ConfirmPopupProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.confirmPopup}>
            <Typography className={classes.text} variant="h1">
                {props.message}
            </Typography>
            {!props.loading && (
                <div className={classes.buttons}>
                    <ContractButton
                        onClick={props.onAccept}
                        label="Continue"
                    />
                    <ContractButton
                        onClick={props.onCancel}
                        style={{ marginTop: '0.5rem' }}
                        label="Cancel"
                    />
                </div>
            )}
            {props.loading && (
                <div className={classes.loadingIcon}>
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default ConfirmPopup;