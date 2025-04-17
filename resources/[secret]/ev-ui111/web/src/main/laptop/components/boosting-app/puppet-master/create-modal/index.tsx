import React from 'react';
import store from 'main/laptop/store';
import { useSelector } from 'react-redux';
import useStyles from './index.styles';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Button from 'components/button/button';
import Input from 'components/input/input';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from 'main/laptop/components/laptop-screen';

interface CreateContractModalProps {
    show: boolean;
    handleClose: () => void;
}

export default (props: CreateContractModalProps) => {
    const state: LaptopState = useSelector((state) => state[store.key]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [pickupLocations, setPickupLocations] = React.useState([]);
    const [dropOffLocations, setDropOffLocations] = React.useState([]);
    const [vehicleClasses, setVehicleClasses] = React.useState([]);
    const [pickupLocation, setPickupLocation] = React.useState<any>({});
    const [dropOffLocation, setDropOffLocation] = React.useState<any>({});
    const [vehicleClass, setVehicleClass] = React.useState('D');
    const [vehicleModel, setVehicleModel] = React.useState('');

    const boostingAppIcon = state.boostingAppIcon;

    const handleCreateContract = async () => {
        if (vehicleModel !== '') {
            setLoading(true);

            const results = await nuiAction('ev-boosting:ui:createContract', {
                info: {
                    selectedSpawn: pickupLocation,
                    selectedDropOff: dropOffLocation,
                    selectedClass: vehicleClass,
                    vehicleModel: vehicleModel
                }
            }, []);

            AddSystemNotification({
                show: true,
                icon: boostingAppIcon,
                title: 'Boostin',
                message: results?.meta?.message ?? 'Contract created successfully!',
            });

            if (results || results?.meta?.ok) {
                props.handleClose();
            }

            setLoading(false);
            setError(null);
        } else {
            setError('Please select valid vehicle model');
        }
    }

    const getContractCreatorInfo = React.useCallback(async () => {
        const results = await nuiAction('ev-boosting:ui:getContractCreatorInfo', {}, { returnData: {
            spawns: [
                { id: 1, name: 'Test Pickup Location' }
            ],
            dropoffs: [
                { id: 1, name: 'Test Drop Off Location' }
            ],
            classes: [
                { id: 'D', name: 'D' },
                { id: 'C', name: 'C' },
                { id: 'B', name: 'B' },
                { id: 'A', name: 'A' },
                { id: 'A+', name: 'A+' },
                { id: 'S', name: 'S' },
                { id: 'S+', name: 'S+' },
                { id: 'X', name: 'X' },
                { id: 'X+', name: 'X+' }
            ]
        } });

        if (results || results?.meta?.ok) {
            setPickupLocation(results?.data?.spawns[0].id);
            setPickupLocations(results?.data?.spawns);
            setDropOffLocation(results?.data?.dropoffs[0].id);
            setDropOffLocations(results?.data?.dropoffs);
            setVehicleClass(results?.data?.classes[0].name);
            setVehicleClasses(results?.data?.classes);
        }
    }, []);

    React.useEffect(() => {
        getContractCreatorInfo();
    }, [getContractCreatorInfo])

    const classes = useStyles();

    return (
        <Dialog
            open={props.show}
            onClose={() => props.handleClose()}
        >
            {loading && (
                <DialogContent style={{ backgroundColor: '#1c2028' }}>
                    <CircularProgress size={60} />
                </DialogContent>
            )}
            {!loading && (
                <>
                    <DialogTitle style={{ backgroundColor: '#1c2028' }}>
                        Contract Creator
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: '#1c2028' }}>
                        <Typography style={{ color: 'white' }}>
                            Create a contract and send out to a specific player.
                        </Typography>
                        <section className={classes.row}>
                            <div className={classes.formSection}>
                                <Input.Text
                                    onChange={(e) => setVehicleModel(e)}
                                    value={vehicleModel}
                                    label="Vehicle Model"
                                    icon="car"
                                />
                            </div>
                        </section>
                        <section className={classes.row}>
                            <div className={classes.formSection}>
                                <Input.Select
                                    onChange={(e) => setPickupLocation(e)}
                                    value={pickupLocation}
                                    label="Pickup Location"
                                    items={pickupLocations}
                                />
                            </div>
                        </section>
                        <section className={classes.row}>
                            <div className={classes.formSection}>
                                <Input.Select
                                    onChange={(e) => setDropOffLocation(e)}
                                    value={dropOffLocation}
                                    label="Dropoff Location"
                                    items={dropOffLocations}
                                />
                            </div>
                        </section>
                        <section className={classes.row}>
                            <div className={classes.formSection}>
                                <Input.Select
                                    onChange={(e) => setVehicleClass(e)}
                                    value={vehicleClass}
                                    label="Contract Class"
                                    items={vehicleClasses}
                                />
                            </div>
                        </section>
                        {error && (
                            <Typography variant="inherit" style={{ color: 'white' }}>
                                {error}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: '#1c2028' }}>
                        <Button.Primary className={classes.btn} onClick={() => props.handleClose()}>
                            Cancel
                        </Button.Primary>
                        <Button.Primary className={classes.btn} onClick={() => handleCreateContract()}>
                            Create Contract
                        </Button.Primary>
                    </DialogActions>
                </>
            )}
        </Dialog>
    )
}