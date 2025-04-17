import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import Button from "components/button/button";
import Input from "components/input/input";
import { FunctionComponent, useEffect, useState } from "react";

const UpdatePhotoModal: FunctionComponent<any> = ({
    open,
    handleClose,
    currDesc
}) => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(currDesc);
    }, [currDesc]);

    return (
        <Dialog open={open} onClose={() => handleClose(false)}>
            <DialogTitle style={{ backgroundColor: '#1c2028' }}>
                Photo Description
            </DialogTitle>
            <DialogContent style={{ backgroundColor: '#1c2028' }}>
                <Typography style={{ color: '#fff' }}>
                    This is permanent and can't be changed.
                </Typography>
                <section>
                    <div>
                        <Input.TextArea
                            onChange={(e) => setDescription(e)}
                            label="Description"
                            icon="share"
                            value={description}
                            autoFocus={true}
                            maxLength={256}
                        />
                    </div>
                </section>
                <DialogActions style={{ backgroundColor: '#1c2028' }}>
                    <Button.Secondary onClick={() => handleClose(false)}>
                        Cancel
                    </Button.Secondary>
                    <Button.Primary onClick={() => handleClose(true, description)}>
                        Set Description
                    </Button.Primary>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default UpdatePhotoModal;