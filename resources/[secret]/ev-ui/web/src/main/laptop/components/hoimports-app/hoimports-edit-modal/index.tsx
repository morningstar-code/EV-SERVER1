import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import Button from "components/button/button";
import Spinner from "components/spinner/spinner";
import Input from "components/input/input";
import { nuiAction } from "lib/nui-comms";
import { AddSystemNotification } from "../../laptop-screen";

interface HOImportEditModalProps {
    show: boolean;
    close: () => void;
    updateListings: (listings: HNOListing[]) => void;
    listingDefaultInfo: HNOListing;
}

const HOImportEditModal: FunctionComponent<HOImportEditModalProps> = (props) => {
    const classes = useStyles();

    const [vehicleModel, setVehicleModel] = React.useState('');
    const [vehicleImage, setVehicleImage] = React.useState('');
    const [vehicleRentalPrice, setVehicleRentalPrice] = React.useState(0);
    const [vehicleRentalInsurance, setVehicleRentalInsurance] = React.useState(0);
    const [listingType, setListingType] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const editListing = async (listingId: number) => {
        if (vehicleModel !== '') {
            if (vehicleImage !== '') {
                if (!(vehicleRentalPrice <= 0)) {
                    if (listingType) {
                        if ((!(vehicleRentalInsurance <= 0 && listingType === 'Rental'))) {
                            setLoading(true);

                            const results = await nuiAction<ReturnData<HNOListing[]>>('ev-hoimports:ui:UpdateListing', {
                                payload: {
                                    vehicleModel: vehicleModel,
                                    vehicleRentalPrice: vehicleRentalPrice,
                                    vehicleInsurancePrice: vehicleRentalInsurance,
                                    listingType: listingType,
                                    vehicleImage: vehicleImage
                                },
                                listingId: listingId
                            }, { returnData: [] });

                            AddSystemNotification({
                                show: true,
                                icon: 'https://i.imgur.com/Ok9VHSy.png',
                                title: 'HO Imports',
                                message: results?.meta?.message ?? 'Listing updated successfully!',
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
                setError('Vehicle image is required!');
            }
        } else {
            setError('Vehicle model is required!');
        }
    }

    React.useEffect(() => {
        setVehicleModel(props.listingDefaultInfo.carModel);
        setVehicleImage(props.listingDefaultInfo.carImage);
        setVehicleRentalPrice(props.listingDefaultInfo.carRentalPrice);
        setVehicleRentalInsurance(props.listingDefaultInfo.carInsurancePrice);
        setListingType(props.listingDefaultInfo.listingType);
    }, [props.listingDefaultInfo]);

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
            <DialogTitle className={classes.modalTitle}>Modify Vehicle Listing</DialogTitle>
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
                    </>
                )}
            </DialogContent>
            <DialogActions className={classes.modalContainer}>
                <Button.Primary className={classes.listingBtn} onClick={() => editListing(props.listingDefaultInfo.id)}>
                    Update
                </Button.Primary>
                <Button.Primary className={classes.listingRedBtn} onClick={props.close}>
                    Close
                </Button.Primary>
            </DialogActions>
        </Dialog>
    );
}

export default HOImportEditModal;