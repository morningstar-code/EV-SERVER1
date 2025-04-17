import AppWrapper from "components/ui-app/ui-app";
import React from "react";
import { useSelector } from "react-redux"
import { updatePhotoState } from "./actions";
import Photobook from "./components/photobook";
import store from "./store";

export default (props: any) => {
    const showPhotoBook = useSelector((state: any) => state[store.key].showPhotoBook);

    const getPolaroidConfig = React.useCallback(() => {

    }, []);

    React.useEffect(() => {
        getPolaroidConfig();
    }, [getPolaroidConfig]);

    const onShow = (data: any) => {
        updatePhotoState({
            showPhotoBook: true,
            photoBook: data
        });
    }

    const onHide = () => {
        updatePhotoState({
            showPhotoBook: false,
            photoBook: {}
        })
    }

    return (
        <AppWrapper
            center={true}
            name="npolaroid-photobook"
            onError={onHide}
            onEscape={onHide}
            onHide={onHide}
            onShow={onShow}
            zIndex={1000}
        >
            {showPhotoBook && (
                <Photobook />
            )}
        </AppWrapper>
    )
}