export const dragAsk = async (pEscorterServerId: number, pTargetServerId: number, pIsCarry: boolean) => {
    emitNet("ev-police:drag:start", pTargetServerId, String(pEscorterServerId), pIsCarry);
    emitNet("ev-police:drag:escort", pEscorterServerId, pTargetServerId, false); //Last arg: pDragging
}

export const dragDisable = async (pSource: number, pTargetServerId: number) => {
    console.log(`dragDisable | pSource: ${pSource} | pTargetServerId: ${pTargetServerId}`);

    const target = pTargetServerId ? pTargetServerId : -1;

    console.log(`dragDisable | target: ${target}`);

    emitNet("ev-police:drag:stopped", target, String(pSource));
    emitNet("ev-police:drag:releaseEscort", pSource);
}

RegisterCommand("carry", async (source: number) => {
    emitNet("ev-police:drag:carry", source);
}, false);