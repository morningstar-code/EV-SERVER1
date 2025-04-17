import { FunctionComponent } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Button from "../../../../../components/button/button";

interface HOImportConfirmModalProps {
    close: () => void;
    confirm: () => void;
    show: boolean;
}

const HOImportConfirmationModal: FunctionComponent<HOImportConfirmModalProps> = (props) => {
    const handleConfirmed = () => {
        props.confirm();
        props.close();
    }

    return (
        <Dialog open={props.show} onClose={props.close}>
            <DialogTitle>{props.children}</DialogTitle>
            <DialogActions>
                <Button.Primary onClick={handleConfirmed}>Confirm</Button.Primary>
                <Button.Primary onClick={props.close}>Cancel</Button.Primary>
            </DialogActions>
        </Dialog>
    );
}

export default HOImportConfirmationModal;