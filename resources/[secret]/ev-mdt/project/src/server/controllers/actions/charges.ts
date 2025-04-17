import { Repository } from "server/database/repository";

export const getCharges = async (data: any): Promise<any> => {
    const [success, charges] = await Repository.getCharges();
    return {
        message: charges,
        success: success
    };
}