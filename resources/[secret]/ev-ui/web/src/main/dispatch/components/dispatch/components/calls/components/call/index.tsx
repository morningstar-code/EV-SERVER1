import { Chip, Menu, MenuItem, Typography } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';
import { getDispatchStateKey } from 'main/dispatch/actions';
import moment from 'moment';
import React from 'react';
import useStyles from "../../index.styles";

interface CallProps {
    ping: Ping;
    opaque?: boolean;
}

const Call: React.FC<CallProps> = (props) => {
    const classes = useStyles(props);

    const call: Ping = props.ping;
    const firstStreet = call.firstStreet ? `${call.firstStreet}${call.secondStreet ? ` / ${call.secondStreet}` : ''}` : ''
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [pingHovered, setPingHovered] = React.useState(false);

    const dispatchAction = (e: any, action: string, unit = null) => {
        e.stopPropagation();
        e.preventDefault();

        nuiAction('ev-ui:dispatchAction', {
            action: action,
            ctxId: call.ctxId,
            unit: unit,
            ping: call
        });

        setAnchorEl(null);
    }

    const units = [call.unitsPolice, call.unitsEMS];
    const playerUnit = getDispatchStateKey('playerUnit');

    return (
        <div style={{ opacity: props.opaque && !pingHovered ? 0.35 : 1 }} className={classes.ping} onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)} onMouseEnter={() => setPingHovered(true)} onMouseLeave={() => setPingHovered(false)}>
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
                PaperProps={{
                    style: { maxHeight: '90vh' }
                }}
            >
                {call.origin && (
                    <MenuItem onClick={(e) => dispatchAction(e, 'setGPSLocation')}>
                        Set GPS Location
                    </MenuItem>
                )}
                <MenuItem onClick={(e) => dispatchAction(e, 'toggleUnit', getDispatchStateKey('playerUnit'))}>
                    Toggle self
                </MenuItem>
                {!!(playerUnit) && units && units.length > 0 && units.filter((u: any) => {
                    return u.serverId == playerUnit.serverId || u.attachedTo == playerUnit.attachedTo;
                }).length > 0 && (
                        <MenuItem onClick={(e) => dispatchAction(e, 'toggleUnitActive', getDispatchStateKey('playerUnit'))}>
                            Toggle self active
                        </MenuItem>
                    )}
                {getDispatchStateKey('units') && getDispatchStateKey('units')?.length > 0 && getDispatchStateKey('units')?.filter(u => !!u && !u.attachedTo).map(u => (
                    <MenuItem key={u.serverId} onClick={(e) => dispatchAction(e, 'toggleUnit', u)}>
                        {u.callSign} - {u.name}
                    </MenuItem>
                ))}
                <MenuItem onClick={(e) => dispatchAction(e, 'dismissCall')}>
                    Dismiss Call (From Map)
                </MenuItem>
            </Menu>
            <div className={classes.topBar}>
                <div className={classes.chips}>
                    <Chip
                        size="small"
                        label={call.ctxId}
                        color="success"
                    />
                    <Chip
                        size="small"
                        label={call.dispatchCode}
                        color="warning"
                        style={{ marginLeft: 8 }}
                    />
                    {call.title && (
                        <Typography style={{ color: 'white', marginLeft: 8 }}>
                            {call.title}
                        </Typography>
                    )}
                    {call.dispatchMessage && (
                        <Typography style={{ color: 'white', marginLeft: 8 }}>
                            {call.dispatchMessage}
                        </Typography>
                    )}
                </div>
                {call.origin && (
                    <div onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        dispatchAction(e, 'setGPSLocation');
                    }} className={classes.marker}>
                        <i style={{ color: 'white' }} className="fas fa-map-marker-alt fa-2x"></i>
                    </div>
                )}
            </div>
            {call.text && (
                <div className={classes.info}>
                    <Typography style={{ color: 'white' }}>
                        {call.text}
                    </Typography>
                </div>
            )}
            {call.callSign && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-id-badge fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.callSign} is down
                    </Typography>
                </div>
            )}
            {!!call.firstStreet && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-globe-europe fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.firstStreet}
                    </Typography>
                </div>
            )}
            {call.heading && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-compass fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.heading}
                    </Typography>
                </div>
            )}
            {call.model && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-car-side fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.model}
                    </Typography>
                    <i style={{ color: 'white' }} className="fas fa-closed-captioning fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.plate}
                    </Typography>
                </div>
            )}
            {call.model && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-palette fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.firstColor} on {call.secondColor}
                    </Typography>
                </div>
            )}
            {call.extraData && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-sticky-note fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.extraData}
                    </Typography>
                </div>
            )}
            {call.flagged_by && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-user-edit fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.flagged_by.callsign} - {call.flagged_by.name}
                    </Typography>
                </div>
            )}
            {call.flagged_reason && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-sticky-note fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.flagged_reason}
                    </Typography>
                    <i style={{ color: 'white' }} className="fas fa-user-clock fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {call.flagged_at}
                    </Typography>
                </div>
            )}
            {call.timestamp && (
                <div className={classes.info}>
                    <i style={{ color: 'white' }} className="fas fa-clock fa-sm"></i>
                    &nbsp;
                    <Typography style={{ color: 'white' }}>
                        {moment(call.timestamp * 1000).fromNow()}
                    </Typography>
                </div>
            )}
            <hr />
            <div>
                <Typography variant="body2" style={{ color: 'white' }}>
                    Police: ({call.unitsPoliceCount})
                </Typography>
                {call.unitsPolice.map((unit: any) => (
                    <Chip
                        key={unit.serverId}
                        label={unit.callSign}
                        color="primary"
                        size="small"
                        style={{ marginRight: 8, marginTop: 8 }}
                    />
                ))}
            </div>
            <div style={{ marginTop: 8 }}>
                <Typography variant="body2" style={{ color: 'white' }}>
                    EMS: ({call.unitsEMSCount})
                </Typography>
                {call.unitsEMS.map((unit: any) => (
                    <Chip
                        key={unit.serverId}
                        label={unit.callSign}
                        color="primary"
                        size="small"
                        style={{ marginRight: 8, marginTop: 8 }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Call;