import { Typography } from '@mui/material';
import React from 'react';
import ContractButton from '../contract-button';
import ConfirmBidModal from './confirm-bid-modal';
import useStyles from './index.styles';

const calculateExpiry = (expiry: number, extra = 'Ending') => {
    const timestamp = expiry - Date.now();
    const calc = Math.floor((timestamp / 1000 / 3600) % 24);
    const calc1 = Math.floor((timestamp / 60000) % 60);
    const calc2 = Math.floor((timestamp / 1000) % 60);

    let color = "";

    if (calc < 2) {
        color = "#efca15";
    }

    if (calc < 1 && calc1 < 60) {
        color = "#ef4715";
    }

    if (calc >= 2 && calc1 > 0) {
        color = "#1ad61a";
    }

    const hours = calc < 10 ? `0${calc}` : calc;
    const minutes = calc1 < 10 ? `0${calc1}` : calc1;
    const seconds = calc2 < 10 ? `0${calc2}` : calc2;

    if (expiry < Date.now()) {
        return (
            <span style={{ color: color }}>
                {extra}
            </span>
        )
    } else {
        return (
            <span style={{ color: color }}>
                {hours}:{minutes}:{seconds}
            </span>
        )
    }
}

interface AuctionItemProps {
    info: BoostingAuctionItem;
}

export default (props: AuctionItemProps) => {
    const classes = useStyles();
    const info = props.info;
    const [endsAt, setEndsAt] = React.useState(calculateExpiry(info.endsAt));
    const [confirmBidModal, setConfirmBidModal] = React.useState(false);

    const expiresAt = React.useMemo(() => {
        return calculateExpiry(info?.expiresAt ?? 0, 'Expired');
    }, [info.expiresAt]);

    React.useEffect(() => {
        if (info.endsAt) {
            const interval = setInterval(() => { }, 1000);

            setEndsAt(calculateExpiry(info.endsAt));

            if (info.endsAt < Date.now()) {
                return clearInterval(interval);
            }

            return () => clearInterval(interval);
        }
    }, [info]);

    const formatClassName = (className: string) => {
        switch (className) {
            case 'AUpgraded':
                return 'A+'
            case 'SUpgraded':
                return 'S+'
            default:
                return className;
        }
    }

    return (
        <div className={classes.auctionItem}>
            <ConfirmBidModal
                show={confirmBidModal}
                handleClose={() => setConfirmBidModal(false)}
                auctionId={info.id}
            />
            <div className={classes.auctionItemInfo}>
                <Typography variant="body2" className={classes.auctionItemInfoText} style={{ color: 'white' }}>
                    {info?.sellerAlias ?? 'Unknown'}
                </Typography>
                <Typography variant="body2" className={classes.auctionItemHeading} style={{ color: 'white' }}>
                    Seller
                </Typography>
            </div>
            <div className={classes.auctionItemInfo}>
                <Typography variant="body2" className={classes.auctionItemInfoText} style={{ color: 'white' }}>
                    {formatClassName(info?.vehicleClass) ?? 'Unknown'}
                </Typography>
                <Typography variant="body2" className={classes.auctionItemHeading} style={{ color: 'white' }}>
                    Class
                </Typography>
            </div>
            <div className={classes.auctionItemInfo}>
                <Typography variant="body2" className={classes.auctionItemInfoText} style={{ color: 'white' }}>
                    {info?.vehicleModel ?? 'Unknown'}
                </Typography>
                <Typography variant="body2" className={classes.auctionItemHeading} style={{ color: 'white' }}>
                    Vehicle
                </Typography>
            </div>
            <div className={classes.auctionItemInfo}>
                <Typography variant="body2" className={classes.auctionItemInfoText} style={{ color: 'white' }}>
                    {info?.currentBid ?? 0} GNE
                </Typography>
                <Typography variant="body2" className={classes.auctionItemHeading} style={{ color: 'white' }}>
                    Current Bid
                </Typography>
            </div>
            <div className={classes.auctionItemInfo}>
                <Typography variant="body2" className={classes.auctionItemInfoText} style={{ color: 'white' }}>
                    {endsAt}
                </Typography>
                <Typography variant="body2" className={classes.auctionItemHeading} style={{ color: 'white' }}>
                    Ends In
                </Typography>
            </div>
            <div className={classes.auctionItemInfo}>
                <Typography variant="body2" className={classes.auctionItemInfoText} style={{ color: 'white' }}>
                    {expiresAt}
                </Typography>
                <Typography variant="body2" className={classes.auctionItemHeading} style={{ color: 'white' }}>
                    Expires In
                </Typography>
            </div>
            <div className={classes.auctionItemInfo}>
                <ContractButton
                    label="Bid"
                    onClick={() => setConfirmBidModal(true)}
                />
            </div>
        </div>
    )
}