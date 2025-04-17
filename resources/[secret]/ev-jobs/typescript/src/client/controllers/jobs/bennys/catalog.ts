let bennysCatalogItemIds: Set<string>;
let bennysCatalog: BennyCatalogItem[];
let bennysPriceModifiers: Map<number, any>;

export async function InitBennyCatalog(attempts = 0): Promise<any> {
    // const [partsCatalog, priceModifiers] = await Promise.all([RPC.execute<BennyCatalogItem[]>("ev-jobs:bennys:getPartsCatalog"), RPC.execute<BennyPriceModifiers[]>("ev-jobs:bennys:getPriceModifiers")]);
    // if (partsCatalog && partsCatalog.length === 0 || priceModifiers && priceModifiers.length === 0) {
    //     if (attempts >= 5) return;
    //     return setTimeout(() => InitBennyCatalog(++attempts), 5000);
    // }
    // bennysCatalog = partsCatalog;
    // bennysCatalogItemIds = new Set(partsCatalog.map(part => part.itemId));
    // bennysPriceModifiers = new Map(priceModifiers.map(modifier => {
    //     return [modifier.rating, modifier];
    // }));
}

export function GetBennysPriceModifers() {
    return [...bennysPriceModifiers.values()];
}

export function GetBennysCatalog() {
    return bennysCatalog;
}
global.exports("GetBennysCatalog", () => {
    return bennysCatalog;
});

export function GetCatalogItemByItemId(pItem: string) {
    return bennysCatalog.find(catalog => catalog.itemId === pItem);
}

export function GetCatalogItemByTypeAndPart(pType: string, pPart: string) {
    return bennysCatalog.find(catalog => catalog.part === pPart && catalog.type === pType);
}