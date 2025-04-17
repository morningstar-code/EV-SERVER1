import { Procedures } from "@cpx/client";
import { Vector3 } from "@shared/classes/vector3";
import { Delay } from "@shared/utils/tools";
import { applyEntityMatrix, Debug, deleteObject, LoadModel, makeEntityMatrix } from "client/util/util";
import { getEntityByObjectId, getObject } from "./events";

const cameraToWorld: Objects.ClientFunctions['CameraToWorld'] = (
    flags,
    ignore,
    distance = 5.0,
) => {
    const cameraCoord = GetGameplayCamCoord();
    const [rx, , rz] = GetGameplayCamRot(0).map(r => Math.PI / 180 * r);
    const cosRx = Math.abs(Math.cos(rx));
    const direction = [-Math.sin(rz) * cosRx, Math.cos(rz) * cosRx, Math.sin(rx)];
    const from = direction.map((direction, i) => cameraCoord[i] + direction);
    const realDistance = Vector3.fromArray(GetEntityCoords(PlayerPedId(), false)).getDistanceFromArray(GetGameplayCamCoord());
    const to = direction.map((direction, i) => cameraCoord[i] + direction * (distance + realDistance));
    const sphereCast = StartShapeTestSweptSphere(from[0], from[1], from[2], to[0], to[1], to[2], 0.2, flags, ignore, 7);
    return GetShapeTestResultIncludingMaterial(sphereCast);
};

let isPlacing = false;

/**
 * 
 * @param model Model to be placed
 * @param options 
 * @param isValidPlacement Callback function to check if material & coords are valid
 * @returns [success, { coords: Vector3, rotation: Vector3, quaternion: Quaternion }]
 */
export const PlaceObject: Objects.ClientExports['PlaceObject'] = async (
    _model: string | number,
    options,
    isValidPlacement = () => true
) => {
    if (isPlacing) return [false, null];
    const model = typeof _model === 'string' ? _model.trim() : _model;
    if (!IsModelValid(model)) {
        Debug(`[OBJECTS] Model ${model} is not valid!`);
        return [false, null];
    }
    isPlacing = true;
    await LoadModel(model);
    
    const [minV, maxV] = GetModelDimensions(model);
    const minVector = Vector3.fromArray(minV);
    const maxVector = Vector3.fromArray(maxV);
    const modelSize = maxVector.sub(minVector);

    const player = PlayerPedId();
    let onGround = options.groundSnap ?? options.forceGroundSnap;
    let curHeading = GetEntityHeading(player);
    let useModelOffset = options.useModelOffset;
    let placing = true;
    let failed = true;
    let valid = true;
    let pinned = options.startPinned ?? false;
    let cursor = (options.startPinned && options.startWithGizmo) ? options.startWithGizmo ?? false : false;
    if (pinned && cursor) EnterCursorMode();

    let curZ = options.zOffset ?? 0.0;
    let setZ = false;

    const alignToSurface = options.alignToSurface ?? false;
    const surfaceOffset = options.surfaceOffset ?? 0;
    const maxDistance = options.maxDistance ?? 10.0;

    const ghostObject = CreateObjectNoOffset(model, 0, 0, 0, false, false, false);
    //global.exports['ev-cleanup'].AddBypassObject(ghostObject);
    SetEntityAlpha(ghostObject, 200, false);
    SetEntityCollision(ghostObject, false, false);
    SetCanClimbOnEntity(ghostObject, false);
    if (options.startingCoords) {
        const { x: x, y: y, z: z } = options.startingCoords;
        SetEntityCoords(ghostObject, x, y, z, false, false, false, false);
    }
    if (options.startingRotation) {
        const { x: x, y: y, z: z } = options.startingRotation;
        SetEntityRotation(ghostObject, x, y, z, 2, true);
    }

    SetEntityDrawOutlineColor(255, 0, 0, 128);

    let prevMaterialHash = 0;
    let prevEntityHit = 0;

    const placementTick = setTick(() => {
        var _0x27e479;
        const [, hit, endCoords, surfaceNormal, materialHash, entityHit] = cameraToWorld(19, ghostObject, (_0x27e479 = options.distance) !== null && _0x27e479 !== void 0 ? _0x27e479 : 10);
        const objCoords = Vector3.fromArray(GetEntityCoords(ghostObject, true));
        const coords = Vector3.fromArray(endCoords);
        if (hit && !pinned) {
            prevMaterialHash = materialHash;
            prevEntityHit = entityHit;
            if (!onGround && useModelOffset) {
                coords.z += modelSize.z / 2;
            }

            let offset = [0, 0, 0];

            if (alignToSurface) {
                curHeading = -Math.atan2(surfaceNormal[0], surfaceNormal[1]) * 57.2958 + 180;
                SetEntityHeading(ghostObject, curHeading);
                offset = GetEntityForwardVector(ghostObject).map(a => a * surfaceOffset);
            } else {
                SetEntityHeading(ghostObject, curHeading);
            }

            SetEntityCoords(
                ghostObject,
                coords.x - offset[0],
                coords.y - offset[1],
                coords.z - offset[2],
                false,
                false,
                false,
                false,
            );
            
            if (onGround) {
                PlaceObjectOnGroundProperly_2(ghostObject);
            }

            if (curZ !== 0) {
                const newCoords = Vector3.fromArray(GetEntityCoords(ghostObject, false));
                coords.z += curZ;
                SetEntityCoords(ghostObject, newCoords.x, newCoords.y, newCoords.z + curZ, false, false, false, false);
            }
        } else if (!hit && !pinned) {
            valid = false;
        }
        const centerCoords = onGround || pinned ? objCoords : coords;

        const collisionCheck = options.collision
            ? !isColliding(ghostObject, player, modelSize, centerCoords, options.colZOffset)
            : true;

        //const propertyId = exports['np-housing'].getCurrentLocation();
        //const hasPropertyAccess = propertyId && exports['np-housing'].hasPropertyAccess(propertyId);
        //const housingCheck = propertyId ? (options.allowHousePlacement || options.allowEditorPlacement) && (!options.checkPropertyAccess || hasPropertyAccess) : options.forceHousePlacement ? false : true;
        const distanceCheck = objCoords.getDistanceFromArray(GetEntityCoords(PlayerPedId(), false)) < maxDistance;

        //const apartmentCheck = !exports['np-apartments'].getModule('func').getApartment();
        valid =
            collisionCheck &&
            //housingCheck &&
            //apartmentCheck &&
            distanceCheck &&
            isValidPlacement(centerCoords, prevMaterialHash, ghostObject, prevEntityHit);

        SetEntityDrawOutline(ghostObject, !valid);

        if (cursor && pinned) {
            const matrix = makeEntityMatrix(ghostObject) as any;
            const changed = DrawGizmo(matrix, 'OBJECT_GIZMO');
            if (changed) {
                applyEntityMatrix(ghostObject, matrix);
            }
        }

        if (options.afterRender) {
            options.afterRender(ghostObject, !!hit, valid);
        }
    });

    const keybindTick = setTick(() => {
        //Q
        DisableControlAction(0, 44, true);
        //E
        DisableControlAction(0, 46, true);
        //R
        DisableControlAction(0, 140, true);
        //Z
        DisableControlAction(0, 20, true);
        //C
        DisableControlAction(0, 26, true);
        //F
        DisableControlAction(0, 23, true);
        //Scroll
        DisableControlAction(0, 16, true);
        DisableControlAction(0, 17, true);
        //Ctrl
        DisableControlAction(0, 36, true);

        DisableControlAction(0, 24, true);

        const isCtrlPressed = IsDisabledControlPressed(0, 36);

        if (!cursor) {
            // Scroll up/down = rotation
            if (IsDisabledControlPressed(2, 17)) {
                // MWheelUp
                if (setZ) {
                    curZ += isCtrlPressed ? 0.1 : 0.5;
                } else {
                    curHeading += isCtrlPressed ? 1 : 5;
                    if (!isCtrlPressed) curHeading = Math.round(curHeading);
                }
            } else if (IsDisabledControlPressed(2, 16)) {
                // MWheelDown
                if (setZ) {
                    curZ -= isCtrlPressed ? 0.1 : 0.5
                } else {
                    curHeading -= isCtrlPressed ? 1 : 5;
                    if (!isCtrlPressed) curHeading = Math.round(curHeading);
                }
            }
            if (curHeading > 360) {
                curHeading -= 360;
            } else if (curHeading < 0) {
                curHeading += 360;
            }

            // Q : toggle onground on/off
            if (options.groundSnap && !options.forceGroundSnap && IsDisabledControlJustPressed(0, 44)) {
                onGround = !onGround;
            }

            // R : toggle model offset on/off
            if (options.useModelOffset && IsDisabledControlJustPressed(0, 140)) {
                useModelOffset = !useModelOffset;
            }

            // Z : toggle z adjust on/off
            if (options.adjustZ && IsDisabledControlJustPressed(0, 20)) {
                setZ = !setZ;
                SetEntityAlpha(ghostObject, setZ ? 255 : 200, false);
            }

            // E : place object
            if (valid && IsDisabledControlJustPressed(0, 46)) {
                failed = false;
                placing = false;
            }

            // F : toggle pinned on/off
            if (!options.disablePinning && IsDisabledControlJustPressed(0, 23)) {
                pinned = !pinned;
            }
        }

        // C : enable / disabled cursor
        if (pinned && options.allowGizmo && IsDisabledControlJustPressed(0, 26)) {
            cursor = !cursor;
            if (cursor)
                EnterCursorMode();
            else {
                LeaveCursorMode();
            }
        }

        // Esc: cancel
        if (IsDisabledControlJustPressed(0, 200) || IsDisabledControlJustPressed(0, 177)) {
            placing = false;
        }
    });

    while (placing) {
        await Delay(1);
    }

    if (cursor) {
        LeaveCursorMode();
    }

    clearTick(placementTick);
    clearTick(keybindTick);
    const finalCoords = Vector3.fromArray(GetEntityCoords(ghostObject, true));
    const finalRotation = Vector3.fromArray(GetEntityRotation(ghostObject, 2));
    const finalQuaternion = GetEntityQuaternion(ghostObject);
    //global.exports['ev-cleanup'].RemoveBypassObject(ghostObject);
    deleteObject(ghostObject);

    isPlacing = false;
    if (failed) {
        return [false, null];
    }

    return [true, { coords: finalCoords, rotation: finalRotation, quaternion: finalQuaternion, heading: curHeading }];
};

const isColliding: Objects.ClientFunctions<Vector3>['IsColliding'] = (
    ghostObject,
    playerPed,
    modelSize,
    centerCoords,
    zOffset?
) => {
    const rotation = Vector3.fromArray(GetEntityRotation(ghostObject, 2));
    const small = Vector3.fromObject(modelSize).multiplyScalar(0.75);
    const ray = StartShapeTestBox(
        centerCoords.x,
        centerCoords.y,
        centerCoords.z + (zOffset ?? 0.0),
        small.x,
        small.y,
        small.z,
        rotation.x,
        rotation.y,
        rotation.z,
        2,
        83,
        playerPed,
        4,
    );
    const [, hit] = GetShapeTestResultIncludingMaterial(ray);
    return hit;
};

/**
 * 
 * @param model Model to be placed
 * @param metadata Metadata to add to object
 * @param options Options for placement
 * @param isValid Callback for if a particular placement is valid
 * @param namespace Datagrid namespace to set
 * @param expiryTime time in seconds until object is deleted
 * @returns string (uuid of object)
 */
export const PlaceAndSaveObject: Objects.ClientExports['PlaceAndSaveObject'] = async (
    pModel,
    pMetaData = {},
    pOptions,
    pIsValid = () => true,
    pNamespace = 'objects',
    pExpiryTime?,
) => {
    const [success, result] = await PlaceObject(pModel, pOptions, pIsValid);
    if (!success || !result) {
        return null;
    }

    if (pOptions.allowEditorPlacement) {
        const location = global.exports['ev-housing'].getCurrentLocation();
        if (location) {
            const [minV, maxV] = GetModelDimensions(pModel);
            const _data = {
                name: location,
                modelHash: typeof pModel === 'number' ? pModel : GetHashKey(pModel),
                coords: { x: result.coords.x, y: result.coords.y, z: result.coords.z + minV[2] },
                quat: {
                    x: result.quaternion[0],
                    y: result.quaternion[1],
                    z: result.quaternion[2],
                    w: result.quaternion[3]
                },
                realName: String(pModel)
            };
            try {
                await global.exports['ev-editor'].addItemToCurrent(_data, true);
                await global.exports['ev-editor'].loadObjects(location);
            } catch (error) {
                console.log(error);
            } finally {
                global.exports['ev-editor'].rebuildCurrent(location);
            }
            return 'HOUSE_OBJECT';
        }
    }
    return await RPC.execute<string>('ev-objects:SaveObject', pNamespace, pModel, result.coords, result.rotation, pMetaData, pExpiryTime);
}

/**
 * 
 * @param id Id of the object being moved
 * @param options Options for placement
 * @param isValid Callback for if a particular placement is valid
 * @param model Model to change object to
 * @returns string (uuid of object)
 */
export const MoveObject: Objects.ClientExports['MoveObject'] = async (
    pId,
    pOptions,
    pIsValid = () => true,
    pModel
) => {
    const object = getObject(pId);
    if (!object) return false;

    const entity = getEntityByObjectId(pId);
    if (!entity) return false;

    //const location = global.exports['ev-housing'].getCurrentLocation();
    //if (location) return false;

    const model = typeof pModel === 'string' ? GetHashKey(pModel) : pModel;
    if (pModel && !IsModelValid(model)) return false;

    SetEntityVisible(entity, false, false);
    SetEntityCollision(entity, false, false);

    pOptions.startingCoords = { x: object.x, y: object.y, z: object.z };
    pOptions.startingRotation = object.data.rotation;
    let [success, result] = await PlaceObject(model !== null && model !== void 0 ? model : object.data.model, pOptions, pIsValid);
    if (!success || !result) {
        SetEntityCollision(entity, true, true);
        SetEntityVisible(entity, true, false);
        return false;
    }
    
    success = false;
    
    try {
        success = await RPC.execute(
            'ev-objects:UpdateObject',
            pId,
            null,
            pModel ? model : object.data.model,
            result.coords,
            result.rotation
        );
    } catch (err) {
        console.error(`Failed to move object [${pId}]`);
    }

    SetEntityCollision(entity, true, true);
    SetEntityVisible(entity, true, false);

    return success;
};

global.exports('PlaceObject', PlaceObject);
global.exports('PlaceAndSaveObject', PlaceAndSaveObject);
global.exports('MoveObject', MoveObject);
global.exports('IsPlacingObject', () => {
    return isPlacing;
});