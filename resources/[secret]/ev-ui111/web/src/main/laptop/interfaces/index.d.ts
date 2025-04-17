interface LaptopState {
    showLaptop: boolean;
    devMode: boolean;
    boostingAppIcon: string;
    systemNotifications: SystemNotification[];
    showBoostingApp: boolean;
    showBennysApp: boolean;
    showPixelApp: boolean;
    showHOImportApp: boolean;
    showHerbsApp: boolean;
    showMethApp: boolean;
    showTowApp: boolean;
    showStreetApp: boolean;
    showSeedAnalyzerApp: boolean;
    showDodoApp: boolean;
    showHeistApp: boolean;
    showCasinoApp: boolean;
    showGamblingApp: boolean;
    shownApps: string[];
    enabledFeatures: string[];
    bennysAppCart: BennysCartItem[];
    HOImportAppCart: HNOCartItem[];
    bennysAppItems: BennysAppItem[];
    boostingContracts: BoostingContract[];
    boostingAuctionItems: BoostingAuctionItem[];
    showNotificationPanel: boolean;
    showSettingsPanel: boolean;
    isPuppet: boolean;
    puppetAccessInfo: BoostingPuppetAccessInfo;
    hnoAvailableVehicles: HNOVehicle[];
    showPresetBackgrounds: boolean;
    whiteIconNames: string;
    personal: boolean;
    overwriteSettings: any;
    laptopBackground: string;
}

interface LaptopOnShowPayload {
    enabledApps: string[];
    enabledFeatures: string[];
    overwriteSettings: any;
    hnoAvailableVehicles: HNOVehicle[];
}

interface LaptopOnEventPayload {
    id: string;
}

interface Icon {
    icon: string | (() => React.ReactNode);
    title: string;
    open: () => void;
    show: () => boolean;
    column: number;
    opened: () => boolean;
    component: any;
}

interface BoostingContract {
    uuid: string;
    contractActive: boolean;
    vehiclePlate: string;
    racingAlias: string;
    contractVehicleClass: string;
    contractBuyIn: number;
    contractVehicleInfo: { name: string, gnePurchaseCost: number };
    createdAt: number;
    expiresAt: number;
    playerInfo?: unknown;
}

interface BoostingAuctionItem {
    id: string;
    sellerAlias: string;
    vehicleClass: string;
    vehicleModel: string;
    currentBid: number;
    expiresAt: number;
    endsAt: number;
}

interface BoostingPuppetAccessInfo {
    playersInQueue: number;
    activeContracts: number;
    pendingContracts: number;
    isQueueEnabled: boolean;
}

interface SystemNotification {
    icon: string;
    title: string;
    message: string;
    createdAt?: number;
    expired?: boolean;
    show?: boolean;
}

interface BozoWebService {
    id: string;
    data: {
        name: string;
        description: string;
        callBack: string;
        price: number;
        cryptoName: string;
        cryptoLogo: string;
        imageLogo: string;
    };
}

interface BennysAppItem {
    qty: number;
    icon: string;
    code: string;
    name: string;
    importPrice: number;
    returnValue: number;
    details: { type: string, part: string },
    stock: number;
    category: string;
    type: string;
    part: string;
}

interface BennysCartItem {
    qty: number;
    icon: string;
    code: string;
    name: string;
    price: number;
    details: { type: string, part: string },
    stock: number;
}

interface HNOStickProduct {
    name: string;
    thumbnail: string;
    displayName: string;
    price: number;
    stock: number;
    amount?: number;
}

interface HNOCartItem {
    name: string;
    price: number;
    quantity: number;
}

interface HNOStickStock {
    name: string;
    price: number;
    amount: number;
}

interface HNOVehicle {
    vin: string;
    model: string;
}

interface HNOListing {
    id: number;
    rentedBy: number,
    carModel: string;
    carImage: string;
    carOwner: string;
    carRentalPrice: number;
    carInsurancePrice: number;
    listingType: string;
    listingActive: boolean;
    listingDeleted: boolean;
    status: string;
    renterPingNumber: number;
}

interface DodoWorker {
    id: number;
    cid: number;
    name: string;
    status: string;
    lastDelivery?: number;
}

interface DodoDelivery {
    id: string;
    name: string;
    startedAt: number;
    deliveredPackages: number;
    requiredPackages: number;
}

interface DodoJobOffer {
    id: string;
    type: string;
    requiredStops: number;
    requiredPackages: number;
    companyCut: number;
    active: boolean;
}

interface DodoTrackedDelivery {
    trackingId: string;
    assignedBy: string;
    type: string;
    status: string;
    stops: number;
    packages: number;
    completedAt: number;
}

interface DodoLog extends DodoTrackedDelivery {}

interface DodoStats {
    workers: number;
    jobsCompleted: number;
    todaysRev: number;
    jobs: DodoDelivery[];
    expressJobs: number;
    freightJobs: number;
}

interface HerbStrain {
    name: string;
    genName?: string;
    rep: number;
    n: number;
    p: number;
    k: number;
}

interface HerbProgress {
    current: string;
    next: string;
    amount: number;
}

interface PixelBrowserTab {
    url: string;
    id: string;
    enabled: () => boolean;
    fakeUrl: string;
    webAddress?: string;
    title: string;
    icon: string | null;
    component?: JSX.Element;
}

interface AnalyzerSeed {
    cropName: string;
    name: string;
    genome: string;
}

interface StreetGangInfo {
    gangName: string;
    maxMembers: number;
    salesToday: number;
    moneyCollected: number;
}

interface StreetGangMember {
    name: string;
    cid: number;
}

interface StreetGangProgression {
    name: string;
    unlocked: boolean;
    graffitisRequired: number;
    graffitiNeeded: number;
}

interface StreetGangGroup {
    id: string;
    name: string;
}

interface TowProgress {
    current: string;
    next: string;
    amount: number;
}