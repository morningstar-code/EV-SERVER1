import { Base, Procedures } from '../utils/cpx';
import { FindPlayerIdById, getFormattedDate, getRegistrationText } from '../utils/tools';
import { Repository } from './database/repository';
import { GetLicensePlate, SetVehicleFakeLicensePlate } from './others/licenseplate';
import { BasicSpawn, GetSpawnInfo, SpawnPlayerVehicle } from './spawn';
import { StoreVehicleInGarage } from './state/garages';
import { AddKey } from './state/keys';
import { AddCarBomb, GenerateMetadata, GenerateVehicleInformation } from './state/vehicle';
import { AddVehicleCarPolish, RemoveVehicleCarPolish } from './systems/carpolish';
import { CanRepairDegradation, FixVehicleDegredation, SaveVehicleDamage, SetVehicleDegradation } from './systems/damage';
import { AddVehicleFuel, SetVehicleFuel } from './systems/fuel';
import { AddVehicleHarness, DoHarnessDamage } from './systems/harness';
import { AddVehicleMileage } from './systems/mileage';
import { AddVehicleNitrous, NitroUsed } from './systems/nitro';

export async function InitEvents(): Promise<void> { };

RPC.register("ev:vehicles:giveKey", (pSource: number, pVin: string, pServerId: number) => {
    emitNet('ev:vehicles:addKey', Number(pServerId), pVin);
    emitNet("DoLongHudText", Number(pServerId), "You just received keys to a vehicle!");
});

RPC.register("ev:vehicles:sellPhone", async (pSource: number, pVin: string, pStateId: number, pPrice: number) => {
    const seller = Base.getModule<PlayerModule>('Player').GetUser(pSource);
    if (!seller) return;

    const buyer = FindPlayerIdById(pStateId);
    if (!buyer) return;

    emitNet("ev-ui:server-relay", buyer, {
        source: "ev-nui",
        app: "phone",
        data: {
            action: "vehicle-purchase",
            _data: {
                title: 'Purchase',
                nuiCallback: "ev:vehicles:phoneSale:accepted",
                vin: pVin,
                sellerCID: Number(seller.character.id),
            },
            price: Number(pPrice),
            tax: 0
        }
    });
});

RPC.register("ev:vehicles:transferOwnershipVehicle", async (pSource: number, pVin: string, pSellerCid: number, pBuyerCid: number, pPrice: number) => {
    const vehicle = await Repository.getVehicleByVin(pVin);

    if (!vehicle) return;

    const buyerSource = FindPlayerIdById(pBuyerCid);
    if (!buyerSource) return;

    const sellerSource = FindPlayerIdById(pSellerCid);
    if (!sellerSource) return;

    const buyer: User = Base.getModule<PlayerModule>('Player').GetUser(buyerSource);
    if (!buyer) return;

    if (Number(buyer.character.bank) < Number(pPrice)) return;

    const seller: User = Base.getModule<PlayerModule>('Player').GetUser(sellerSource);
    if (!seller) return;

    const success = await buyer.removeBank(Number(pPrice));
    if (!success) return;

    const transfer = await Repository.updateVehicleOwner(pVin, pBuyerCid);
    if (!transfer) return;

    const carSale = await SQL.execute("INSERT INTO _car_sale (vin, model, sell_price, buyer_name, seller_name, sell_date) VALUES (@vin, @model, @sell_price, @buyer_name, @seller_name, @sell_date)", {
        vin: pVin,
        model: vehicle[0].model,
        sell_price: pPrice,
        buyer_name: `${buyer.character.first_name} ${buyer.character.last_name}`,
        seller_name: `${seller.character.first_name} ${seller.character.last_name}`, //Date needs to be formatted: Y-m-d
        sell_date: getFormattedDate()
    });
    if (!carSale) return;

    const content = await getRegistrationText(vehicle[0].name, vehicle[0].model, vehicle[0].plate, vehicle[0].vin);
    if (!content) return;

    const registration = global.exports["ev-phone"].CreateDocument(buyer.character.id, content, `${vehicle[0].model} - ${vehicle[0].plate}`, 4);
    if (!registration) return;

    global.exports["ev-vehicles"].AddKey(pSource, pVin);

    //TODO: Check seller's documents and remove the registration if it exists.
    //Need to match the title of the document to the vehicle's model and plate.
    const sellerDocuments = await SQL.execute<{ id: number }[]>(`
        SELECT d.id, d.editable, title, t.name as 'type', type_id, a.can_sign, a.signed FROM _document d
        INNER JOIN _document_type t on t.id = d.type_id
        INNER JOIN _document_access a ON a.document_id = d.id AND a.character_id = @characterId
        WHERE d.type_id = @typeId AND a.is_deleted = 0 AND d.title LIKE '%${vehicle[0].model} - ${vehicle[0].plate}%'
    `, {
        characterId: pSellerCid,
        typeId: 4
    });
    if (!sellerDocuments) return;

    const deleteSellerRegistration = await SQL.execute("DELETE FROM _document WHERE id = @id", {
        id: sellerDocuments[0].id
    });
    if (!deleteSellerRegistration) return;

    return true;
});

RPC.register("ev:vehicles:getVehicles", async (pSource: number, pGarageId: string) => {
    const vehicles = await Repository.getVehiclesByGarage(pGarageId);
    if (!vehicles) return [];

    return vehicles;
});

RPC.register("ev:vehicles:basicSpawn", async (pSource: number, pModel: string, pCoords?: Vector3, pHeading?: number, pOrigin = "menu", pLivery?: number, pAppearance?: string, pMods?: string) => {
    const result = await BasicSpawn(pSource, pModel, pCoords, pHeading, pOrigin, pLivery, pAppearance, pMods);

    return result;
});

RPC.register("ev:vehicles:degradation:requestRepair", async (pSource: number, pNetId: number, pPart: string, pAmount: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const result = await CanRepairDegradation(vehicle, pPart, pAmount);

    if (result) {
        return true;
    }

    return false;
});

RPC.register("ev:vehicles:degradation:doRepair", (pSource: number, pNetId: number, pPart: string, pAmount: number, pSuccess: boolean) => {
    if (pSuccess) {
        const vehicle = NetworkGetEntityFromNetworkId(pNetId);
        FixVehicleDegredation(vehicle, pPart, pAmount);
    }
});

RPC.register("ev:vehicles:addDegradation", async (pSource: number, pNetId: number, pDegradation: VehicleDegradation) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    //AddVehicleDegredation(vehicle, pDegradation);
    const result = await SetVehicleDegradation(vehicle, pDegradation);

    if (result) {
        return true;
    }

    return false;
});

RPC.register("ev:vehicles:spawnGarageVehicle", async (pSource: number, pVIN: string, pGarageId: string, pCoords: Vector4) => {
    const result = await SpawnPlayerVehicle(pSource, pVIN, [pCoords.x, pCoords.y, pCoords.z], Number(pCoords.h), true);

    if (result.success) {
        const update = await Repository.updateVehicleState(pVIN, "out");

        if (!update) return false;

        const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
        if (!user) return;

        const vehicle = NetworkGetEntityFromNetworkId(result.netId);

        const spawnInfo = await GetSpawnInfo(vehicle);

        if (spawnInfo.vin) {
            const result2 = await Repository.addParkingLog({
                vin: pVIN,
                cid: user.character.id,
                action: "out",
                engine: spawnInfo.damage.engine,
                body: spawnInfo.damage.body,
                fuel: spawnInfo.metadata.fuel,
                garage: pGarageId
            });

            if (!result2) return false;
        }

        return true;
    }

    return false;
});

RPC.register("ev:vehicles:fetchParkingLogs", async (pSource: number, pVin: string, pGarageId: string) => {
    const result = await Repository.getParkingLogs(pVin, pGarageId);

    if (!result) return [];

    const data = result.map((row) => {
        return {
            cid: row.cid,
            action: row.action,
            timestamp: Number(row.timestamp),
            data: {
                engine: row.engine,
                body: row.body,
                fuel: row.fuel
            }
        };
    });

    return data;
});

RPC.register("ev:vehicles:generateVehicleInformation", async (pNetId: number, pModel: number) => {
    const src = global.source;
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const result = await GenerateVehicleInformation(src, vehicle, pModel);
    if (result) {
        return true;
    }
});

RPC.register("ev:vehicles:storeVehicle", async (pSource: number, pNetId: number, pGarageId: string) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const result = await StoreVehicleInGarage(pSource, vehicle, pGarageId);

    if (result) {
        return true;
    }

    return false;
});

RPC.register("ev-vehicles:damage:saveDamage", (pSource: number, pNetId: number) => {
    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    SaveVehicleDamage(vehicle);
});

RPC.register("ev:vehicles:getFuelPrice", (pSource: number, pNumber: number) => {
    return {
        taxLevel: 15,
        fuelPrice: 3
    }
});

RPC.register("ev:vehicles:addFuel", (pSource: number, pNetId: number, pAmount: number, pNumber: number, pIsJerryCan: boolean, pIsHelicopter: boolean, p7: any) => {
    AddVehicleFuel(pNetId, pAmount);
});

RPC.register("ev:vehicles:setFakeLicensePlate", async (pSource: number, pNetId: number, pSetFakeLicensePlate: boolean) => {
    const result = await SetVehicleFakeLicensePlate(pSource, pNetId, pSetFakeLicensePlate);
    return result;
});

RPC.register("ev:vehicles:getLicensePlate", async (pSource: number, pVin: string) => {
    const result = await GetLicensePlate(pVin);
    return result;
});

RPC.register("ev-vehicles:chargeForNOSRefill", async (pSource: number, pCost: number) => {

});

RPC.register("ev-vehicles:chargeForFuelRefill", async (pSource: number, pAmount: number) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const result = user.removeMoney(pAmount);

    return result;
});

RPC.register("ev-vehicles:getVehicleMods", async (pSource: number, pVIN: string) => {
    const result = await SQL.execute<{ mods: string }[]>("SELECT mods FROM _vehicle WHERE vin = @vin", {
        vin: pVIN
    });

    if (!result) return;

    return result[0].mods;
});

Procedures.register("ev:vehicles:respawnVehicle", async (pSource: number, pVIN: string, pCoords: Vector3, pHeading: number, pUnique: boolean) => {
    const result = await SpawnPlayerVehicle(pSource, pVIN, [pCoords.x, pCoords.y, pCoords.z], Number(pHeading), pUnique);

    if (result.success) {
        return true;
    }

    return false;
});

Procedures.register("ev:vehicles:basicSpawn", async (pSource: number, pModel: string, pCoords?: Vector3, pHeading?: number, pOrigin = "menu", pLivery?: number, pAppearance?: string, pMods?: string) => {
    const result = await BasicSpawn(pSource, pModel, pCoords, pHeading, pOrigin, pLivery, pAppearance, pMods);

    return result.netId ? result.netId : false;
});

onNet("ev:vehicles:addCarBomb", (pNetId: number, pMinSpeed: number, pTicksBeforeExplode: number, pTicksForRemoval: number, pGridSize: number, pColoredSquares: number, pTimeToComplete: number) => {
    AddCarBomb(pNetId, pMinSpeed, pTicksBeforeExplode, pTicksForRemoval, pGridSize, pColoredSquares, pTimeToComplete);
});

onNet('ev-vehicles:updateVehicle', async (pPlate: string, pAppearance: string, pMods: string) => {
    if (!pPlate) return;

    const update = await SQL.execute("UPDATE _vehicle SET appearance = @appearance, mods = @mods WHERE plate = @plate", {
        appearance: JSON.stringify(pAppearance) || null,
        mods: JSON.stringify(pMods) || null,
        plate: pPlate
    })

    if (!update) return;
});

onNet("ev:vehicles:DoHarnessDamage", (pNetId: number, pAmount: number) => {
    DoHarnessDamage(pNetId, pAmount);
});

onNet("ev:vehicles:reduceFuel", (pNetId: number, pAmount: number) => {
    SetVehicleFuel(pNetId, pAmount);
});

onNet("ev:vehicles:addMileage", (pNetId: number, pAmount: number) => {
    AddVehicleMileage(pNetId, pAmount);
});

onNet("ev:vehicles:addNitro", (pNetId: number, pSize: string) => {
    AddVehicleNitrous(pNetId, pSize);
});

onNet("ev:vehicles:addHarness", (pNetId: number, pSize: string) => {
    AddVehicleHarness(pNetId, pSize);
});

onNet("ev:vehicles:addCarPolish", (pNetId: number, pDays: number) => {
    AddVehicleCarPolish(pNetId, pDays);
});

onNet("ev:vehicles:removeCarPolish", (pNetId: number) => {
    RemoveVehicleCarPolish(pNetId);
});

onNet("ev:vehicles:nitroUsed", (pNetId: number, pAmount: number) => {
    NitroUsed(pNetId, pAmount);
});

onNet("ev:vehicles:gotKeys", async (pNetId: number, pModel: number, pSource?: number) => {
    let src: any = global.source;
    if (src === "" || src === undefined || src === null) {
        src = pSource;
    }

    const vehicle = NetworkGetEntityFromNetworkId(pNetId);
    const bag = Entity(Number(vehicle));

    if (bag.state.vin) {
        AddKey(src, bag.state.vin);
    } else {
        const result = await GenerateVehicleInformation(src, vehicle, pModel);
        if (result) {
            AddKey(src, result.vin);
        }
    }
});

onNet("ev:vehicles:generateMetadata", (pNetId: number) => {
    GenerateMetadata(pNetId);
});