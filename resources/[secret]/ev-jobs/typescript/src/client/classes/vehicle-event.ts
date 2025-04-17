import { Delay } from "@shared/utils/tools";
import EventEmitter from "events";

interface VehicleEventTrigger {
    type: string;
    key: number;
    vehicle: { enforce: boolean, wanted: boolean, reference: string };
    weapon?: { enforce: boolean, wanted: boolean };
}

interface VehicleEventData {
    references: Map<string, { data: { handle: number, netId: number }, settings: { model: string, stolen: boolean }, handle: number }>;
}

export class VehicleEvent extends EventEmitter {
    type: string;
    key: number;
    vehicle: { enforce: boolean, wanted: boolean, reference: string };
    weapon: { enforce: boolean, wanted: boolean };
    data: VehicleEventData;
    active: boolean;
    tickId: number;

    constructor(pTrigger: VehicleEventTrigger, pData: VehicleEventData) {
        super();
        this.type = pTrigger.type;
        this.key = pTrigger.key;
        this.vehicle = pTrigger.vehicle;
        this.weapon = pTrigger.vehicle;
        this.data = pData;
        this.active = false;
        this.tickId = 0;
    }

    enable() {
        if (this.active) return;
        this.active = true;
        this.tickId = setTick(async () => {
            if (this.type === "interact" && IsDisabledControlJustReleased(0, this.key)) {
                this.emit("trigger", this.isValid());
                await Delay(500);
            } else if (this.type === "area") {
                this.emit("trigger", this.isValid());
                await Delay(500);
            } else if (this.type === "vehicle") {
                this.emit("trigger", this.isValid());
                await Delay(1000);
            }
        });
    }

    disable() {
        if (!this.active) return;
        this.active = false;
        clearTick(this.tickId);
    }

    isValid() {
        let valid = true;
        const ped = PlayerPedId();
        if (this?.weapon && this?.weapon?.enforce) {
            const isArmed = IsPedArmed(ped, 7);
            if (isArmed && !this?.weapon?.wanted) {
                valid = false;
            } else if (!isArmed && this?.weapon?.wanted) {
                valid = false;
            }
        }
        if (this?.vehicle && this?.vehicle?.enforce) {
            const isInVehicle = IsPedInAnyVehicle(ped, false);
            if (isInVehicle && !this?.vehicle?.wanted) {
                valid = false;
            } else if (!isInVehicle && this?.vehicle?.wanted) {
                valid = false;
            } else if (isInVehicle && this?.vehicle?.reference) {
                const currentVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
                const vehicleRef = this?.data?.references.get(this.vehicle.reference);

                if (vehicleRef && vehicleRef?.data?.handle) {
                    valid = vehicleRef?.handle === currentVehicle;
                } else if (vehicleRef && vehicleRef?.data?.netId) {
                    valid = vehicleRef?.data?.netId === NetworkGetNetworkIdFromEntity(currentVehicle);
                } else if (vehicleRef && vehicleRef?.settings?.model) {
                    valid = GetHashKey(vehicleRef?.settings?.model) === GetEntityModel(currentVehicle);
                } else if (vehicleRef && vehicleRef?.settings?.stolen) {
                    valid = global.exports["ev-flags"].HasVehicleFlag(currentVehicle, "isStolenVehicle");
                }
            }
        }
        return valid;
    }
}