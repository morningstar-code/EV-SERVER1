import { updateVehicleCallsign } from "./callsign";
import { createTempCert, submitTempCert } from "./cert";
import { spawnedVehicle } from "./vehicle";

export async function InitEvents(): Promise<void> {
    on('ev-police:client:openRhinoArmoy', () => {
        const myjob = global.exports.isPed.isPed('myjob');
        if (myjob !== 'police') return;
        emit('server-inventory-open', '10', 'Shop');
    });
    on('ev-police:client:fingerPrint', (pArgs: any, pEntity: number) => {
        const serverId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(pEntity));
        emitNet('ev-police:server:fingerPrint', serverId);
    });
    on('ev-police:client:seizeItems', (pArgs: any, pEntity: number) => {
        const serverId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(pEntity));
        emit('DoLongHudText', 'Seized Possessions.');
        emitNet('ev-police:server:seizeItems', Number(serverId));
    });
    onNet('ev-police:submitHold', async () => {
        const job = global.exports.isPed.isPed('myjob');
        if (job !== 'police') return;

        const prompt = await global.exports['ev-ui'].OpenInputMenu([
            {
                name: 'server_id',
                label: 'Server ID',
                icon: 'user'
            },
            {
                name: 'report_id',
                label: 'Report ID',
                icon: 'list'
            },
            {
                name: 'length',
                label: 'Length (in hours)',
                icon: 'clock'
            }
        ], (values: any) => {
            return values.server_id.length > 0 && values.report_id.length > 0 && values.length.length > 0;
        });
        if (!prompt) return;

        emitNet('ev-police:submitHold', parseInt(prompt.server_id), parseInt(prompt.report_id), parseInt(prompt.length));
    });
    on('ev-vehicles:spawnedVehicle', spawnedVehicle);
    onNet('ev-police:client:updateVehicleCallsign', updateVehicleCallsign);
    onNet('ev-police:client:showTextPopup', (data: any) => global.exports['ev-ui'].openApplication('textpopup', data));
    onNet('ev-police:client:createTempCert', createTempCert);
    RegisterUICallback('ev-police:client:submitTempCert', submitTempCert);
}

RegisterCommand("resetcuffs", (src: number, args: any[]) => {
    emit("ev-police:cuffs:state", false, false);
}, false);