import { Repository } from "server/database/repository";

export const getEvidence = async (data: { identifier: string }): Promise<any> => {
    const [success, evidence] = await Repository.getEvidence(data);
    
    return {
        message: evidence,
        success: success
    };
}

export const getSingleEvidence = async (data: { id: number }): Promise<any> => {
    const [success, singleEvidence] = await Repository.getSingleEvidence(data);
    
    return {
        message: singleEvidence,
        success: success
    };
}

export const editEvidence = async (data: { id: number, type: string, identifier: string, description: string, tags: any, cid: number }): Promise<any> => {
    const [success, editEvidence] = await Repository.editEvidence(data);
    
    return {
        message: editEvidence,
        success: success
    };
}