local MenuData = {}

RPC.register("ev-bennys:getOrderData", function(src, data, vehClass, pOrder, vehType, netId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    MenuData = {
        {
            title = "Benny's Order",
            description = "Order ID: " .. pOrder .. " | Vehicle: " .. tostring(vehType),
        }
    }
    
    local cosmMenu = setupCosmetics(data, netId, vehClass)
    local performMenu = setupPerformance(data.mods, netId, vehClass)
    local resprayMenu = setupRespray(data, netId, vehClass)
    
    if cosmMenu then
        table.insert(MenuData, cosmMenu)
    end
    if performMenu then
        table.insert(MenuData, performMenu)
    end
    if resprayMenu then
        table.insert(MenuData, resprayMenu)
    end

    return MenuData
end)


function setupCosmetics(mods, veh, rating)
    local Cosmetic = {
        title = "Cosmetic",
        children = {},
    }

    if mods.tint > (-2) then    
        local price = exports["ev-bennys"]:getPriceModifiers(rating, "Window Tint") * exports["ev-bennys"]:getPartPrice("windowtint").price
        table.insert(Cosmetic.children, 
            {
                title = "Vehicle Window Tint",
                description = ("Price: %s | Stock: %s"):format(price, 999999),
                action = "ev-mechanics:order:view",
                disabled = false,
                key = {
                    mod = "tint",
                    type = mods.tint,
                    netId = veh,
                    cat = "Additional",
                    price = price,
                    settings = "cosmetic",
                },
            }
        )
    end

    if mods.neon then
        local price = exports["ev-bennys"]:getPriceModifiers(rating, "Neons") * exports["ev-bennys"]:getPartPrice("neonside").price
        table.insert(Cosmetic.children, 
            {
                title = "Vehicle Neon Light",
                description = ("Price: %s | Stock: %s"):format(price, 999999),
                action = "ev-mechanics:order:view",
                disabled = false,
                key = {
                    mod = "neon",
                    type = {
                        left = mods.neon["0"],
                        right = mods.neon["1"],
                        front = mods.neon["2"],
                        back = mods.neon["3"],
                    },
                    netId = veh,
                    cat = "Neon",
                    price = price,
                    settings = "cosmetic",
                }
            }
        )
    end

    if mods.plateIndex > (-2) then    
        local price = exports["ev-bennys"]:getPriceModifiers(rating, "plateIndex") * exports["ev-bennys"]:getPartPrice("plateindex").price
        table.insert(Cosmetic.children, 
            {
                title = "Vehicle Plate Styling",
                description = ("Price: %s | Stock: %s"):format(price, 999999),
                action = "ev-mechanics:order:view",
                disabled = false,
                key = {
                    mod = "plateIndex",
                    type = mods.plateIndex,
                    netId = veh,
                    cat = "Additional",
                    price = price,
                    settings = "cosmetic",
                }
            }
        )
    end

    if mods.lights then  
        local price = exports["ev-bennys"]:getPriceModifiers(rating, "Neon Color") * exports["ev-bennys"]:getPartPrice("neoncolours").price
        table.insert(Cosmetic.children, 
            {
                title = "Vehicle Neon Lights Color",
                description = ("Price: %s | Stock: %s"):format(price, 999999),
                action = "ev-mechanics:order:view",
                disabled = false,
                key = {
                    mod = "neon",
                    type = {
                        r = mods.lights[1],
                        g = mods.lights[2],
                        b = mods.lights[3],
                    },
                    netId = veh,
                    cat = "Appearance",
                    price = price,
                    settings = "cosmetic",
                }
            }
        )
    end

    if mods.xenonColor > (-2) then    
        print("mods.xenonColor", mods.xenonColor)
        local price = exports["ev-bennys"]:getPriceModifiers(rating, "Xenon Colour") * exports["ev-bennys"]:getPartPrice("xenoncolours").price
        table.insert(Cosmetic.children, 
            {
                title = "Vehicle Xenon Headlights Color",
                description = ("Price: %s | Stock: %s"):format(price, 999999),
                action = "ev-mechanics:order:view",
                disabled = false,
                key = {
                    mod = "xenon",
                    type = mods.xenonColor,
                    netId = veh,
                    cat = "Appearance",
                    price = price,
                    settings = "cosmetic",
                }
            }
        )
    end

    if mods.mods ~= nil then  
        if mods.mods["0"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Spoiler") * exports["ev-bennys"]:getPartPrice("cosmetics").price
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Spoiler",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Spoilers",
                        type = mods.mods["0"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end
        
        if mods.mods["1"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Front Bumper") * exports["ev-bennys"]:getPartPrice("cosmetics").price
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Front Bumper",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "FrontBumper",
                        type = mods.mods["1"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end
        
        if mods.mods["2"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Rear Bumper") * exports["ev-bennys"]:getPartPrice("cosmetics").price 
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Rear Bumper",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "RearBumper",
                        type = mods.mods["2"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end
        
        if mods.mods["3"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Side Skirt") * exports["ev-bennys"]:getPartPrice("cosmetics").price 
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Side Skirt",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "SideSkirt",
                        type = mods.mods["3"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end
        
        if mods.mods["4"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Exhaust") * exports["ev-bennys"]:getPartPrice("cosmetics").price  
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Exhaust",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Exhaust",
                        type = mods.mods["4"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["5"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Frame") * exports["ev-bennys"]:getPartPrice("cosmetics").price  
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Frame",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Frame",
                        type = mods.mods["5"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["6"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Grille") * exports["ev-bennys"]:getPartPrice("cosmetics").price  
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Grille",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Grille",
                        type = mods.mods["6"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["7"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Hood") * exports["ev-bennys"]:getPartPrice("cosmetics").price  
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Hood",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Hood",
                        type = mods.mods["7"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["8"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Left Fender") * exports["ev-bennys"]:getPartPrice("cosmetics").price    
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Left Fender",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Fender",
                        type = mods.mods["8"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["9"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Right Fender") * exports["ev-bennys"]:getPartPrice("cosmetics").price    
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Right Fender",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "RightFender",
                        type = mods.mods["9"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["10"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Roof") * exports["ev-bennys"]:getPartPrice("cosmetics").price     
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Roof",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Roof",
                        type = mods.mods["10"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["17"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "UNK17") * exports["ev-bennys"]:getPartPrice("cosmetics").price     
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle UNK17",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "UNK17",
                        type = mods.mods["17"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["19"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "UNK19") * exports["ev-bennys"]:getPartPrice("cosmetics").price     
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle UNK19",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "UNK19",
                        type = mods.mods["19"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["20"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Tire Smoke") * exports["ev-bennys"]:getPartPrice("cosmetics").price       
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Tire Smoke",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "TireSmoke",
                        type = mods.mods["20"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["21"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "UNK21") * exports["ev-bennys"]:getPartPrice("cosmetics").price        
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle UNK21",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "UNK21",
                        type = mods.mods["21"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    },
                }
            )
        end

        if mods.mods["22"] > (-2) then 
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Headlights") * exports["ev-bennys"]:getPartPrice("cosmetics").price           
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Xenon Bulb",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "XenonHeadlights",
                        type = mods.mods["22"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["23"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Wheels") * exports["ev-bennys"]:getPartPrice("wheels").price             
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Front Wheels",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "FrontWheels",
                        type = mods.mods["23"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["24"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Wheels") * exports["ev-bennys"]:getPartPrice("wheels").price               
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Back Wheels",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "BackWheels",
                        type = mods.mods["24"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["25"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Plate Holder") * exports["ev-bennys"]:getPartPrice("cosmetics").price                 
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Plate Holder",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "PlateHolder",
                        type = mods.mods["25"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["26"] > (-2) then 
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Vanity Plates") * exports["ev-bennys"]:getPartPrice("cosmetics").price                    
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Vanity Plate",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "VanityPlates",
                        type = mods.mods["26"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["27"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Interior Trim") * exports["ev-bennys"]:getPartPrice("cosmetics").price                    
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Interior Trim",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "InteriorTrim",
                        type = mods.mods["27"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["28"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Ornaments") * exports["ev-bennys"]:getPartPrice("cosmetics").price                      
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Ornaments",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Ornaments",
                        type = mods.mods["28"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["29"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Dashboard") * exports["ev-bennys"]:getPartPrice("cosmetics").price                        
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Dashboard",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Dashboard",
                        type = mods.mods["29"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["30"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Dial") * exports["ev-bennys"]:getPartPrice("cosmetics").price
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Dials",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Dials",
                        type = mods.mods["30"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["31"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Speaker") * exports["ev-bennys"]:getPartPrice("cosmetics").price  
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Door Speakers",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "DoorSpeakers",
                        type = mods.mods["31"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["32"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Seats") * exports["ev-bennys"]:getPartPrice("cosmetics").price    
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Seats",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Seats",
                        type = mods.mods["32"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["33"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Steering Wheel") * exports["ev-bennys"]:getPartPrice("cosmetics").price     
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Steering Wheel",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "SteeringWheel",
                        type = mods.mods["33"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["34"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Shift Leavers") * exports["ev-bennys"]:getPartPrice("cosmetics").price      
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Shift Leavers",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "ShiftLeavers",
                        type = mods.mods["34"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["35"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Plaques") * exports["ev-bennys"]:getPartPrice("cosmetics").price       
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Plaques",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Plaques",
                        type = mods.mods["35"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["36"] > (-2) then  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Speakers") * exports["ev-bennys"]:getPartPrice("cosmetics").price         
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Speakers",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Speakers",
                        type = mods.mods["36"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["37"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Trunk") * exports["ev-bennys"]:getPartPrice("cosmetics").price          
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Trunk",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Trunk",
                        type = mods.mods["37"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["38"] > (-2) then
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Hydraulics") * exports["ev-bennys"]:getPartPrice("cosmetics").price              
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Hydraulics",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Hydraulics",
                        type = mods.mods["38"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["39"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Engine Block") * exports["ev-bennys"]:getPartPrice("cosmetics").price               
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Engine Block",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "EngineBlock",
                        type = mods.mods["39"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["40"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Air Filter") * exports["ev-bennys"]:getPartPrice("cosmetics").price                
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Air Filter",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "AirFilter",
                        type = mods.mods["40"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["41"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Struts") * exports["ev-bennys"]:getPartPrice("cosmetics").price                
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Struts",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Struts",
                        type = mods.mods["41"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["42"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Arch Cover") * exports["ev-bennys"]:getPartPrice("cosmetics").price                
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Arch Cover",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "ArchCover",
                        type = mods.mods["42"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["43"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Aerials") * exports["ev-bennys"]:getPartPrice("cosmetics").price                
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Aerials",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Aerials",
                        type = mods.mods["43"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["44"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Aerials") * exports["ev-bennys"]:getPartPrice("cosmetics").price                
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Exterior Trim",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "ExteriorTrim",
                        type = mods.mods["44"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["45"] > (-2) then 
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Fuel Tank") * exports["ev-bennys"]:getPartPrice("cosmetics").price                   
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Tank",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Tank",
                        type = mods.mods["45"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["46"] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Fuel Tank") * exports["ev-bennys"]:getPartPrice("cosmetics").price                    
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle Windows",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Windows",
                        type = mods.mods["46"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end

        if mods.mods["47"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "UNK47") * exports["ev-bennys"]:getPartPrice("cosmetics").price                    
            table.insert(Cosmetic.children, 
                {
                    title = "Vehicle UNK47",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "UNK47",
                        type = mods.mods["47"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end
    end

    if Cosmetic.children[1] ~= nil then
        return Cosmetic
    end
end

function setupRespray(data, veh, rating)
    local Respray = {
        title = "Respray",
        children = {},
    }

    if data.mods ~= nil then 
        if data.mods["48"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Livery") * exports["ev-bennys"]:getPartPrice("respray").price
            table.insert(Respray.children, 
                {
                    title = "Vehicle Livery",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Livery",
                        type = data.mods["48"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        settings = "performance",
                    }
                }
            )
        end
    end

    if data.colors then
        if data.colors[1] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Primary Colour") * exports["ev-bennys"]:getPartPrice("respray").price
            table.insert(Respray.children, 
                {
                    title = "Vehicle Primary Color Respray",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "primary",
                        type = data.colors[1],
                        netId = veh,
                        cat = "Appearance",
                        price = price,
                        settings = "respray",
                    }
                }
            )
        end

        if data.colors[2] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Secondary Colour") * exports["ev-bennys"]:getPartPrice("respray").price
            table.insert(Respray.children, 
                {
                    title = "Vehicle Secondary Color Respray",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "secondary",
                        type = data.colors[2],
                        netId = veh,
                        cat = "Appearance",
                        price = price,
                        settings = "respray",
                    }
                }
            )
        end
    end

    if data.extracolors then
        if data.extracolors[1] > (-2) or data.extracolors[2] > (-2) then   
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Pearlescent Colour") * exports["ev-bennys"]:getPartPrice("respray").price 
            table.insert(Respray.children, 
                {
                    title = "Vehicle Pearlescent Finish",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "pearlescent",
                        type = data.extracolors[1] or data.extracolors[2],
                        netId = veh,
                        cat = "Appearance",
                        price = price,
                        settings = "respray",
                    }
                }
            )
        end
    end

    if data.dashColour > (-2) then    
        local price = exports["ev-bennys"]:getPriceModifiers(rating, "Dashboard Colour") * exports["ev-bennys"]:getPartPrice("respray").price 
        table.insert(Respray.children, 
            {
                title = "Vehicle Dashboard Color",
                description = ("Price: %s | Stock: %s"):format(price, 999999),
                action = "ev-mechanics:order:view",
                disabled = false,
                disabled = false,
                key = {
                    mod = "dashboard",
                    type = data.dashColour,
                    netId = veh,
                    cat = "Appearance",
                    price = price,
                    settings = "respray",
                }
            }
        )
    end
    if data.interColour > (-2) then    
        local price = exports["ev-bennys"]:getPriceModifiers(rating, "Interior Colour") * exports["ev-bennys"]:getPartPrice("respray").price 
        table.insert(Respray.children, 
            {
                title = "Vehicle Interior Color",
                description = ("Price: %s | Stock: %s"):format(price, 999999),
                action = "ev-mechanics:order:view",
                disabled = false,
                key = {
                    mod = "interior",
                    type = data.interColour,
                    netId = veh,
                    cat = "Appearance",
                    price = price,
                    settings = "respray",
                }
            }
        )
    end

    if data.wheeltype > (-2) then    
        local price = exports["ev-bennys"]:getPriceModifiers(rating, "Wheel Colour") * exports["ev-bennys"]:getPartPrice("respray").price 
        table.insert(Respray.children, 
            {
                title = "Vehicle Wheel Finish",
                description = ("Price: %s | Stock: %s"):format(price, 999999),
                action = "ev-mechanics:order:view",
                disabled = false,
                key = {
                    mod = "wheels",
                    type = data.wheeltype,
                    netId = veh,
                    cat = "Appearance",
                    price = price,
                    settings = "respray",
                }
            }
        )
    end

    if Respray.children[1] ~= nil then
        return Respray
    end
end

function setupPerformance(mods, veh, rating)
    local Mods = {
        title = "Performance",
        children = {},
    }

    if (mods) then
        if mods["11"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Engine Upgrade") * exports["ev-bennys"]:getPartPrice("performance").prices[mods["11"]]
            table.insert(Mods.children, 
                {
                    title = "Vehicle Engine Upgrade",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Engine",
                        type = mods["11"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        item = "enginekit",
                        settings = "performance",
                    }
                }
            )
        end

        if mods["12"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Brake Upgrade") * exports["ev-bennys"]:getPartPrice("performance").prices[mods["12"]]
            table.insert(Mods.children, 
                {
                    title = "Vehicle Brakes Upgrade",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Brakes",
                        type = mods["12"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        item = "brakingkit",
                        settings = "performance",
                    }
                }
            )
        end

        if mods["13"] > (-2) then  
            local part = 1
            if mods["13"] > 0 then
                part = mods["13"]
            end  
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Transmission Upgrade") * exports["ev-bennys"]:getPartPrice("performance").prices[part]
            table.insert(Mods.children, 
                {
                    title = "Vehicle Transmission Upgrade",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Transmission",
                        type = mods["13"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        item = "transmissionkit",
                        settings = "performance",
                    }
                }
            )
        end

        if mods["15"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Suspension Upgrade") * exports["ev-bennys"]:getPartPrice("performance").prices[mods["15"]]
            table.insert(Mods.children, 
                {
                    title = "Vehicle Suspension Upgrade",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Suspension",
                        type = mods["15"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        item = "suspensionkit",
                        settings = "performance",
                    }
                }
            )
        end

        if mods["18"] > (-2) then    
            local price = exports["ev-bennys"]:getPriceModifiers(rating, "Turbo Upgrade") * exports["ev-bennys"]:getPartPrice("turbo").price
            table.insert(Mods.children, 
                {
                    title = "Vehicle Turbo Upgrade",
                    description = ("Price: %s | Stock: %s"):format(price, 999999),
                    action = "ev-mechanics:order:view",
                    disabled = false,
                    key = {
                        mod = "Turbo",
                        type = mods["18"],
                        netId = veh,
                        cat = "performance",
                        price = price,
                        item = "turbokit",
                        settings = "performance",
                    }
                }
            )
        end

        if Mods.children[1] ~= nil then
            return Mods
        end
    end
end