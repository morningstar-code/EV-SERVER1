import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import useStyles from './index.styles';
import Button from 'components/button/button';
import { nuiAction } from 'lib/nui-comms';

export default () => {
    const [logs, setLogs] = React.useState<DodoLog[]>([]);
    const [stateId, setStateId] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchLogs = React.useCallback(async () => {
        setLoading(true);

        const results = await nuiAction<ReturnData<DodoLog[]>>("ev-dodo:ui:fetchLogs", { stateId: stateId }, { returnData: {} });

        if (results.meta.ok) {
            setLogs(results.data);
            setLoading(false);
        }
    }, []);

    const formatDate = (date: number): string => {
        return new Date(date).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    const classes = useStyles();

    return (
        <div className={classes.content}>
            <section>
                <Typography variant="h1" className={classes.title}>
                    Delivery Logs
                </Typography>
            </section>
            <section className={classes.searchBar}>
                <input
                    placeholder="Enter State Id..."
                    type="number"
                    className={classes.input}
                    value={stateId}
                    onChange={(e) => setStateId(parseInt(e.target.value))}
                />
                <Button.Primary className={classes.searchBtn} onClick={() => fetchLogs()}>
                    Search
                </Button.Primary>
            </section>
            {loading ? (
                <section className={classes.loadingSection}>
                    <CircularProgress size={42} className="fabProgress" style={{ color: '#9CFFFF' }} />
                </section>
            ) : (
                <section>
                    {logs && logs.map((log) => (
                        <div className={classes.jobItem}>
                            <div className={classes.jobHeader}>
                                <div className={classes.jobLogo}>
                                    <i className="fas fa-truck fa-fw" style={{ color: '#fff' }}></i>
                                </div>
                                <Typography variant="h1" className={classes.jobTitle}>
                                    {log.trackingId}
                                </Typography>
                            </div>
                            <div className={classes.desc}>
                                <Typography variant="h1" className={classes.descText}>
                                    Assigned By: {log.assignedBy}, Type: {log.type}, Status: {log.status}, Stops: {log.stops}, Packages: {log.packages}, Delivery Date: {formatDate(log.completedAt)}
                                </Typography>
                            </div>
                        </div>
                    ))}
                    {logs && logs.length === 0 && (
                        <Typography variant="h1" className={classes.noInfo}>
                            No delivery logs
                        </Typography>
                    )}
                </section>
            )}
        </div>
    )
}