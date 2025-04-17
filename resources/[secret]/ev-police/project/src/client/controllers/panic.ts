import { Procedures } from "@cpx/client";
import { GetResourceConfig } from "@shared/config";
import { RegisterItemCallback } from "./items";
import { taskBar } from "@shared/utils/tools";
import { SendDistressSignal, isPolice } from "./state";

let panicButtonIsDead = false;
let lastPanic = 0;
let panicButtonDelayTimeout: NodeJS.Timeout | undefined;
let panicButtonDispatchCode = '10-13B';
let signalDelayTimeout: NodeJS.Timeout | undefined;
let _0x12af58 = false;
let _0x3c0c9d = false;

export const InitPanic = (): void => { };

function panicButtonUnavailable() {
    const time = GetGameTimer();
    const panicButtonCooldown = GetResourceConfig<number>('panicButtonCooldown') ?? 10;
    return time - lastPanic < panicButtonCooldown * 1000;
}

RegisterItemCallback('panicbutton', async () => {
    if (panicButtonIsDead) return;

    const time = GetGameTimer();

    const panicButtonPrepTime = GetResourceConfig<number>('panicButtonPrepTime') ?? 0;

    if (panicButtonUnavailable()) return;

    const finished = panicButtonPrepTime > 0 ? await taskBar(panicButtonPrepTime * 1000, 'Sending Distress Signal...') : 100;

    if (finished !== 100) return;

    lastPanic = time;

    const success = SendDistressSignal();

    if (!success) return emit('DoLongHudText', 'Failed to send distress signal.', 2);
});

on('pd:deathcheck', () => {
    panicButtonIsDead = !panicButtonIsDead;

    const panicButtonAutomated = GetResourceConfig<boolean>('panicButtonAutomated') ?? false;
    if (!panicButtonAutomated) {
        const distressSignalDelayed = GetResourceConfig<boolean>('distressSignalDelayed') ?? false;

        if (!distressSignalDelayed) return;

        clearTimeout(signalDelayTimeout);

        signalDelayTimeout = undefined;

        if (!panicButtonIsDead) return;

        const panicButtonDelay = GetResourceConfig<number>('panicButtonDelay') ?? 30;

        _0x12af58 = false;

        _0x3c0c9d = false;

        signalDelayTimeout = setTimeout(() => {
            _0x12af58 = true;

            signalDelayTimeout = undefined;

            if (!_0x3c0c9d) return emit('DoLongHudText', 'Abnormal vital signs, distress signal available for use.', 1);

            const success = SendDistressSignal(panicButtonDispatchCode);

            if (!success) return emit('DoLongHudText', 'Failed to send distress signal.', 2);
        }, panicButtonDelay * 1000);

        return;
    }

    const panicButtonDelay = GetResourceConfig<number>('panicButtonDelay') ?? 30;

    if (!panicButtonIsDead && panicButtonDelayTimeout) {
        panicButtonDelayTimeout = undefined;

        emit('DoLongHudText', 'Normal vital signs, aborting distress signal.', 1);

        return clearTimeout(panicButtonDelayTimeout);
    }

    if (!isPolice || !panicButtonIsDead || panicButtonUnavailable()) return;

    panicButtonDispatchCode = '10-13B';

    panicButtonDelayTimeout = setTimeout(() => {
        lastPanic = GetGameTimer();

        panicButtonDelayTimeout = undefined;

        const success = SendDistressSignal(panicButtonDispatchCode);

        if (!success) return emit('DoLongHudText', 'Failed to send distress signal.', 2);
    }, panicButtonDelay * 1000);

    emit('DoLongHudText', 'Abnormal vital signs, sending distress signal in ' + panicButtonDelay + ' seconds.', 2);
});

on('ev-police:distressSignal', ([pDispatchCode]: [string]) => {
    if (!isPolice || !panicButtonIsDead) return;

    panicButtonDispatchCode = pDispatchCode;

    const panicButtonAutomated = GetResourceConfig<boolean>('panicButtonAutomated') ?? false;

    if (panicButtonAutomated) {
        return emit('DoLongHudText', 'Distress signal type changed: ' + pDispatchCode, 1);
    }

    const distressSignalDelayed = GetResourceConfig<boolean>('distressSignalDelayed') ?? false;

    if (distressSignalDelayed && !_0x12af58) {
        const panicButtonDelay = GetResourceConfig<number>('panicButtonDelay') ?? 30;

        if (_0x3c0c9d) return;

        _0x3c0c9d = true;

        return emit('DoLongHudText', 'Abnormal vital signs, sending distress signal in ' + panicButtonDelay + ' seconds.', 2);
    }

    if (panicButtonUnavailable()) return;

    lastPanic = GetGameTimer();

    const success = SendDistressSignal(pDispatchCode);

    if (!success) return emit('DoLongHudText', 'Failed to send distress signal.', 2);
});

async function openRecentCuffsMenu(pEntity: number) {
    const serverId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(pEntity));
    const recentCuffs = await Procedures.execute<RecentCuff[]>('ev-police:getRecentCuffs', serverId);

    const menuData = [];

    for (const recentCuff of recentCuffs) {
        menuData.push({
            title: `${recentCuff.cuffer.fullName} - ${recentCuff.action}`,
            icon: recentCuff.action === 'cuff' ? 'lock' : 'lock-open',
            description: new Date(recentCuff.timestamp).toLocaleString(),
        });
    }

    if (menuData.length === 0) {
        menuData.push({
            title: 'No results',
            icon: 'search'
        });
    }

    menuData.unshift({
        title: 'Recent Cuffs',
        icon: 'info-circle',
        description: 'Log with recent police cuff actions',
    });

    global.exports['ev-ui'].showContextMenu(menuData);
}

on('ev-police:openRecentCuffsMenu', (pArgs: any, pEntity: number) => {
    openRecentCuffsMenu(pEntity);
});