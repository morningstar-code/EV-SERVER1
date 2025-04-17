import React from 'react';
import store from 'main/laptop/store';
import { useSelector } from 'react-redux';
import useStyles from './index.styles';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Button from 'components/button/button';
import Input from 'components/input/input';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from 'main/laptop/components/laptop-screen';

interface BlockModalProps {
    show: boolean;
    handleClose: () => void;
}

export default (props: BlockModalProps) => {
    const state: LaptopState = useSelector((state) => state[store.key]);
    const [loading, setLoading] = React.useState(false);
    const [stateId, setStateId] = React.useState(0);

    const boostingAppIcon = state.boostingAppIcon;

    const puppetBlockPlayer = async (type: string) => {
        if (!isNaN(stateId)) {
            setLoading(true);

            const results = await nuiAction<ReturnData>("ev-boosting:ui:puppetBlockPlayer", { stateId: stateId, type: type }, { returnData: {} });

            if (results.meta.ok) {
                props.handleClose();

                AddSystemNotification({
                    show: true,
                    icon: boostingAppIcon,
                    title: 'Boostin',
                    message: results.meta.message
                });
            }

            setLoading(false);
        }

        return;
    }

    const classes = useStyles();

    return (
        <Dialog
            open={props.show}
            onClose={() => props.handleClose()}
        >
            {loading && (
                <DialogContent style={{ backgroundColor: '#1c2028' }}>
                    <CircularProgress size={60} />
                </DialogContent>
            )}
            {!loading && (
                <>
                    <DialogTitle style={{ backgroundColor: '#1c2028' }}>
                        App Access Management
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: '#1c2028' }}>
                        <Typography style={{ color: 'white' }}>
                            Manage if a user is blocked from using boostin app.
                        </Typography>
                        <Input.Text
                            onChange={(e) => setStateId(e)}
                            value={stateId}
                            autoFocus={true}
                            label="State ID"
                            fullWidth={true}
                            icon={null}
                        />
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: '#1c2028' }}>
                        <Button.Primary className={classes.btn} onClick={() => props.handleClose()}>
                            Cancel
                        </Button.Primary>
                        <Button.Primary className={classes.btn} onClick={() => puppetBlockPlayer('add')}>
                            Add Block
                        </Button.Primary>
                        <Button.Primary className={classes.btn} onClick={() => puppetBlockPlayer('remove')}>
                            Remove Block
                        </Button.Primary>
                    </DialogActions>
                </>
            )}
        </Dialog>
    )
}