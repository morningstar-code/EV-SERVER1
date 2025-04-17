import React from 'react';
import Draggable from 'react-draggable';
import useStyles from './index.styles';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import Button from 'components/button/button';
import { LinearProgress, Typography } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';

export default () => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState('home');
    const [progress, setProgress] = React.useState({
        current: 'Unkown',
        next: 'Unkown',
        amount: 0
    });

    const getProgression = async () => {
        const results = await nuiAction<ReturnData<TowProgress>>("ev-jobs:towing:getProgression", {}, { returnData: {
            current: 'Unkown',
            next: 'Unkown',
            amount: 0
        } });

        if (results.meta.ok) {
            setProgress(results.data);
        }
    }

    const isTabActive = (tab: string) => {
        return selectedTab === tab ? 'towActiveBtn' : 'towTabBtn';
    }

    React.useEffect(() => {
        getProgression();
    }, []);

    return (
        <Draggable handle="#app-header">
            <div className={classes.towApp}>
                <AppHeader appName="Towing Service" color="#2D2735" onClose={() => updateLaptopState({ showTowApp: false })} style={{ color: '#ffffff' }} />
                <div className={classes.towContainer}>
                    <div className={classes.towHeading}>
                        <div className={classes.towTabSection}>
                            <Button.Primary className={classes[isTabActive('home')]} onClick={() => setSelectedTab('home')}>
                                Home
                            </Button.Primary>
                        </div>
                    </div>
                    <div className={classes.progressSection}>
                        <Typography className={classes.levelText}>
                            {progress.current}&nbsp;
                        </Typography>
                        <LinearProgress
                            classes={{
                                root: classes.towProgressionParent,
                                bar: classes.towProgression
                            }}
                            variant="determinate"
                            value={progress.amount}
                        />
                        <Typography className={classes.levelText}>
                            &nbsp;{progress.next}
                        </Typography>
                    </div>
                    <div className={classes.towContent}>
                        <Typography className={classes.bigText}>
                            Coming Soon
                        </Typography>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}