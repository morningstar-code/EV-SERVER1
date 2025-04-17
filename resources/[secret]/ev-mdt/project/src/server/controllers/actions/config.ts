import { Repository } from "server/database/repository";

export const addRolePermission = async (data: { permission: any, roleId: number }): Promise<ActionsReturnPayload> => {
    const [success, rolePermissions] = await Repository.addRolePermission(data);

    return {
        message: rolePermissions,
        success: success
    }
}

export const getRolePermissions = async (data: { roleId: number }): Promise<ActionsReturnPayload> => {
    const [success, rolePermissions] = await Repository.getRolePermissions(data);

    return {
        message: rolePermissions,
        success: success
    }
}

export const hasConfigPermission = async (pSource: number, data: any): Promise<ActionsReturnPayload> => {
    const [hasPermission, steamId] = await Repository.hasConfigPermission(pSource, data);

    console.log("hasConfigPermission", hasPermission, steamId);

    return {
        message: {
            steam: hasPermission,
            steam_id: steamId
        },
        success: true
    }
}

export const getAllConfigOptions = async (data: { table: string, useCharacterId: boolean }): Promise<ActionsReturnPayload> => {
    const [success, config] = await Repository.getAllConfigOptions(data);
    
    return {
        message: config,
        success: success
    }
}

export const insertConfigOption = async (data: { data: any, table: string, useCharacterId: boolean }): Promise<ActionsReturnPayload> => {
    const [success, config] = await Repository.insertConfigOption(data);
    
    return {
        message: config,
        success: success
    }
}

export const updateConfigOption = async (data: { data: any, table: string, useCharacterId: boolean }): Promise<ActionsReturnPayload> => {
    const [success, config] = await Repository.updateConfigOption(data);
    
    return {
        message: config,
        success: success
    }
}

export const addInvItem = async (pSource: number, data: { item: string, information: string }): Promise<ActionsReturnPayload> => {
    if (data.item == null || data.item == undefined) {
        return {
            message: "Item is required",
            success: false
        }
    }

    emitNet("player:receiveItem", pSource, data.item, data.information);

    return {
        message: "Item added",
        success: true
    }
}