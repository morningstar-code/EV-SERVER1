import React from 'react';
import { Typography } from '@mui/material';
import Button from 'components/button/button';
import { nuiAction } from 'lib/nui-comms';
import useStyles from './index.styles';
import ActionsPopup from './actions-popup';

export default () => {
    const [workers, setWorkers] = React.useState<DodoWorker[]>([]);
    const [cid, setCid] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>('');
    const [actionsModal, setActionsModal] = React.useState<boolean>(false);

    const getWorkers = React.useCallback(async () => {
        const results = await nuiAction<ReturnData<DodoWorker[]>>('ev-workers:ui:getWorkers', {}, {
            returnData: [
                {
                    id: 1,
                    cid: 1,
                    name: 'John Doe',
                    status: 'Working'
                }
            ]
        });

        setWorkers(results.data);
    }, []);

    const onCancel = () => {
        setCid(0);
        setActionsModal(false);
    }

    const filterWorkers = React.useCallback((search: string) => {
        const value = search.toLowerCase();

        const filtered = workers.filter((worker: DodoWorker) => {
            return worker.name.toLowerCase().includes(value) || String(worker.cid).toLowerCase().includes(value);
        });

        return filtered;
    }, [workers]);

    React.useEffect(() => {
        getWorkers();
    }, [getWorkers]);

    const classes = useStyles();

    return (
        <div className={classes.content}>
            <section>
                <Typography variant="h1" className={classes.title}>
                    Workers List
                </Typography>
                <input
                    type="text"
                    placeholder="Search"
                    className={classes.searchInput}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </section>
            <section className={classes.workersList}>
                {workers && workers.length > 0 && filterWorkers(search).map((worker) => (
                    <div key={worker.id} className={classes.worker}>
                        {actionsModal && cid === worker.cid ? (
                            <ActionsPopup
                                cid={cid}
                                onCancel={onCancel}
                                fetchWorkers={getWorkers}
                            />
                        ) : (
                            <>
                                <Typography variant="h1" className={classes.workerName}>
                                    {worker.name} (StateID: {worker.cid}, Status: {worker.status}, Last Delivery: {worker?.lastDelivery ?? 'N/A'})
                                </Typography>
                                <Button.Primary className={classes.btn} onClick={() => {
                                    setCid(worker.cid);
                                    setActionsModal(true);
                                }}>
                                    Actions
                                </Button.Primary>
                            </>
                        )}
                    </div>
                ))}
            </section>
        </div>
    )
}