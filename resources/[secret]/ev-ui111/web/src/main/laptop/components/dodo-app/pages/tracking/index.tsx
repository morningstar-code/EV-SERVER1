import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import useStyles from './index.styles';
import Button from 'components/button/button';
import { nuiAction } from 'lib/nui-comms';

export default () => {
    const [delivery, setDelivery] = React.useState<DodoTrackedDelivery>(null);
    const [trackingId, setTrackingId] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchDelivery = React.useCallback(async () => {
        setLoading(true);

        const results = await nuiAction<ReturnData<DodoTrackedDelivery>>("ev-dodo:ui:fetchDelivery", { trackingId: trackingId }, { returnData: {} });

        if (results.meta.ok) {
            setDelivery(results.data);
            setLoading(false);
        }
    }, []);

    const formatDate = React.useCallback((date: number): string => {
        return new Date(date).toLocaleTimeString();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.content}>
            <section>
                <Typography variant="h1" className={classes.title}>
                    Track Deliveries
                </Typography>
            </section>
            <section className={classes.searchBar}>
                <input
                    placeholder="Enter tracking number..."
                    type="number"
                    className={classes.input}
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                />
                <Button.Primary className={classes.searchBtn} onClick={() => fetchDelivery()}>
                    Search
                </Button.Primary>
            </section>
            {loading ? (
                <section className={classes.loadingSection}>
                    <CircularProgress size={42} className="fabProgress" style={{ color: '#9CFFFF' }} />
                </section>
            ) : (
                <section>
                    {delivery && (
                        <div className={classes.jobItem}>
                            <div className={classes.jobHeader}>
                                <div className={classes.jobLogo}>
                                    <i className="fas fa-truck fa-fw" style={{ color: '#fff' }}></i>
                                </div>
                                <Typography variant="h1" className={classes.jobTitle}>
                                    {delivery.trackingId}
                                </Typography>
                            </div>
                            <div className={classes.desc}>
                                <Typography variant="h1" className={classes.descText}>
                                    Type: {delivery.type}, Status: {delivery.status}, Stops: {delivery.stops}, Packages: {delivery.packages}, Delivery Date: {formatDate(delivery.completedAt)}
                                </Typography>
                            </div>
                        </div>
                    )}
                    {!delivery && (
                        <Typography variant="h1" className={classes.noInfo}>
                            No delivery information found
                        </Typography>
                    )}
                </section>
            )}
        </div>
    )
}