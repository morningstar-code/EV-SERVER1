
RegisterServerEvent("inventory-degItem")
onNet("inventory-degItem", async (itemFoundId, percent, itemId, cid) => {
    console.log(itemFoundId, percent, itemId, cid)

    exports.oxmysql.execute(`UPDATE inventory set creationDate = ${percent} WHERE id = ${itemFoundId}`, {}, function () { });
});

let serverCode = "wl"
const TimeAllowed = 1000 * 60 * 40320; // 28 days,
function ConvertQuality(itemID, creationDate) {
    let StartDate = new Date(creationDate).getTime();
    let DecayRate = itemList[itemID].decayrate;
    let TimeExtra = TimeAllowed * DecayRate;
    let percentDone = 100 - Math.ceil(((Date.now() - StartDate) / TimeExtra) * 100);
    if (DecayRate == 0.0) {
        percentDone = 100;
    }
    if (percentDone < 0) {
        percentDone = 0;
    }
    return percentDone;
}

const stolenGoods = [];
let stolenGoodsString;

function generateStolenGoods() {
    // serverCode = exports["mt-config"].GetServerCode()
    for (const key in itemList) {
        let item = itemList[key];
        if (item.isStolen) {
            stolenGoods.push(key);
        } else if (key == 'oxy') {
            stolenGoods.push(key);
        }
    }
    stolenGoodsString = stolenGoods.map(s => `'${s}'`).join(',');
}

generateStolenGoods();

setInterval(() => {
    exports.oxmysql.execute(`DELETE FROM inventory WHERE name = 'Stolen-Goods-PH-wl' and item_id NOT IN (${stolenGoodsString})`);
}, 10 * 60 * 1000);

// RPC.register('ev-inventory:getCraftingSpots', () => {
//     let Config = [
//         {
//             id : 505,
//             zoneData : {
//                 position : vector3(579.1, -1870.32, 25.09),
//                 length : 1.85,
//                 width : 2.1,
//                 options : {
//                     heading : 56.0,
//                     minZ : 24.09,
//                     maxZ : 26.24,
//                     data : {
//                         public : true,
//                         gangOnly : false,
//                         prompt : ("[E] %s").format('Craft'),
//                         progression : "crafting:guns",
//                         key : 38,
//                         inventories : {
//                             [1] : {
//                                 id : "411",
//                                 progression : 50000,
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//     ]
//     return Config
// })
