export async function InitLiftModels(liftModels: string[]) {
    for (const liftModel of liftModels) {
        const hash = GetHashKey(liftModel);
        RequestModel(hash);
        while (!HasModelLoaded(hash)) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }
    return true;
};