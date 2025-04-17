import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import AppWrapper from "components/ui-app/ui-app";
import LaptopScreen from "./components/laptop-screen";
import store from "./store";
import { getAuctionItems, getBoostingContracts, updateLaptopState } from "./actions";

const App: FunctionComponent = () => {
    const state = useSelector((state) => state[store.key]);

    const onEvent = (data: LaptopOnEventPayload) => {
        if (data.id === 'refresh-contracts') {
            if (!state.showLaptop) return;
            getBoostingContracts();
        } else if (data.id === 'refresh-auction-list') {
            if (!state.showLaptop) return;
            getAuctionItems();
        }
    }

    const fetchLaptopBackground = () => {
        const laptopBackground = localStorage.getItem('laptopBackground');
        updateLaptopState({ laptopBackground: laptopBackground });
    }

    const onHide = () => {
        updateLaptopState({
            showBoostingApp: false,
            showHOImportApp: false,
            showBennysApp: false,
            showMethApp: false,
            showStreetApp: false,
            showSeedAnalyzerApp: false,
            showNotificationPanel: false,
            showSettingsPanel: false,
            showPresetBackgrounds: false,
            showDodoApp: false,
            showHeistApp: false
        });

        if (state.showNotificationPanel) {
            setTimeout(() => {
                updateLaptopState({ showLaptop: false });
            }, 500);
        } else {
            updateLaptopState({ showLaptop: false });
        }
    }

    const onShow = (data?: LaptopOnShowPayload) => {
        const enabledApps = data?.enabledApps || [];
        const enabledFeatures = data?.enabledFeatures || [];
        const overwriteSettings = data?.overwriteSettings || null;
        const hnoAvailableVehicles = data?.hnoAvailableVehicles || [];

        updateLaptopState({
            showLaptop: true,
            shownApps: enabledApps,
            enabledFeatures: enabledFeatures,
            overwriteSettings: overwriteSettings,
            hnoAvailableVehicles: hnoAvailableVehicles
        });

        fetchLaptopBackground();

        if (overwriteSettings?.personal) {
            updateLaptopState({ personal: overwriteSettings.personal });
        }
    }

    return (
        <AppWrapper
            center
            name="laptop"
            onError={onHide}
            onEscape={onHide}
            onHide={onHide}
            onShow={onShow}
            onEvent={onEvent}
            store={store}
        >
            <div id="added-to-cart"></div>
            <LaptopScreen />
        </AppWrapper>
    )
}

export default App;