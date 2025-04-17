import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ContractButton from '../../contract-button';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from 'main/laptop/components/laptop-screen';
import { useSelector } from 'react-redux';

interface ConfirmBidModalProps {
    show: boolean;
    handleClose: () => void;
    auctionId: string;
}

const ConfirmBidModal: FunctionComponent<ConfirmBidModalProps> = (props) => {
    const state: LaptopState = useSelector((state: any) => state.laptop);
    const boostingAppIcon = state.boostingAppIcon;
    const classes = useStyles();
    const [bidAmount, setBidAmount] = React.useState(0);

    const placeAuctionBid = async () => {
        const results = await nuiAction('ev-boosting:ui:placeAuctionBid', {
            auctionId: props.auctionId,
            bidAmount: bidAmount
        });

        AddSystemNotification({
            show: true,
            icon: boostingAppIcon,
            title: 'Boosting',
            message: results.meta.message
        });

        if (results.meta.ok) {
            props.handleClose();
        }
    }

    return (
        <Dialog open={props.show} onClose={props.handleClose}>
            <DialogTitle style={{ backgroundColor: '#21212b', padding: 8 }}>
                Place Bid
            </DialogTitle>
            <DialogContent style={{ backgroundColor: '#21212b', padding: 8 }}>
                <input
                    placeholder="Enter bid amount..."
                    type="number"
                    className={classes.input}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(parseInt(e.target.value))}
                />
            </DialogContent>
            <DialogActions style={{ backgroundColor: '#21212b' }}>
                <ContractButton
                    label="Place Bid"
                    onClick={placeAuctionBid}
                />
                <ContractButton
                    label="Cancel"
                    onClick={props.handleClose}
                />
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmBidModal;