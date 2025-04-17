import React from 'react';
import store from 'main/laptop/store';
import { useSelector } from 'react-redux';
import useStyles from './index.styles';
import { Typography } from '@mui/material';
import Button from 'components/button/button';
import ConfirmPopup from '../confirm-popup';
import BlockModal from './block-modal';
import CreateModal from './create-modal';
import { nuiAction } from 'lib/nui-comms';
import { updateLaptopState } from 'main/laptop/actions';
import { AddSystemNotification } from '../../laptop-screen';

export default () => {
    const state: LaptopState = useSelector((state) => state[store.key]);
    const [blockModal, setBlockModal] = React.useState(false);
    const [createModal, setCreateModal] = React.useState(false);
    const [toggleQueueModal, setToggleQueueModal] = React.useState(false);
    const [puppetBlipsEnabled, setPuppetBlipsEnabled] = React.useState(false);

    const puppetAccessInfo = state.puppetAccessInfo;
    const boostingAppIcon = state.boostingAppIcon;

    const fetchPuppetAccessInfo = async () => {
        const results = await nuiAction<ReturnData<BoostingPuppetAccessInfo>>("ev-boosting:ui:fetchPuppetAccessInfo", {}, { returnData: {
            playersInQueue: 0,
            activeContracts: 0,
            pendingContracts: 0,
            isQueueEnabled: true
        } });

        if (results.meta.ok) {
            updateLaptopState({ puppetAccessInfo: results.data });
        }
    }

    const isPuppetBlipsEnabled = async () => {
        const results = await nuiAction<ReturnData<boolean>>("ev-boosting:ui:isPuppetBlipsEnabled", {}, { returnData: {} });

        if (results.meta.ok) {
            setPuppetBlipsEnabled(results.data);
        }
    }

    const displayActivePickups = async (status: boolean) => {
        await nuiAction<ReturnData<boolean>>("ev-boosting:ui:displayActivePickups", { toggle: status }, { returnData: {} });

        AddSystemNotification({
            show: true,
            icon: boostingAppIcon,
            title: 'Boostin',
            message: `Successfully toggled ${status ? 'on' : 'off'} vehicle tracking!`
        });

        isPuppetBlipsEnabled();
    }

    const togglePuppetQueue = async (status: boolean) => {
        const results = await nuiAction<ReturnData<boolean>>("ev-boosting:ui:togglePuppetQueue", { toggle: status }, { returnData: {} });

        results.meta.ok && fetchPuppetAccessInfo();

        setToggleQueueModal(false);

        AddSystemNotification({
            show: true,
            icon: boostingAppIcon,
            title: 'Boostin',
            message: 'Successfully toggled queue!'
        });
    }

    React.useEffect(() => {
        fetchPuppetAccessInfo();
        isPuppetBlipsEnabled();
    }, [])

    const classes = useStyles();

    return (
        <div className={classes.PuppetMasterPage}>
            {toggleQueueModal && (
                <ConfirmPopup
                    message="Toggle Queue?"
                    onAccept={() => togglePuppetQueue(!puppetAccessInfo.isQueueEnabled)}
                    onCancel={() => setToggleQueueModal(false)}
                    loading={false}
                />
            )}
            <BlockModal show={blockModal} handleClose={() => setBlockModal(false)} />
            <CreateModal show={createModal} handleClose={() => setCreateModal(false)} />
            <section className={classes.row}>
                <div className={classes.formSection}>
                    <Typography style={{ color: 'white' }}>
                        Players In Queue
                    </Typography>
                    <Typography className={classes.description}>
                        {puppetAccessInfo && puppetAccessInfo.playersInQueue} Players
                    </Typography>
                </div>
                <div className={classes.formSection}>
                    <Typography style={{ color: 'white' }}>
                        Active Contracts
                    </Typography>
                    <Typography className={classes.description}>
                        {puppetAccessInfo && puppetAccessInfo.activeContracts} Contracts
                    </Typography>
                </div>
                <div className={classes.formSection}>
                    <Typography style={{ color: 'white' }}>
                        Pending Contracts
                    </Typography>
                    <Typography className={classes.description}>
                        {puppetAccessInfo && puppetAccessInfo.pendingContracts} Contracts
                    </Typography>
                </div>
            </section>
            <section className={classes.row}>
                <div className={classes.formSection}>
                    <Typography style={{ color: 'white' }}>
                        Queue Status ({puppetAccessInfo && puppetAccessInfo.isQueueEnabled ? 'Online' : 'Offline'})
                    </Typography>
                    <Button.Primary className={classes.btn} onClick={() => setToggleQueueModal(true)}>
                        {puppetAccessInfo && puppetAccessInfo.isQueueEnabled ? 'Disable Queue' : 'Enable Queue'}
                    </Button.Primary>
                </div>
                <div className={classes.formSection}>
                    <Typography style={{ color: 'white' }}>
                        Block From Queue (StateID)
                    </Typography>
                    <Button.Primary className={classes.btn} onClick={() => setBlockModal(true)}>
                        Block
                    </Button.Primary>
                </div>
                <div className={classes.formSection}>
                    <Typography style={{ color: 'white' }}>
                        Contract Vehicles/Pickup Locations (active contracts)
                    </Typography>
                    <Button.Primary className={classes.btn} onClick={() => displayActivePickups(puppetBlipsEnabled ? false : true)}>
                        {puppetBlipsEnabled ? 'Disable' : 'Enable'}
                    </Button.Primary>
                </div>
            </section>
            <section className={classes.row}>
                <div className={classes.formSection}>
                    <Typography style={{ color: 'white' }}>
                        Contract Creator
                    </Typography>
                    <Button.Primary className={classes.btn} onClick={() => setCreateModal(true)}>
                        Create
                    </Button.Primary>
                </div>
            </section>
        </div>
    );
};