local BoostingPlate = {}

RegisterNetEvent('ev-boosting:SetPlateInList')
AddEventHandler('ev-boosting:SetPlateInList',function(plate, boolean)
    if plate ~= nil then
        if boolean then
            print('[BOOSTING] '..plate..' is in the list')
            BoostingPlate[plate] = boolean
        else
            if BoostingPlate[plate] ~= nil then
                print('[BOOSTING] '..plate..' is not more in the list')
                BoostingPlate[plate] = nil
            else
                print('[BOOSTING] '..plate..' is not in the list so we do nothing')
            end
        end
    end
end)

RPC.register("ev-boosting:GetPlateState", function(src, plate)
    if BoostingPlate[plate] ~= nil then
        return true
    else
        return false
    end
end)

BoostingBlipsSystem = {
    ActivePlayers = {},
}

function BoostingBlipsSystem:BoostingThread() 
    Citizen.CreateThread(function()
        while true do 
            Citizen.Wait(5000)
            local ped = nil
            for k, v in pairs(self.ActivePlayers) do
                ped = GetPlayerPed(k)
                local veh = GetVehiclePedIsIn(ped)
                self.ActivePlayers[k].coords = GetEntityCoords(veh)
            end
            TriggerClientEvent("ev-boosting:updateBlips", -1, self.ActivePlayers)
        end
    end)
end

function BoostingBlipsSystem:AddSrc(src)
    self.ActivePlayers[src] = {}
end

function BoostingBlipsSystem:RemoveSrc(src)
    self.ActivePlayers[src] = nil
    TriggerClientEvent("ev-boosting:RemoveBlip", -1, src)
end


BoostingBlipsSystem:BoostingThread()

RegisterNetEvent("Boosting:AddBlipsSystem")
AddEventHandler("Boosting:AddBlipsSystem" , function()
    BoostingBlipsSystem:AddSrc(source)
end)

RegisterNetEvent("Boosting:RemoveBlipsSystem")
AddEventHandler("Boosting:RemoveBlipsSystem" , function()
    BoostingBlipsSystem:RemoveSrc(source)
end)

RegisterNetEvent("ev-boosting:coop")
AddEventHandler("ev-boosting:coop" , function(src)
    local player = source
    if src ~= nil then
        TriggerClientEvent('ev-boosting:helpHack', src)
        TriggerEvent("ev-boosting:addBoostingLevelHelp", player)
    end
end)

AddEventHandler("playerDropped",function(reason)
    BoostingBlipsSystem:RemoveSrc(source)
end)

--BLIPS SYSTEM INFINITY
local isInContract = false

function AddContractToDB(data)
    local insertId = MySQL.insert.await([[
        INSERT INTO boosting (identifier, vehicle, type, owner, expires, ExtraVin, units, coords)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ]],
    { data.identifier, data.vehicle, data.type, data.owner, data.expires, data.ExtraVin, data.units, json.encode({x = data.coords[1], y = data.coords[2], z = data.coords[3]}) })
end

function GetTransferSource(src, props, TransferID)
    local Player = GetPlayerFromCid(TransferID)
    if Player ~= nil then
        local toSrc = Player
        PlayerTransferContract(toSrc, {id= props.id, vehicle = props.vehicle, identifier = props.identifier, type = props.type, owner = props.owner, expires = props.expires, units = props.units, coords = props.coords}, true)
    else
        PlayerTransferContract(src, {id= props.id, vehicle = props.vehicle, identifier = props.identifier, type = props.type, owner = props.owner, expires = props.expires, units = props.units, coords = props.coords}, false)
    end
end

function RemoveContractToDB(data)
    local delete = MySQL.update.await([[
        DELETE FROM boosting
        WHERE identifier = ? AND vehicle = ? AND id = ?
    ]],
    { data.props.identifier, data.props.vehicle, data.props.id })
end

function GetContractToDB(identifier)
    local query = MySQL.query.await([[
        SELECT *
        FROM boosting
        WHERE identifier = ?
    ]], {identifier} )

    return query
end

function GetContractByIDToDB(id)
    local query = MySQL.query.await([[
        SELECT *
        FROM boosting
        WHERE id = ?
    ]], {id} )

    return query[1]
end

function RemoveContractByIDToDB(id)
    local delete = MySQL.update.await([[
        DELETE FROM boosting
        WHERE  id = ?
    ]],
    { id })
end

function InitBoostingUser(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local gne = exports["ev-phone"]:getCryptoBalance(cid, "1")
    local query = MySQL.query.await([[
        SELECT *
        FROM boosting_users
        WHERE identifier = ?
    ]], {cid})
    if query[1] ~= nil then
        if query[1].identifier == cid then
            TriggerClientEvent("ev-boosting:setlevel", src, query[1].level, gne)
        else
            local insertId = MySQL.insert.await([[
                INSERT INTO boosting_users (identifier, level, cooldown)
                VALUES (?, ?, ?)
            ]],
            { cid, 0, 0 })
            TriggerClientEvent("ev-boosting:setlevel", src, 0, 0)
        end
    else
        local insertId = MySQL.insert.await([[
            INSERT INTO boosting_users (identifier, level, cooldown)
            VALUES (?, ?, ?)
        ]],
        { cid, 0, 0 })
        TriggerClientEvent("ev-boosting:setlevel", src, 0, 0)
    end
end

--[[ function exports["ev-phone"]:getCryptoBalance(cid, "1")
    local gen = exports["ev-phone"]:getCryptoBalance(tonumber(cid), 1)
    return gen
end ]]

function SetLevel(identifier, newvalue)
    local query = MySQL.update.await([[
        UPDATE boosting_users
        SET level = ?
        WHERE identifier = ?
    ]],
    { newvalue, identifier })
end

function GetLevel(identifier)
    local query = MySQL.query.await([[
        SELECT *
        FROM boosting_users
        WHERE identifier = ?
    ]], {identifier})

    local level

    if query ~= nil and query[1] ~= nil then
        level = query[1].level
    end
    Wait(500)
    return level
end

RegisterServerEvent('ev-boosting:removeGNE')
AddEventHandler('ev-boosting:removeGNE', function(amount, cid)
    local src = source
    exports["ev-phone"]:takeCrypto(src, cid, amount, 1)
end)

function getlatestID()
    local query = MySQL.query.await([[
        SELECT *
        FROM boosting
        WHERE id=(SELECT max(id))
    ]], {})

    return query
end

function PlayerTransferContract(src, props, posible)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    if posible then
        local SendContracInformation2 = {
            id= props.id, 
            identifier = cid, 
            vehicle = props.vehicle, 
            type = props.type, 
            owner = props.owner, 
            expires = props.expires, 
            ExtraVin = props.ExtraVin,
            units = props.units, 
            coords = props.coords
        }
        local msg = {msg = "You received a transfered contract", time = time, app = 'Boosting', img = 'https://imgur.com/FEPqpLc.png'}
        TriggerClientEvent("ev-boosting:CreateContractFromServer", src, SendContracInformation2, msg)
        
        local delete = MySQL.update.await([[
            DELETE FROM boosting
            WHERE identifier = ?, vehicle = ?, id = ?
        ]],
        { props.identifier, props.vehicle, props.id })

        local insertId = MySQL.insert.await([[
            INSERT INTO boosting (identifier, vehicle, type, owner, expires, ExtraVin, units, coords)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ]],
        { cid, props.vehicle, props.type, props.owner, props.expires, props.ExtraVin, props.units, json.encode({x = props.coords.x, y = props.coords.y, z = props.coords.z}) })
    else
        local SendContracInformation2 = {
            id= props.id, 
            identifier = cid, 
            vehicle = props.vehicle, 
            type = props.type, 
            owner = props.owner, 
            expires = props.expires, 
            ExtraVin = props.ExtraVin,
            units = props.units, 
            coords = props.coords}
        local msg = {msg = "It was not possible to send the contract", time = time, app = 'Boosting', img = 'https://imgur.com/FEPqpLc.png'}
        TriggerClientEvent("ev-boosting:CreateContractFromServer", src, SendContracInformation2, msg)
    end
end

function CoolDownFunctions(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    local time = MySQL.query.await([[
        SELECT *
        FROM boosting_users
        WHERE identifier = ?
    ]], {cid})

    local result = time[1].cooldown
    if (os.time() - result) < Config.VinCoolDown * 60 and result ~= 0 then
        local seconds = Config.VinCoolDown * 60 - (os.time() - result)
        return {CoolDown = false, minutes = math.floor(seconds / 60)}
    else
        local query = MySQL.update.await([[
            UPDATE boosting_users
            SET cooldown = ?
            WHERE identifier = ?
        ]],
        { os.time(), cid })
        return {CoolDown = true, minutes = 0}
    end
end

function filterContract(number)
    local boomer = tonumber(number)
    randomChance = math.random(1, 100)
    if boomer >= 0 and boomer <= 100 then
        return Config.BoostingContracts["D"][math.random(1, Config.NumberOfContracts.D)] 
    elseif boomer >= 100 and boomer <= 200 then
        if randomChance >= 1 and randomChance <= 74 then
            return Config.BoostingContracts["C"][math.random(1, Config.NumberOfContracts.C)]
        elseif randomChance >= 75 and randomChance <= 100 then
            return Config.BoostingContracts["D"][math.random(1, Config.NumberOfContracts.D)]
        end
    elseif boomer >= 200 and boomer <= 300 then
        if randomChance >= 1 and randomChance <= 33 then
            return Config.BoostingContracts["B"][math.random(1, Config.NumberOfContracts.B)]
        elseif randomChance >= 34 and randomChance <= 66 then
            return Config.BoostingContracts["C"][math.random(1, Config.NumberOfContracts.C)]
        elseif randomChance >= 67 and randomChance <= 100 then
            return Config.BoostingContracts["D"][math.random(1, Config.NumberOfContracts.D)]
        end
    elseif boomer >= 200 and boomer <= 400 then
        if randomChance >= 1 and randomChance <= 25 then
            return Config.BoostingContracts["A"][math.random(1, Config.NumberOfContracts.A)]
        elseif randomChance >= 26 and randomChance <= 65 then
            return Config.BoostingContracts["B"][math.random(1, Config.NumberOfContracts.B)]
        elseif randomChance >= 66 and randomChance <= 100 then
            return Config.BoostingContracts["C"][math.random(1, Config.NumberOfContracts.C)]
        end
    elseif boomer >= 200 and boomer <= 500 then
        if randomChance >= 1 and randomChance <= 15 then
            return Config.BoostingContracts["S"][math.random(1, Config.NumberOfContracts.S)]
        elseif randomChance >= 16 and randomChance <= 35 then
            return Config.BoostingContracts["A"][math.random(1, Config.NumberOfContracts.A)]
        elseif randomChance >= 36 and randomChance <= 69 then
            return Config.BoostingContracts["B"][math.random(1, Config.NumberOfContracts.B)]
        elseif randomChance >= 70 and randomChance <= 100 then
            return Config.BoostingContracts["C"][math.random(1, Config.NumberOfContracts.C)]
        end
    else 
        if randomChance >= 1 and randomChance <= 10 then
            return Config.BoostingContracts["S+"][math.random(1, Config.NumberOfContracts.SPLUS)]
        elseif randomChance >= 11 and randomChance <= 25 then
            return Config.BoostingContracts["S"][math.random(1, Config.NumberOfContracts.S)]
        elseif randomChance >= 26 and randomChance <= 69 then
            return Config.BoostingContracts["A"][math.random(1, Config.NumberOfContracts.A)]
        elseif randomChance >= 70 and randomChance <= 100 then
            return Config.BoostingContracts["B"][math.random(1, Config.NumberOfContracts.B)]
        end
    end
end

RegisterNetEvent("ev-boosting:updateTimer")
AddEventHandler("ev-boosting:updateTimer" , function(id, time)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    
    local query = MySQL.update.await([[
        UPDATE boosting
        SET expires = ?
        WHERE identifier = ? AND id = ?
    ]],
    {time, cid, id })
end)

RegisterNetEvent("ev-boosting:IsInContract")
AddEventHandler("ev-boosting:IsInContract" , function(Bool)
 isInContract = Bool
end)

RegisterNetEvent("ev-boosting:CreateContract")
AddEventHandler("ev-boosting:CreateContract" , function(time)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    local contracts = filterContract(GetLevel(cid))
    local ContractsCoords = Config.BoostinSpawnLocations[math.random(1, Config.NumberBoostingLocations)]
    local SendContracInformation = {
        identifier = cid, 
        vehicle = contracts.vehicle, 
        type = contracts.type, 
        owner = contracts.owner, 
        expires = contracts.expires, 
        units = contracts.units, 
        ExtraVin = contracts.ExtraVin,
        coords = ContractsCoords.coords, 
    }
    AddContractToDB(SendContracInformation)
    Citizen.Wait(1000)
    local id = getlatestID()[1]
    local SendContracInformation2 = {
        id = id.id,
        identifier = cid, 
        vehicle = contracts.vehicle, 
        type = contracts.type, 
        owner = contracts.owner, 
        expires = contracts.expires, 
        units = contracts.units, 
        ExtraVin = contracts.ExtraVin,
        coords = ContractsCoords.coords
    }
    TriggerClientEvent('phone:addnotification', src, 'Anonymous', 'You recieved a '..contracts.type..' Class Boosting Contract. Vehicle: '..contracts.vehicle)
    local msg = {msg = "A new contract has been received", time = time, app = 'Boosting', img = 'https://imgur.com/FEPqpLc.png'}
    TriggerClientEvent("ev-boosting:CreateContractFromServer", src, SendContracInformation2, msg)
end)

RegisterNetEvent("ev-boosting:CancelContract")
AddEventHandler("ev-boosting:CancelContract" , function(data)
    RemoveContractToDB(data)
end)

RegisterNetEvent("ev-boosting:completeNormalContract")
AddEventHandler("ev-boosting:completeNormalContract" , function(id)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local cid = user:getCurrentCharacter().id
    local query = GetContractByIDToDB(id)

    local gnes = exports["ev-phone"]:getCryptoBalance(cid, "1")
    local level = GetLevel(cid)
    local newgnes = gnes + query.units

    Citizen.Wait(1000)

    exports["ev-phone"]:addCrypto(src, cid, query.units, 1)
    SetLevel(cid, level + Config.XpGain)
    TriggerClientEvent("ev-boosting:setlevel", src, level + Config.XpGain, newgnes)
    RemoveContractByIDToDB(id)
end)

RegisterNetEvent("ev-boosting:addBoostingLevelHelp")
AddEventHandler("ev-boosting:addBoostingLevelHelp" , function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    
    local gnes = exports["ev-phone"]:getCryptoBalance(cid, "1")
    local level = GetLevel(cid)

    local levelTo = level + Config.XpGainHackerman
    SetLevel(identifier, levelTo)
    TriggerClientEvent("ev-boosting:setlevel", src, levelTo, gnes)
end)


RegisterNetEvent("ev-boosting:RemoveBNE")
AddEventHandler("ev-boosting:RemoveBNE" , function(toRemove)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local cid = user:getCurrentCharacter().id
    local gnes = exports["ev-phone"]:getCryptoBalance(cid, "1") 
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local cid = user:getCurrentCharacter().id

    exports["ev-phone"]:takeCrypto(src, cid, toRemove, 1)   
    TriggerClientEvent("ev-boosting:setlevel", src, gnes, newgnes)
end)

RegisterNetEvent("ev-boosting:getLevel", function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local cid = user:getCurrentCharacter().id

    local gnes = exports["ev-phone"]:getCryptoBalance(cid, "1")
    local level = GetLevel(cid)

    TriggerClientEvent("ev-boosting:setlevel", src, level, gnes)
    TriggerClientEvent("ev-boosting:sendHowMuchGNEIHave", src, gnes)
end)

RegisterNetEvent("ev-boosting:completeVinContract")
AddEventHandler("ev-boosting:completeVinContract" , function(id, plate)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    local query = GetContractByIDToDB(id)
    local level = GetLevel(cid)
    local gnes = exports["ev-phone"]:getCryptoBalance(cid, "1")

    Citizen.Wait(1000)
    AddVehicleToGarage(src, query.vehicle, plate)
    SetLevel(cid, level + Config.XpGain)
    TriggerClientEvent("ev-boosting:setlevel", src, level, newgnes)
    RemoveContractByIDToDB(id)
end)

RegisterNetEvent("ev-boosting:TransferContract")
AddEventHandler("ev-boosting:TransferContract" , function(data)
    local props = data.props
    local TransferID = data.imputValue
    GetTransferSource(source, props, TransferID)
end)

RegisterNetEvent("ev-boosting:purchaseGNE")
AddEventHandler("ev-boosting:purchaseGNE" , function(quantity)
    local src = source
    local user = exports['ev-base']:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    local gnes = exports["ev-phone"]:getCryptoBalance(cid, "1")
    local level = GetLevel(cid)

    exports["ev-phone"]:sellCrypto(src, quantity * Config.UnitPrice, 1)

    TriggerClientEvent("ev-boosting:setlevel", src, level, gnes - quantity)
    TriggerClientEvent("ev-boosting:Notification", src, {msg = 'You sold ' ..quantity.. ' and for that reason you receive ' ..quantity * Config.UnitPrice , time = '' , app = 'BNE Finance', img = 'https://i.imgur.com/RAMmJg7.png'})
end)

RegisterNetEvent("SpawnEventsServer")
AddEventHandler("SpawnEventsServer" , function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    local query = GetContractToDB(cid)
    InitBoostingUser(src)
    for k, v in pairs(query) do
        if v.id ~= nil and v.identifier ~= nil and v.vehicle ~= nil then
            local coords = json.decode(v.coords) or {x = 0, y = 0, z = 0}
            local SendContracInformation = {
                id = v.id, 
                identifier = v.identifier, 
                vehicle = v.vehicle, 
                type = v.type, 
                owner = v.owner, 
                expires = v.expires, 
                ExtraVin = v.ExtraVin,
                units = v.units, 
                coords = vector3(coords.x, coords.y, coords.z)
            }
            local msg = {msg = "A new contract has been received", time = time}
            TriggerClientEvent("ev-boosting:CreateContractFromServer2", src, SendContracInformation, msg)
        end
    end
end)

RegisterServerEvent('ev-ev-boosting:pay_gne')
AddEventHandler('ev-ev-boosting:pay_gne', function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local cid = user:getCurrentCharacter().id
    local level = GetLevel(cid)

    SetLevel(cid, level + Config.XpGain)

    if tonumber(level) >= 0 and tonumber(level) <= 100 then
        exports["ev-phone"]:addCrypto(src, cid, 5, 1)
    elseif tonumber(level) >= 100 and tonumber(level) <= 200 then
        exports["ev-phone"]:addCrypto(src, cid, 15, 1)
    elseif tonumber(level) >= 200 and tonumber(level) <= 300 then
        exports["ev-phone"]:addCrypto(src, cid, 30, 1)
    elseif tonumber(level) >= 300 and tonumber(level) <= 400 then
        exports["ev-phone"]:addCrypto(src, cid, 60, 1)
    elseif tonumber(level) >= 400 and tonumber(level) <= 500 then
        exports["ev-phone"]:addCrypto(src, cid, 90, 1)
    end
end)

RegisterNetEvent("ev-boosting:bennysitem")
AddEventHandler("ev-boosting:bennysitem",function(data, pay)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local gnes = exports["ev-phone"]:getCryptoBalance(cid, "1")
    local level = GetLevel(cid)

    TriggerClientEvent("boosting:setlevel", src, level, gnes)
    Citizen.Wait(1000)
    for k, v in pairs(data) do
        TriggerClientEvent("player:receiveItem", src, v.item, 1) 
    end
end)

RegisterServerEvent('ev-boosting:giveGNE')
AddEventHandler('ev-boosting:giveGNE', function(amount)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local cid = user:getCurrentCharacter().id
    exports["ev-phone"]:addCrypto(src, cid, amount, 1) 
end)

RPC.register("ev-boosting:CoolDown", function(src)
    return CoolDownFunctions(src)
end)

RPC.register("ev-boosting:spanwBoostingVeh", function(src, veh, coords)
    local vehicle = CreateVehicle(veh, coords.x, coords.y, coords.z, false, true, false)
    local timeout = 100

    while not DoesEntityExist(vehicle) do
        Wait(10)
        timeout = timeout - 1
        if timeout <= 0 then
            return
        end
    end

    SetVehicleDoorsLocked(vehicle, 2)
    GetVehicleDoorsLockedForPlayer(vehicle)
    
    local pNet = NetworkGetNetworkIdFromEntity(vehicle)

    return pNet
end)
