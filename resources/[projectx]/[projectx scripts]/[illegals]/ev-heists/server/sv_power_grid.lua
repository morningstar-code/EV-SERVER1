local nodeData = {
    [1] = {
        bank = "fleeca_pinkcage",
        id = 1,
        coords = vector3(310.16, -240.07, 54.13),
        state = 1,
        power = power,
        transfer = true,
        disabled = false
    },
}

local genData = {
    id = 1,
    coords = vector3(123.61, -317.57, 45.57),
    state = true
}

RPC.register("ev-heists:grid:getNodeState", function(src)
    return nodeData
end)

RPC.register("ev-heists:grid:getGenState", function(src)
    return genData
end)

RPC.register("ev-heists:grid:pingNode", function(src, node)
    local success = false


    
    return success
end)

RPC.register("ev-heists:grid:getConnected", function(src, id)
    local connected = {}



    return connected
end)

RPC.register("ev-heists:grid:useThermiteCharge", function(src, pNode)

end)
