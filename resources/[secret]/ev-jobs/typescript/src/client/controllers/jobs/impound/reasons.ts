const ImpoundReasons = new Map<string, ImpoundReason>();

export async function InitImpoundReasons(idx = 0): Promise<any> {
    const reasons = await RPC.execute<ImpoundReason[]>("ev-jobs:impound:fetchReasons");
    if ((!reasons || reasons.length === 0) && idx < 5) return setTimeout(() => InitImpoundReasons(++idx), 5000);
    reasons?.forEach((reason) => ImpoundReasons.set(reason.code, reason));
}

export function GetImpoundReasons(): ImpoundReason[] {
    return [...ImpoundReasons.values()];
}

export function GetImpoundReason(code: string): ImpoundReason | undefined {
    return ImpoundReasons.get(code);
}

export function GetImpoundName(code: string): string {
    return GetImpoundReason(code)?.name || "Unknown";
}

export function GetImpoundFee(code: string): number {
    return GetImpoundReason(code)?.fee || 0;
}