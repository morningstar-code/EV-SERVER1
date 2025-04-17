let DroppedInventories = []; 
let InUseInventories = [];
let DataEntries = 0;
let hasBrought = [];
let CheckedDeginv = [];
const DROPPED_ITEM_KEEP_ALIVE = 1000 * 60 * 160;

function clean() {
    for (let Row in DroppedInventories) {
        if (new Date(DroppedInventories[Row].lastUpdated + DROPPED_ITEM_KEEP_ALIVE).getTime() < Date.now() && DroppedInventories[Row].used && !InUseInventories[DroppedInventories[Row].name]) {
            emitNet("Inventory-Dropped-Remove", -1, [DroppedInventories[Row].name])
            delete DroppedInventories[Row];
        }
    }
}

setInterval(clean, 20000)

function db(string) {
    exports.oxmysql.execute(string, {}, function (result) {
    });
}

RegisterServerEvent("server-remove-item")
onNet("server-remove-item", async (player, itemidsent, amount, openedInv) => {
    functionRemoveAny(player, itemidsent, amount, openedInv)
});

RegisterServerEvent("server-remove-item-slot")
onNet("server-remove-item-slot", async (player, itemidsent, amount, slotId, openedInv) => {
    functionRemoveBySlot(player, itemidsent, amount, slotId, openedInv)
});

RegisterServerEvent("server-remove-item-kv")
onNet("server-remove-item-kv", async (player, itemidsent, amount, metaKey, metaValue) => {
    functionRemoveByMetaKV(player, itemidsent, amount, metaKey, metaValue)
});

RegisterServerEvent("server-remove-item-multiple-kv")
onNet("server-remove-item-multiple-kv", async (cid, itemId, amount, kvs, checkQuality) => {
    functionRemoveByMultipleKV(cid, itemId, amount, kvs, checkQuality)
});

function functionRemoveAny(player, itemidsent, amount, openedInv) {
    let src = source
    let playerinvname = 'ply-' + player
    let string = `DELETE FROM inventory WHERE name='${playerinvname}' and item_id='${itemidsent}' LIMIT ${amount}`
    exports.oxmysql.execute(string, {}, function () {
        emit("server-request-update-src", player, src)
    });
}

function functionRemoveBySlot(player, itemidsent, amount, slotId, openedInv) {
    let src = source
    let playerinvname = 'ply-' + player
    let string = `DELETE FROM inventory WHERE name='${playerinvname}' and slot='${slotId}' and item_id='${itemidsent}' LIMIT ${amount}`;
    exports.oxmysql.execute(string, {}, function () {
        emit("server-request-update-src", player, src)
    });
}

function functionRemoveByMetaKV(player, itemidsent, amount, metaKey, metaValue) {
    let src = source
    let playerinvname = 'ply-' + player

    let string = `SELECT id, information FROM inventory WHERE item_id='${itemidsent}' AND name='${playerinvname}'`;
    exports.oxmysql.execute(string, {}, function(inventory) {
        if (inventory) {
            let itemids = "0"
    
            for (let i = 0; i < inventory.length; i++) {
                let meta = JSON.parse(inventory[i].information)
                if (meta[metaKey] == metaValue) {
                    itemids = itemids + "," + inventory[i].id
                }
            }
    
            exports.oxmysql.query(`DELETE FROM inventory WHERE id IN (${itemids}) LIMIT ${amount}`, {}, function () {
                if (src != 0) {
                    emit("server-request-update-src", player, src)
                }
            });
        }
    });
}

function functionRemoveByMultipleKV(cid, itemId, amount, kvs, checkQuality) {
    let src = source
    let playerInventory = 'ply-' + cid
    let query = `DELETE FROM inventory WHERE name = '${playerInventory}' AND item_id = '${itemId}' AND (information LIKE '${kvs}') AND quality = '${checkQuality}' LIMIT ${amount}`;

    exports.oxmysql.execute(query, {}, function () {
        emit("server-request-update-src", cid, src)
    });
}

RegisterServerEvent("request-dropped-items")
onNet("request-dropped-items", async (player) => {
    let src = source;
    emitNet("requested-dropped-items", src, JSON.stringify(Object.assign({}, DroppedInventories)));
});

RegisterServerEvent("ev-inventory:matBagUpdate")
onNet("ev-inventory:matBagUpdate", async(pMetaId, pMeta) => {
    console.log(pMetaId, pMeta)
    let src = source;
});

RegisterServerEvent("server-request-update")
onNet("server-request-update", async (player) => {
    let src = source
    let playerinvname = 'ply-' + player
    let string = `SELECT count(item_id) as amount, id, item_id, name, information, slot, dropped FROM inventory WHERE name = 'ply-${player}' group by item_id`;
    exports.oxmysql.execute(string, {}, function (inventory) {
        emitNet("inventory-update-player", src, [inventory, 0, playerinvname]);
    });
});

RegisterServerEvent("server-request-update-src")
onNet("server-request-update-src", async (player, src) => {
    let playerinvname = 'ply-' + player
    let string = `SELECT count(item_id) as amount, item_id, id, name, information, slot, dropped, creationDate, MIN(creationDate) as creationDate FROM inventory WHERE name = '${playerinvname}' group by item_id`; // slot
    exports.oxmysql.execute(string, {}, function (inventory) {
        emitNet("inventory-update-player", src, [inventory, 0, playerinvname]);
        // emitNet('current-items', src, inventory)
    });
});

onNet("server-update-item", async (player, pItemId, pSlot, pData) => {
    let playerinvname = 'ply-' + player
    exports["oxmysql"].execute(`UPDATE inventory set information= '${pData}' WHERE item_id= '${pItemId}' AND slot= '${pSlot}' AND name= '${playerinvname}'`);
});

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghikjlmnopqrstuvwxyz'; //abcdef
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function GenerateInformation(player, itemid, itemdata) {
    let data = Object.assign({}, itemdata);
    let returnInfo = "{}"
    return new Promise((resolve, reject) => {
        if (itemid == "") return resolve(returninfo);
        let timeout = 0;
        if (!isNaN(itemid)) {
            var identifier = Math.floor((Math.random() * 99999) + 1)
            if (itemdata && itemdata.fakeWeaponData) {
                identifier = Math.floor((Math.random() * 99999) + 1)
                identifier = identifier.toString()
            }

            // should I remove that?
            let cartridgeCreated = makeid(3) + "-" + Math.floor((Math.random() * 999) + 1);
            returnInfo = JSON.stringify({ cartridge: cartridgeCreated, serial: identifier })
            timeout = 1;
            clearTimeout(timeout)
            return resolve(returnInfo);
        } else if (Object.prototype.toString.call(itemid) === '[object String]') {
            switch (itemid.toLowerCase()) {
                case "idcard":
                    if (itemdata == itemdata.fake) {
                        returnInfo = JSON.stringify({
                            identifier: itemdata, charID,
                            Name: itemdata.first.replace(/[^\w\s]/gi, ''),
                            Surname: itemdata.last.replace(/[^\w\s]/gi, ''),
                            Sex: itemdata.sex,
                            DOB: itemdata.dob,
                            CERF: itemdata.id
                        })
                        timeout = 1
                        clearTimeout(timeout)
                        return resolve(returnInfo);
                    } else {
                        let string = `SELECT * FROM characters WHERE id = '${player}'`;
                        exports.oxmysql.execute(string, {}, function (result) {
                            let gender = "N/A"; 
                            if (result[0].gender == 0) {
                                gender = "M"; 
                             } else {
                                gender = "F"; 
                            }
                            returnInfo = JSON.stringify({
                                Identifier: result[0].id,
                                Name: result[0].first_name.replace(/[^\w\s]/gi, ''),
                                Surname: result[0].last_name.replace(/[^\w\s]/gi, ''),
                                Sex: gender,
                                DOB: result[0].dob,
                                CERF: result[0].id
                            })
                            timeout = 1
                            clearTimeout(timeout)
                            return resolve(returnInfo);
                        });
                    }
                    break;
                case 'huntingcarcass1':
                case 'huntingcarcass2':
                case 'huntingcarcass3':
                case 'huntingcarcass4':
                    returnInfo = JSON.stringify({
                        Identifier: itemData.identifier
                    });

                    timeout = 1;
                    clearTimeout(timeout);
                    return resolve(returnInfo);
                case "casing":
                    returnInfo = JSON.stringify({ Identifier: itemdata.identifier, type: itemdata.eType, other: itemdata.other})
                    timeout = 1
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "bennysorder":
                    returnInfo = JSON.stringify({
                            order: itemdata.order,
                            vehicle : itemdata.vehicle,
                            list : itemdata.list,
                            _hideKeys: ['list'],
                        })
                    timeout = 1
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "casinoloyalty":
                    returnInfo = JSON.stringify({
                            state_id: itemdata.state_id,
                            _hideKeys: ['state_id'],
                        })
                    timeout = 1
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "np_evidence_marker_yellow":
                case "np_evidence_marker_red":
                case "np_evidence_marker_white":
                case "np_marker_evidence_marker_orange":
                case "np_marker_evidence_marker_light_blue":
                case "np_marker_evidence_marker_light_purple":
                case "evidence":
                    returnInfo = JSON.stringify({ Identifier:itemdata.identifier, type: itemdata.eType, other: itemdata.other })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case 'burnerphone':
                        burnernumber = GenerateBurnerPhoneNumber();
                        returnInfo = JSON.stringify({ Number: burnernumber });
                        timeout = 1;
                        clearTimeout(timeout);
                    return resolve(returnInfo)
                case 'methlabkey':
                        returnInfo = JSON.stringify({
                            location : itemdata.location,
                            doorId: itemdata.doorId,
                            _hideKeys: ['doorId'],
                        });                        
                        timeout = 1;
                        clearTimeout(timeout);
                    return resolve(returnInfo)
                case "heistlaptop1":
                case "heistlaptop2":
                case "heistlaptop3":
                case "heistlaptop4":
                    const randomId = Math.floor(Math.random() * 9999999) + 100000;
                    returnInfo = JSON.stringify({
                        id: randomId,
                        Uses: 10,
                        _hideKeys: ['id'],
                    });
                    timeout = 1;
                    clearTimeout(timeout);
                    return resolve(returnInfo)
                case "bowlingreceipt":
                    returnInfo = JSON.stringify({ 
                        Lane: itemdata.lane 
                    })

                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);      
                case "murdermeal":
                    returnInfo = JSON.stringify({ 
                        inventoryId: itemdata.inventoryId, 
                        slots: itemdata.slots, 
                        weight: itemdata.weight,
                        _hideKeys : ['inventoryId', 'slots', 'weight'], 
                    })

                    timeout = 1;
                    clearTimeout(timeout);
                    return resolve(returnInfo);  
                case "burgershotbag":
                    returnInfo = JSON.stringify({ 
                        inventoryId: itemdata.inventoryId, 
                        slots: itemdata.slots, 
                        weight: itemdata.weight,
                        _hideKeys : ['inventoryId', 'slots', 'weight'], 
                    })

                    timeout = 1;
                    clearTimeout(timeout);
                    return resolve(returnInfo);

                case "evidence":
                    returnInfo = JSON.stringify({ Identifier: itemdata.identifier, type: itemdata.eType, other: itemdata.other })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                    case "ownerreceipt":
                        returnInfo = JSON.stringify({Price: itemdata.Price,Creator: itemdata.Creator,Comment: itemdata.Comment})
                        timeout = 1;
                        clearTimeout(timeout)
                        return resolve(returnInfo);
                    case "pdbadge":
                        returnInfo = JSON.stringify({
                            name: itemdata.name,
                            badge: itemdata.badge,
                            rank: itemdata.rank,
                            department: itemdata.department,
                            image: itemdata.image,
                            callsign: itemdata.callsign,
                            _hideKeys: [ "badge", "rank", "department", "image", "callsign"],
                        })
                        timeout = 1;
                        clearTimeout(timeout)
                        return resolve(returnInfo);
                    // case "tempcertificate":
                    //     returnInfo = JSON.stringify({
                    //         stateId: itemdata.stateId,
                    //         license: itemdata.license,
                    //         certExpiry: itemdata.certExpiry,
                    //     })
                    //     timeout = 1;
                    //     clearTimeout(timeout) 
                    //     return resolve(returnInfo);
                case "rentalpapers":
                    returnInfo = JSON.stringify({ 
                        Plate: itemdata.Plate, 
                        netId: itemdata.netId,
                        _hideKeys : ['netId']
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "receipt":
                        returnInfo = JSON.stringify({
                            Price: itemdata.Price,
                            Creator: itemdata.Creator,
                            Comment: itemdata.Comment
                        })
                        timeout = 1;
                        clearTimeout(timeout)
                        return resolve(returnInfo);


                case "hat" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "glasses" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "mask" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "chain" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "jacket" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "shirt" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "vest" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "backpack" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "pants" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "shoes" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "watch" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "braclets" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                case "earrings" :
                    returnInfo = JSON.stringify({
                        gender: itemdata.gender,
                        prop: itemdata.prop,
                        txd: itemdata.txd
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);

                case "photo" :
                    returnInfo = JSON.stringify({
                        url: itemdata.image,
                        location: itemdata.location
                    })
                    timeout = 1;
                    clearTimeout(timeout)
                    return resolve(returnInfo);
                    

                case "vendorlicense":
                        var myDate = itemdata.expires; /* "01-10-2024" */
                        myDate = myDate.split("-");
                        var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);

                        returnInfo = JSON.stringify({
                            State_ID: itemdata.state_id,
                            certExpiry: newDate.getTime(),
                            Date: itemdata.expires
                        })
                        
                        /* var timestamp = new Date().getTime();
                        console.log(Math.floor(timestamp + itemdata.expires)) */

                        
                        
                        timeout = 1;
                        clearTimeout(timeout)
                        return resolve(returnInfo);

                case "drivingtest":
                    if (data.id) {
                        let string = `SELECT * FROM driving_tests WHERE id = '${data.id}'`;
                        exports.oxmysql.execute(string, {}, function (result) {
                            if (result[0]) {
                                let ts = new Date(parseInt(result[0].timestamp) * 1000)
                                let testDate = ts.getFullYear() + "-" + ("0" + (ts.getMonth() + 1)).slice(-2) + "-" + ("0" + ts.getDate()).slice(-2)
                                returninfo = JSON.stringify({ ID: result[0].id, CID: result[0].cid, Instructor: result[0].instructor, Date: testdata })
                                timeout = 1;
                                clearTimeout(timeout)
                            }
                            return resolve(returninfo);
                        });
                    } else {
                        timeout = 1;
                        clearTimeout(timeout)
                        return resolve(returnInfo);
                    }
                    break;
                default:
                    timeout = 1
                    clearTimeout(timeout)
                    return resolve(returnInfo);
            }
        } else {
            return resolve(returnInfo);
        }

        setTimeout(() => {
            if (timeout == 0) {
                return resolve(returnInfo);
            }
        }, 500)
    });
}

RegisterServerEvent("server-inventory-give")
onNet("server-inventory-give", async (player, itemid, slot, amount, generateInformation, itemdata, openedInv, returnData) => {
    let src = source
    let playerinvname = 'ply-' + player
    let information = "{}"
    let creationDate = Date.now()


    if (!generateInformation) {
        console.log("shouldnt generate info")
        information = returnData
    } else {
        console.log("should generate info")
        if (itemid == "idcard") {
            if (generateInformation) {
                information = await GenerateInformation(player, itemid, itemdata)
            }
        }
    
        if (itemid == "evidence") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        if (itemid == "bennysorder") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        if (itemid == "ownerreceipt") {
            information = await GenerateInformation(player, itemid, itemdata) 
        }
    
        if (itemid == "methlabkey") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        // if (itemid == "tempcertificate") {
        //     information = await GenerateInformation(player, itemid, itemdata)
        // }
        if (itemid == "bowlingreceipt") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        if (itemid == "burgershotbag") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        if (itemid == "casinoloyalty") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        if (itemid == "murdermeal") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        if (itemid == "receipt") {
            information = await GenerateInformation(player, itemid, itemdata)
        }

        if (itemid == "vendorlicense") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        if (itemid == "heistlaptop1" || itemid == "heistlaptop2" || itemid == "heistlaptop3" || itemid == "heistlaptop") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
        
        if (itemid == "pdbadge") {
            information = await GenerateInformation(player, itemid, itemdata)
        }
    
        if (itemid == "rentalpapers") {
            information = await GenerateInformation(player, itemid, generateInformation)
        }


        if (itemid == "hat") {  
            console.log()
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "glasses") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "mask") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "chain") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "jacket") {  
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "shirt") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "vest") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "backpack") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "pants") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "shoes") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "watch") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "braclets") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "earrings") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "photo") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
        if (itemid == "tcgcard") { 
            information = await GenerateInformation(player, itemid, itemdata)
        }
    }

    if (information === "{}") {
        information = JSON.stringify(itemdata || {});
    }

    let values = `('${playerinvname}','${itemid}','${information}','${slot}','${creationDate}')`
    if (amount > 1) {
        for (let i = 2; i <= amount; i++) {
            values = values + `,('${playerinvname}','${itemid}','${information}','${slot}','${creationDate}')`
        }
    }
    let query = `INSERT INTO inventory (name, item_id, information, slot, creationDate) VALUES ${values};`
    exports.oxmysql.execute(query, {}, function () {
        emit("server-request-update-src", player, src)
    });

});

RegisterServerEvent("server-inventory-refresh")
onNet("server-inventory-refresh", async (player, sauce) => {
    let src = source
    if (!src) {
        src = sauce
    }

    let string = `SELECT count(item_id) as amount, id, name, item_id, information, slot, dropped, creationDate FROM inventory where name= 'ply-${player}' group by slot`;
    exports.oxmysql.execute(string, {}, function (inventory) {
        if (!inventory) { } else {
            var invArray = inventory;
            var arrayCount = 0;
            var playerinvname = 'ply-' + player
            emitNet("inventory-update-player", src, [invArray, arrayCount, playerinvname]);
            emitNet('current-items', src, invArray)
            emitNet("Inventory-brought-update", src, JSON.stringify(Object.assign({}, hasBrought)));
        }
    })
})

RegisterServerEvent("ev-inventory:server:weightChange")
onNet("ev-inventory:server:weightChange", async (player, weight) => {
    let src = source
    if (!src) {
        src = sauce
    }
    console.log(player, weight)
})

RegisterServerEvent("server-inventory-open")
onNet("server-inventory-open", async (coords, player, secondInventory, targetName, itemToDropArray, state, targetWeight, targetSlots, sauce) => {
    let src = source
    if (!src) {
        src = sauce
    }

    let playerinvname = 'ply-' + player
    if (InUseInventories[targetName] || InUseInventories[playerinvname]) {

        if (InUseInventories[playerinvname]) {
            if ((InUseInventories[playerinvname] != player)) {
                return
            } else {

            }
        }
        if (InUseInventories[targetName]) {
            if (InUseInventories[targetName] == player) {

            } else {
                secondInventory = "69"
            }
        }
    }
    let string = `SELECT count(item_id) as amount, id, name, item_id, information, slot, dropped, creationDate FROM inventory where name= 'ply-${player}'  group by slot`;
    exports.oxmysql.execute(string, {}, function (inventory) {

        var invArray = inventory;
        var i;
        var arrayCount = 0;

        InUseInventories[playerinvname] = player;

        if (secondInventory == "1") {
            var targetinvname = targetName

            let string = `SELECT count(item_id) as amount, id, name, item_id, information, slot, dropped, creationDate FROM inventory WHERE name = '${targetinvname}' group by slot`;
            exports.oxmysql.execute(string, {}, function (inventory2) {
                if (targetWeight != null) {
                    emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, inventory2, 0, targetinvname, 500, true, targetWeight, targetSlots]);
                } else {
                    emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, inventory2, 0, targetinvname, 500, true]);
                }
                InUseInventories[targetinvname] = player
            });
        }

        else if (secondInventory == "3") {
            let Key = "" + DataEntries + "";
            let NewDroppedName = 'Drop-' + Key;

            DataEntries = DataEntries + 1
            var invArrayTarget = [];
            DroppedInventories[NewDroppedName] = { position: { x: coords[0], y: coords[1], z: coords[2] }, name: NewDroppedName, used: false, lastUpdated: Date.now() }

            InUseInventories[NewDroppedName] = player;

            invArrayTarget = JSON.stringify(invArrayTarget)
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, invArrayTarget, 0, NewDroppedName, 500, false, 1000, 50]);
        }

        else if (secondInventory == "13") {

            let Key = "" + DataEntries + "";
            let NewDroppedName = 'Drop-' + Key;
            DataEntries = DataEntries + 1
            for (let Key in itemToDropArray) {
                for (let i = 0; i < itemToDropArray[Key].length; i++) {
                    let objectToDrop = itemToDropArray[Key][i];
                    db(`UPDATE inventory SET slot='${i + 1}', name='${NewDroppedName}', dropped='1' WHERE name='${Key}' and slot='${objectToDrop.faultySlot}' and item_id='${objectToDrop.faultyItem}' `);
                }
            }

            DroppedInventories[NewDroppedName] = { position: { x: coords[0], y: coords[1], z: coords[2] }, name: NewDroppedName, used: false, lastUpdated: Date.now() }
            emitNet("Inventory-Dropped-Addition", -1, DroppedInventories[NewDroppedName])

        } else if (secondInventory == "42069") {
            let NewDroppedName = "Drop-" + DataEntries.toString();

            DataEntries = DataEntries + 1;

            DroppedInventories[NewDroppedName] = {
                position: {
                    x: coords[0],
                    y: coords[1],
                    z: coords[2]
                },
                name: NewDroppedName,
                used: true,
                lastUpdated: Date.now()
            }

            emitNet("Inventory-Dropped-Addition", -1, DroppedInventories[NewDroppedName])

            let creationDate = Date.now()
            let information = "{}";

            for (let Key in itemToDropArray) {
                for (let i = 0; i < itemToDropArray[Key].length; i++) {
                    let objectToDrop = itemToDropArray[Key][i];

                    if (objectToDrop.generateInformation || objectToDrop.data) {
                        let tempInfo = GenerateInformation(player, objectToDrop.itemid, objectToDrop.data);
                        information = tempInfo
                    }
                   
                    if (objectToDrop.amount > 1) {
                        for (let i = 2; i <= objectToDrop.amount; i++) {
                            db(`INSERT INTO inventory (item_id, name, information, slot, dropped, creationDate) VALUES ('${objectToDrop.itemid}','${NewDroppedName}','${information}','${objectToDrop.slot}', '1', '${creationDate}' );`);
                        }
                    }
                    db(`INSERT INTO inventory (item_id, name, information, slot, dropped, creationDate) VALUES ('${objectToDrop.itemid}','${NewDroppedName}','${information}','${objectToDrop.slot}', '1', '${creationDate}' );`);
                    emit("ev-log:server:CreateLog", "invOverweight", "Inventory Overwieght", "red", "Player Name :  **" + GetPlayerName(src) + "** (" + player + ") Dropped overwieght Item/s: " + objectToDrop.itemid + " Amount: " + itemToDropArray[Key].length, false, src)
                }
            }
        } else if (secondInventory == "2") {
            var targetinvname = targetName;
            var shopArray = ConvenienceStore();
            var shopAmount = 17;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 0, false,]);
        } else if (secondInventory == "4") {
            var targetinvname = targetName;
            var shopArray = HardwareStore();
            var shopAmount = 42;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 0, false, 2000, 42]);
        } else if (secondInventory == "5") {
            var targetinvname = targetName;
            var shopArray = GunStore();
            var shopAmount = 11;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 0, false]);
        } else if (secondInventory == "6") {
            var targetinvname = targetName;
            var shopArray = GunStore2();
            var shopAmount = 5;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 0, false]);
        } else if (secondInventory == "10") {
            var targetinvname = targetName;
            var shopArray = PoliceArmory();
            var shopAmount = 45;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 0, false]);
        } else if (secondInventory == "15") {
            var targetinvname = targetName;
            var shopArray = EMT();
            var shopAmount = 11;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "14") {
            var targetinvname = targetName;
            var shopArray = courthouse();
            var shopAmount = 1;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "18") {
            var targetinvname = targetName;
            var shopArray = TacoTruck();
            var shopAmount = 14;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "411") {
            var targetinvname = targetName;
            var shopArray = Tier4Craft();
            var shopAmount = 54;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "41") {
            var targetinvname = targetName;
            var shopArray = Tier3Craft();
            var shopAmount = 40;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "40") {
            var targetinvname = targetName;
            var shopArray = Tier2Craft();
            var shopAmount = 30;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "39") {
            var targetinvname = targetName;
            var shopArray = Tier1Craft();
            var shopAmount = 23;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "38") {
            var targetinvname = targetName;
            var shopArray = CraftTrash();
            var shopAmount = 11;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "baitinventory") {
            var targetinvname = targetName;
            var shopArray = baitinventory();
            var shopAmount = 0;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "22") {
            var targetinvname = targetName;
            var shopArray = JailFood();
            var shopAmount = 1;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "25") {
            var targetinvname = targetName;
            var shopArray = JailMeth();
            var shopAmount = 1;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "12") {
            var targetinvname = targetName;
            var shopArray = burgiestore();
            var shopAmount = 8;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "898") {
            var targetinvname = targetName;
            var shopArray = tokyos();
            var shopAmount = 5;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "600") {
            var targetinvname = targetName;
            var shopArray = policeveding();
            var shopAmount = 9;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "27") {
            var targetinvname = targetName;
            var shopArray = Mechanic();
            var shopAmount = 2;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "35") {
            var targetinvname = targetName;
            var shopArray = recycle();
            var shopAmount = 9;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 1000, false]);
        } else if (secondInventory == "31") {
            var targetinvname = targetName;
            var shopArray = Blackmarket();
            var shopAmount = 5;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "998") {
            var targetinvname = targetName;
            var shopArray = slushy();
            var shopAmount = 1;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "32") {
            var targetinvname = targetName;
            var shopArray = VendingFruits();
            var shopAmount = 14;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "921") {
            var targetinvname = targetName;
            var shopArray = asslockpick();
            var shopAmount = 1;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "26") {
            var targetinvname = targetName;
            var shopArray = assphone();
            var shopAmount = 1;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "28") {
            var targetinvname = targetName;
            var shopArray = Tuner();
            var shopAmount = 3;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "36") {
            var targetinvname = targetName;
            var shopArray = VendingMachineBeverage();
            var shopAmount = 2;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "37") {
            var targetinvname = targetName;
            var shopArray = VendingMachineFood();
            var shopAmount = 2;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "714") {
            var targetinvname = targetName;
            var shopArray = smelter();
            var shopAmount = 1;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "42122") {
            var targetinvname = targetName;
            var shopArray = DigitaldenCraft();
            var shopAmount = 17;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "42077") {
            var targetinvname = targetName;
            var shopArray = news();
            var shopAmount = 6;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "997") {
            var targetinvname = targetName;
            var shopArray = prison();
            var shopAmount = 7;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "99") {
            var targetinvname = targetName;
            var shopArray = bestbuds();
            var shopAmount = 4;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "1311") {
            var targetinvname = targetName;
            var shopArray = BeanMachineOrder();
            var shopAmount = 6;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "1312") {
            var targetinvname = targetName;
            var shopArray = BeanMachineCraft();
            var shopAmount = 5;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "34") {
            var targetinvname = targetName;
            var shopArray = HuntingShop();
            var shopAmount = 6;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "46") {
            var targetinvname = targetName;
            var shopArray = DrinksStore();
            var shopAmount = 22;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "321") {
            var targetinvname = targetName;
            var shopArray = bennys();
            var shopAmount = 1;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "42072") {
            var targetinvname = targetName;
            var shopArray = DigitaldenCraft();
            var shopAmount = 17;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "42073") {
            var targetinvname = targetName;
            var shopArray = digitalden();
            var shopAmount = 5;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "42090") {
            var targetinvname = targetName;
            var shopArray = Mechanics();
            var shopAmount = 85;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "42091") {
            var targetinvname = targetName;
            var shopArray = MechanicsMotorcycle();
            var shopAmount = 26;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "42076") {
            var targetinvname = targetName;
            var shopArray = DrinksStore();
            var shopAmount = 22;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "42132") {
            var targetinvname = targetName;
            var shopArray = PawnHub();
            var shopAmount = 4;
            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        } else if (secondInventory == "7") {
            var targetinvname = targetName;
            var shopArray = DroppedItem(itemToDropArray);

            itemToDropArray = JSON.parse(itemToDropArray)
            var shopAmount = itemToDropArray.length;

            emitNet("inventory-open-target", src, [invArray, arrayCount, playerinvname, shopArray, shopAmount, targetinvname, 500, false]);
        }
        else {
            emitNet("inventory-update-player", src, [invArray, arrayCount, playerinvname]);
        }
    });
});

RegisterServerEvent("server-inventory-close")
onNet("server-inventory-close", async (player, targetInventoryName) => {
    let src = source

    if (targetInventoryName.startsWith("Trunk"))
        emitNet("toggle-animation", src, false);
    InUseInventories = InUseInventories.filter(item => item != player);
    if (targetInventoryName.indexOf("Drop") > -1 && DroppedInventories[targetInventoryName]) {
        if (DroppedInventories[targetInventoryName].used === false) {
            delete DroppedInventories[targetInventoryName];
        } else {
            let string = `SELECT count(item_id) as amount, item_id, name, information, slot, dropped FROM inventory WHERE name='${targetInventoryName}' group by item_id `;
            exports.oxmysql.execute(string, {}, function (result) {
                if (result.length == 0 && DroppedInventories[targetInventoryName]) {
                    delete DroppedInventories[targetInventoryName];
                    emitNet("Inventory-Dropped-Remove", -1, [targetInventoryName])
                }
            });
        }
    }
    emit("server-request-update-src", player, source)
});

let IllegalSearchString = `'weedoz', 'weed5oz', 'coke50g', 'thermite', 'weedq', 'weed12oz', 'oxy', '1gcrack', '1gcocaine', 'joint'`

RegisterServerEvent("sniffAccepted")
onNet("sniffAccepted", async (t) => {
    let src = source
    emitNet('sniffAccepted', t, src)
});

RegisterServerEvent("SniffCID")
onNet("SniffCID", async (cid, src) => {

    let name = cid;
    let string = `SELECT count(item_id) as amount, id, item_id, name, information, slot, lity, dropped FROM inventory WHERE name='${name}' and item_id IN (${IllegalSearchString}) group by item_id`;

    exports.oxmysql.execute(string, {}, function (items) {
        if (item.length > 0) {
            emitNet("k9:SniffConfirmed", src)
        } else {
            emitNet("k9:SniffConfirmedFail", src)
        }
    });
});

RegisterServerEvent("sniffLicensePlateCheck")
onNet("sniffLicensePlateCheck", async (plate) => {
    let src = source
    let car = 'Truck-' + plate
    let glovebox = 'Glovebox-' + plate

    let string = `SELECT count(item_id) as amount, id, item_id, name, information, slot, quality, dropped FROM inventory WHERE name='${car}' OR name='${glovebox}') and item_id IN (${IllegalSearchString}) group by item_id`;

    exports.oxmysql.execute(string, {}, function (item) {
        if (item.lenth > 0) {
            emitNet("k9:SniffConfirmed", src)
        } else {
            emitNet("k9:SniffConfirmedFail", src)
        }
    });
}); // done an checked 44.45 on stream.

RegisterServerEvent("inv:delete")
onNet("inv:delete", async (inv) => {
    db(`DELETE FROM inventory WHERE name='${inv}'`);
});

onNet("server-inventory-remove-slot", async (player, itemidsent, amount, slot) => {
    var playerinvname = 'ply-' + player
    db(`DELETE FROM inventory WHERE name='${playerinvname}' and item_id='${itemidsent}' and slot='${slot}' LIMIT ${amount}`);
});

RegisterServerEvent("ev-inventory:craftProgression")
onNet("ev-inventory:craftProgression", async (data, cid) => {
    let src = source
    let abuseItems = [
        "wood",
        "aluminium",
        "plastic",
        "copper",
        "electronics",
        "rubber",
        "scrapmetal",
        "steel",
        "glass",
    ]
    emitNet("ev-log:server:CreateLog", "InvCraft", "Inventory Craft", "green", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") has crafted a " + data.item + " Amount: " + data.amount, false, src)

    for(let i = 0; i < abuseItems.length; i++) {
        if(data.item.includes(abuseItems[i])) {
            return
        }
    }
    exports["ev-progression"].addIllegalRep(src, data.amount, "craftingrep")
});

RegisterServerEvent("server-ragdoll-items")
onNet("server-ragdoll-items", async (player) => {
    let currInventoryName = `ply-${player}`
    let newInventoryName = `wait-${player}`
    db(`UPDATE inventory SET name='${newInventoryName}', WHERE name='${currInventoryName}' and dropped=0 and item_id="mobilephone" `);
    db(`UPDATE inventory SET name='${newInventoryName}', WHERE name='${currInventoryName}' and dropped=0 and item_id="idcard" `);
    await db(`DELETE FROM inventory WHERE name='${currInventoryName}'`);
    db(`UPDATE inventory SET name='${currInventoryName}', WHERE name='${newInventoryName}' and dropped=0`);
});

function payStore(storeName, amount, itemid) {

    if (storeName.indexOf("Traphouse") > -1) {
        let id = storeName.split('|')

        id = id[0].split('-')[1]

        emit('traps:pay', id, amount)
    } else if (storeName.indexOf("Shop") > -1) {

    } else {

        let cid = storeName.split('|')
        let name = cid[1]
        if (itemList[itemid].illegal && mathrandom(1, 100) > 80) {
            emitNet('IllegalSale',"Store Owner", name)
        }
        cid = cid[0].split('-')[1]
        emit('server:PayStoreOwner', cid, amount)
    }
}//

RegisterServerEvent('server-jail-item')
onNet("server-jail-item", async (player, isSentToJail) => {
    print("isSentToJail", isSentToJail)
    let currInventoryName = `${player}`
    let newInventoryName = `${player}`

    if (isSentToJail) {
        currInventoryName = `jail-${player}`
        newInventoryName = `ply-${player}`
    } else {
        currInventoryName = `ply-${player}`
        newInventoryName = `jail-${player}`
    }

    db(`UPDATE inventory SET name='${currInventoryName}', WHERE name='${newInventoryName}'`);
});

setTimeout(CleanDroppedInventory, 5)

function DroppedItem(itemArray) {
    itemArray = JSON.parse(itemArray)
    var shopItems = [];

    shopItems[0] = { item_id: itemArray[0].itemid, id: 0, name: "shop", information: "{}", slot: 1, amount: itemArray[0].amount };

    return JSON.stringify(shopItems);
}

function BuildInventory(Inventory) {
    let buildInv = Inventory
    let invArray = {};
    itemCount = 0;
    for (let i = 0; i < buildInv.length; i++) {
        invArray[itemCount] = { item_id: buildInv[i].item_id, id: buildInv[i].id, name: buildInv[i].name, information: buildInv[i], slot: buildInv[i].slot };
        itemCount = itemCount + 1
    }
    return [JSON.stringify(invArray), itemCount]
}

function mathrandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const DEGREDATION_INVENTORY_CHECK = 1000 * 60 * 60;
const DEGREDATION_TIME_BROKEN = 1000 * 60 * 40320;
const DEGREDATION_TIME_WORN = 1000 * 60 * 201000;

function CleanDroppedInventory() {
    onNet("server-ragdoll-items", async (player) => {
        let currInventoryName = `ply-${player}`
        let newInventoryName = player
        db(`UPDATE inventory SET name='${newInventoryName}', WHERE name='${currInventoryName}' and dropped=0 and item_id="mobilephone" `);
        db(`UPDATE inventory SET name='${newInventoryName}', WHERE name='${currInventoryName}' and dropped=0 and item_id="idcard" `);
        db(`UPDATE inventory SET name='${currInventoryName}', WHERE name='${newInventoryName}' and dropped=0`);
    })
};

RegisterServerEvent("server-inventory-move")
onNet("server-inventory-move", async (cid, pData, playerPos) => {
    let src = source
    let targetSlot = pData[0]
    let originSlot = pData[1]
    let targetInventory = pData[2].replace(/"/g, "");
    let originInventory = pData[3].replace(/"/g, "");
    let isPurchase = pData[4]
    let itemCosts = pData[5]
    let itemId = pData[6]
    let metaInformation = pData[7]
    let amount = pData[8]
    let isCraft = pData[9]
    let isWeapon = pData[10]
    let PlayerStore = pData[11]

    let creationDate = Date.now()
    if ((targetInventory.indexOf("Drop") > -1 || targetInventory.indexOf("hidden") > -1) && DroppedInventories[targetInventory]) {
        if (DroppedInventories[targetInventory].used === false) {

            DroppedInventories[targetInventory] = {
                position: {
                    x: playerPos[0],
                    y: playerPos[1],
                    z: playerPos[2]
                },
                name: targetInventory,
                used: true,
                lastUpdated: Date.now()
            }
            emitNet("Inventory-Dropped-Addition", -1, DroppedInventories[targetInventory])
            emit("ev-log:server:CreateLog", "ItemDrop", "Inventory", "red", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") Dropped Item: " + itemId + " Amount: " + amount )
        }
    }

    let info = "{}"
    if (isPurchase) {
        info = await GenerateInformation(cid, itemId);

        if (isWeapon) {
            hasBrought[cid] = true;
            emitNet("Inventory-brought-update", -1, JSON.stringify(Object.assign({}, hasBrought)));
            emit("ev-log:server:CreateLog", "InvShop", "Inventory Weapon-Shop", "green", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") bought a " + itemId + " Amount: " + amount + " for $" + itemCosts)
        }  

        info = await GenerateInformation(cid, itemId)
        exports["ev-inventory"].removeMoneyInv(src, itemCosts)

        if (!PlayerStore) {
            for (let i = 0; i < parseInt(amount); i++) {
                exports["oxmysql"].execute(`INSERT INTO inventory (item_id, name, information, slot, creationDate) VALUES ('${itemId}','${targetInventory}','${info}','${targetSlot}','${creationDate}' );`);
            }
            emit("ev-log:server:CreateLog", "InvShop", "Inventory Shop", "green", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") bought a " + itemId + " Amount: " + amount + " for $" + itemCosts)
        } else if (isCraft) {
            info = await GenerateInformation(cid, itemId)

            exports["ev-progression"].addIllegalRep(src, amount, "craftingrep")

            for (let i = 0; i < parseInt(amount); i++) {
                exports["oxmysql"].execute(`INSERT INTO inventory (item_id, name, information, slot, creationDate) VALUES ('${itemId}','${targetInventory}','${info}','${targetSlot}','${creationDate}' );`);
            }
            emitNet("ev-log:server:CreateLog", "InvCraft", "Inventory Craft", "green", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") has crafted a " + itemId + " Amount: " + amount)
        } else {
            if (targetInventory.indexOf("Drop") > -1 || targetInventory.indexOf("hidden") > -1) {
                exports["oxmysql"].execute(`INSERT INTO inventory SET slot = '${targetSlot}', name = '${targetInventory}', dropped = '1' WHERE slot = '${originSlot}' AND name = '${originInventory}'`);
            } else {
                exports["oxmysql"].execute(`UPDATE inventory SET slot = '${targetSlot}', name = '${targetInventory}', dropped = '0' WHERE slot = '${originSlot}' AND name = '${originInventory}'`);
            }
        }
    } else {
        if (isCraft == true) {
            info = await GenerateInformation(cid, itemId)
            exports["ev-progression"].addIllegalRep(src, amount, "craftingrep")

            for (let i = 0; i < parseInt(amount); i++) {
                exports["oxmysql"].execute(`INSERT INTO inventory (item_id, name, information, slot, creationDate) VALUES ('${itemId}','${targetInventory}','${info}','${targetSlot}','${creationDate}' );`);
            }
        }
        exports["oxmysql"].execute(`UPDATE inventory SET slot = '${targetSlot}', name = '${targetInventory}', dropped = '0' WHERE slot = '${originSlot}' AND name = '${originInventory}'`);
        emit("ev-log:server:CreateLog", "InvCraft", "Inventory Craft", "green", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") has crafted a " + itemId + " Amount: " + amount)
    }
});

RegisterServerEvent("server-inventory-swap")
onNet("server-inventory-swap", async (cid, pData, playerPos) => {
    let targetSlot = pData[0]
    let targetInventory = pData[1].replace(/"/g, "");
    let originSlot = pData[2]
    let originInventory = pData[3].replace(/"/g, "");

    let query = `SELECT id FROM inventory WHERE slot = '${targetSlot}' AND name = '${targetInventory}'`;

    exports["oxmysql"].execute(query, {}, function(result) {
        var itemIds = "0"

        for (let i = 0; i < result.length; i++) {
            itemIds = itemIds + "," + result[i].id
        }

        let query = false;

        if (targetInventory.indexOf("Drop") > -1 || targetInventory.indexOf("hidden") > -1) {
            query = `UPDATE inventory SET slot = '${targetSlot}', name = '${targetInventory}', dropped = '1' WHERE slot = '${originSlot}' AND name = '${originInventory}'`;
        } else {
            query = `UPDATE inventory SET slot = '${targetSlot}', name = '${targetInventory}', dropped = '0' WHERE slot = '${originSlot}' AND name = '${originInventory}'`;
        }

        exports["oxmysql"].execute(query, {}, function(inventory) {
            if (originInventory.indexOf("Drop") > -1 || originInventory.indexOf("hidden") > -1) {
                exports["oxmysql"].execute(`UPDATE inventory SET slot = '${originSlot}', name = '${originInventory}', dropped = '1' WHERE id IN (${itemIds})`);
            } else {
                exports["oxmysql"].execute(`UPDATE inventory SET slot = '${originSlot}', name = '${originInventory}', dropped = '0' WHERE id IN (${itemIds})`);
            }
        });
    });
});

RegisterServerEvent("server-inventory-stack")
onNet("server-inventory-stack", async (cid, pData, playerPos) => {
    let src = source
    let targetSlot = pData[0]
    let moveAmount = pData[1]
    let targetInventory = pData[2].replace(/"/g, "");
    let originSlot = pData[3]
    let originInventory = pData[4].replace(/"/g, "");
    let isPurchase = pData[5]
    let itemCosts = pData[6]
    let itemId = pData[7]
    let metaInformation = pData[8]

    let amount = pData[9]
    let isCraft = pData[10]
    let isWeapon = pData[11]
    let PlayerStore = pData[12]
    let amountRemaining = pData[13]

    let creationDate = Date.now()

    if ((targetInventory.indexOf("Drop") > -1 || targetInventory.indexOf("hidden") > -1) && DroppedInventories[targetInventory]) {
        if (DroppedInventories[targetInventory].used === false) {
            DroppedInventories[targetInventory] = {
                position: {
                    x: playerPos[0],
                    y: playerPos[1],
                    z: playerPos[2]
                },
                name: targetInventory,
                used: true,
                lastUpdated: Date.now()
            }

            emitNet("Inventory-Dropped-Addition", -1, DroppedInventories[targetInventory])
        }
    }

    let info = "{}"
    if (isPurchase) {
        info = await GenerateInformation(cid, itemId)
        exports["ev-inventory"].removeMoneyInv(src, itemCosts)

        if (isWeapon) {
            hasBrought[cid] = true;
            emitNet("Inventory-brought-update", -1, JSON.stringify(Object.assign({}, hasBrought)));
            emit("ev-log:server:CreateLog", "InvShop", "Inventory Weapon-Shop", "green", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") bought a " + itemId + " Amount: " + amount + " for $" + itemCosts)
        }  
        if (!PlayerStore) {
            for (let i = 0; i < parseInt(amount); i++) {
                exports["oxmysql"].execute(`INSERT INTO inventory (item_id, name, information, slot, creationDate) VALUES ('${itemId}','${targetInventory}','${info}','${targetSlot}','${creationDate}' );`);
            }
        }

        if (PlayerStore) {
            exports["oxmysql"].execute(`UPDATE inventory SET slot = '${targetSlot}', name = '${targetInventory}', dropped = '0' WHERE slot = '${originSlot}' AND name = '${originInventory}'`);
        }
        emit("ev-log:server:CreateLog", "InvShop", "Inventory Shop", "green", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") bought a " + itemId + " Amount: " + amount + " for $" + itemCosts)
    } else if (isCraft) {
        info = await GenerateInformation(cid, itemId)
        exports["ev-progression"].addIllegalRep(src, amount, "craftingrep")
        
        for (let i = 0; i < parseInt(amount); i++) {
            exports["oxmysql"].execute(`INSERT INTO inventory (item_id, name, information, slot, creationDate) VALUES ('${itemId}','${targetInventory}','${info}','${targetSlot}','${creationDate}' );`);
        }  
    } else {
        if (amountRemaining > 0) {
            moveAmount = moveAmount + 1
        };

        let query = `SELECT * FROM inventory WHERE slot='${originSlot}' and name='${originInventory}' LIMIT ${moveAmount};`
        exports.oxmysql.execute(query, {}, function (inventory) {
            if (inventory) {
                let toupdate = 0;
                let itemids = "0";

                inventory.forEach(function(item, index) {
                    if ((amountRemaining > 0) && (index == (inventory.length - 1))) {
                        toupdate = item.creationDate
                    } else {
                        itemids = itemids + "," + item.id
                    }
                });

                let dropped = 0;
                if (targetInventory.indexOf("Drop") > -1 || targetInventory.indexOf("hidden") > -1) {
                    dropped = 1;
                };

                exports["oxmysql"].execute(`UPDATE inventory SET slot='${targetSlot}', name='${targetInventory}', dropped='${dropped}' WHERE id IN (${itemids})`);

                if (toupdate != 0) {
                    emitNet("inventory:qualityUpdate", src, originSlot, originInventory, toupdate);
                };
                emit("ev-log:server:CreateLog", "ItemDrop", "Inventory Drop", "green", "Player Name :  **" + GetPlayerName(src) + "** (" + cid + ") Crafted Item " + itemId + " Amount: " + amount + " Total Amount" + amountRemaining)
            }
        });
    }
});

onNet("inventory:degItem", async (pItemId, pPercent, pItemClass, pCid) => {
    let src = source
    if (itemList[pItemClass.toString()] == null || itemList[pItemClass.toString()].decayrate <= 0.0) {
        return
    }

    let percent = Math.round(((TimeAllowed * itemList[pItemClass.toString()].decayrate) / 100) * pPercent)

    exports.oxmysql.execute(`UPDATE inventory set creationDate = creationDate - ${percent} WHERE id = ${pItemId}`, {}, function() {
        emit("server-request-update-src", pCid, src)
    });
});


onNet('onResourceStart', (resource) => {
    if (resource == GetCurrentResourceName()) {
        db(`DELETE FROM inventory WHERE name like '%Drop%'`)
    }
})

function deleteHidden() {
    db(`DELETE FROM inventory WHERE name like '%Hidden%' OR name like '%trash%'`)
}

function deleteHiddenHandler() {
    setTimeout(250000, deleteHidden())
}

RegisterServerEvent('stores:pay:cycle')
onNet('store:pay:cycle', async (storeList) => {

    storeList = JSON.parse(storeList)
    for (let key in storeList) {

        if (storeList[key].house_model == 4) {
            let trap = storeList[key]["trap"]
            let id = storeList[key]["dbid"]
            let name = storeList[key]["stash"]
            let storeName = storeList[key]["name"]
            let reputation = storeList[key]["reputation"]
            let luckyslot = 1
            let luckroll = mathrandom(1, 100)
            let amount = 1
            let inventoryType = 'house_information'

            if (trap) {
                inventoryType = 'trap_houses'
            }

            let itemid = 0
            let rolled = reputation + luckroll
            if (rolled > 96) {

                if (rolled > 120) {
                    amount = 2
                }
                if (rolled > 150) {
                    amount = 3
                }
                if (rolled > 180) {
                    amount = 4
                }
                if (rolled > 149) {
                    amount = 7
                }

                if (amount > 0) {
                    let slot = mathrandom(1, 2)
                    let string = `SELECT item_id FROM inventory WHERE name = '${name}' and slot = '${slot}'`;
                    exports.oxmysql.execute(string, {}, function (inventory) {
                        if (inventory.length > 0) {
                            emitNet("ai:storewalkout", -1, key)
                            if (amount > inventory.length) {
                                amount = inventory.length
                            }

                            let string = `DELETE FROM inventory WHERE name='${name}' and slot = '${slot}' LIMIT ${amount}`;

                            exports.oxmysql.execute(string, {}, function () { });

                            let itemid = inventory[0].item_id
                            let sellValue = itemList[itemid].price * amount

                            if (reputation < 10) {
                                sellValue = sellValue * 0.5
                            } else if (reputation < 20) {
                                sellValue = sellValue * 0.55
                            } else if (reputation < 30) {
                                sellValue = sellValue * 0.6
                            } else if (reputation < 50) {
                                sellValue = sellValue * 0.65
                            } else if (reputation < 70) {
                                sellValue = sellValue * 0.75
                            } else if (reputation < 80) {
                                sellValue = sellValue * 0.8
                            } else if (reputation < 90) {
                                sellValue = sellValue * 0.9

                            }

                            sellValue = Math.ceil(sellValue)

                            payStore(name, sellValue, itemid)
                            if (rolled == 100 && itemList[itemid].illegal) {
                                reputation = reputation + 1
                                if (reputation < 100) {
                                    let string = `UPDATE ${inventoryType} SET reputation='${reputation}' WHERE id='${id}'`
                                    exports.oxmysql.execute(string, {}, function () { });
                                }
                            }
                        } else {
                            if (reputation > 0 && mathrandom(1, 100) > 98) {
                                reputation = reputation - 1
                                let string = `UPDATE ${inventoryType} SET reputation='${reputation}' WHERE id='${id}'`
                                exports.oxmysql.execute(string, {}, function () { });
                            }
                        }
                        //
                    });
                }
            }
        }
    }
});

onNet("ev-inventory:clear", async (pSource, cid) => {
    let src = source

    if (pSource) {
        src = pSource
    }

    let name = "ply-" + cid

    exports["oxmysql"].execute(`DELETE FROM inventory WHERE name='${name}'`, {}, function () {
        if (cid > 0) {
            emit("server-request-update-src", cid, src)

            eexports["oxmysql"].execute(`SELECT cash FROM characters WHERE id = '${cid}'`, {}, function(cash){
                if (cash && cash > 0) {
                    exports["ev-financials"].updateCash(src, "-", cash)
                }
            })
        }
    });
});

RegisterServerEvent("inv:playerSpawned")
onNet("inv:playerSpawned", () => {
    db(`DELETE FROM inventory WHERE name like '%Drop%' OR name like '%Hidden%' OR name like '%trash-1%'`)
    db(`DELETE FROM inventory WHERE quality like '0'`)
    console.log("[ev-inventory] Drops & broken items were deleted.")
    let src = source
    let player = exports["ev-lib"].getCharacter(src).id
    let string = `SELECT count(item_id) as amount, id, name, item_id, information, slot, dropped, creationDate FROM inventory where name= 'ply-${player}' group by slot`;
    exports.oxmysql.execute(string, {}, function (inventory) {
        if (!inventory) { } else {
            var invArray = inventory;
            var arrayCount = 0;
            var playerinvname = 'ply-' + player
            emitNet("inventory-update-player", src, [invArray, arrayCount, playerinvname]);
            emitNet('current-items', src, invArray)
            emitNet("Inventory-brought-update", src, JSON.stringify(Object.assign({}, hasBrought)));
        }
    })
});
