import React, { FunctionComponent } from 'react';
import Draggable from 'react-draggable';
import AppHeader from '../app-header';
import Button from '../../../../components/button/button';
import { LinearProgress, Typography } from '@mui/material';
import { updateLaptopState } from '../../actions';
import useStyles from './index.styles';
import { useSelector } from 'react-redux';
import store from '../../store';
import moment from 'moment';
import MethAppOption from './meth-app-option';
import { nuiAction } from 'lib/nui-comms';

const MethApp: FunctionComponent = () => {
    const devMode = useSelector((state: any) => state[store.key].devMode);
    const [progress, setProgress] = React.useState<number>(100);
    const [cooldowns, setCooldowns] = React.useState<number[]>([-1, -1]);
    const [selectedTab, setSelectedTab] = React.useState<string>("progress");
    const [purchaseOptions, setPurchaseOptions] = React.useState<{ name: string, price: number, due_at: number }[]>([
        {
            name: "Bozo",
            price: 100,
            due_at: Date.now() + (2 * 60 * 60 * 1000),
        }
    ]);
    const [feeList, setFeeList] = React.useState<{ name: string, price: number, due_at: number }[]>([
        {
            name: "Bozo",
            price: 100,
            due_at: Date.now() + (2 * 60 * 60 * 1000),
        }
    ]);
    const [progression, setProgression] = React.useState<{ nextClass: string, currClass: string }>({
        nextClass: null,
        currClass: null
    });

    const classes = useStyles({ progress: progress });

    const getNextLevelProgression = async () => {
        type LevelProgression = {
            progress: number,
            currClass: string,
            nextClass: string,
            purchaseOptions: { name: string, price: number, due_at: number }[],
            feeList: { name: string, price: number, due_at: number }[],
        };

        const results = await nuiAction<ReturnData<LevelProgression>>("ev-meth:getNextLevelProgression", {}, { returnData: {
            progress: 0,
            currClass: "A",
            nextClass: "S",
            purchaseOptions: [
                {
                    name: "Option",
                    price: 100,
                    due_at: Date.now() + (2 * 60 * 60 * 1000),
                }
            ],
            feeList: [
                {
                    name: "Fee",
                    price: 100,
                    due_at: Date.now() + (2 * 60 * 60 * 1000),
                }
            ],
        } });

        if (results.meta.ok) {
            setProgress(results.data.progress);
            setProgression({
                currClass: results.data.currClass,
                nextClass: results.data.nextClass,
            });
            setPurchaseOptions(results.data.purchaseOptions);
            setFeeList(results.data.feeList);
        }
    }

    const getCooldowns = async () => {
        const results = await nuiAction<ReturnData<number[]>>("ev-meth:getCooldowns", {}, { returnData: [-1, -1] });

        if (results.meta.ok) {
            setCooldowns(results.data);
        }
    }

    const calculateTime = (unix: number) => {
        const timestamp = moment.unix(unix).diff(moment(), 'minute', true);
        return timestamp <= 0 ? 'now' : `${Math.floor(timestamp / 60)} h ${Math.floor(timestamp % 60)} m`;
    }

    React.useEffect(() => {
        if (!devMode) {
            getNextLevelProgression();
            getCooldowns();
        }
    }, [devMode]);

    return (
        <Draggable handle="#app-header">
            <div className={classes.methApp}>
                <AppHeader appName="The Blue Plaza" color="#1C1C24" onClose={() => updateLaptopState({ showMethApp: false })} style={{ color: '#fff' }} />
                <div className={classes.container}>
                    <div className={classes.tabsSection}>
                        <div className={classes.tabsBtns}>
                            <Button.Primary style={{ marginRight: '1rem' }}>
                                Next available job: {cooldowns[0] === -1 ? 'Unavailable' : calculateTime(cooldowns[0])}
                            </Button.Primary>
                            <Button.Primary style={{ marginRight: '1rem' }}>
                                Next personal delivery: {cooldowns[1] === -1 ? 'Unavailable' : calculateTime(cooldowns[1])}
                            </Button.Primary>
                        </div>
                    </div>
                    <div className={classes.tabsSection}>
                        <div className={classes.tabsBtns}>
                            <Button.Primary onClick={() => setSelectedTab("progress")} className={selectedTab === "progress" ? `${classes.tabBtn} ${classes.active}` : classes.tabBtn}>
                                Home
                            </Button.Primary>
                        </div>
                    </div>
                    <div className={classes.progressSection}>
                        <Typography className={classes.levelText}>
                            {progression.currClass}
                        </Typography>
                        <LinearProgress
                            classes={{
                                root: classes.methProgressionParent,
                                bar: classes.methProgression
                            }}
                            variant="determinate"
                            value={progress}
                        />
                        <Typography className={classes.levelText}>
                            {progression.nextClass}
                        </Typography>
                    </div>
                    <div>
                        {feeList && feeList.map((fee: { id: number, name: string, price: number, due_at: number }) => (
                            <MethAppOption
                                key={fee.name}
                                option={fee}
                                fee={true}
                                reloadFunc={() => getNextLevelProgression()}
                            />
                        ))}
                        {purchaseOptions && purchaseOptions.map((option: { id: number, name: string, price: number, due_at: number }) => (
                            <MethAppOption
                                key={option.name}
                                option={option}
                                fee={false}
                                reloadFunc={() => getNextLevelProgression()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Draggable>
    );
}

export default MethApp;