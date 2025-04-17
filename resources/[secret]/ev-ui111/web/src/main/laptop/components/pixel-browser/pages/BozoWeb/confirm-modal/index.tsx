import React, { FunctionComponent } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Input from '../../../../../../../components/input/input';
import Button from '../../../../../../../components/button/button';

interface ConfirmModalProps {
    open: boolean;
    handleClose: (bool?: boolean, service?: BozoWebService, data?: { amount: number, licensePlate: string }) => void;
    service: BozoWebService;
}

const ConfirmModal: FunctionComponent<ConfirmModalProps> = (props) => {
    const open = props.open;
    const handleClose = props.handleClose;
    const service = props.service.data;

    const [licensePlate, setLicensePlate] = React.useState('');

    return (
        <Dialog open={open} onClose={() => handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#1c2028 !important' }}>
                Purchase Service - {service.name}
                <Typography style={{ color: 'white' }}>
                    {service.description}
                </Typography>
            </DialogTitle>
            <DialogContent style={{ backgroundColor: '#1c2028 !important' }}>
                <section>
                    <div>
                        <Input.Text
                            onChange={(e) => setLicensePlate(e)}
                            label="License Plate"
                            icon="search"
                            value={licensePlate}
                            maxLength={10}
                        />
                    </div>
                </section>
                <DialogActions style={{ backgroundColor: '#1c2028 !important' }}>
                    <Button.Secondary onClick={() => handleClose(false)}>
                        Cancel
                    </Button.Secondary>
                    <Button.Primary onClick={() => handleClose(true, props.service, { amount: service.price, licensePlate: licensePlate })}>
                        Purchase
                    </Button.Primary>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmModal;