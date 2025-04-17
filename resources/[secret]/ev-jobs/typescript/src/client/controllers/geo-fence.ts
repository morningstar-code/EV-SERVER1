import { GetPlayerJob, JobCheckOut } from "./npcs";

let geoFenceTimeout: any;

export async function InitGeoFence(): Promise<void> { }

on("ev-polyzone:enter", (zone: string, data: { job: string }) => {
    if (zone !== "job_geofence") return;
    const currentJob = GetPlayerJob();
    if (data.job !== currentJob) return;
    clearTimeout(geoFenceTimeout);
    geoFenceTimeout = undefined;
});

on("ev-polyzone:exit", (zone: string, data: { job: string }) => {
    if (zone !== "job_geofence") return;
    const currentJob = GetPlayerJob();
    if (data.job !== currentJob) return;
    clearTimeout(geoFenceTimeout);
    geoFenceTimeout = setTimeout(() => JobCheckOut(), 10000);
    emit("DoLongHudText", "You're leaving the work area", 2);
});