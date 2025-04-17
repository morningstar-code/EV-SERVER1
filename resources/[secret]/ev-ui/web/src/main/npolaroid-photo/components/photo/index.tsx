import { Card, CardContent, CardHeader, CardMedia, Fab } from "@mui/material";
import Text from "components/text/text";
import { nuiAction } from "lib/nui-comms";
import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "main/npolaroid-photobook/store";
import Image from "./image";
import useStyles from "./index.styles";
import UpdatePhotoModal from "./update-photo-modal";
import { updatePhotoState } from "main/npolaroid-photobook/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConvertTime = (time: number): string => {
    return new Date(time * 1000).toISOString().substring(0, 10);
}

const BASE_URL: string = null;
const IMAGE_EXTENSION: string = ".jpg";

const Photo: FunctionComponent<any> = ({
    uuid,
    data: {
        id,
        description,
        created,
        photobookId,
        photoUrl,
        options: {
            cardSize,
            lineLimit,
            showingOther = false,
            showingInBook = false,
        }
    }
}) => {
    const state = useSelector((state: any) => state[store.key]);
    const classes = useStyles({ cardSize, lineLimit });
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [newDescription, setDescription] = useState(description);

    const [showingOtherORInBook, setShowingOtherORInBook] = useState(showingOther || showingInBook);

    useEffect(() => {
        setDescription(description);
    }, [description]);

    return uuid && created ? (
        <div className={classes.root}>
            <Card className={classes.cardWrapper}>
                <CardHeader
                    className={classes.photoDateWrapper}
                    title={
                        <Text variant="h6" className={classes.photoDate}>
                            {ConvertTime(created)}
                        </Text>
                    }
                />
                <div className={classes.photoWrapper}>
                    {showingOtherORInBook ? (
                        <CardMedia
                            className={classes.photo}
                            image={BASE_URL ? BASE_URL + uuid + IMAGE_EXTENSION : photoUrl ? photoUrl : 'https://i.imgur.com/5G2zYum.png'}
                        />
                    ) : (
                        <Image
                            className={classes.photo}
                            image={BASE_URL ? BASE_URL + uuid + IMAGE_EXTENSION : photoUrl ? photoUrl : 'https://i.imgur.com/5G2zYum.png'}
                        />
                    )}
                </div>
                <CardContent>
                    {!newDescription && showingOtherORInBook ? (
                        <div className={classes.photoDescriptionButton}>
                            <Fab
                                variant="extended"
                                size="small"
                                color="secondary"
                                onClick={() => setShowDescriptionInput(true)}
                            >
                                <FontAwesomeIcon icon="marker" color="black" /> &nbsp; Add Description
                            </Fab>
                        </div>
                    ) : (
                        <Text
                            variant="body2"
                            className={classes.photoDescription}
                            style={{
                                transform: `rotate(${Math.random() > 0.5 ? "-" : ""}2deg)`
                            }}
                        >
                            {newDescription}
                        </Text>
                    )}
                </CardContent>
            </Card>
            <UpdatePhotoModal
                open={showDescriptionInput}
                handleClose={async (saved: boolean, newDesc: string) => {
                    if (saved) {
                        state.photoBook.photos[uuid].description = newDesc;
                        //update state like above, and also make sure it detects the change

                        const copyOfPhotoBook = {
                            ...state.photoBook,
                            photos: {
                                ...state.photoBook.photos,
                                [uuid]: {
                                    ...state.photoBook.photos[uuid],
                                    description: newDesc
                                }
                            }
                        }

                        updatePhotoState({
                            ...state,
                            photoBook: copyOfPhotoBook
                        });
                        setDescription(newDesc);
                        nuiAction('ev-polaroid:setDescription', {
                            photobookId,
                            id,
                            uuid,
                            description: newDesc
                        });
                    }
                    setShowDescriptionInput(false);
                }}
            />
        </div>
    ) : null
}

export default Photo;