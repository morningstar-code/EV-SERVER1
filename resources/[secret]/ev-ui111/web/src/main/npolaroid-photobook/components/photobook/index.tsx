import { FunctionComponent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./index.styles";
import store from "../../store";
import Photo from "main/npolaroid-photo/components/photo";
import DisplayPhotoModal from "main/npolaroid-photo/components/photo/display-photo-modal";

const Photobook: FunctionComponent<any> = () => {
    const classes = useStyles(true);
    const state = useSelector((state: any) => state[store.key]);
    const [currentPhoto, setCurrentPhoto] = useState();

    const getPhotos = useMemo(() => {
        return Object.entries(state.photoBook.photos)
            .map((photo: any) => {
                return {
                    ...photo[1],
                    uuid: photo[0],
                    rotation: `rotate(${Math.random() > 0.5 ? '-' : ''}0.9deg)`
                }
            })
            .sort((a: any, b: any) => {
                return a.created - b.created;
            });
    }, [state.photoBook]);

    return (
        <>
            {state.photoBook?.photos && (
                <div className={classes.photoBookBacking}>
                    <div className={classes.photobookPlastic}>
                        {getPhotos.map((photo: any, index: number) => (
                            <div
                                key={`photo_${index}`}
                                style={{
                                    transform: photo?.rotation ?? `rotate(${Math.random() > 0.5 ? "-" : ""}0.9deg)`
                                }}
                                onClick={() => setCurrentPhoto(photo)}
                            >
                                <div className={classes.tapeSection} />
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
                                            rotation: photo?.rotation ?? `rotate(${Math.random() > 0.5 ? "-" : ""}0.9deg)`
                                        }
                                    }}
                                />
                                <div className={classes.tapeSection} />
                            </div>
                        ))}
                    </div>
                    <div>
                        {currentPhoto && (
                            <DisplayPhotoModal
                                photo={currentPhoto}
                                setCurrentPhoto={setCurrentPhoto}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Photobook;