import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "laptop",
    initialState: {
        showLaptop: false,
        devMode: false,
        boostingAppIcon: 'https://i.imgur.com/7pi8S2U.png',
        systemNotifications: [
            {
                icon: "https://i.imgur.com/3Gy9KnJ.png",
                title: "Boosting",
                message: "POTATO IS A BOZO",
                createdAt: Date.now(),
                expired: true
            }
        ],
        showBoostingApp: false,
        showBennysApp: false,
        showPixelApp: false,
        showHOImportApp: false,
        showHerbsApp: false,
        showMethApp: false,
        showTowApp: false,
        showStreetApp: false,
        showSeedAnalyzerApp: false,
        showDodoApp: false,
        showHeistApp: false,
        showCasinoApp: false,
        showGamblingApp: false,
        shownApps: ['boostingApp', 'bennysApp', 'streetApp', 'hoimportsApp', 'seedAnalyzerApp', 'dodoApp', 'methApp', 'towApp', 'herbsApp', 'casinoApp'],
        enabledFeatures: ['bozoweb:showBrowserTab', 'hoimportsApp:secretShop', 'hoimportsApp:managerRole', 'dodoApp:showManagement'],
        bennysAppCart: [],
        HOImportAppCart: [],
        bennysAppItems: [],
        boostingContracts: [],
        boostingAuctionItems: [],
        showNotificationPanel: false,
        showSettingsPanel: false,
        isPuppet: false,
        puppetAccessInfo: {
            playersInQueue: 100,
            activeContracts: 100,
            pendingContracts: 100,
            isQueueEnabled: false
        },
        hnoAvailableVehicles: [],
        showPresetBackgrounds: false,
        whiteIconNames: 'on',
        personal: true,
        overwriteSettings: null,
        laptopBackground: 'https://i.imgur.com/EEwTSk1.jpg'
    }
};

export default store;