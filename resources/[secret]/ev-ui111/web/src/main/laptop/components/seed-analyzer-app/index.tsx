import React from 'react';
import Draggable from 'react-draggable';
import useStyles from './index.styles';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import { Typography } from '@mui/material';
import ConfirmPopup from './confirm-popup';
import { nuiAction } from 'lib/nui-comms';

export default () => {
    const [seeds, setSeeds] = React.useState<AnalyzerSeed[]>([]);
    const [selectedTab, setSelectedTab] = React.useState<string>('');
    const [request, setRequest] = React.useState<AnalyzerSeed>(null);
    const [tabs, setTabs] = React.useState<string[]>([]);

    const getSeedsForLaptop = async () => {
        const results = await nuiAction('ev-farming:getSeedsForLaptop', {}, { returnData: [] });
        const tabsGenned = [];

        if (results) {
            setSeeds(results.data);

            if (results.data.length > 0) {
                for (const seed of results.data) {
                    if (!tabsGenned.includes(seed.cropName)) {
                        tabsGenned.push(seed.cropName);
                    }
                }
            } else {
                tabsGenned.push('No seeds found');
            }

            setTabs(tabsGenned);
            setSelectedTab(tabsGenned[0]);
        }
    }

    const isTabActive = (tab: string) => {
        return selectedTab === tab ? `${classes.seedTabText} ${classes.active} ` : classes.seedTabText;
    }

    React.useEffect(() => {
        getSeedsForLaptop();
    }, []);

    const requestClone = () => {

    }

    const classes = useStyles();

    return (
        <Draggable handle="#app-header">
            <div className={classes.seedApp}>
                <AppHeader appName="ANALyzer" color="#2C2C2C" textColor="#D9D9D9" onClose={() => updateLaptopState({ showSeedAnalyzerApp: false })} style={{ color: '#D9D9D9' }} />
                <div className={classes.seedAppContainer}>
                    <section className={classes.seedTabs}>
                        {tabs && tabs.map((tab, idx) => (
                            <div key={idx} className={classes.seedTab} onClick={() => setSelectedTab(tab)}>
                                <Typography className={isTabActive(tab)}>
                                    {tab}
                                </Typography>
                            </div>
                        ))}
                    </section>
                    <section className={classes.seedList}>
                        {seeds && seeds.filter((seed) => seed.cropName === selectedTab).map((seed) => (
                            <div key={seed.genome} className={classes.strain}>
                                <div className={classes.strainNameWrapper}>
                                    <div className={classes.strainName}>
                                        {seed.name}
                                    </div>
                                    <i onClick={() => setRequest(seed)} className={`fas fa-copy fa-fw fa-1x ${classes.cloneDNA}`} style={{ color: 'white' }}></i>
                                    <i onClick={() => {
                                        return (function (seedInfo) {
                                            const el = document.createElement('textarea');
                                            el.innerText = `${seedInfo.name}\t${seedInfo.genome.split('').join('\t')}`;
                                            document.body.appendChild(el);
                                            el.select();
                                            document.execCommand('copy');
                                            el.remove();
                                        })(seed)
                                    }} className={`fas fa-clipboard fa-fw fa-1x ${classes.clipboard}`} style={{ color: 'white' }}></i>
                                </div>
                                <div className={classes.genome}>
                                    {seed.genome && seed.genome.split('').map((letter: string) => (
                                        <div className={`${classes.letter} ${classes[`letter_${letter}`]}`}>
                                            {letter}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
                {request && (
                    <ConfirmPopup
                        message="Request a clone for $2,000? (24h processing time)"
                        onAccept={() => requestClone()}
                        onCancel={() => setRequest(null)}
                        loading={false}
                    />
                )}
            </div>
        </Draggable>
    )
}