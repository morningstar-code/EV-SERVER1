export async function getHexId(pSource: number) {
    const playerIdentifiers = getPlayerIdentifiers(pSource);
    let steam = "None";
    
    for (let i = 0; i < playerIdentifiers.length; i++) {
        if (playerIdentifiers[i].includes('steam')) {
            steam = playerIdentifiers[i];
        }
    }

    return steam;
}

export async function hexIdToComId(pHexId: string) {
    return global.exports['ev-base'].HexIdToComId(pHexId);
}

export async function hexIdToSteamId(pHexId: string) {
    return global.exports['ev-base'].HexIdToSteamId(pHexId);
}