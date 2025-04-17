import React from 'react';
import { storeObj } from 'lib/redux';
import useStyles from './index.styles';
import Button from 'components/button/button';
import { ClickAwayListener, Tooltip, Typography } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';
import HOImportCreateModal from '../hoimports-create-modal';
import HOImportConfirmationModal from '../hoimports-modal-confirm';
import HOImportInfoModal from '../hoimports-info-modal';
import HOImportEditModal from '../hoimports-edit-modal';
import { AddSystemNotification } from '../../laptop-screen';

export default () => {
    const state: LaptopState = storeObj.getState().laptop;
    const [listings, setListings] = React.useState<HNOListing[]>([]);
    const [createListingModal, setCreateListingModal] = React.useState<boolean>(false);
    const [editListingModal, setEditListingModal] = React.useState<boolean>(false);
    const [confirmModal, setConfirmModal] = React.useState<boolean>(false);
    const [rentPurchaseModal, setRentPurchaseModal] = React.useState<boolean>(false);
    const [listingInfoModal, setListingInfoModal] = React.useState<boolean>(false);
    const [isCarImageEnlarged, setIsCarImageEnlarged] = React.useState<boolean>(false);
    const [listingId, setListingId] = React.useState<number>(-1);
    const [removedListingId, setRemovedListingId] = React.useState<number>(-1);
    const [rentedListingId, setRentedListingId] = React.useState<number>(-1);
    const [listingDefaultInfo, setListingDefaultInfo] = React.useState<HNOListing>({
        id: 0,
        rentedBy: 0,
        carModel: '',
        carImage: '',
        carOwner: '',
        carRentalPrice: 0,
        carInsurancePrice: 0,
        listingType: 'Rental',
        listingActive: false,
        listingDeleted: false,
        status: 'Available',
        renterPingNumber: 0
    });

    const enabledFeatures = state.enabledFeatures;
    const hnoAvailableVehicles = state.hnoAvailableVehicles;

    const fetchListings = React.useCallback(async () => {
        const results = await nuiAction<ReturnData<HNOListing[]>>('ev-hoimports:ui:FetchListings', {}, {
            returnData: [
                {
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
                }
            ]
        });

        if (results.meta.ok) {
            setListings(results.data);
        }
    }, []);

    const removeListing = async (listingId: number) => {
        const results = await nuiAction<ReturnData<HNOListing[]>>('ev-hoimports:ui:RemoveListing', { listingId }, { returnData: [] });

        if (results.meta.ok) {
            setListings(results.data);

            AddSystemNotification({
                show: true,
                icon: 'https://i.imgur.com/Ok9VHSy.png',
                title: 'HO Imports',
                message: 'Successfully removed listing!'
            });
        }
    }

    const rentVehicle = async (listingId: number) => {
        const results = await nuiAction<ReturnData>('ev-hoimports:ui:RentVehicle', { listingId }, { returnData: [] });

        if (!results.meta.ok) {
            return AddSystemNotification({
                show: true,
                icon: 'https://i.imgur.com/Ok9VHSy.png',
                title: 'HO Imports',
                message: results.meta.message
            });
        }

        fetchListings();

        return AddSystemNotification({
            show: true,
            icon: 'https://i.imgur.com/Ok9VHSy.png',
            title: 'HO Imports',
            message: results.meta.message
        });
    }

    React.useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <HOImportCreateModal
                show={createListingModal}
                close={() => setCreateListingModal(false)}
                updateListings={setListings}
                hnoAvailableVehicles={hnoAvailableVehicles}
            />
            {enabledFeatures.includes('hoimportsApp:managerRole') && (
                <section className={classes.controlBar}>
                    <Button.Primary className={classes.listingBtn} onClick={() => setCreateListingModal(true)}>
                        Create Listing
                    </Button.Primary>
                </section>
            )}
            <ul className={classes.listingList}>
                {listings && listings.map((listing) => (
                    <li key={listing.id} className={classes.listingItem}>
                        <ClickAwayListener
                            key={Math.random()}
                            onClickAway={() => setIsCarImageEnlarged(false)}
                        >
                            <Tooltip
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: 'rgba(0, 0, 0, 0.87)', maxWidth: 'none', fontSize: '0.75rem', position: 'relative' }}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={(
                                    <>
                                        <div onClick={() => setIsCarImageEnlarged(false)}>
                                            <img
                                                src={listing.carImage}
                                                alt={listing.carImage}
                                                style={{ maxHeight: 600, maxWidth: 800 }}
                                            />
                                        </div>
                                    </>
                                )}
                                placement="left"
                                open={isCarImageEnlarged}
                                onClose={() => setIsCarImageEnlarged(false)}
                            >
                                {isCarImageEnlarged ? (
                                    <div
                                        className={`image ${isCarImageEnlarged ? '' : 'image-with-blur'}`}
                                        onClick={() => setIsCarImageEnlarged(!isCarImageEnlarged)}
                                        style={{ backgroundImage: `url(${listing.carImage})` }}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </Tooltip>
                        </ClickAwayListener>
                        {listingInfoModal && (
                            <HOImportInfoModal
                                show={listingInfoModal}
                                close={() => setListingInfoModal(false)}
                                listingId={listingId}
                            />
                        )}
                        {editListingModal && (
                            <HOImportEditModal
                                show={editListingModal}
                                close={() => setEditListingModal(false)}
                                updateListings={setListings}
                                listingDefaultInfo={listingDefaultInfo}
                            />
                        )}
                        <HOImportConfirmationModal
                            show={rentPurchaseModal}
                            close={() => setRentPurchaseModal(false)}
                            confirm={() => rentVehicle(rentedListingId)}
                        >
                            <div className={classes.modalText}>
                                {listing.listingType === 'Rental' ? (
                                    'This rental will cost you ' + listing.carRentalPrice + ' GNE and an insurance hold of ' + listing.carInsurancePrice + ' GNE. \nThe insurance hold will be refunded if vehicle is not lost and returned back to us.'
                                ) : (
                                    'This purchase will cost you ' + listing.carRentalPrice + ' GNE.'
                                )}
                            </div>
                        </HOImportConfirmationModal>
                        <HOImportConfirmationModal
                            show={confirmModal}
                            close={() => setConfirmModal(false)}
                            confirm={() => removeListing(removedListingId)}
                        >
                            <div className={classes.modalText}>
                                Are you sure you want to do this?
                            </div>
                        </HOImportConfirmationModal>
                        <div className={classes.listingThumbnail} style={{ backgroundImage: `url(${listing.carImage})` }} onClick={() => setIsCarImageEnlarged(true)} />
                        <div className={classes.listingInfo}>
                            <Typography className={classes.listingTitle}>
                                {listing.carModel}
                            </Typography>
                            <Typography className={classes.listingDesc}>
                                {listing.listingType === 'Rental' ? 'Rental By:' : 'Listing By:'} {listing.carOwner}
                            </Typography>
                            <Typography className={classes.listingDesc}>
                                {listing.listingType === 'Rental' ? 'Rental Cost' : 'Purchase Cost'}: {listing.carRentalPrice} GNE
                            </Typography>
                            <Typography className={classes.listingDesc}>
                                Insurance Cost: {listing.carInsurancePrice} GNE
                            </Typography>
                        </div>
                        {enabledFeatures.includes('hoimportsApp:managerRole') && (
                            <>
                                <Tooltip title="Edit this listing" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                    <div>
                                        <Button.Primary
                                            className={classes.listingYellowBtn}
                                            onClick={() => {
                                                setListingDefaultInfo(listing);
                                                setEditListingModal(true);
                                            }}
                                        >
                                            <i className="fas fa-edit fa-fw fa-sm" style={{ color: '#fff' }}></i>
                                        </Button.Primary>
                                    </div>
                                </Tooltip>
                                <Tooltip title="View this listings info" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                    <div>
                                        <Button.Primary
                                            className={classes.listingYellowBtn}
                                            onClick={() => {
                                                setListingId(listing.id);
                                                setListingInfoModal(true);
                                            }}
                                        >
                                            <i className="fas fa-info-circle fa-fw fa-sm" style={{ color: '#fff' }}></i>
                                        </Button.Primary>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Remove this listing" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                    <div>
                                        <Button.Primary
                                            className={classes.listingYellowBtn}
                                            onClick={() => {
                                                setRemovedListingId(listing.id);
                                                setConfirmModal(true);
                                            }}
                                        >
                                            <i className="fas fa-trash fa-fw fa-sm" style={{ color: '#fff' }}></i>
                                        </Button.Primary>
                                    </div>
                                </Tooltip>

                            </>
                        )}
                        {!enabledFeatures.includes('hoimportsApp:managerRole') && (
                            <Button.Primary
                                className={classes.listingBtn}
                                onClick={() => {
                                    setRentedListingId(listing.id);
                                    setRentPurchaseModal(true);
                                }}
                                disabled={listing.listingActive}
                            >
                                {listing.listingActive ? 'Taken' : listing.listingType === 'Rental' ? 'Rent Vehicle' : 'Purchase Vehicle'}
                            </Button.Primary>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}