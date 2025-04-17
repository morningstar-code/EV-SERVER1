import { liftConfig } from "@shared/config";

function Debug(pMsg: string) {
    return console.log("[Lifts] - " + pMsg);
}

let createdLifts: CreatedLift[] = [];
const extraZ = 2;


export function createLift(pZone: string) {
    const foundLifts = liftConfig.lifts.filter(lift => lift.polyZone === pZone);
    for (const lift of foundLifts) {
        const exists = createdLifts.find(lift => lift.name === lift.name);

        if (exists) {
            Debug("Lift " + lift.name + " already exists don't re-create.");
            continue;
        }

        Debug("Need to generate " + lift.name + " lift!");

        const firstLift = GetHashKey("denis3d_carlift_02");
        const firstObj = CreateObject(firstLift, lift.coords.x, lift.coords.y, lift.coords.z, false, false, false);

        const secondLift = GetHashKey("denis3d_carlift_01");
        const secondObj = CreateObject(secondLift, lift.coords.x, lift.coords.y, lift.coords.z, false, false, false);

        const thirdLift = GetHashKey("denis3d_carlift_03");
        const thirdObj = CreateObject(thirdLift, lift.coords.x, lift.coords.y, lift.coords.z + 1.3, false, false, false);

        SetEntityHeading(firstObj, lift.heading);
        SetEntityHeading(secondObj, lift.heading);
        SetEntityHeading(thirdObj, lift.heading);
        FreezeEntityPosition(firstObj, true);
        FreezeEntityPosition(secondObj, true);
        FreezeEntityPosition(thirdObj, true);

        createdLifts.push({
            name: lift.name,
            zone: lift.polyZone,
            objectFrame: firstObj,
            objectBase: secondObj,
            objectPanel: thirdObj
        });
    }
}

export function deleteLift(pZone: string) {
    const foundLifts = createdLifts.filter(lift => lift.zone === pZone);

    for (const lift of foundLifts) {
        DeleteEntity(lift.objectFrame);
        DeleteEntity(lift.objectBase);
        DeleteEntity(lift.objectPanel);
    }

    createdLifts = createdLifts.filter(lift => lift.zone !== pZone);
}

export async function startMovingLift(liftName: string, liftDirection: string, startTime: any, endTime: any, elapsedTime: any, pauseTime: any, lastUpdateTime: any, netId: number) {
    const foundLift = createdLifts.find(lift => lift.name === liftName);
    if (!foundLift) return;

    const config = liftConfig.lifts.find(lift => lift.name === liftName);
    if (!config) return;

    const timeSinceStart = pauseTime ? Date.now() - lastUpdateTime : Date.now() - startTime;
    startTime += timeSinceStart;
    endTime += timeSinceStart;

    const liftCoords = config.coords;
    const liftSoundPromise = new Promise((resolve) => {
        const result = global.exports["ev-fx"].PlayEntitySound(
            foundLift.objectFrame,
            "lift",
            "DLC_NIKEZ_ROS_GENERAL",
            0,
            "ROS_GENERAL"
        );
        resolve(result);
    });

    const liftSoundHandle = await liftSoundPromise;

    const updateInterval: any = setInterval(() => {
        if (Date.now() >= endTime) {
            global.exports["ev-fx"].StopEntitySound(foundLift.objectFrame, liftSoundHandle);
            const calculatedZ = liftDirection === 'up' ? liftCoords.z + extraZ : liftCoords.z;
            SetEntityCoords(foundLift.objectBase, liftCoords.x, liftCoords.y, calculatedZ, false, false, false, false);

            if (netId !== 0) {
                const vehicleEntity = NetworkGetEntityFromNetworkId(netId);
                if (vehicleEntity !== 0) {
                    SetEntityCoords(vehicleEntity, config.coords.x, config.coords.y, extraZ + 0.5, false, false, false, false);
                }
            }

            return clearInterval(updateInterval);
        }

        const timeRemaining = endTime - startTime;
        const timeElapsed = Date.now() - startTime;
        const liftPosition = timeElapsed / timeRemaining;
        const liftHeight = liftPosition * extraZ;
        const calculatedZ = liftDirection === 'up' ? liftCoords.z + liftHeight : liftCoords.z + extraZ - liftHeight;

        SetEntityCoords(foundLift.objectBase, liftCoords.x, liftCoords.y, calculatedZ, false, false, false, false);

        if (netId !== 0) {
            const vehicleEntity = NetworkGetEntityFromNetworkId(netId);
            if (vehicleEntity !== 0) {
                SetEntityCoords(vehicleEntity, config.coords.x, config.coords.y, extraZ + 0.5, false, false, false, false);
            }
        }
    }, 20);
}

export function getLift(pName: string) {
    const idx = createdLifts.findIndex(lift => lift.name === pName);
    return idx !== -1 ? createdLifts[idx] : null;
}