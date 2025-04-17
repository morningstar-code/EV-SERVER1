import { Base } from "../utils/cpx";
import { Repository } from "./database/repository";
import { BasicSpawn, GenerateVehicleInfo, GetVehicleMods, SpawnPlayerVehicle } from "./spawn";
import { AddKey, GetVehicleIdentifier } from "./state/keys";
import { FetchVehicleInfo, IsVehicleFullyUpgraded, IsVehicleVinScratched, UpdateVehicleMetadata } from "./state/vehicle";
import { SetVehicleDegradation } from "./systems/damage";

export async function InitExports(): Promise<void> { };

global.exports("BasicSpawn", BasicSpawn);
global.exports("SpawnPlayerVehicle", SpawnPlayerVehicle);
global.exports("GenerateVehicleInfo", GenerateVehicleInfo);
global.exports("FetchVehicleInfo", FetchVehicleInfo);
global.exports("IsVehicleFullyUpgraded", IsVehicleFullyUpgraded);
global.exports("IsVehicleVinScratched", IsVehicleVinScratched);
global.exports("AddKey", AddKey);
global.exports("GetVehicleIdentifier", GetVehicleIdentifier);
global.exports("UpdateVehicleMetadata", UpdateVehicleMetadata);
global.exports("GetVehicleMods", GetVehicleMods);
global.exports("SetVehicleDegradation", SetVehicleDegradation);

global.exports("AddPersonalVehicle", async (pSource: number, pModel: string, pType: VehicleType, pOrigin: VehicleOrigin) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const vehicleInfo = await GenerateVehicleInfo(pSource, user.character.id, pModel, pType, pOrigin);
    if (!vehicleInfo) return;

    const result = await Repository.addVehicle(vehicleInfo);
    if (!result) return;

    return vehicleInfo.vin;
});