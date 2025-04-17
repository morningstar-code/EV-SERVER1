import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import Button from "components/button/button";
import Checkmark from "components/checkmark/checkmark";
import Spinner from "components/spinner/spinner";
import useStyles from "./index.styles"

const Modal: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                {!props.isConfirm && (
                    <div className={classes.content}>
                        {props.content}
                    </div>
                )}
                {props.isConfirm && (
                    <div className={classes.spinner}>
                        <Typography variant="body1" style={{ color: '#fff', padding: '16px !important', textAlign: 'center' }}>
                            {props.confirmText}
                        </Typography>
                        <div className={classes.actions}>
                            <Button.Secondary size="small" onClick={() => props.updateState({ show: false, slowHide: false })}>
                                Close
                            </Button.Secondary>
                            <Button.Primary size="small" onClick={() => props.onConfirm()}>
                                Confirm
                            </Button.Primary>
                        </div>
                    </div>
                )}
                {props.loading && (
                    <div className={classes.spinner}>
                        <div>
                            <Spinner />
                        </div>
                    </div>
                )}
                {props.error && (
                    <div className={classes.spinner}>
                        <div>
                            <i className={`fas fa-exclamation fa-fw fa-2x ${classes.icon}`} />
                        </div>
                        <div>
                            <Typography variant="body2" className={classes.errorText} style={{ color: '#fff' }}>
                                {props.error}
                            </Typography>
                        </div>
                        <div>
                            <Button.Primary onClick={() => {
                                props.closeOnErrorOkay ? props.updateState({ show: false, loading: false, error: null }) : props.hideOnOkay && props.updateState({ error: null, loading: false });
                            }}>
                                Okay
                            </Button.Primary>
                        </div>
                    </div>
                )}
                {!props.loading && props.slowHide && (
                    <div className={classes.spinner}>
                        <div>
                            <Checkmark />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;