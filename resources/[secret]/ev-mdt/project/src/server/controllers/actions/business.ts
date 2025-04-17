import { Repository } from "server/database/repository";

export const getBusinesses = async (data: any): Promise<any> => {
    const [success, businesses] = await Repository.getBusinesses();
    return {
        message: businesses,
        success: success
    };
}

export const getEmployeesByBusinessId = async (data: { businessId: string }): Promise<any> => {
    const [success, employees] = await Repository.getEmployeesByBusinessId(data.businessId);
    return {
        message: employees,
        success: success
    };
}

export const getBusinessEmploymentHistory = async (data: { businessId: string }): Promise<any> => {
    const [success, employmentHistory] = await Repository.getBusinessEmploymentHistory(data.businessId);
    return {
        message: {
            history: employmentHistory
        },
        success: success
    };
}

export const updateBusinessName = async (data: { accountId: number, businessId: string, name: string }): Promise<any> => {
    const [success, message] = await Repository.updateBusinessName(data);
    return {
        message: message,
        success: success
    }
}

export const updateBusinessOwner = async (data: { accountId: number, ownerId: number, businessId: string }): Promise<any> => {
    const [success, message] = await Repository.updateBusinessOwner(data);
    return {
        message: message,
        success: success
    }
}