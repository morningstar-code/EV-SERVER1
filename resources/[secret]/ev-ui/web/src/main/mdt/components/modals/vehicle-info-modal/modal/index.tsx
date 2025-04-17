import React from 'react';
import { Typography } from '@mui/material';
import Input from 'components/input/input';
import Button from 'components/button/button';
import { isJob } from 'lib/character';
import Content from 'main/mdt/components/content';
import Paper from 'main/mdt/components/paper';
import useStyles from '../../index.styles';

export default (props: any) => {
    const classes = useStyles();
    const vehicle = props.vehicle || {};
    const [plate, setPlate] = React.useState(vehicle.plate || '');
    const [engineSound, setEngineSound] = React.useState('');
    const [vehicleInfo, setVehicleInfo] = React.useState({
        id: 0,
        strike: 0,
        locked_until: 0,
        release_paid: 0,
        released: 0,
        release_date: 0
    });

    const hasPerm = false;

    const updateVehicleInfo = (field: string, value: any) => {
        setVehicleInfo({
            ...vehicleInfo,
            [field]: value
        });
    }

    return (
        <div className={classes.wrapperFlex} style={{ marginBottom: '5%' }}>
            <div style={{ height: '100%' }}>
                <Typography variant="body2" style={{ color: 'white' }}>
                    Actions
                </Typography>
                <div>
                    {isJob(['judge']) && (
                        <div className={classes.modalGroup}>
                            <div className={classes.modalItem}>
                                <Input.Text
                                    icon="closed-captioning"
                                    label="Plate"
                                    onChange={setPlate}
                                    value={plate}
                                />
                            </div>
                            <div className={classes.modalItem}>
                                <Button.Primary onClick={() => {
                                    props.saveVehicleData({
                                        vehicle: vehicle,
                                        type: 'plate',
                                        vin: vehicle.vin,
                                        value: plate.trim().toUpperCase().replace(/\s\s+/g, ' ')
                                    });
                                }}>
                                    Save
                                </Button.Primary>
                            </div>
                        </div>
                    )}
                    {isJob(['judge']) && props.impounds.findIndex((i: any) => {
                        return i.locked_until > Math.floor(Date.now() / 1000) && !i.released;
                    }) !== -1 ? (
                        <div className={classes.modalGroup}>
                            <div className={classes.modalItem}>
                                <Typography variant="body2" style={{ color: 'white' }}>
                                    Vehicle is currently held
                                </Typography>
                            </div>
                            <div className={classes.modalItem}>
                                <Button.Secondary onClick={() => {
                                    props.impounds.forEach((i: any) => {
                                        if (i.locked_until > Math.floor(Date.now() / 1000) && !i.released) {
                                            i.locked_until = Math.floor(Date.now() / 1000);
                                        }

                                        props.saveImpoundData(i);
                                        vehicleInfo.id === i.id && setVehicleInfo(i);
                                    });
                                }}>
                                    Release from hold
                                </Button.Secondary>
                            </div>
                        </div>
                    ) : null}
                    {hasPerm && (
                        <div className={classes.modalGroup}>
                            <div className={classes.modalItem}>
                                <Input.Text
                                    icon="music"
                                    label="Engine Sound Name"
                                    onChange={setEngineSound}
                                    value={engineSound}
                                />
                            </div>
                            <div className={classes.modalItem}>
                                <Button.Primary onClick={() => {
                                    props.saveVehicleData({
                                        vehicle: vehicle,
                                        type: 'engineSound',
                                        vin: vehicle.vin,
                                        value: engineSound
                                    });
                                }}>
                                    Save
                                </Button.Primary>
                            </div>
                        </div>
                    )}
                    {isJob(['judge']) && !!vehicleInfo.id && (
                        <div className={classes.modalGroup}>
                            <div className={classes.modalItem}>
                                <Typography variant="body2" style={{ color: 'white' }}>
                                    Adjust Impound Record {vehicleInfo.id}
                                </Typography>
                            </div>
                            <div className={classes.modalItem}>
                                <Input.Text
                                    icon="crosshair"
                                    label="Strikes"
                                    onChange={(value: any) => {
                                        updateVehicleInfo('strike', value);
                                    }}
                                    value={vehicleInfo.strike}
                                />
                            </div>
                            <div className={classes.modalItem}>
                            </div>
                            <div className={classes.modalItem}>
                                <Input.Checkbox
                                    label="Mark as paid"
                                    checked={vehicleInfo.release_paid === 1}
                                    onChange={(value: any) => updateVehicleInfo('release_paid', value)}
                                />
                            </div>
                            <div className={classes.modalItem}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button.Primary onClick={() => props.saveImpoundData(vehicleInfo)}>
                                        Save
                                    </Button.Primary>
                                    <Button.Secondary onClick={() => {
                                        setVehicleInfo({
                                            ...vehicleInfo,
                                            strike: 0,
                                            locked_until: Math.floor(Date.now() / 1000)
                                        });
                                        props.saveImpoundData({
                                            ...vehicleInfo,
                                            strike: 0,
                                            locked_until: Math.floor(Date.now() / 1000)
                                        });
                                    }}>
                                        Revoke strikes and release
                                    </Button.Secondary>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={classes.row}>
                <Content
                    title="Impound History"
                    style={{ width: '50%', height: '100%', minHeight: '100%' }}
                >
                    {props.impounds && props.impounds.map((i: any) => {
                        const title = i.report_id && i.report_id > 0 ? ` - Report ID ${i.report_id}` : '';

                        return (
                            <Paper
                                key={i.id}
                                id={i.id}
                                timestamp={i.impound_date / 1000}
                                timestampExtra={`${i.first_name} ${i.last_name}${title} --`}
                                onClick={() => setVehicleInfo(i)}
                                title={`${i.reason}${i.locked_until - i.impound_date > 0 ? props.mapHoldLength(i) : ''}`}
                                titleExtra={`${i.released ? 'Released - ' : i.release_paid ? 'Paid - ' : ''}${i.strike} Strikes`}
                            />
                        )
                    })}
                </Content>
                <Content
                    title="Ownership History"
                    style={{ width: '49%', height: '100%', minHeight: '100%' }}
                >
                    {props.vehicleHistory && props.vehicleHistory.map((v, i) => {
                        return (
                            <Paper
                                key={i}
                                id={i + 1}
                                title={`From: ${v.seller_name}`}
                                titleExtra={`To: ${v.owner_name}`}
                                description={`Sell Price: $${v.sell_price} - Transfered On: ${v.transferred_at}`}
                            />
                        )
                    })}
                </Content>
            </div>
        </div>
    )
}