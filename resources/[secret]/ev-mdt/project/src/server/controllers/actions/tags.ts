import { Repository } from "server/database/repository";

export const getTags = async (data: any): Promise<any> => {
    const tags = await Repository.getTags();

    return {
        message: tags,
        success: true
    };
}

export const getTagCategories = async (data: any): Promise<any> => {
    const tagCategories = await Repository.getTagCategories();

    return {
        message: tagCategories,
        success: true
    };
}

export const editTag = async (data: { category_id: number, text: string }): Promise<any> => {
    const editTag = await Repository.editTag(data);

    return {
        message: editTag,
        success: true
    };
}