import { Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';

const Progression: FunctionComponent = () => {
    const classes = useStyles();
    const [currentGraffitis, setCurrentGraffitis] = React.useState<number>(0);
    const [progression, setProgression] = React.useState<StreetGangProgression[]>([
        {
            name: 'Graffiti 1',
            unlocked: false,
            graffitisRequired: 5,
            graffitiNeeded: 5
        }
    ]);

    const fetchGangProgression = React.useCallback(async () => {
        const results = await nuiAction("ev-gangsystem:ui:fetchGangProgression", {}, { returnData: {
            currentGraffitis: 5,
            progression: [
                {
                    name: 'Tier 1',
                    unlocked: true,
                    graffitiNeeded: 69,
                },
            ]
        } });

        if (results.meta.ok) {
            setProgression(results?.data?.progression);
            setCurrentGraffitis(results?.data?.currentGraffitis);
        }
    }, []);

    React.useEffect(() => {
        fetchGangProgression();
    }, [fetchGangProgression]);

    return (
        <div className={classes.progressionPage}>
            <Typography variant="body2" className={classes.headerText}>Current Progression</Typography>
            <Typography variant="body2" className={classes.subHeaderText}>Current Graffitis: {currentGraffitis}</Typography>
            <div className={classes.progressionList}>
                {progression && progression.map((item) => (
                    <div className={classes.progressionItem} style={{ boxShadow: item.unlocked ? '0px 0px 3px 1px rgba(0, 249, 185, 0.15)' : '0px 0px 3px 1px #00000040' }}>
                        {item.unlocked ? (
                            <Typography variant="body2" className={classes.progressionItemName}>{item.name}</Typography>
                        ) : (
                            <Typography variant="body2" className={classes.progressionHidden}>?</Typography>
                        )}
                        <Typography variant="body2" className={classes.progressionRequired}>Graffitis Needed: {item.graffitiNeeded}</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Progression;