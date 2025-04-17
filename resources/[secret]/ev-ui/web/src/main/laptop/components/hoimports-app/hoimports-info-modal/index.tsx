import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "../../../../../components/button/button";
import { nuiAction } from "lib/nui-comms";
import Text from "components/text/text";

interface HOImportInfoModalProps {
    show: boolean;
    listingId: number;
    close: () => void;
}

const HOImportInfoModal: FunctionComponent<HOImportInfoModalProps> = (props) => {
    const classes = useStyles();

    const [listingInfo, setListingInfo] = React.useState<HNOListing>(null);
    const [loading, setLoading] = React.useState(true);
    
    const fetchListingInfo = React.useCallback(async (listingId: number) => {
        const results = await nuiAction<ReturnData<HNOListing>>('ev-hoimports:ui:fetchListingInfo', { listingId }, { returnData: {
            id: 1,
            rentedBy: 0,
            carModel: '2019 Ford Mustang GT',
            carImage: 'https://i.imgur.com/1ZQ3Z4u.png',
            carOwner: 'John Doe',
            carRentalPrice: 200,
            carInsurancePrice: 50,
            listingType: 'Rental',
            listingActive: false,
            listingDeleted: false,
            status: 'Available',
            renterPingNumber: 0
        } });
    
        if (results.meta.ok && results.data) {
            setListingInfo(results.data);
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        props.show ? fetchListingInfo(props.listingId) : setLoading(false)
    }, [props.show, fetchListingInfo, props.listingId]);

    return (
        <>
            {!loading && (
                <Dialog open={props.show} onClose={props.close} aria-labelledby="form-dialog-title">
                    <DialogTitle className={classes.modalTitle}>Vehicle Listing Info</DialogTitle>
                    <DialogContent className={classes.modalContainer}>
                        {!listingInfo && (
                            <Text>
                                Vehicle is not being rented out currently.
                            </Text>
                        )}
                        {listingInfo && (
                            <ul>
                                <li>
                                    <Text>
                                        Rented By: {listingInfo.rentedBy}
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        Rental Cost: {listingInfo.carRentalPrice} GNE
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        Rental Insurance: {listingInfo.carInsurancePrice} GNE
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        Status: {listingInfo.status}
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        Renters Ping: {listingInfo.renterPingNumber}
                                    </Text>
                                </li>
                            </ul>
                        )}
                    </DialogContent>
                    <DialogActions className={classes.modalContainer}>
                        <Button.Primary className={classes.listingRedBtn} onClick={props.close}>Close</Button.Primary>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default HOImportInfoModal;