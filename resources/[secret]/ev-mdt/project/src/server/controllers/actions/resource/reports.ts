import { Repository } from "server/database/repository";

export const exportReport = async (data: { id: number }): Promise<ActionsReturnPayload> => {
    return {
        message: "Not implemented",
        success: false
    }
}

export const promoteReport = async (data: { id: number }): Promise<ActionsReturnPayload> => {
    const [success, promoteReport] = await Repository.promoteReport(data);

    return {
        message: promoteReport,
        success: success
    };
}

export const getReportCategories = async (data: any): Promise<ActionsReturnPayload> => {
    const [success, reportCategories] = await Repository.getReportCategories();

    return {
        message: reportCategories,
        success: success
    };
}

export const getReports = async (data: { title: string, latest?: boolean, report_category_id?: number }): Promise<ActionsReturnPayload> => {
    const [success, reports] = await Repository.getReports(data);

    return {
        message: reports,
        success: success
    };
}

export const getReport = async (data: { id: number, title: string, created_by_state_id: number, created_by_name: string, timestamp: number, report_category_id: number, report_category_name: string }): Promise<ActionsReturnPayload> => {
    const [success, report] = await Repository.getReport(data.id);

    return {
        message: report,
        success: success
    };
}

export const editReport = async (source: number, data: { id: number, title: string, description: string, created_by_state_id: number, created_by_name: string, timestamp: number, report_category_id: number, report_category_name: string, tags: any[], evidence: any[], officers: any[], persons: any[], vehicles: any[] }): Promise<ActionsReturnPayload> => {
    const [success, report] = await Repository.editReport(source, data);

    return {
        message: report,
        success: success
    };
}

export const searchReports = async (data: { title: string}): Promise<ActionsReturnPayload> => {
    const [success, reports] = await Repository.searchReports(data);

    return {
        message: reports,
        success: success
    };
}