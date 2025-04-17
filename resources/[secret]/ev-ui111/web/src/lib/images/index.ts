import { storeObj } from "../redux"

export const FindImagesInString = (text: string) => {
    try {
        if (
            !storeObj.getState().system.imagesEnabled ||
            !storeObj.getState().preferences['phone.images.enabled']
        ) {
            return {
                message: text,
                images: []
            }
        }

        const matched = text.match(/https:\/\/\S*?(\.png|\.gif|\.jpg|\.jpeg|\.webm|\.mp4|\.bmp)(.*?\s|.*)/g);

        const trimmed = matched ? matched.map((m) => {
            return m.trim();
        }) : [];

        const newText = text;

        trimmed.forEach((t) => {
            newText.replace(t, "");
        });

        return {
            message: newText,
            images: trimmed
        };
    } catch (e) {
        return {
            message: text,
            images: []
        };
    }
}