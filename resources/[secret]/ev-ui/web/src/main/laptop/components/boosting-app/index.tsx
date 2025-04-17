import React, { FunctionComponent, Suspense } from 'react';
import useStyles from './index.styles';
import Draggable from 'react-draggable';
import AppHeader from '../app-header';
import Button from '../../../../components/button/button';
import { CircularProgress, LinearProgress, Typography } from '@mui/material';
import BoostingAppContract from './boosting-app-contract';
import { getBoostingContracts, setShowBoostingApp, updateLaptopState } from '../../actions';
import { AddSystemNotification } from '../laptop-screen';
import { useSelector } from 'react-redux';
import store from '../../store';
import PuppetMaster from './puppet-master';
import { nuiAction } from 'lib/nui-comms';
import BoostingAuction from './boosting-auction';

const BoostingApp: FunctionComponent = () => {
    const state: LaptopState = useSelector((state) => state[store.key]);
    const [selectedTab, setSelectedTab] = React.useState("contracts");
    const [inQueue, setInQueue] = React.useState(false);
    const [queueButtonLoading, setQueueButtonLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [levelProgression, setLevelProgression] = React.useState({
        nextClass: 'C',
        currClass: 'D'
    });

    const boostingAppIcon = state.boostingAppIcon;
    const devMode = state.devMode;
    const boostingContracts = state.boostingContracts;
    const isPuppet = state.isPuppet;

    const isCharInQueue = async () => {
        const results = await nuiAction('ev-boosting:ui:isCharInQueue', {}, { returnData: {} });

        if (results.meta.ok) {
            setInQueue(results.data);
            setQueueButtonLoading(false);
        }
    }

    const isCharPuppet = async () => {
        const results = await nuiAction('ev-boosting:ui:isCharPuppet', {}, { returnData: {} });

        if (results.meta.ok) {
            updateLaptopState({ isPuppet: results.data });
        }
    }

    const joinQueue = async () => {
        setQueueButtonLoading(true);

        const results = await nuiAction('ev-boosting:ui:joinQueue', {}, { returnData: {} });

        if (results.meta.ok) {
            setInQueue(results.data);
            AddSystemNotification({
                show: true,
                icon: boostingAppIcon,
                title: "Boostin",
                message: results.meta.message
            });
            setQueueButtonLoading(false);
        }
    }

    const leaveQueue = async () => {
        setQueueButtonLoading(true);

        const results = await nuiAction('ev-boosting:ui:leaveQueue', {}, { returnData: {} });

        if (results.meta.ok) {
            setInQueue(results.data);
            AddSystemNotification({
                show: true,
                icon: boostingAppIcon,
                title: "Boostin",
                message: results.meta.message
            });
            setQueueButtonLoading(false);
        }
    }

    const getNextLevelProgression = async () => {
        const results = await nuiAction('ev-boosting:ui:getNextLevelProgression', {}, { returnData: {
            currClass: 'D',
            nextClass: 'C'
        } });

        if (results.meta.ok) {
            setProgress(results.data.progress);
            setLevelProgression({
                currClass: results.data.currClass,
                nextClass: results.data.nextClass
            });
        }
    }

    const tabActiveClass = (tab: string) => {
        return selectedTab === tab ? `${classes.tabBtn} ${classes.active}` : classes.tabBtn;
    }

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

    React.useEffect(() => {
        if (!devMode) {
            getBoostingContracts();
            isCharInQueue();
            getNextLevelProgression();
            isCharPuppet();
        }
    }, [devMode]);

    const classes = useStyles({ progress: progress });

    return (
        <Draggable handle="#app-header">
            <div className={classes.boostingApp}>
                <AppHeader appName="Boosting Contracts" color="#21212B" onClose={() => setShowBoostingApp(false)} style={{ color: '#fff' }} />
                <div className={classes.container}>
                    <div className={classes.tabsSection}>
                        <div className={classes.tabsBtns}>
                            <Button.Primary className={tabActiveClass("contracts")} onClick={() => setSelectedTab("contracts")}>
                                My Contracts
                            </Button.Primary>
                            <Button.Primary className={tabActiveClass("auction")} onClick={() => setSelectedTab("auction")}>
                                Contract Auctions
                            </Button.Primary>
                            {isPuppet && (
                                <Button.Primary className={tabActiveClass("pmcontrols")} onClick={() => setSelectedTab("pmcontrols")}>
                                    Puppet Management
                                </Button.Primary>
                            )}
                        </div>
                        <Button.Primary className={classes.queueBtn} onClick={inQueue ? leaveQueue : joinQueue}>
                            {queueButtonLoading ? (
                                <CircularProgress size={20} className="fabProgress" style={{ color: '#9CFFFF' }} />
                            ) : (
                                <>
                                    {inQueue ? "Leave Queue" : "Join Queue"}
                                </>
                            )}
                        </Button.Primary>
                    </div>
                    {selectedTab === "contracts" && (
                        <>
                            <div className={classes.progressSection}>
                                <Typography className={classes.levelText}>
                                    {formatClassName(levelProgression.currClass)}
                                </Typography>
                                <LinearProgress
                                    classes={{
                                        root: classes.boostingProgressionParent,
                                        bar: classes.boostingProgression
                                    }}
                                    variant="determinate"
                                    value={progress}
                                />
                                <Typography className={classes.levelText}>
                                    {formatClassName(levelProgression.nextClass)}
                                </Typography>
                            </div>
                            {boostingContracts.length > 0 ? (
                                <div className={classes.pendingContracts}>
                                    {boostingContracts && boostingContracts.map((contract, index) => (
                                        <BoostingAppContract
                                            key={contract.uuid}
                                            contract={contract}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Typography variant="h1" className={classes.empty}>
                                    {"Inbox Empty.. :( "}
                                </Typography>
                            )}
                        </>
                    )}
                    {selectedTab === "pmcontrols" && (
                        <PuppetMaster />
                    )}
                    <Suspense fallback={<div>Loading...</div>}>
                        {selectedTab === "auction" && (
                            <BoostingAuction />
                        )}
                    </Suspense>
                </div>
            </div>
        </Draggable>
    );
}

export default BoostingApp;