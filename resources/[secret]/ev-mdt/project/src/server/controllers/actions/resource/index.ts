import { Repository } from "server/database/repository";

export const addResourceLink = async (data: { resource_type: string, resource_id: string, source_type: string, source_id: number }): Promise<ActionsReturnPayload> => {
    const [success, message] = await Repository.addResourceLink(data);

    return {
        message: success ? 'Successfully added resource link' : 'Failed to add resource link',
        success: success
    };
}

export const removeResourceLink = async (data: { resource_link_id: number, source_type: string }): Promise<ActionsReturnPayload> => {
    const [success, message] = await Repository.removeResourceLink(data);

    return {
        message: success ? 'Successfully removed resource link' : 'Failed to remove resource link',
        success: success
    };
}

export const deleteResourceItem = async (data: { id: number, table: string, idField?: string }): Promise<ActionsReturnPayload> => {
    const [success, reportCategories] = await Repository.deleteResourceItem(data);

    return {
        message: success ? 'Successfully deleted resource item' : 'Failed to delete resource item',
        success: success
    };
}

export const addEvidenceToResource = async (data: { type: string, create: boolean, evidence: { type: string, identifier: string, description: string, cid: number }, identifier: number, source_id: number }): Promise<ActionsReturnPayload> => {
    const [success, reportCategories] = await Repository.addEvidenceToResource(data);

    return {
        message: success ? 'Successfully added evidence to resource' : 'Failed to add evidence to resource',
        success: success
    };
}

export const createEvidenceVehicle = async (data: { resourceType: string, resourceId: number, vehicle: { plate: string, reason: string } }): Promise<ActionsReturnPayload> => {
    const [success, reportCategories] = await Repository.createEvidenceVehicle(data);

    return {
        message: success ? 'Successfully created evidence vehicle' : 'Failed to create evidence vehicle',
        success: success
    };
}