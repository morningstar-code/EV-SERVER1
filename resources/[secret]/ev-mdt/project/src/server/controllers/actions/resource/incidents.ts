import { Repository } from "server/database/repository";

export const getIncidents = async (data: { latest?: boolean }): Promise<ActionsReturnPayload> => {
    const [success, incidents] = await Repository.getIncidents(data);

    return {
        message: incidents,
        success: success
    };
}

export const getIncident = async (data: { id: number }): Promise<ActionsReturnPayload> => {
    const [success, incident] = await Repository.getIncident(data.id);

    return {
        message: incident,
        success: success
    };
}

export const editIncident = async (source: number, data: { id: number, title: string, description: string, created_by_state_id: number, created_by_name: string, timestamp: number, report_category_id: number, report_category_name: string, tags: any[], evidence: any[], officers: any[], persons: any[], vehicles: any[] }): Promise<ActionsReturnPayload> => {
    const [success, incident] = await Repository.editIncident(source, data);

    return {
        message: incident,
        success: success
    };
}

export const editIncidentCiv = async (data: { incident_id: number, profile_civ_id: number, guilty: number, warrant: number, warrant_expiry_timestamp: number, processed: number, processed_by: number }) => {
    const [success, incident] = await Repository.editIncidentCiv(data);

    return {
        message: incident,
        success: success
    };
}

export const editIncidentCivCharges = async (data: { charges: any, incident_id: number, profile_civ_id: number }) => {
    const [success, incident] = await Repository.editIncidentCivCharges(data);

    return {
        message: incident,
        success: success
    };
}

export const removeIncidentCiv = async (data: { incident_id: number, profile_civ_id: number }) => {
    const [success, incident] = await Repository.removeIncidentCiv(data);

    return {
        message: incident,
        success: success
    };
}

export const exportIncidentCiv = async (data: { incident_id: number, profile_id: number }) => { }

export const searchIncidents = async (data: { title: string }): Promise<ActionsReturnPayload> => {
    const [success, incidents] = await Repository.searchIncidents(data);

    return {
        message: incidents,
        success: success
    };
}