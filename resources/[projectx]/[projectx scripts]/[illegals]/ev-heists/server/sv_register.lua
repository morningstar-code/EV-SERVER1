local Registers = {}

RPC.register("heists:canRobRegister", function(src, registerId)
    local police = exports["ev-jobmanager"]:getJobCount(src, "police")

    if police < CONFIG.Register.minCop then 
        return "not enough cops"
    end

    if Registers[registerId] ~= nil then
        if not Registers[registerId].canSmash then
            Registers[registerId] = {
                canRob = false
            }
            return "Someone already robbed the register"
        end
    else
        Registers[registerId] = {
            canRob = true
        }
    end
    Citizen.CreateThread(function()
        Wait(1000 * 60 * 15) -- 15 min
        Registers[registerId] = nil
    end)
end)

RegisterNetEvent("complete:job", function(pAmount, pType)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    user:addMoney(pAmount)
end)

