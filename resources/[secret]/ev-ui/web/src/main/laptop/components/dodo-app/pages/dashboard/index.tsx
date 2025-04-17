import React from 'react';
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';

export default () => {
    const [stats, setStats] = React.useState<DodoStats>({
        workers: 0,
        jobsCompleted: 0,
        todaysRev: 0,
        jobs: [],
        expressJobs: 0,
        freightJobs: 0
    });

    const getStats = React.useCallback(async () => {
        const results = await nuiAction<ReturnData<DodoStats>>("ev-dodo:ui:getStats", {}, { returnData: {} });

        if (results.meta.ok) {
            setStats(results.data);
        }
    }, []);

    React.useEffect(() => {
        getStats();
    }, [getStats]);

    const classes = useStyles();

    return (
        <div className={classes.content}>
            <section className={classes.header}>
                <Typography variant="h1" className={classes.title}>
                    Tracking Dashboard
                </Typography>
            </section>
            <section className={classes.stats}>
                <div className={classes.stat}>
                    <Typography variant="h1" className={classes.statValue}>
                        {stats.workers ?? 0}
                    </Typography>
                    <Typography variant="h1" className={classes.statTitle}>
                        Workers
                    </Typography>
                </div>
                <div className={classes.stat}>
                    <Typography variant="h1" className={classes.statValue}>
                        {stats.jobsCompleted ?? 0}
                    </Typography>
                    <Typography variant="h1" className={classes.statTitle}>
                        Completed Deliveries
                    </Typography>
                </div>
                <div className={classes.stat}>
                    <Typography variant="h1" className={classes.statValue}>
                        ${stats.todaysRev ?? 0}
                    </Typography>
                    <Typography variant="h1" className={classes.statTitle}>
                        Todays Revenue
                    </Typography>
                </div>
                <div className={classes.stat}>
                    <Typography variant="h1" className={classes.statValue}>
                        {stats.expressJobs ?? 0}
                    </Typography>
                    <Typography variant="h1" className={classes.statTitle}>
                        Express Jobs Available
                    </Typography>
                </div>
                <div className={classes.stat}>
                    <Typography variant="h1" className={classes.statValue}>
                        {stats.freightJobs ?? 0}
                    </Typography>
                    <Typography variant="h1" className={classes.statTitle}>
                        Freight Jobs Available
                    </Typography>
                </div>
            </section>
            <section className={classes.jobs}>
                <Typography variant="h1" className={classes.title}>
                    Current Deliveries
                </Typography>
                {stats && stats?.jobs && stats.jobs.map((job) => {
                    <div className={classes.jobItem}>
                        <div className={classes.jobHeader}>
                            <div className={classes.jobLogo}>
                                <i className="fas fa-truck fa-fw" style={{ color: '#fff' }}></i>
                            </div>
                            <Typography variant="h1" className={classes.jobTitle}>
                                {job.id}
                            </Typography>
                        </div>
                        <div className={classes.desc}>
                            <Typography variant="h1">
                                Started By: {job.name}, Duration: {job.startedAt}, Packages: ({job.deliveredPackages}/{job.requiredPackages})
                            </Typography>
                        </div>
                    </div>
                })}
            </section>
        </div>
    )
}