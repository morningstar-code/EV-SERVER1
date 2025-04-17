local convictions = {}

RPC.register("GetStocksData", function(pSource)
    return "The market has been in turmoil since the global catastrophe that was..."
end)

RPC.register("GetConvictionList", function(pSource)
    return convictions
end)

RPC.register("GetDrugNews", function(pSource)
    return {
        hot = {
            "Los Santos",
            "Paleto Bay",
            "Sandy Shores"
        },
        drugs = {
            "Cocaine",
            "Methamphetamine",
            "Marijuana"
        },
        sought = {}
    }
end)

RegisterNetEvent("ev:news:newConviction")
AddEventHandler("ev:news:newConviction", function(pConviction)
    convictions[#convictions + 1] = pConviction
end)