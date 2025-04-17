import { RankValue } from "@shared/classes/enums";
import { Base, Events, Procedures } from "@cpx/server";
import { getVehicles } from "server/config/vehicles";
import { GetClientCommands, GetServerCommands, clientCommandArray, serverCommandArray } from "server/server";
import { Repository } from "./database/repository";
//import { Log } from "./logs";
//import { clientCommands, serverCommands } from "server/util/commands";

export async function InitEvents(): Promise<void> { };

RPC.register("ev:admin:getCommandUI", (pSource: number) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    if (clientCommandArray.length == 0) {
        const clientCommands = GetClientCommands();
        clientCommands.flatMap(Object.values).forEach(command => clientCommandArray.push(command));
    }

    if (serverCommandArray.length == 0) {
        const serverCommands = GetServerCommands();
        serverCommands.flatMap(Object.values).forEach(command => serverCommandArray.push(command));
    }

    const commands = [
        ...clientCommandArray,
        ...serverCommandArray
    ];

    const value = RankValue[user.rank];

    return commands.filter((command: CommandData) => {
        return value >= command.value;
    }).map((command: CommandData) => {
        const adminMenu = command.commandUI.adminMenu;
        if (adminMenu) {
            const adminCommand = adminMenu.command;
            adminCommand.action = command.name;
        }

        const selection = command.commandUI.selection;
        if (selection) {
            selection.action = command.name;
        }

        return command.commandUI;
    });
});

export function isAdmin(pSource: number) {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const rank = user.rank;
    if (RankValue[rank] >= RankValue.helper) {
        const isDev = rank === 'dev' || rank === 'owner' ? true : false;
        const isDevServer = GetConvar("sv_environment", "prod") === "debug";
        return [true, isDev && isDevServer];
    } else {
        return [false, false];
    }
}

RPC.register("ev:admin:isAdmin", (pSource: number) => {
    return isAdmin(pSource);
});

RPC.register("ev:admin:requestAdminPermission", (pSource: number) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const rank = user.rank;
    if (RankValue[rank] >= RankValue.user) {
        const isDev = rank === 'dev' || rank === 'owner' ? true : false;
        const isDevServer = GetConvar("sv_environment", "prod") === "debug";
        return [true, isDev && isDevServer];
    } else {
        return [false, false];
    }
});

RPC.register("ev:admin:runCommandFromClient", async (pSource: number, pName: string, pArgs: any) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    if (clientCommandArray.length == 0) {
        const clientCommands = GetClientCommands();
        clientCommands.flatMap(Object.values).forEach(command => clientCommandArray.push(command));
    }

    if (serverCommandArray.length == 0) {
        const serverCommands = GetServerCommands();
        serverCommands.flatMap(Object.values).forEach(command => serverCommandArray.push(command));
    }

    const commands = [
        ...clientCommandArray,
        ...serverCommandArray
    ];

    const command: CommandData = commands.find((command: CommandData) => {
        return command.name === pName;
    });

    if (!command) return console.log("Command not found");

    if (command.isClientCommand) {
        emitNet("ev-admin:runClientCommand", pSource, pName, {
            source: pSource,
            name: user.name
        }, pArgs, command.log);
    } else {

        const result = await command.executedFunction({
            source: pSource,
            name: user.name
        }, pArgs);

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Adding 1 because month indices start from 0
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const log = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} Admin -${user.name}- ${command.log}${result}`;
        console.log(log);

        if (!command.blockClientLog) {
            emitNet("ev-admin:logClient", pSource, log);
        }

        if (log) {
            //global.exports["ev-log"].AddLog("admin", log)
        }
    }

    if (command.closeMenu) {
        emitNet("ev-admin:closeMenu", pSource);
    }
});

RPC.register("ev:admin:triggerLogFromClient", (pSource: number, pArg: string, pLog: string, pBlockClientLog: boolean) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return;

    const steamName = user.name;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because month indices start from 0
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const log = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} Admin -${steamName}- ${pArg}${pLog}`;
    console.log(log);

    if (!pBlockClientLog) {
        emitNet("ev-admin:logClient", pSource, log);
    }

    if (log) {
        global.exports["ev-log"].AddLog("admin", log)
    }
});

RPC.register("ev:admin:getUserData", async (pSource: number, pServerId: number) => {
    const userData = await Repository.getUserData(pServerId);
    if (!userData) return null;
    return userData;
});

RPC.register("ev:admin:getVehicleInfo", async (pSource: number, pVin: string) => {
    const vehicleInfo = await Repository.getVehicleInfo(pVin);
    if (!vehicleInfo) return null;
    return vehicleInfo;
});

RPC.register("ev:admin:getObjectSyncedData", async (pSource: number, pObjectId: string) => {
    return await Repository.getObjectSyncedData(pObjectId);
});

RPC.register("ev:admin:getInventoryNames", (pSource: number) => {

});

RPC.register("ev:admin:getPlayerLogs", async (pSource: number, pData: any) => {
    if (pData.steamid !== "" || pData.steamid !== undefined && pData.type === "" && pData.cid === "") {
        let data = await SQL.execute("SELECT * FROM _admin_player_log WHERE steamid = @steamid ORDER BY id DESC LIMIT @limit", {
            steamid: pData.steamid,
            limit: pData.limit
        });

        return data
    }
    if (pData.cid !== "" || pData.cid !== undefined && pData.type === "" && pData.steamid === "") {
        let data = await SQL.execute("SELECT * FROM _admin_player_log WHERE cid = @cid ORDER BY id DESC LIMIT @limit", {
            cid: pData.cid,
            limit: pData.limit
        });

        return data
    }
    if (pData.type !== "" || pData.type !== undefined && pData.cid === "" && pData.steamid === "") {
        let data = await SQL.execute("SELECT * FROM _admin_player_log WHERE type = @type ORDER BY id DESC LIMIT @limit", {
            type: pData.type,
            limit: pData.limit
        });

        return data
    }

    return [];
});

RPC.register("ev:admin:getPlayerList", (pSource: number) => {
    let players: any = [];

    Object.entries(getPlayers()).forEach(([i, player]: any) => {
        const steamid = GetPlayerIdentifier(player, 0);
        players.push({
            name: GetPlayerName(player),
            SteamID: steamid,
            serverID: player,
            queueType: "Regular"
        })
    });

    return {
        CurrentPlayers: players,
        Disconnected: []
    };
});

RPC.register("ev:admin:getBannedPlayers", (pSource: number) => {

});

RPC.register("ev:admin:getDefinedNames", (pSource: number, pDefinedNames: any) => {

});

const cloakedPlayers: any = []

RPC.register("ev:admin:getCurrentCloakList", (pSource: number) => {
    return cloakedPlayers;
});


RPC.register("ev:admin:cloak", (pSource: number, pEnabled: boolean) => {
    if (pEnabled) {
        cloakedPlayers.push(pSource);
        emitNet("ev-admin:cloakList", -1, cloakedPlayers, pEnabled, pSource);
    } else {
        const index = cloakedPlayers.indexOf(pSource);
        if (index > -1) {
            cloakedPlayers.splice(index, 1);
        }

        emitNet("ev-admin:cloakList", -1, cloakedPlayers, pEnabled, pSource);
    }
});

RPC.register("ev-adminUI:fetchVehiclePresets", (pSource: number) => {

});

RPC.register("ev-adminUI:fetchGarages", async (pSource: number) => {
    const garages = await Repository.fetchGarages();
    if (!garages) return [];
    return garages;
});

Events.onNet("ev-admin:submitAdminAction", (pAction: string, pToggled: string) => {

});

Events.onNet("ev-admin:giveGodMode", () => {

});

Events.onNet("ev-admin:toggleBlur", () => {

});

onNet("ev-admin:damagePed", (pServerId: number, pDamage: number) => {
    TriggerClientEvent("ev-admin:damageMe", pServerId, pDamage);
});

onNet("ev-admin:damageVehicle", (pNetId: number) => {
    TriggerClientEvent("ev-admin:damageVeh", -1, pNetId);
});

onNet("ev-admin:refuelVehicle", (pNetId: number) => {
    //TODO;
});

onNet("ev-admin:explodePlayer", (pServerId: number) => {
    TriggerClientEvent("ev-admin:explodeMe", pServerId);
});

onNet("ev-admin:explodeVehicle", (pNetId: number, pCoords?: number[]) => {
    TriggerClientEvent("ev-admin:explodeVeh", -1, pNetId, pCoords);
});

onNet("ev-admin:burnPlayer", (pServerId: number, pDamage: number) => {
    TriggerClientEvent("ev-admin:burnMe", pServerId);
});

onNet("ev-admin:burnEntity", (pNetId: number) => {
    TriggerClientEvent("ev-admin:burnEnt", -1, pNetId);
});

onNet("ev-admin:telekinesis", (pNetId: number) => {
    const entity = NetworkGetEntityFromNetworkId(pNetId);
    ApplyForceToEntity(entity, 1, 9500.0, 3.0, 7100.0, 1.0, 0.0, 0.0, 1, false, true, false, false, false);
});