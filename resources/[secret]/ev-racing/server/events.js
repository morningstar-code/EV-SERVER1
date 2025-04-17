/**
 * RPCs
 */

//Races: races[eventId] = {}

//Need to map the races and add checkpoints

RPC.register("ev-racing:getAllRaces", () => {
    const racesWithCheckpoints = Object.keys(races).reduce(
        (updatedRaces, eventId) => {
            if (races[eventId]) {
                return {
                    ...updatedRaces,
                    [eventId]: { ...races[eventId], checkpoints: racesCheckpoints[eventId] }
                };
            }
            return updatedRaces;
        },
        races
    );

    return {
        races: racesWithCheckpoints,
        pendingRaces: pendingRaces,
        activeRaces: activeRaces,
        finishedRaces: finishedRaces
    };
});

RPC.register("ev-racing:getLeaderboard", (pSource) => {

});

RPC.register("ev-racing:getRaceCheckpoints", (pSource, pId) => {
    if (races[pId]) {
        return racesCheckpoints[pId];
    } else if (pendingRaces[pId]) {
        return racesCheckpoints[pendingRaces[pId].raceId];
    }
});

RPC.register("ev-racing:getEventConversation", getEventConversation);

RPC.register("ev-racing:sendEventMessage", sendEventMessage);

RPC.register("ev-racing:createPendingRace", createPendingRace);

RPC.register("ev-racing:deleteRace", deleteRace);

RPC.register("ev-racing:joinRace", joinRace);

RPC.register("ev-racing:leaveRace", leaveRace);

RPC.register("ev-racing:dnfRace", dnfRace);

RPC.register("ev-racing:startRace", startRace);

RPC.register("ev-racing:endRace", endRace);

RPC.register("ev-racing:finishedRace", finishedRace);

RPC.register("ev-racing:kickFromRace", kickFromRace);

RPC.register("ev-racing:banFromRace", banFromRace);

RPC.register("ev-racing:giveRaceDongle", (pSource, pCharacterId) => {
    const usedItemMetadata = {
        characterId: pCharacterId,
        _hideKeys: ["characterId"]
    };

    emitNet("player:receiveItem", pSource, "racingusb0", 1, false, usedItemMetadata);
});

RPC.register("ev-racing:bestLapTimes", async (pSource, pRaceId, pVehicleClass, pLimit) => {
    let query = `
        SELECT
            *
        FROM
            _race_leaderboard
        WHERE
            raceId = @raceId
            ${pVehicleClass === "All" ? "" : "AND vehicleClass = @vehicleClass"}
        ORDER BY
            bestLapTime ASC
        LIMIT
            @limit
    `;

    const results = await SQL.execute(query, {
        raceId: pRaceId,
        vehicleClass: pVehicleClass,
        limit: pLimit
    });

    return results;
});

RPC.register("ev-racing:bestLapTimesForAlias", async (pSource, pRaceId, pCid, pAlias, pVehicleClass, pLimit) => {
    let query = `
        SELECT
            *
        FROM
            _race_leaderboard
        WHERE
            raceId = @raceId
            AND characterId = @characterId
            AND alias = @alias
            ${pVehicleClass === "All" ? "" : "AND vehicleClass = @vehicleClass"}
        ORDER BY
            bestLapTime ASC
        LIMIT
            @limit
    `;

    const results = await SQL.execute(query, {
        raceId: pRaceId,
        characterId: pCid,
        alias: pAlias,
        vehicleClass: pVehicleClass,
        limit: pLimit
    });
    
    return results;
});

/**
 * Events
 */

onNet("ev-racing:updatePositionInfo", updatePositionInfo);
onNet("ev-weather:server:nightTime", updateNightTime);