local hasHeadset = false

AddEventHandler('ev-inventory:itemCheck', function(pItem, pState, pQuantity)
    if pItem ~= "burgershotheadset" then return end
    checkForHeadset()
end)

AddEventHandler('ev-restaurants:getHeadset', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    if biz ~= 'burger_shot' then return end
    TriggerEvent('player:receiveItem', 'burgershotheadset', 1, false)
end)

function checkForHeadset()
    local hasItem = exports["ev-inventory"]:hasEnoughOfItem("burgershotheadset", 1, false, true)
    if not hasItem then
        -- Remove from DriveThru Radio
        turnOffHeadset()
        return
    end

    -- Subscribe to DriveThru Radio
    hasHeadset = true
    TriggerEvent("ev-voice:drivethru:connect", true)
end

function turnOffHeadset()
    hasHeadset = false
    TriggerEvent("ev-voice:drivethru:disconnect", true)
end

function enterDriveThru()
    if hasHeadset then return end
    TriggerEvent("ev-voice:drivethru:setPowerState", true)
    TriggerEvent("ev-voice:drivethru:connect")
end

function exitDriveThru()
    if hasHeadset then return end
    TriggerEvent("ev-voice:drivethru:disconnect")
end
