local currentSlotMachineObjs = {}
local isSlotMachinesEnabled = false

local not_won_yet = true
local jackPot = 10000
local payout = 0

RPC.register("ev-slotmachines-sv:checkIfSlotMachinesState", function(pSource)
    return true , jackPot
end)


RegisterServerEvent("ev-slotmachines-sv:getUpFromSlotMachine")
AddEventHandler("ev-slotmachines-sv:getUpFromSlotMachine", function()
    local src = source

    if src ~= nil then 
        for k, v in pairs(currentSlotMachineObjs) do 
            if v == src then 
                currentSlotMachineObjs[k] = false
                return
            end
        end

        TriggerClientEvent("ev-slotmachines-cl:updateMachineData", src, currentSlotMachineObjs)
    end
end)

RegisterServerEvent('ev-slotmachines-sv:toggleSlotMachines')
AddEventHandler("ev-slotmachines-sv:toggleSlotMachines", function()
    isSlotMachinesEnabled = not isSlotMachinesEnabled
    TriggerClientEvent("ev-slotmachines-cl:toggleSlotMachines", -1, isSlotMachinesEnabled)
end)

RegisterServerEvent('ev-slotmachines-sv:getMachineData')
AddEventHandler("ev-slotmachines-sv:getMachineData", function()
    local src = source
    TriggerClientEvent("ev-slotmachines-cl:getMachineData", src, currentSlotMachineObjs)
end)

RegisterNetEvent("ev-slotmachines-sv:sitDownAtSlotMachine")
AddEventHandler("ev-slotmachines-sv:sitDownAtSlotMachine", function(chairId)
    local src = source

    if src ~= nil then
        for k, v in pairs(currentSlotMachineObjs) do 
            if v == src then 
                currentSlotMachineObjs[k] = false
                return
            end
        end

        currentSlotMachineObjs[chairId] = src
        TriggerClientEvent("ev-slotmachines-cl:updateMachineData", -1, currentSlotMachineObjs, src)
        TriggerClientEvent("ev-slotmachines-cl:sitDownAtSlotMachine", src, chairId, 0)
    else
        TriggerClientEvent("DoLongHudText", src, "You can't sit you down.", 2)
    end
end)

RegisterNetEvent("ev-slotmachines-sv:spinMachine")
AddEventHandler("ev-slotmachines-sv:spinMachine", function(slotPos, model, betamount , cid ,pSlotID)
    local src = source
    local math = math.random(10)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    jackPot = jackPot + betamount
    payout = betamount * 3
    if math <= 3 then 
        spinReel('winner')
        TriggerClientEvent('ev-slotmachines-cl:playSlotMachineSound',src ,slotPos ,model, 'Beep_Red')
    elseif math >= 4 and math <= 7 then
        spinReel('loser')
    elseif math >= 8 then
        spinReel('troll')
    end
end)

function spinReel (pState)
    local src = source
    local rotA , rotB ,rotC = math.random(500) * 0.7 , math.random(500) * 0.9 , math.random(500) * 0.3
    local random = math.random(4)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if pState == 'loser' then
    Citizen.Wait(1200)
    TriggerClientEvent('ev-slotmachines-cl:stopReels',src,1,rotA)
    Citizen.Wait(1200)
    TriggerClientEvent('ev-slotmachines-cl:stopReels',src,2,rotB)
    Citizen.Wait(1200)
    TriggerClientEvent('ev-slotmachines-cl:stopReels',src,3,rotC)
    TriggerClientEvent('ev-slotmachines-cl:spinFinished',src, 0 )
    elseif pState == 'winner' then
        Citizen.Wait(1200)
        TriggerClientEvent('ev-slotmachines-cl:stopReels',src,1,1)
        Citizen.Wait(1200)
        TriggerClientEvent('ev-slotmachines-cl:stopReels',src,2,2)
        Citizen.Wait(1200)
        TriggerClientEvent('ev-slotmachines-cl:stopReels',src,3,3)
        TriggerClientEvent('ev-slotmachines-cl:spinFinished',src,payout)
        user:addMoney(payout)
    elseif pState == 'troll' then
        Citizen.Wait(1200)
        TriggerClientEvent('qpipnpxel-slotmachines-cl:stopReels',src,1,1)
        Citizen.Wait(1200)
        TriggerClientEvent('ev-slotmachines-cl:stopReels',src,2,2)
        Citizen.Wait(1200)
        TriggerClientEvent('ev-slotmachines-cl:stopReels',src,3,22.43)
        TriggerClientEvent('ev-slotmachines-cl:spinFinished',src,0)
  end
    local winChance = math.random(1,1000)
    if winChance < 10 and not_won_yet and pState == 'winner' then 
        TriggerClientEvent('ev-slotmachines-cl:spinFinished',src, jackPot)
        user:addMoney(jackPot)
        TriggerClientEvent('chatMessage', -1, "^3[CASINO]", {255, 0, 0}, "Somebody just won the jackpot ! Total : " ..jackPot)
        jackPot = 0
    end
end