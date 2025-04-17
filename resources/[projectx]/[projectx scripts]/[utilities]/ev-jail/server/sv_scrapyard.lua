local Menu = {
    {
        title = "Lockpick",
        description = "Cheaply made",
        disabled = false,
        children = {
            {title = "Start Crafting", description = "Amount 1, Length: Short", action = "ev-jail:CraftItem", key = {
                item = "lockpick",
                amount = 1,
                ingredients = {
                    ["scrapmetal"] = 2,
                    ["aluminium"] = 2,
                },
            }},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "Scrap Metal x2", description = "", action = "", key = ""},
            {title = "Aluminium x2", description = "", action = "", key = ""},
        },
    },
    {
        title = "Ass Lockpick",
        description = "Very Cheaply made",
        disabled = false,
        children = {
            {title = "Start Crafting", description = "Amount 1, Length: Short", action = "ev-jail:CraftItem", key = {
                item = "shitlockpick",
                amount = 1,
                ingredients = {
                    ["scrapmetal"] = 1,
                    ["aluminium"] = 1,
                },
            }},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "Scrap Metal x1", description = "", action = "", key = ""},
            {title = "Aluminium x1", description = "", action = "", key = ""},
        },
    },
    {
        title = "Mixed Powder",
        description = "Put a brick to good use",
        disabled = false,
        children = {
            {title = "Start Crafting", description = "Amount 5, Length: Short", action = "ev-jail:CraftItem", key = {item = "hydroxylimine", amount = 5}},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "Mysterious Powder x10", description = "", action = "", key = ""},
            {title = "Brick x1", description = "", action = "", key = ""},
        },
    },
    {
        title = "Potato Luncher",
        description = "It could lunch a cow!",
        disabled = false,
        children = {
            {title = "Start Crafting", description = "Amount 1, Length: Short", action = "ev-jail:CraftItem", key = {
                item = "prisonlauncher",
                amount = 1,
                ingredients = {
                    ["pvcpipe"] = 1,
                    ["pvcjoint"] = 1,
                    ["pvcvalve"] = 1,
                    ["1064738331"] = 1,
                },
            }},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "PVC Pipe x1", description = "", action = "", key = ""},
            {title = "PVC Joint x1", description = "", action = "", key = ""},
            {title = "PVC Valve x1", description = "", action = "", key = ""},
            {title = "Brick x1", description = "", action = "", key = ""},
        },
    },
    {
        title = "Canister",
        description = "Empty inside",
        disabled = false,
        children = {
            {title = "Start Crafting", description = "Amount 1, Length: Short", action = "ev-jail:CraftItem", key = {
                item = "launcherpouch", 
                amount = 1,
                ingredients = {
                    ["copper"] = 3,
                    ["aluminium"] = 3,
                },
            }},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "Aluminium x3", description = "", action = "", key = ""},
            {title = "Copper x3", description = "", action = "", key = ""},
        },
    },
    {
        title = "Ass Phone",
        description = "Whats' the lock code?",
        disabled = false,
        children = {
            {title = "Start Crafting", description = "Amount 1, Length: Short", action = "ev-jail:CraftItem", key = {
                item = "assphone", 
                amount = 1,
                ingredients = {
                    ["aluminium"] = 5,
                    ["electronics"] = 5,
                    ["glass"] = 2,
                },
            }},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "Aluminium x5", description = "", action = "", key = ""},
            {title = "Electronics x5", description = "", action = "", key = ""},
            {title = "Glass x2", description = "", action = "", key = ""},
        },
    },
    {
        title = "Shiv",
        description = "stabby stab",
        disabled = false,
        children = {
            {title = "Start Crafting", description = "Amount 1, Length: Short", action = "ev-jail:CraftItem", key = {
                item = "-262696221", 
                amount = 1,
                ingredients = {
                    ["scrapmetal"] = 50,
                },
            }},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "Scrap Metal x50", description = "", action = "", key = ""},
        },
    },
    {
        title = "Watering Can",
        description = "Sturdy",
        disabled = false,
        children = {
            {title = "Start Crafting", description = "Amount 1, Length: Short", action = "ev-jail:CraftItem", key = {
                item = "wateringcan", 
                amount = 1,
                ingredients = {
                    ["aluminium"] = 50,
                },
            }},
            {title = "Ingredients:", description = "", action = "", key = ""},
            {title = "Aluminium x50", description = "", action = "", key = ""},
        },
    },
}

local Materials = {
    "aluminium",
    "plastic",
    "copper",
    "electronics",
    "rubber",
    "scrapmetal",
    "steel",
    "glass",
    "wood",
}

RPC.register("ev-jail:GetScrapYardMenu", function(src)
    return Menu
end)

RPC.register("ev-jail:GetScrapMaterials", function(src)
    local GetItem = Materials[math.random(1, 9)]
    return GetItem
end)

RegisterNetEvent("ev-jail:PayThePoor")
AddEventHandler("ev-jail:PayThePoor", function()
    local src = source
    if math.random() < 0.2 then
        exports["ev-financials"]:updateCash(src, "+", math.random(2, 10))
    end
end)