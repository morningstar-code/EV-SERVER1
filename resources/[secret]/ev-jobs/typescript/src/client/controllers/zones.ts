export async function InitZones(): Promise<void> {
    setZone("impound", ["job_impound", "job_towtruck"]);
}

export const zoneMap = new Map();

export function addZone(zoneName: string) {
    if (!zoneMap.has(zoneName)) zoneMap.set(zoneName, new Set());
    zoneMap.get(zoneName);
}

export function setZone(zoneName: string, jobs: string[]) {
    zoneMap.set(zoneName, new Set(jobs));
}

export function addJobToZone(zoneName: string, jobName: string) {
    if (!zoneMap.has(zoneName)) zoneMap.set(zoneName, new Set());
    return zoneMap.get(zoneName).add(jobName);
}

export function removeJobFromZone(zoneName: string, jobName: string) {
    zoneMap.get(zoneName).delete(jobName);
}

export function hasJobInZone(zoneName: string, jobName: string) {
    return zoneMap.get(zoneName)?.has(jobName) ?? false;
}