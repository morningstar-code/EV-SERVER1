import { Chip, Menu, MenuItem, Typography } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';
import { getDispatchStateKey } from 'main/dispatch/actions';
import moment from 'moment';
import React from 'react';
import useStyles from "../../index.styles";

interface PingProps {
    ping: Ping;
}

const Ping: React.FC<PingProps> = (props) => {
    const classes = useStyles(props);

    const ping: Ping = props.ping;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const dispatchAction = (e: any, action: string) => {
        e.stopPropagation();
        e.preventDefault();

        nuiAction('ev-ui:dispatchAction', {
            action: action,
            ctxId: ping.ctxId,
            ping: ping
        });

        setAnchorEl(null);
    }

    return (
        <div style={{ backgroundColor: ping.priority !== 3 ? '#003464d2' : '#841515c2', borderRight: ping.priority !== 3 ? '5px solid #187fe7' : '5px solid #b81207' }} className={classes.ping} onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted={true}
                open={Boolean(anchorEl)}
                onClose={(e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setAnchorEl(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                {ping.origin && (
                    <MenuItem onClick={(e) => dispatchAction(e, 'setGPSLocation')}>
                        Set GPS Location
                    </MenuItem>
                )}
                {!getDispatchStateKey('callIds').includes(ping.ctxId) && (
                    <MenuItem onClick={(e) => dispatchAction(e, 'createCall')}>
                        Create Call
                    </MenuItem>
                )}
                <MenuItem onClick={(e) => dispatchAction(e, 'dismissPing')}>
                    Dismiss Ping (From Map/List)
                </MenuItem>
            </Menu>
            <div className={classes.topBar}>
                <div className={classes.chips}>
                    <Chip
                        size="small"
                        label={ping.ctxId}
                        color="success"
                    />
                    <Chip
                        size="small"
                        label={ping.dispatchCode}
                        color="warning"
                        style={{ marginLeft: 8 }}
                    />
                    {ping.title && (
                        <Typography style={{ color: 'white', marginLeft: 8 }}>
                            {ping.title}
                        </Typography>
                    )}
                    {ping.dispatchMessage && (
                        <Typography style={{ color: 'white', marginLeft: 8 }}>
                            {ping.dispatchMessage}
                        </Typography>
                    )}
                </div>
                {ping.origin && (
                    <div onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        dispatchAction(e, 'setGPSLocation');
                    }} className={classes.marker}>
                        <i style={{ color: 'white' }} className="fas fa-map-marker-alt fa-2x"></i>
                    </div>
                )}
            </div>
            {ping.text && (
                <div className={classes.info}>
                    <Typography style={{ color: 'white' }}>
                        {ping.text}
                    </Typography>
                </div>
            )}
            {ping.callSign && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-id-badge fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.callSign} is down
                    </Typography>
                </div>
            )}
            {!!ping.firstStreet && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-globe-europe fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.firstStreet}
                    </Typography>
                </div>
            )}
            {ping.heading && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-compass fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.heading}
                    </Typography>
                </div>
            )}
            {ping.model && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-car-side fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.model}
                    </Typography>
                    <i style={{ color: 'white' }} className="fas fa-closed-captioning fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.plate}
                    </Typography>
                </div>
            )}
            {ping.model && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-palette fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.firstColor} on {ping.secondColor}
                    </Typography>
                </div>
            )}
            {ping.extraData && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-sticky-note fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.extraData}
                    </Typography>
                </div>
            )}
            {ping.flagged_by && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-user-edit fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.flagged_by.callsign} - {ping.flagged_by.name}
                    </Typography>
                </div>
            )}
            {ping.flagged_reason && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-sticky-note fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.flagged_reason}
                    </Typography>
                    <i style={{ color: 'white' }} className="fas fa-user-clock fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {ping.flagged_at}
                    </Typography>
                </div>
            )}
            {ping.timestamp && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-clock fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {moment(ping.timestamp * 1000).fromNow()}
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default Ping;