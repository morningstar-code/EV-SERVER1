import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import store from "./store";
import AppWrapper from "components/ui-app/ui-app";
import { setPowerBarProgress, setShowPowerBar } from "./actions";
import Golf from "./components/golf";

const Container: FunctionComponent = () => {
    const showPowerBar = useSelector((state: any) => state[store.key].showPowerBar);

    const onEvent = (data: any) => {
        data.updatePowerBarProgress && setPowerBarProgress(data.powerBarProgress);
    }

    const onShow = (data: any) => {
        setShowPowerBar(true);
    }

    const onHide = () => {
        setPowerBarProgress(0);
        setTimeout(() => {
            setShowPowerBar(false);
        }, 300);
    }

    return (
        <AppWrapper
            center={true}
            name="golf"
            onError={onHide}
            onEscape={onHide}
            onHide={onHide}
            onShow={onShow}
            onEvent={onEvent}
        >
            <Golf show={showPowerBar} />
        </AppWrapper>
    )
}

export default Container;