import React, { FunctionComponent } from 'react';
import Spinner from '../../../../../components/spinner/spinner';
import ContractButton from '../contract-button';
import useStyles from './index.styles';
import { useSelector } from 'react-redux';
import store from 'main/laptop/store';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from '../../laptop-screen';

interface TransferPopupProps {
    contractId: string;
    handleClose: () => void;
}

const AuctionPopup: FunctionComponent<TransferPopupProps> = (props) => {
    const state: LaptopState = useSelector((state) => state[store.key]);
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [startingBid, setStartingBid] = React.useState(0);

    const boostingAppIcon = state.boostingAppIcon;

    const createAuction = async () => {
        setLoading(true);

        const results = await nuiAction<ReturnData>('ev-boosting:ui:createAuction', {
            startingBid: startingBid,
            contractId: props.contractId
        }, {});

        AddSystemNotification({
            show: true,
            icon: boostingAppIcon,
            title: 'Boosting',
            message: results.meta.message
        });

        setLoading(false);

        props.handleClose();
    }

    return (
        <>
            {loading ? (
                <div className={classes.loadingIcon}>
                    <Spinner />
                </div>
            ) : (
                <div className={classes.auctionPopup}>
                    <div className={classes.title}>
                        Auction Contract
                    </div>
                    <div className={classes.auctionInput}>
                        <label className={classes.label}>
                            Startig Bid (GNE)
                        </label>
                        <input
                            className={classes.input}
                            placeholder="Starting Bid..."
                            value={startingBid}
                            onChange={(e) => setStartingBid(parseInt(e.target.value))}
                            type="number"
                        />
                    </div>
                    <div className={classes.buttons}>
                        <ContractButton
                            onClick={createAuction}
                            label="Create"
                        />
                        <ContractButton
                            onClick={props.handleClose}
                            style={{ margin: '0.5rem 0' }}
                            label="Cancel"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default AuctionPopup;