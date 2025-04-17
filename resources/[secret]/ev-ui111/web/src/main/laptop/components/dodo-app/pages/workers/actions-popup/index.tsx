import { Typography } from '@mui/material';
import Button from 'components/button/button';
import React from 'react';
import useStyles from '../index.styles';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from 'main/laptop/components/laptop-screen';

interface DodoActionsPopupProps {
    cid: number;
    onCancel: () => void;
    fetchWorkers: () => void;
}

export default (props: DodoActionsPopupProps) => {
    const cid = props.cid;
    const onCancel = props.onCancel;
    const fetchWorkers = props.fetchWorkers;

    const [assigning, setAssigning] = React.useState(false);
    const [companyCut, setCompanyCut] = React.useState(15);

    const assignJob = async (cid: number, type: string) => {
        if (!(companyCut > 100 || companyCut < 0)) {
            const results = await nuiAction<ReturnData<{ success: boolean }>>("ev-dodo:ui:assignJob", { type: type, charId: cid, companyCut: companyCut });

            results?.data?.success && onCancel();

            return AddSystemNotification({
                show: true,
                icon: 'https://i.imgur.com/5iJpfNS.png',
                title: 'Dodo Deliveries',
                message: results.meta.message
            });
        }

        return AddSystemNotification({
            show: true,
            icon: 'https://i.imgur.com/5iJpfNS.png',
            title: 'Dodo Deliveries',
            message: 'Please enter a valid company cut (0-100)'
        });
    }

    const signOffDuty = async (cid: number) => {
        const results = await nuiAction<ReturnData<{ success: boolean }>>("ev-dodo:ui:signOffDuty", { charId: cid });

        results?.data?.success && fetchWorkers();

        AddSystemNotification({
            show: true,
            icon: 'https://i.imgur.com/5iJpfNS.png',
            title: 'Dodo Deliveries',
            message: results.meta.message
        });
    }

    const classes = useStyles();

    return (
        <>
            {assigning ? (
                <div className={classes.modal}>
                    <Typography variant="h1" className={classes.desc}>
                        Which job type would you like to assign?
                    </Typography>
                    <div className={classes.buttons}>
                        <div className={classes.inputSection}>
                            <Typography variant="h1" className={classes.companyCut}>
                                Company Cut
                            </Typography>
                            <input
                                type="number"
                                placeholder="Enter company cut..."
                                className={classes.input}
                                value={companyCut}
                                onChange={(e) => setCompanyCut(parseInt(e.target.value))}
                            />
                        </div>
                        <Button.Primary className={classes.btn} onClick={() => assignJob(cid, 'express')}>
                            Express
                        </Button.Primary>
                        <Button.Primary className={classes.btn} onClick={() => assignJob(cid, 'freight')}>
                            Freight
                        </Button.Primary>
                        <Button.Primary className={classes.btn} onClick={onCancel}>
                            Cancel
                        </Button.Primary>
                    </div>
                </div>
            ) : (
                <div className={classes.modal}>
                    <Typography variant="h1" className={classes.desc}>
                        Which actions would you like to do?
                    </Typography>
                    <div className={classes.buttons}>
                        <Button.Primary className={classes.btn} onClick={() => setAssigning(true)}>
                            Assign Job
                        </Button.Primary>
                        <Button.Primary className={classes.btn} onClick={() => signOffDuty(cid)}>
                            Sign Off
                        </Button.Primary>
                        <Button.Primary className={classes.btn} onClick={onCancel}>
                            Cancel
                        </Button.Primary>
                    </div>
                </div>
            )}
        </>
    )
}