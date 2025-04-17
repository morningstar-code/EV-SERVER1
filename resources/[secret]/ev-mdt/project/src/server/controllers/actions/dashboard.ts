import { Repository } from "server/database/repository";

export const getWarrants = async (data: any): Promise<ActionsReturnPayload> => {
    const [success, warrants] = await Repository.getWarrants();

    return {
        message: warrants,
        success: success
    }
}

export const getBolos = async (data: any): Promise<ActionsReturnPayload> => {
    const [success, bolos] = await Repository.getBolos();

    return {
        message: bolos,
        success: success
    }
}

export const getBulletins = async (data: any): Promise<ActionsReturnPayload> => {
    const [success, bulletins] = await Repository.getBulletins();

    return {
        message: bulletins,
        success: success
    }
}