import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "../../../npolaroid-photobook/components/photobook/index.styles";
import store from "../../../npolaroid-photobook/store";
import Photo from "main/npolaroid-photo/components/photo";
import { Fab, Modal } from "@mui/material";
import { updatePhotoState } from "main/npolaroid-photobook/actions";
import { nuiAction } from "lib/nui-comms";
import ConfirmDeleteModal from "./confirm-delete-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DisplayPhotoModal: FunctionComponent<{ photo: any, setCurrentPhoto: any }> = (props) => {
    const photo = props.photo;
    const setCurrentPhoto = props.setCurrentPhoto;
    const classes = useStyles(true);
    const state = useSelector((state: any) => state[store.key]);

    const [deleteModal, setDeleteModal] = useState(false);

    const showOthers = async () => {
        const otherPhoto = state.photoBook.photos[photo.uuid];
        await nuiAction('ev-polaroid:showOthers', {
            photoInfo: {
                uuid: photo.uuid,
                description: otherPhoto.description,
                created: photo.created,
                photoUrl: photo.photoUrl
            },
            fromBinder: true
        });
        setCurrentPhoto(void 0);
    }

    const updateAndDelete = () => {
        const copyOfPhotoBook = { ...state.photoBook };
        delete copyOfPhotoBook.photos[photo.uuid];
        setCurrentPhoto(void 0);
        updatePhotoState({ photoBook: copyOfPhotoBook })
    }

    const moveToInventory = async () => {
        await nuiAction('ev-polaroid:moveToInventory', {
            id: photo.id,
            uuid: photo.uuid,
            photoBookId: state.photoBook.id
        });

        updateAndDelete();
    }

    const deletePhoto =  async() => {
        await nuiAction('ev-polaroid:deletePhoto', {
            id: photo.id,
            uuid: photo.uuid,
            photoBookId: state.photoBook.id
        });

        updateAndDelete();
    }

    return (
        <div>
            <Modal
                disableEnforceFocus={true}
                open={!!photo}
                onClose={() => setCurrentPhoto(void 0)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div>
                    <Photo
                        uuid={photo.uuid}
                        data={{
                            id: photo.id,
                            description: photo.description,
                            created: photo.created,
                            photoUrl: photo.photoUrl,
                            photobookId: state.photoBook.id,
                            options: {
                                cardSize: '100%',
                                rotation: photo?.rotation ?? `rotate(${Math.random() > 0.5 ? "-" : ""}2deg)`,
                                lineLimit: 10,
                                showingInBook: true
                            }
                        }}
                    />
                    <div className={classes.photoAction}>
                        <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            onMouseUp={showOthers}
                        >
                            <FontAwesomeIcon icon="share" color="black" /> &nbsp; Show others
                        </Fab>
                        <Fab
                            variant="extended"
                            size="small"
                            color="secondary"
                            onMouseUp={moveToInventory}
                        >
                            <FontAwesomeIcon icon="archive" color="black" /> &nbsp; Move to Inventory
                        </Fab>
                        <Fab
                            variant="extended"
                            size="small"
                            color="default"
                            onMouseUp={() => setDeleteModal(true)}
                            style={{
                                backgroundColor: 'rgb(199, 66, 66)',
                                color: 'white'
                            }}
                        >
                            <FontAwesomeIcon icon="trash" color="black" /> &nbsp; Delete
                        </Fab>
                    </div>
                </div>
            </Modal>
            {/* Delete Confirm Modal */}
            <ConfirmDeleteModal
                show={deleteModal}
                close={() => setDeleteModal(false)}
                confirm={deletePhoto}
            >
                Are you sure you want to delete this photo?
            </ConfirmDeleteModal>
        </div>
    )
}

export default DisplayPhotoModal;