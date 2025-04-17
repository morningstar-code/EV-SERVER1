import { Repository } from "server/database/repository";

export const getCerts = async (data: any): Promise<any> => {
    const certs = await Repository.getCerts();

    return {
        message: certs,
        success: true
    };
}

export const editCert = async (data: { name: string, description: string }): Promise<any> => {
    const editCert = await Repository.editCert(data);

    return {
        message: editCert,
        success: true
    };
}