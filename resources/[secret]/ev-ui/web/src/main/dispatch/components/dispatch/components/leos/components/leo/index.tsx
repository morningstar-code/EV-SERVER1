import { Chip, Menu, MenuItem } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';
import { getDispatchStateKey } from 'main/dispatch/actions';
import React from 'react';
import useStyles from "../../../../index.styles";

const Leo: React.FC<any> = (props) => {
    const classes = useStyles(props);

    const [primAnchorEl, setPrimAnchorEl] = React.useState<null | HTMLElement>(null);
    const [secAnchorEl, setSecAnchorEl] = React.useState<null | HTMLElement>(null);

    const dispatchAction = (e: any, action: string, data = {}) => {
        e.stopPropagation();
        e.preventDefault();

        nuiAction('ev-ui:dispatchAction', {
            action: action,
            data: data
        });

        setPrimAnchorEl(null);
    }

    const getVehicleStatusColor = (status: string) => {
        return status === '10-7'
            ? '#e43f5a'
            : status === '10-6'
                ? '#f08329'
                : '#679b4f'
    }

    const getStatusColor = (status: string) => {
        return status === '10-7'
            ? {
                backgroundColor: '#e43f5a',
                color: 'white'
            }
            : status === '10-6'
                ? {
                    backgroundColor: '#f08329',
                    color: 'white'
                }
                : {
                    backgroundColor: '#679b4f',
                    color: 'white'
                }
    }

    return (
        <div className={classes.unit}>
            <div className={classes.unitIcon}>
                {props.vehicle === 'car' && (
                    <i className="fas fa-car-side fa-lg" style={{ color: getVehicleStatusColor(props.status) }}></i>
                )}
                {props.vehicle === 'bike' && (
                    <i className="fas fa-motorcycle fa-lg" style={{ color: getVehicleStatusColor(props.status) }}></i>
                )}
                {props.vehicle === 'heli' && (
                    <i className="fas fa-helicopter fa-lg" style={{ color: getVehicleStatusColor(props.status) }}></i>
                )}
                {props.vehicle === 'bicycle' && (
                    <i className="fas fa-bicycle fa-lg" style={{ color: getVehicleStatusColor(props.status) }}></i>
                )}
                {props.vehicle === 'interceptor' && (
                    <i className="fas fa-horse-head fa-lg" style={{ color: getVehicleStatusColor(props.status) }}></i>
                )}
            </div>
            <div>
                <div className={classes.chipHolder} onClick={(e: React.MouseEvent<HTMLElement>) => setPrimAnchorEl(e.currentTarget)}>
                    <Chip
                        label={`${props.callSign} - ${props.name}`}
                        color="primary"
                        size="small"
                        style={{ ...getStatusColor(props.status) }}
                    />
                    <Menu
                        id={`primary-unit-menu-${props.serverId}`}
                        anchorEl={primAnchorEl}
                        keepMounted={true}
                        open={Boolean(primAnchorEl)}
                        onClose={(e: any) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setPrimAnchorEl(null);
                            setSecAnchorEl(null);
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                    >
                        {props.status !== '10-6' && (
                            <MenuItem onClick={(e) => dispatchAction(e, 'setUnitStatus', {
                                unit: props.serverId,
                                status: '10-6'
                            })}>
                                Set 10-6
                            </MenuItem>
                        )}
                        {props.status !== '10-7' && (
                            <MenuItem onClick={(e) => dispatchAction(e, 'setUnitStatus', {
                                unit: props.serverId,
                                status: '10-7'
                            })}>
                                Set 10-7
                            </MenuItem>
                        )}
                        {props.status !== '10-8' && (
                            <MenuItem onClick={(e) => dispatchAction(e, 'setUnitStatus', {
                                unit: props.serverId,
                                status: '10-8'
                            })}>
                                Set 10-8
                            </MenuItem>
                        )}
                        {props.vehicle !== 'car' && (
                            <MenuItem onClick={(e) => dispatchAction(e, 'setUnitVehicle', {
                                unit: props.serverId,
                                vehicle: 'car'
                            })}>
                                Vehicle: Car
                            </MenuItem>
                        )}
                        {props.vehicle !== 'heli' && (
                            <MenuItem onClick={(e) => dispatchAction(e, 'setUnitVehicle', {
                                unit: props.serverId,
                                vehicle: 'heli'
                            })}>
                                Vehicle: Helicopter
                            </MenuItem>
                        )}
                        {props.job === 'police' && props.vehicle !== 'bike' && (
                            <MenuItem onClick={(e) => dispatchAction(e, 'setUnitVehicle', {
                                unit: props.serverId,
                                vehicle: 'bike'
                            })}>
                                Vehicle: Motorbike
                            </MenuItem>
                        )}
                        {props.job === 'police' && props.vehicle !== 'bicycle' && (
                            <MenuItem onClick={(e) => dispatchAction(e, 'setUnitVehicle', {
                                unit: props.serverId,
                                vehicle: 'bicycle'
                            })}>
                                Vehicle: Bicycle
                            </MenuItem>
                        )}
                        {props.job === 'police' && props.vehicle !== 'interceptor' && (
                            <MenuItem onClick={(e) => dispatchAction(e, 'setUnitVehicle', {
                                unit: props.serverId,
                                vehicle: 'interceptor'
                            })}>
                                Vehicle: Interceptor
                            </MenuItem>
                        )}
                        {getDispatchStateKey('units') && getDispatchStateKey('units')?.length > 0 && getDispatchStateKey('units')?.filter(unit => !!unit && !unit.attachedTo && unit.serverId !== props.serverId && unit.job === props.job)?.map((u: any) => (
                            <MenuItem key={u.serverId} onClick={(e) => dispatchAction(e, 'setUnitRidingWith', {
                                unit: { serverId: props.serverId },
                                parent: u
                            })}>
                                Operating Under: {u.callSign}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                {props.attached && props.attached.map((a: any) => (
                    <div onClick={(e: React.MouseEvent<HTMLElement>) => setSecAnchorEl(e.currentTarget)} className={classes.chipHolder}>
                        <Chip
                            label={`${a.callSign} - ${a.name}`}
                            color="primary"
                            size="small"
                            style={{ ...getStatusColor(a.status) }}
                        />
                        <Menu
                            id="simple-menu"
                            anchorEl={secAnchorEl}
                            keepMounted={true}
                            open={Boolean(secAnchorEl)}
                            onClose={(e: any) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setPrimAnchorEl(null);
                                setSecAnchorEl(null);
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                        >
                            <MenuItem key={a.serverId} onClick={(e) => dispatchAction(e, 'setUnitRidingWith', {
                                unit: a,
                                parent: null
                            })}>
                                Remove From Unit
                            </MenuItem>
                        </Menu>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Leo;