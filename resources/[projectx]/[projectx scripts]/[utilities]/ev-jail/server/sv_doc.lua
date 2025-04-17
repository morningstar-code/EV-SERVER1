local RentalMenu = {
    {
        title = "Rent Bicycle",
        description = "Rent a bicycle for $50",
        action = "ev-jail:RentBike",
        icon = "money-bill-wave",
        key = {Model = "bmx", price = 50},
    },
    {
        title = "Build Bicycle",
        description = "Build a bicycle for raw materials.",
        action = "",
        icon = "hammer",
        key = "",
        children = {
            {title = "Start Crafting", description = "Amount 1, Length: Short", action = "ev-jail:CraftBike", key = {
                Model = "bmx",
                ingredients = {
                    ["scrapmetal"] = 5,
                    ["Aluminium"] = 5,
                    ["rubber"] = 10,
                },
            }},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "Scrap Metal x5", description = "", action = "", key = ""},
            {title = "Aluminium x5", description = "", action = "", key = ""},
            {title = "Rubber x10", description = "", action = "", key = ""},
        },
    },
}

RPC.register("ev-jail:GetBikeMenu", function(src)
    return RentalMenu
end)

RPC.register("ev-jail:RentBike", function(src, pData)
    
end)