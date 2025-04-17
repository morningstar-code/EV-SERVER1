import { Typography } from '@mui/material';
import Button from 'components/button/button';
import React from 'react';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from 'main/laptop/components/laptop-screen';

export default () => {
    const icon = "https://i.imgur.com/5iJpfNS.png";
    const [jobs, setJobs] = React.useState<DodoJobOffer[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const startJob = async (id: string): Promise<void> => {
        const results = await nuiAction<ReturnData>("ev-dodo:ui:startJob", { jobId: id }, { returnData: {} });

        if (!results.meta.ok) {
            return AddSystemNotification({
                show: true,
                icon: icon,
                title: 'Dodo Deliveries',
                message: results.meta.message
            });
        }

        getJobs();

        AddSystemNotification({
            show: true,
            icon: icon,
            title: 'Dodo Deliveries',
            message: results.meta.message
        });
    }

    const cancelJob = async (id: string): Promise<void> => {
        const results = await nuiAction<ReturnData>("ev-dodo:ui:cancelJob", { jobId: id }, { returnData: {} });

        if (!results.meta.ok) {
            return AddSystemNotification({
                show: true,
                icon: icon,
                title: 'Dodo Deliveries',
                message: results.meta.message
            });
        }

        getJobs();

        AddSystemNotification({
            show: true,
            icon: icon,
            title: 'Dodo Deliveries',
            message: results.meta.message
        });
    }

    const getJobs = React.useCallback(async () => {
        const results = await nuiAction<ReturnData<DodoJobOffer[]>>("ev-dodo:ui:getJobs", {}, { returnData: [] });

        if (results.meta.ok) {
            setJobs(results.data);
            setLoading(false);
        }
    }, []) as unknown as () => Promise<DodoJobOffer[]>;

    React.useEffect(() => {
        getJobs();
    }, [getJobs]);

    const classes = useStyles();

    return (
        <div className={classes.content}>
            <section>
                <Typography variant="h1" className={classes.title}>
                    Job Offers
                </Typography>
            </section>
            {!loading && (
                <section>
                    {jobs && jobs.map((job) => (
                        <div key={job.id} className={classes.inbox}>
                            <Typography variant="h1" className={classes.inboxName}>
                                Type: {job.type}
                            </Typography>
                            <Typography variant="h1" className={classes.inboxName}>
                                Stops: {job.requiredStops}
                            </Typography>
                            <Typography variant="h1" className={classes.inboxName}>
                                Packages: {job.requiredPackages}
                            </Typography>
                            <Typography variant="h1" className={classes.inboxName}>
                                Company Cut: {job.companyCut * 100}%
                            </Typography>
                            <div className={classes.buttons}>
                                {job.active ? (
                                    <Button.Primary className={classes.btnDisabled}>
                                        Job Active
                                    </Button.Primary>
                                ) : (
                                    <Button.Primary className={classes.btn} onClick={() => startJob(job.id)}>
                                        Start Job
                                    </Button.Primary>
                                )}
                                <Button.Primary className={classes.btn} onClick={() => cancelJob(job.id)} style={{ marginLeft: '0.5rem !important' }}>
                                    Cancel Job
                                </Button.Primary>
                            </div>
                        </div>
                    ))}
                    {!jobs || jobs?.length === 0 && (
                        <Typography variant="h1" className={classes.noJobs}>
                            Job inbox is currently empty.
                        </Typography>
                    )}
                </section>
            )}
        </div>
    )
}