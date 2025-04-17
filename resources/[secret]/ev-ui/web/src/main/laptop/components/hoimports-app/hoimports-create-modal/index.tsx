import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import Button from "components/button/button";
import Spinner from "components/spinner/spinner";
import Input from "components/input/input";
import { nuiAction } from "lib/nui-comms";
import { AddSystemNotification } from "../../laptop-screen";

interface HOImportCreateModalProps {
    close: () => void;
    show: boolean;
    updateListings: (listings: HNOListing[]) => void;
    hnoAvailableVehicles: HNOVehicle[];
}

const HOImportCreateModal: FunctionComponent<HOImportCreateModalProps> = (props) => {
    const [vehicleModel, setVehicleModel] = React.useState('');
    const [vehicleImage, setVehicleImage] = React.useState('');
    const [vehicleRentalPrice, setVehicleRentalPrice] = React.useState(0);
    const [vehicleRentalInsurance, setVehicleRentalInsurance] = React.useState(0);
    const [vehicleVin, setVehicleVin] = React.useState('');
    const [listingType, setListingType] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const createListing = async () => {
        if (vehicleModel !== '') {
            if (vehicleImage !== '') {
                if (vehicleVin !== '') {
                    if (!(vehicleRentalPrice <= 0)) {
                        if (listingType) {
                            if ((!(vehicleRentalInsurance <= 0 && listingType === 'Rental'))) {
                                setLoading(true);

                                const results = await nuiAction<ReturnData<HNOListing[]>>('ev-hoimports:ui:CreateListing', {
                                    payload: {
                                        vehicleModel: vehicleModel,
                                        vehicleRentalPrice: vehicleRentalPrice,
                                        vehicleInsurancePrice: vehicleRentalInsurance,
                                        listingType: listingType,
                                        vehicleImage: vehicleImage,
                                        vehicleVin: vehicleVin
                                    }
                                }, { returnData: [] });

                                AddSystemNotification({
                                    show: true,
                                    icon: 'https://i.imgur.com/Ok9VHSy.png',
                                    title: 'HO Imports',
                                    message: results?.meta?.message ?? 'Listing created successfully!',
                                });

                                if (results.meta.ok) {
                                    setVehicleModel('');
                                    setVehicleRentalPrice(0);
                                    setVehicleRentalInsurance(0);
                                    setListingType(null);
                                    setVehicleImage('');
                                    props.updateListings(results.data);
                                    props.close();
                                }

                                setLoading(false);
                            } else {
                                setError('Vehicle rental insurance price is required!');
                            }
                        } else {
                            setError('Vehicle listing type is required!');
                        }
                    } else {
                        setError('Vehicle rental price is required!');
                    }
                } else {
                    setError('Vehicle vin is required!');
                }
            } else {
                setError('Vehicle image is required!');
            }
        } else {
            setError('Vehicle model is required!');
        }
    }

    const classes = useStyles();

    return (
        <Dialog open={props.show} onClose={props.close}>
            <Snackbar
                open={error !== ''}
                autoHideDuration={6000}
                onClose={() => setError('')}>
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={() => setError('')}
                    severity="error"
                    children={error}
                />
            </Snackbar>
            <DialogTitle className={classes.modalTitle}>Vehicle Listing Creation</DialogTitle>
            <DialogContent className={classes.modalContainer}>
                {loading ? (
                    <div className={classes.loading}>
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <div className={classes.input}>
                            <Input.Text
                                label="Rental Title"
                                icon="car"
                                value={vehicleModel}
                                onChange={(e) => setVehicleModel(e)}
                            />
                        </div>
                        <div className={classes.input}>
                            <Input.Text
                                label="Vehicle Image (Direct Link)"
                                icon="image"
                                value={vehicleImage}
                                onChange={(e) => setVehicleImage(e)}
                            />
                        </div>
                        <div className={classes.input}>
                            <Input.Text
                                label="Rental Price"
                                icon="horse-head"
                                value={vehicleRentalPrice}
                                onChange={(e) => setVehicleRentalPrice(e)}
                            />
                        </div>
                        <div className={classes.input}>
                            <Input.Text
                                label="Rental Insurance"
                                icon="horse-head"
                                value={vehicleRentalInsurance}
                                onChange={(e) => setVehicleRentalInsurance(e)}
                            />
                        </div>
                        <div className={classes.input}>
                            <Input.Select
                                label="Listing Type"
                                items={[
                                    {
                                        id: 'Rental',
                                        name: 'Rental'
                                    }
                                ]}
                                onChange={(e) => setListingType(e)}
                                value={listingType}
                            />
                        </div>
                        <div className={classes.input}>
                            <Input.Select
                                label="Select Vehicle"
                                items={props.hnoAvailableVehicles.map((vehicle: HNOVehicle) => {
                                    return {
                                        id: vehicle.vin,
                                        name: `${vehicle.model} (${vehicle.vin})`
                                    }
                                })}
                                onChange={(e) => setVehicleVin(e)}
                                value={vehicleVin}
                            />
                        </div>
                    </>
                )}
            </DialogContent>
            <DialogActions className={classes.modalContainer}>
                <Button.Primary className={classes.listingBtn} onClick={createListing}>
                    Create
                </Button.Primary>
                <Button.Primary className={classes.listingRedBtn} onClick={props.close}>
                    Close
                </Button.Primary>
            </DialogActions>
        </Dialog>
    );
}

export default HOImportCreateModal;