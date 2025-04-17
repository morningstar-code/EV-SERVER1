import { FunctionComponent } from 'react';
import { Typography } from '@mui/material';
import Button from '../../../../../../components/button/button';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';

interface GroupInfoProps {
    gangInfo: StreetGangInfo;
}

const GroupInfo: FunctionComponent<GroupInfoProps> = (props) => {
    const classes = useStyles();
    const gangInfo = props.gangInfo;

    const toggleGangBlips = () => nuiAction("ev-gangsystem:ui:toggleGangBlips", {}, {});

    const toggleContestedGraffitis = () => nuiAction("ev-gangsystem:ui:toggleContestedGraffitis", {}, {});

    return (
        <div className={classes.infoPage}>
            <Typography variant="body2" className={classes.headerText}>Group Information</Typography>
            <Typography variant="body2" className={classes.subHeaderText}>Current Group: {gangInfo?.gangName ?? 'None'}</Typography>
            {gangInfo && (
                <>
                    <div className={classes.infoList}>
                        <div className={classes.infoItem}>
                            <Typography variant="body2" className={classes.headerText}>Max Members</Typography>
                            <Typography variant="body2" className={classes.subHeaderText}>{gangInfo.maxMembers ?? 0} Members</Typography>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="body2" className={classes.headerText}>Sales Today</Typography>
                            <Typography variant="body2" className={classes.subHeaderText}>{gangInfo.salesToday ?? 0}</Typography>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="body2" className={classes.headerText}>Money Collected</Typography>
                            <Typography variant="body2" className={classes.subHeaderText}>${gangInfo.moneyCollected ?? 0}</Typography>
                        </div>
                    </div>
                    <div className={classes.infoList}>
                        <div className={classes.infoItem}>
                            <Typography variant="body2" className={classes.headerText}>Toggle Discovered Graffiti</Typography>
                            <Button.Primary className={classes.button} onClick={toggleGangBlips}>
                                Toggle
                            </Button.Primary>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="body2" className={classes.headerText}>Toggle Contested Graffitis</Typography>
                            <Button.Primary className={classes.button} onClick={toggleContestedGraffitis}>
                                Toggle
                            </Button.Primary>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default GroupInfo;