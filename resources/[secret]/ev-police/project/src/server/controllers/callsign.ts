import { Base } from "@cpx/server";

export const saveVehicleMods = async (pSource: number, pNetId: number, pMods: { modType: string, modIndex: number }[]) => {
    const mods = {} as any;

    for (const mod of pMods) {
        mods[mod.modType] = mod.modIndex;
    }

    await RPC.execute("SetVehicleMods", pSource, pNetId, mods);
};

RegisterCommand("callsign", async (src: number, args: string[]) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(src);
    if (!user) return;

    const job = user.getVar("job");

    const callsign = args[0];

    if (callsign && callsign.length > 0 && job === "police") {
        const updated = await SQL.execute("UPDATE jobs_whitelist SET callsign = @callsign WHERE cid = @cid AND job = 'police'", {
            callsign: callsign,
            cid: user.character.id
        });

        if (!updated) return emitNet("DoLongHudText", src, "Failed to update callsign.", 2);

        return emitNet("ev-police:client:updateVehicleCallsign", src, callsign);
    }
}, false);