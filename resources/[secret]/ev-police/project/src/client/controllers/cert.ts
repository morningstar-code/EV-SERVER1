const validLicenses = ["fishing", "hunting"];

export const createTempCert = () => {
    global.exports["ev-ui"].openApplication("textbox", {
        key: 1,
        show: true,
        callbackUrl: "ev-police:client:submitTempCert",
        items: [{
            icon: "id-card",
            label: "State ID",
            name: "stateId"
        }, {
            icon: "id-badge",
            label: "License (fishing, hunting)",
            name: "license"
        }, {
            icon: "clock",
            label: "Expiry (in hours)",
            name: "expiry"
        }]
    });
};

export const submitTempCert = (data: { values: { stateId: string, license: string, expiry: string } }, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: 'done' } });
    const values = data.values;

    if (isNaN(parseInt(values.stateId))) {
        emit('DoLongHudText', 'Please provide a valid state id.', 2);
        return false;
    }

    if (!validLicenses.includes(values.license)) {
        emit('DoLongHudText', 'Please specify a valid license (hunting, fishing)', 2);
        return false;
    }

    if (isNaN(parseInt(values.expiry)) || parseInt(values.expiry) <= 0) {
        emit('DoLongHudText', 'Please specify a valid hour amount', 2);
        return false;
    }

    global.exports['ev-ui'].closeApplication('textbox');

    const metaData = JSON.stringify({
        stateId: parseInt(values.stateId),
        license: values.license,
        creatorId: global.exports.isPed.isPed('cid'),
        certExpiry: (GetCloudTimeAsInt() + parseInt(values.expiry) * 3600) * 1000
    });

    emit('player:receiveItem', 'tempcertificate', 1, false, {}, metaData);
    return true;
};