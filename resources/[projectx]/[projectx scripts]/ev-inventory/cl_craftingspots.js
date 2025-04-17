let showPrompt = false;
let listener;
let openedBait = false;

setImmediate(async () => {
    while (!exports['ev-config'].IsConfigReady()) {
        await Delay(100);
    }
    const spawnPublicZones = exports["ev-config"].GetMiscConfig('crafting.spawn.public');
    const [fetchCraftingSpots] = await RPC.execute("ev-inventory:getCraftingSpots");
    const craftingSpots = fetchCraftingSpots["param"];

    craftingSpots.forEach(spot => {
        if (spot.zoneData.options.data.public && !spawnPublicZones) return;
        const name = `ev-inventory:crafting:${spot.id}`;
        exports["ev-polyzone"].AddBoxZone(name, spot.zoneData.position, spot.zoneData.length, spot.zoneData.width, spot.zoneData.options);
    })
})

on("ev-polyzone:enter", async (zone, data) => {
    if (!zone.startsWith("ev-inventory:crafting:")) return;

    if (data.gangOnly) {
        const currentGang = await exports['ev-gangsystem'].GetCurrentGang();

        if (!currentGang) return;
    }
    listener = setTick(() => {
        if (openedBait && data.progression && data.inventories[0].id === "baitinventory") return;
        if (!showPrompt) {
            exports["ev-ui"].showInteraction(data.prompt);
            showPrompt = true;
        }
        if (IsControlJustPressed(0, data.key)) {
            exports["ev-ui"].hideInteraction();
            if (data.progression) {
                const progression = exports["ev-progression"].GetProgression(data.progression);
                let inventory = data.inventories[0];

                data.inventories.forEach(inv => {
                    if (progression >= inv.progression && inv.progression > inventory.progression) inventory = inv;
                });
                emit("server-inventory-open", inventory.id, `Crafting:${inventory.id}`);
                if (inventory.id == "baitinventory") openedBait = true;
            } else {
                emit("server-inventory-open", data.inventory, "Craft");
            }
        }
    });
});

on("ev-polyzone:exit", (zone, data) => {
    if (!zone.startsWith("ev-inventory:crafting:") || !listener) return;
    clearTick(listener);
    listener = null;
    showPrompt = false;
    zone = null
    exports["ev-ui"].hideInteraction();
});
