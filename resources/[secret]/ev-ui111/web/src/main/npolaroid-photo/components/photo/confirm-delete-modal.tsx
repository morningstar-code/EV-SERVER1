import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import Button from "components/button/button";
import { FunctionComponent, useEffect, useState } from "react";
import useStyles from "./confirm-delete-modal.styles";

const ConfirmDeleteModal: FunctionComponent<any> = ({
    show,
    close,
    confirm,
    children
}) => {
    const classes = useStyles();

    return (
        <Dialog open={show} onClose={close}>
            <DialogTitle className={classes.modalTitle}>
                {children}
            </DialogTitle>
            <DialogActions className={classes.modalContainer}>
                <Button.Primary className={classes.listingBtn} onClick={() => {
                    confirm();
                    close();
                }}>
                    Confirm
                </Button.Primary>
                <Button.Primary className={classes.listingRedBtn} onClick={close}>
                    Cancel
                </Button.Primary>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteModal;