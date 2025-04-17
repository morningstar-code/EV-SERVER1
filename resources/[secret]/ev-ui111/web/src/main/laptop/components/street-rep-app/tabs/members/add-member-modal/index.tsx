import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Button from "components/button/button";
import Input from "components/input/input";
import React from "react";
import useStyles from "./index.styles";
import { nuiAction } from "lib/nui-comms";
import { AddSystemNotification } from "main/laptop/components/laptop-screen";

interface AddMemberModalProps {
    show: boolean;
    handleClose: () => void;
}

export default (props: AddMemberModalProps) => {
    const classes = useStyles();
    const [stateId, setStateId] = React.useState(0);

    const addMember = async (id: number) => {
        if (stateId !== 0) {
            const results = await nuiAction("ev-gangsystem:ui:addMember", { stateId: id }, { returnData: {} });

            AddSystemNotification({
                show: true,
                icon: 'https://i.imgur.com/HNyPZK7.png',
                title: 'Unknown',
                message: results.meta.message,
            });

            results.meta.ok && props.handleClose();
        }
    }

    return (
        <div className={classes.modalContent}>
            <Dialog
                open={props.show}
                onClose={() => props.handleClose()}
            >
                <DialogContent className={classes.modalContent}>
                    <Typography className={classes.headerText} variant="h2">
                        Add Group Member
                    </Typography>
                    <Input.CityID
                        onChange={(id: number) => setStateId(id)}
                        value={stateId}
                    />
                    <Button.Primary className={classes.orangeButton} onClick={() => addMember(stateId)}>
                        Add Member
                    </Button.Primary>
                </DialogContent>
            </Dialog>
        </div>
    )
}