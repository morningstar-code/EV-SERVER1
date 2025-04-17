local KitchenConfig = {
    polytargets = {
        ["cleaning_dish"] = {
            coords = vector3(1778.72, 2565.04, 45.67),
            width = 0.75,
            length =  1.85,
            options = {                
                heading = 0,
                minZ = 44.67,
                maxZ = 45.72,
                data = {
                    id = 1,
                    CanDo = true,
                },
            },
            peek = {
                label = "clean dishes",
                icon = "fas fa-pump-soap",
                parameters = {
                    text ="Cleaning",
                    type = "dish",
                },
            },
        },
        ["sorting_shelf"] = {
            coords = vector3(1786.66, 2564.35, 45.67),
            width = 1.8,
            length =  2.2,
            options = {  
                heading = 0,
                minZ = 44.67,
                maxZ = 47.07,
                data = {
                    id = 2,
                    CanDo = true,
                },
            },
            peek = {
                label = "sort",
                icon = "fas fa-sort",
                parameters = {
                    text ="Sorting",
                    type = "shelf",
                },
            },
        },
    },
}

RPC.register("ev-jail:kitchenConfig", function(src)
    return KitchenConfig
end)