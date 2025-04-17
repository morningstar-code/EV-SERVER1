import { nuiAction } from 'lib/nui-comms';
import { storeObj } from 'lib/redux';
import store from './store';

const getLaptopState = () => {
    return storeObj.getState()[store.key];
}

const updateLaptopState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

const getBoostingContracts =  async () => {
    const results = await nuiAction<ReturnData<BoostingContract[]>>('ev-ui:laptop:getBoostingContracts', {}, { returnData: [
        {
            uuid: "82daccc5-cba6-4af5-a732-801c83475056",
            contractActive: false,
            vehiclePlate: "VCB123",
            racingAlias: "BozoDaClown",
            contractVehicleClass: "S",
            contractBuyIn: 100,
            contractVehicleInfo: { name: "Nissan GTR", gnePurchaseCost: 100 },
            createdAt: Date.now(),
            expiresAt: Date.now() + 110000000,
            playerInfo: false
        }
    ] });

    if (results.meta.ok) {
        updateLaptopState({ boostingContracts: results.data });
    }
}

const getAuctionItems = async () => {
    const results = await nuiAction('ev-ui:laptop:getAuctionItems', {}, { returnData: [
        {
            id: 1,
            sellerAlias: 'BozoDaClown',
            vehicleClass: 'S',
            vehicleModel: 'Nissan GTR',
            currentBid: 100,
            expiresAt: Date.now() + 1000000,
            endsAt: Date.now() + 1000000,
        }
    ] });

    if (results.meta.ok) {
        updateLaptopState({ boostingAuctionItems: results.data ?? [] });
    }
}

export const setShowLaptop = (data: boolean) => updateLaptopState({ showLaptop: data });
export const setShowBoostingApp = (data: boolean) => updateLaptopState({ showBoostingApp: data });
export const setShowBennysApp = (data: boolean) => updateLaptopState({ showBennysApp: data });
export const setShownApps = (data: string[]) => updateLaptopState({ shownApps: data });
export const setSystemNotifications = (data: SystemNotification[]) => updateLaptopState({ systemNotifications: data });
export const setBennysAppCart = (data: BennysCartItem[]) => updateLaptopState({ bennysAppCart: data });
export const setHOImportAppCart = (data: HNOCartItem[]) => updateLaptopState({ HOImportAppCart: data });
export const setContracts = (data: BoostingContract[]) => updateLaptopState({ boostingContracts: data });
export const setBennysAppItems = (data: BennysAppItem[]) => updateLaptopState({ bennysAppItems: data });
export const setShowChromeApp = (data: boolean) => updateLaptopState({ showPixelApp: data });
export const setShowHOImportApp = (data: boolean) => updateLaptopState({ showHOImportApp: data });
export const setShowHerbsApp = (data: boolean) => updateLaptopState({ showHerbsApp: data });
export const setShowMethApp = (data: boolean) => updateLaptopState({ showMethApp: data });
export const setShowTowApp = (data: boolean) => updateLaptopState({ showTowApp: data });
export const setShowStreetApp = (data: boolean) => updateLaptopState({ showStreetApp: data });
export const setShowSeedAnalyzerApp = (data: boolean) => updateLaptopState({ showSeedAnalyzerApp: data });
export const setShowDodoApp = (data: boolean) => updateLaptopState({ showDodoApp: data });
export const setShowHeistApp = (data: boolean) => updateLaptopState({ showHeistApp: data });
export const setShowCasinoApp = (data: boolean) => updateLaptopState({ showCasinoApp: data });
export const setShowGamblingApp = (data: boolean) => updateLaptopState({ showGamblingApp: data });
export const setEnabledFeatures = (data: string[]) => updateLaptopState({ enabledFeatures: data });
export const setShowNotificationPanel = (data: boolean) => updateLaptopState({ showNotificationPanel: data });
export const setPuppetAccessInfo = (data: boolean) => updateLaptopState({ puppetAccessInfo: data });
export const setIsPuppet = (data: boolean) => updateLaptopState({ isPuppet: data });
export const setShowSettingsPanel = (data: boolean) => updateLaptopState({ showSettingsPanel: data });
export const setLaptopBackground = (data: string) => updateLaptopState({ laptopBackground: data });
export const setShowPresetBackgrounds = (data: boolean) => updateLaptopState({ showPresetBackgrounds: data });
export const setWhiteIconNames = (data: string) => updateLaptopState({ whiteIconNames: data });
export const setPersonal = (data: boolean) => updateLaptopState({ personal: data });

export {
    getLaptopState,
    updateLaptopState,
    getBoostingContracts,
    getAuctionItems
}