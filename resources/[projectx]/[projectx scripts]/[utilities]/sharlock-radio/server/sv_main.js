const InitialData = {
    ["stations"] : {
        [1] : {
            ["radioNameHash"] : "RADIO_NIKEZ_RAP", // hash
            ["name"] : "name", // string
        },
        [2] : {
            ["radioNameHash"] : "RADIO_NIKEZ_ELECTRONIC", // hash
            ["name"] : "name", // string
        },
        [3] : {
            ["radioNameHash"] : "RADIO_NIKEZ_POP", // hash
            ["name"] : "name", // string
        },
        [4] : {
            ["radioNameHash"] : "RADIO_NIKEZ_MIX", // hash
            ["name"] : "name", // string
        },
        [5] : {
            ["radioNameHash"] : "RADIO_NIKEZ_ALTERNATIVE", // hash
            ["name"] : "name", // string
        },
        [6] : {
            ["radioNameHash"] : "RADIO_NIKEZ_ROCK", // hash
            ["name"] : "name", // string
        },
        [7] : {
            ["radioNameHash"] : "RADIO_NIKEZ_RAP", // hash
            ["name"] : "name", // string
        },
        [8] : {
            ["radioNameHash"] : "RADIO_NIKEZ_RAP", // hash
            ["name"] : "name", // string
        },
        [9] : {
            ["radioNameHash"] : "RADIO_NIKEZ_RAP", // hash
            ["name"] : "name", // string
        },
        [10] : {
            ["radioNameHash"] : "RADIO_NIKEZ_RAP", // hash
            ["name"] : "name", // string
        },
        [11] : {
            ["radioNameHash"] : "RADIO_NIKEZ_RAP", // hash
            ["name"] : "name", // string
        },
        [12] : {
            ["radioNameHash"] : "RADIO_NIKEZ_RAP", // hash
            ["name"] : "name", // string
        },
        [13] : {
            ["radioNameHash"] : "RADIO_NIKEZ_RAP", // hash
            ["name"] : "name", // string
        },
    },
    ["tracks"] : {
        [1] : {
            ["artistNameHash"] : "name", // hash
            ["artistName"] : "name", // string
            ["trackNameHash"] : "name", // hash
            ["trackName"] : "name", // string
        },
    },
}

isOn = true

onNet("Rhodinium-radio:changeStation", async(zoneName, stationId) => {
    emitNet("Rhodinium-radio:changeStation", -1, zoneName, stationId)
})

onNet("Rhodinium-radio:togglePower", async(zoneName) => {
    isOn = !isOn
    emitNet("Rhodinium-radio:togglePower", -1, zoneName, isOn)
})

CPX.Procedures.register("Rhodinium-radio:getInitialData", async() => {
    return InitialData
})