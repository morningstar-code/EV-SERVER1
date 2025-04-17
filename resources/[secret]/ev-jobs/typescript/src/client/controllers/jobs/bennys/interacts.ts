import { CurrentActivity, CurrentTaskCode } from ".";

const bennyInteracts = [{
    type: "entity",
    group: [1],
    data: [{
        id: "bennys_sell_import_parts",
        label: "sell parts",
        icon: "money-bill-wave",
        event: "ev-jobs:bennys:sellImportParts",
        parameters: {}
    }, {
        id: "bennys_purchase_import_parts",
        label: "purchase parts",
        icon: "money-bill-wave",
        event: "ev-jobs:bennys:purchaseImportParts",
        parameters: {}
    }],
    options: {
        npcIds: ["bennys"],
        distance: { radius: 2.5 }
    }
}, {
    type: "entity",
    group: [1],
    data: [{
        id: "bennys_open_stock_menu",
        label: "check stock",
        icon: "boxes",
        event: "ev-jobs:bennys:openStockMenu",
        parameters: {}
    }],
    options: {
        job: ["bennys"],
        npcIds: ["bennys"],
        distance: { radius: 2.5 }
    }
}, {
    type: "polytarget",
    group: ["bennys_storage"],
    data: [{
        id: "bennys_open_storage",
        label: "open storage",
        icon: "box",
        event: "ev-jobs:bennys:openStorage",
        parameters: {}
    }],
    options: {
        distance: { radius: 1.5 }
    }
}, {
    type: "polytarget",
    group: ["bennys_storage"],
    data: [{
        id: "bennys_collect_part",
        label: "collect part",
        icon: "cogs",
        event: "ev-jobs:bennys:openContainer",
        parameters: {}
    }],
    options: {
        job: ["bennys"],
        distance: {
            radius: 1.5
        },
        isEnabled: () => CurrentActivity !== undefined
    }
}, {
    type: "polytarget",
    group: ["bennys_bench"],
    data: [{
        id: "bennys_prepare_part",
        label: "prepare part",
        icon: "hammer",
        event: "ev-jobs:bennys:prepareImportParts",
        parameters: {}
    }],
    options: {
        job: ["bennys"],
        distance: { radius: 1.5 }
    }
}, {
    type: "entity",
    group: [1],
    data: [{
        id: "import_shop",
        label: "Open Shop",
        icon: "money-bill-wave",
        event: "ev-jobs:bennys:openImportsShop",
        parameters: {}
    }],
    options: {
        npcIds: ["imports_shop"],
        distance: { radius: 2.5 }
    }
}, {
    type: "entity",
    group: [2],
    data: [{
        id: "bennys_complete_install",
        label: "prepare for delivery",
        icon: "file-signature",
        event: "ev-jobs:bennys:completeInstallTask",
        parameters: {}
    }],
    options: {
        distance: { radius: 2.5 },
        isEnabled: () => CurrentTaskCode === "apply_vehicle_parts"
    }
}];

export async function InitBennyInteracts(): Promise<void> {
    bennyInteracts.forEach(interact => {
        if (interact.type === "entity") {
            global.exports["ev-interact"].AddPeekEntryByEntityType(interact.group, interact.data, interact.options);
        } else {
            if (interact.type === "polytarget") {
                global.exports["ev-interact"].AddPeekEntryByPolyTarget(interact.group, interact.data, interact.options);
            }
        }
    });
}