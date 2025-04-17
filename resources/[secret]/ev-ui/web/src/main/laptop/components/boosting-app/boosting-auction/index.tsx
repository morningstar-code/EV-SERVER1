import React from 'react';
import store from 'main/laptop/store';
import { useSelector } from 'react-redux';
import useStyles from './index.styles';
import { getAuctionItems } from 'main/laptop/actions';
import Input from 'components/input/input';
import { Typography } from '@mui/material';
import BoostingAppAuctionItem from '../boosting-app-auction-item';

export default () => {
    const classes = useStyles();
    const state: LaptopState = useSelector((state) => state[store.key]);
    const boostingAuctionItems = state.boostingAuctionItems;
    const [contractClass, setContractClass] = React.useState('all');

    const fetchAuctionItems = React.useCallback(async () => {
        getAuctionItems();
    }, []);

    React.useEffect(() => {
        fetchAuctionItems();
    }, [fetchAuctionItems]);

    return (
        <div className="container">
            <div className="auctionFilters">
                <Input.Select
                    label="Contract Class"
                    value={contractClass}
                    onChange={(e) => setContractClass(e)}
                    items={[
                        {
                            id: 'all',
                            name: 'All Contracts',
                        },
                        {
                            id: 'SUpgraded',
                            name: 'S+',
                        },
                        {
                            id: 'AUpgraded',
                            name: 'A+',
                        },
                        {
                            id: 'A',
                            name: 'A',
                        },
                        {
                            id: 'B',
                            name: 'B',
                        },
                        {
                            id: 'C',
                            name: 'C',
                        },
                        {
                            id: 'D',
                            name: 'D',
                        }
                    ]}
                />
            </div>
            <div className={classes.auctionItems}>
                {boostingAuctionItems && boostingAuctionItems.filter((item) => {
                    return contractClass === 'all' || item.vehicleClass === contractClass;
                }).map((item) => (
                    <BoostingAppAuctionItem key={item.id} info={item} />
                ))}
                {boostingAuctionItems.length <= 0 && (
                    <Typography variant="h1" className={classes.empty}>
                        Auction listings are currently empty.
                    </Typography>
                )}
            </div>
        </div>
    )
}