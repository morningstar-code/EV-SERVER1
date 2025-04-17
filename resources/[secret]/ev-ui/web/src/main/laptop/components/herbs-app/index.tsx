import React from 'react';
import Draggable from 'react-draggable';
import useStyles from './index.styles';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import Button from 'components/button/button';
import HerbsItem from './herbs-item';
import { nuiAction } from 'lib/nui-comms';

export default () => {
    const [selectedTab, setSelectedTab] = React.useState<string>('home');
    const [strains, setStrains] = React.useState<{ strains: HerbStrain[], threshholds?: { [key: string]: string } }>({ strains: [] });

    const getWeedStrains = async () => {
        const results = await nuiAction<ReturnData<{ strains: HerbStrain[] }>>("ev-weed:getWeedStrains", {}, { returnData: {
            strains: []
        } });

        if (results.meta.ok) {
            setStrains(results.data);
        }
    }

    const calculateProgress = (strain: HerbStrain): HerbProgress => {
        const threshholds = strains?.threshholds;

        if (!threshholds) {
            return {
                current: 'Unknown',
                next: 'Stranger',
                amount: 0,
            };
        }

        const thresholdKeys = Object.keys(threshholds);

        let current = 'Unknown';
        let currentThreshold = 0;

        thresholdKeys.forEach((key) => {
            const threshold = Number(key);

            if (threshold <= strain.rep && currentThreshold < threshold) {
                currentThreshold = threshold;
                current = threshholds[key];
            }
        });

        const amount = ((strain.rep - currentThreshold) / (Number(thresholdKeys[thresholdKeys.indexOf(currentThreshold.toString()) + 1]) - currentThreshold)) * 100;

        return {
            current: current,
            next: threshholds[thresholdKeys[thresholdKeys.indexOf(currentThreshold.toString()) + 1]],
            amount: amount
        };
    }

    React.useEffect(() => {
        getWeedStrains();
    }, []);

    const isTabActive = (tab: string) => {
        return selectedTab === tab ? 'herbsActiveBtn' : 'herbsTabBtn';
    }

    const classes = useStyles();

    return (
        <Draggable handle="#app-header">
            <div className={classes.herbsApp}>
                <AppHeader appName="The Herb Garden" color="#232426" onClose={() => updateLaptopState({ showHerbsApp: false })} style={{ color: '#ffffff' }} />
                <div className={classes.herbsContainer}>
                    <div className={classes.herbsHeading}>
                        <div className={classes.herbsTabSection}>
                            <Button.Primary className={classes[isTabActive('home')]} onClick={() => setSelectedTab('home')}>
                                My Strains
                            </Button.Primary>
                        </div>
                    </div>
                    <section className={classes.herbStrainsList}>
                        {strains && strains?.strains && strains?.strains?.sort((a, b) => {
                            return b.rep - a.rep;
                        }).map((strain) => (
                            <HerbsItem
                                name={strain.name ?? strain.genName}
                                progress={calculateProgress(strain)}
                                n={strain.n}
                                p={strain.p}
                                k={strain.k}
                            />
                        ))}
                    </section>
                </div>
            </div>
        </Draggable>
    )
}