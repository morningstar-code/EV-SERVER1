export let Config: GetConfig;
export let availabeJobs: { [key: string]: any };

export const InitJobConfig = (): void => {
    console.log("[JOBS] Initing config...");
    Config = global.exports["ev-jobs"].GetConfig() as GetConfig;
    availabeJobs = Object.keys(Config.Jobs);
}