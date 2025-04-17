local myTableId = -1
-- sky's stuff
local isSittingAtPokerTable = false
local canPlayAtCurrentTable = false
local closeToCasino = false
local buyIn = 200
local isCasinoSwapped = false

local deckObjects = {}
local dealerPeds = {}
local swappedPeds = {}
local swappedDecks = {}

-- networking stuff
-- local pokerTable1 = {
--   networkedCards = {},
--   networkedBets = {},
--   networkedChips = {}
-- }

-- local pokerTable2 = {
--   networkedCards = {},
--   networkedBets = {},
--   networkedChips = {}
-- }

local CasinoCoords = vector3(1032.22,40.71,69.87)
local CasinoScopeDist = 100.0

RegisterNetEvent("ev-casino:poker:updateTableState")
AddEventHandler("ev-casino:poker:updateTableState", function(state)
    if state.active then
        exports["ev-ui"]:SetUIFocus(true, true)
    end
    exports["ev-ui"]:sendAppEvent("poker", state)
end)

RegisterUICallback("ev-ui:casinoPokerAction", function(data, cb)
    local result = true
    if data.action == "leave" then
        TriggerEvent("ev-poker:playPlayerEvent", {event = "leaveGame", tableNum = currentPokerTable and currentPokerTable or -1})
    else
        result = RPC.execute("ev-casino:poker:playerAction", GetPlayerServerId(PlayerId()), myTableId, data.action, data.amount)
    end
    cb({data = {message = result}, meta = {ok = result == true, message = result}})
end)

RegisterNetEvent("ev-casino:entitySetSwap")
AddEventHandler("ev-casino:entitySetSwap", function(set)
    for _,dealerPed in ipairs(swappedPeds) do
        if DoesEntityExist(dealerPed) then
            DeleteEntity(dealerPed)
        end
    end

    for _, deckObject in pairs(swappedDecks) do
        if deckObject ~= nil then
            DeleteObject(deckObject)
        end
    end

    swappedPeds = {}
    swappedDecks = {}

    if set == "poker" then
        isCasinoSwapped = true
        createDealerPeds(false)
        return
    end

    isCasinoSwapped = false
    return
end)

-- RegisterCommand("pp", function(src, args)
--     local a, b, c, d = args[1], args[2], args[3], args[4]
--     if a == "join" then
--         RPC.execute("ev-casino:poker:joinGame", tonumber(b), 3, tonumber(c))
--     end
--     if a == "fold" then
--         RPC.execute("ev-casino:poker:playerAction", tonumber(b), 3, a, c)
--     end
--     if a == "leave" then
--         RPC.execute("ev-casino:poker:playerAction", tonumber(b), 3, a, c)
--     end
--     if a == "call" then
--         RPC.execute("ev-casino:poker:playerAction", tonumber(b), 3, a, c)
--     end
--     if a == "check" then
--         RPC.execute("ev-casino:poker:playerAction", tonumber(b), 3, a, c)
--     end
-- end)

Citizen.CreateThread(function()
    while true do
        local playerCoords = GetEntityCoords(PlayerPedId())
        closeToCasino = false
        if #(playerCoords - CasinoCoords) < CasinoScopeDist then
            closeToCasino = true
        end
        Wait(5000)
    end
end)

-- im fucking lazy and this is copy pasted from blackjack
local PokerTables = {
  {
    dealerPos = vector3(1012.35,51.66,70.87),
    dealerHeading = 17.39,
    tablePos = vector3(1012.16,52.47,71.85),
    tableHeading = 19.53,
    highroller = false,
    deckObject = "vw_prop_casino_cards_01",
  },
  {
    dealerPos = vector3(1014.18,43.47,70.87),
    dealerHeading = 197.22,
    tablePos = vector3(1014.36,42.76,71.85),
    tableHeading = 193.9,
    highroller = false,
    deckObject = "vw_prop_casino_cards_01",
  },
  {
    dealerPos = vector3(994.82,73.77,69.67),
    dealerHeading = 191.46,
    tablePos = vector3(995.01,73.29,70.64),
    tableHeading = 190.89,
    highroller = false,
    swapped = true,
    deckObject = "vw_prop_casino_cards_01",
  },
  {
    dealerPos = vector3(998.22,76.82,69.67),
    dealerHeading = 287.96,
    tablePos = vector3(998.87,77.03,70.64),
    tableHeading = 279.86,
    highroller = false,
    swapped = true,
    deckObject = "vw_prop_casino_cards_01",
  },
  {
    dealerPos = vector3(993.78,78.88,69.67),
    dealerHeading = 9.97,
    tablePos = vector3(993.58,79.42,70.64),
    tableHeading = 11.81,
    highroller = false,
    swapped = true,
    deckObject = "vw_prop_casino_cards_01",
  },
  {
    dealerPos = vector3(990.58,75.08,69.67),
    dealerHeading = 99.67,
    tablePos = vector3(989.77,74.98,70.64),
    tableHeading = 110.37,
    highroller = false,
    swapped = true,
    deckObject = "vw_prop_casino_cards_01",
  },
}

function CasinoWaitTimer()
    if not closeToCasino then
        Wait(5000)
    else
        Wait(0)
    end
end

Citizen.CreateThread(function()
    while true do
        if shouldForceIdleCardGames and isSittingAtPokerTable then
            TaskPlayAnim(PlayerPedId(), "anim_casino_b@amb@casino@games@shared@player@", "idle_cardgames", 1.0, 1.0, -1, 0)
        end
        CasinoWaitTimer()
    end
end)

-- Stores the player's card object Ids
local playerCardObjects = {}

-- Stores the flop,turn,river cards for each table
local pokerCardObjects = {
    {["flop"] = {}, ["turn"] = {}, ["river"] = {}},
    {["flop"] = {}, ["turn"] = {}, ["river"] = {}},
    {["flop"] = {}, ["turn"] = {}, ["river"] = {}},
    {["flop"] = {}, ["turn"] = {}, ["river"] = {}},
    {["flop"] = {}, ["turn"] = {}, ["river"] = {}},
    {["flop"] = {}, ["turn"] = {}, ["river"] = {}}
}

-- Stores pot object for each table
local currentPotObjects = {{}, {}, {}, {}, {}, {}}

local prevPotAmounts = {0, 0, 0, 0, 0, 0}

local prevChipCount = 0
local prevBetAmount = 0

local PokerPlayerAnims = "anim_casino_b@amb@casino@games@threecardpoker@player"

-- Stores player chips and bets (networked objects)
local currentBetObjects = {}
local currentChipStacks = {}
local currentPokerTable = nil
local currentChairObject = nil
local currentPlayerPos = -1

RegisterNetEvent("ev-poker:givePlayerCard")
AddEventHandler("ev-poker:givePlayerCard", function(playerCardNum, cardNumber, faceUp)
    -- Create a networked card object in front of player,
    playerCardNum = tonumber(playerCardNum) -- should be 1 or 2

    -- Clear player cards before making new ones
    if playerCardObjects[1] ~= nil and playerCardObjects[2] ~= nil then
        TriggerEvent("ev-poker:clearPlayerCards")
        Wait(100)
    end

    -- Create the card object relative to the player
    local cardPos = GetOffsetFromEntityInWorldCoords(PlayerPedId(), ((playerCardNum - 1.5) / 14.5), 0.55, -0.8)
    playerCardObjects[playerCardNum] = createCardAtPosition(cardPos, vector3(faceUp and 0 or 180, 0, GetEntityHeading(PlayerPedId())), true, cardNumber, true)
end)

RegisterNetEvent("ev-poker:setPotAmount")
AddEventHandler("ev-poker:setPotAmount", function(eventData)
    local tableNum = tonumber(eventData.tableNum)
    local tableCfg = PokerTables[tableNum]
    local potAmount = tonumber(eventData.potAmount)
    if #(GetEntityCoords(PlayerPedId()) - tableCfg.tablePos) > 40.0 then
        return
    end
    if tableNum ~= nil and potAmount ~= nil and prevPotAmounts[tableNum] ~= potAmount then
        if isSittingAtPokerTable then
            TriggerEvent("ev-poker:clearPlayerBet")
        end
        for idx, prop in ipairs(currentPotObjects[tableNum]) do
            if prop ~= nil then
                DeleteObject(prop)
            end
        end
        local tableVector = getTableVector4(tableNum)
        local offsetPos = GetObjectOffsetFromCoords(tableVector, vector3(0.0, -0.15, -0.035))
        currentPotObjects[tableNum] = generateChipStackAtPosition(offsetPos, tableVector.w, potAmount, false)
        prevPotAmounts[tableNum] = potAmount
    end
end)

RegisterNetEvent("ev-poker:clearPot")
AddEventHandler("ev-poker:clearPot", function(eventData)
    local tableNum = tonumber(eventData.tableNum)
    if tableNum ~= nil then
        prevPotAmounts[tableNum] = 0
        for idx, prop in ipairs(currentPotObjects[tableNum]) do
            if prop ~= nil then
                DeleteObject(prop)
            end
        end
    end
end)

RegisterNetEvent("ev-poker:setPlayerChips")
AddEventHandler("ev-poker:setPlayerChips", function(chipCount)
    if prevChipCount == chipCount then
        return
    end
    for _, prop in ipairs(currentChipStacks) do
        if prop ~= nil then
            DeleteObject(prop)
        end
    end
    prevChipCount = chipCount
    local objCoords = GetOffsetFromEntityInWorldCoords(PlayerPedId(), vector3(0.2, 0.55, 0.1875))
    local heading = GetEntityHeading(PlayerPedId())
    currentChipStacks = generateChipStackAtPosition(objCoords, heading, chipCount, true)
    -- RPC.execute("ev-poker:createNetworkedChips", objCoords.x, objCoords.y, objCoords.z, heading, chipCount, myTableId)
end)

-- Deletes player's cards
-- (idk if this will work networked, might need to set coords to 0,0,0?)
RegisterNetEvent("ev-poker:clearPlayerCards")
AddEventHandler("ev-poker:clearPlayerCards", function()
    -- Delete a players cards
    local cardObject1 = playerCardObjects[1]
    if cardObject1 ~= nil then
        DeleteObject(cardObject1)
        playerCardObjects[1] = nil
    end
    local cardObject2 = playerCardObjects[2]
    if cardObject2 ~= nil then
        DeleteObject(cardObject2)
        playerCardObjects[2] = nil
    end
    for _, prop in pairs(currentBetObjects) do
        if prop ~= nil then
            DeleteObject(prop)
        end
    end
    currentBetObjects = {}
end)

RegisterNetEvent("ev-poker:clearPlayerBet")
AddEventHandler("ev-poker:clearPlayerBet", function()
    for _, prop in pairs(currentBetObjects) do
        if prop ~= nil then
            DeleteObject(prop)
        end
    end
    currentBetObjects = {}
end)

-- RegisterNetEvent('ev-poker:clearNetworkObjects')
-- AddEventHandler("ev-poker:clearNetworkObjects", function(tableNum)
--   TriggerEvent("ev-poker:clearNetworkCards", tableNum)
--   TriggerEvent("ev-poker:clearNetworkBets", tableNum)
--   TriggerEvent("ev-poker:clearNetworkChips", tableNum)
-- end)

-- Deletes the table cards for the specified table
RegisterNetEvent("ev-poker:clearDealerCards")
AddEventHandler("ev-poker:clearDealerCards", function(tableNum)
    -- Delete flop,turn,river cards
    tableNum = tonumber(tableNum)
    local flopCard1 = pokerCardObjects[tableNum]["flop"][1]
    local flopCard2 = pokerCardObjects[tableNum]["flop"][2]
    local flopCard3 = pokerCardObjects[tableNum]["flop"][3]
    if flopCard1 ~= nil then
        DeleteObject(flopCard1)
        DeleteObject(flopCard2)
        DeleteObject(flopCard3)
        pokerCardObjects[tableNum]["flop"][1] = nil
        pokerCardObjects[tableNum]["flop"][2] = nil
        pokerCardObjects[tableNum]["flop"][3] = nil
    end

    local turnCard = pokerCardObjects[tableNum]["turn"][1]
    if turnCard ~= nil then
        DeleteObject(turnCard)
        pokerCardObjects[tableNum]["turn"][1] = nil
    end

    local riverCard = pokerCardObjects[tableNum]["river"][1]
    if riverCard ~= nil then
        DeleteObject(riverCard)
        pokerCardObjects[tableNum]["river"][1] = nil
    end
end)

-- Plays the specifed dealer event on the nearest dealerPed
-- All events need tableNum
-- Some events require more data, which you can find below
RegisterNetEvent("ev-poker:playDealerEvent")
AddEventHandler("ev-poker:playDealerEvent", function(eventData)
    local pokerTable = tonumber(eventData.tableNum)
    local tableCfg = PokerTables[pokerTable]
    local dealerPed = (pokerTable == 1 or pokerTable == 2) and dealerPeds[pokerTable] or swappedPeds[pokerTable - 2]
    if dealerPed == nil then
        return
    end

    local tableVector = getTableVector4(pokerTable)
    if #(GetEntityCoords(PlayerPedId()) - tableCfg.tablePos) > 5.0 then
        return
    end
    SetEntityCoords(dealerPed, tableCfg.dealerPos.x, tableCfg.dealerPos.y, tableCfg.dealerPos.z - 1, 0, 0, 0, 0)
    FreezeEntityPosition(dealerPed, true)

    -- Needed: playerPos
    -- After calling this event, you should send ev-poker:givePlayerCard to the player getting the card
    if eventData.event == "dealToPlayer" then
        local anim = "deck_deal_p0"

        local playerPos = tonumber(eventData.playerPos)
        if playerPos == 1 or playerPos == 2 then
            anim = anim .. "1"
        end
        if playerPos == 3 or playerPos == 4 then
            anim = anim .. "2"
        end
        if playerPos == 5 or playerPos == 6 then
            anim = anim .. "3"
        end
        if playerPos == 7 or playerPos == 8 then
            anim = anim .. "4"
        end
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, anim, 2.0, -2.0, 1000.0, 16, 0.0, 0, 0, 0)
        Wait(1500)
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_idle", 2.0, -2.0, -1, 13, 0.0, 0, 0, 0)
    end

    -- Needed: playerPos
    -- After calling this event, you should send ev-poker:clearPlayerCards to the specifed player
    if eventData.event == "collectCards" then
        local anim = "cards_collect_p0"
        local playerPos = tonumber(eventData.playerPos)
        if playerPos == 1 or playerPos == 2 then
            anim = anim .. "1"
        end
        if playerPos == 3 or playerPos == 4 then
            anim = anim .. "2"
        end
        if playerPos == 5 or playerPos == 6 then
            anim = anim .. "3"
        end
        if playerPos == 7 or playerPos == 8 then
            anim = anim .. "4"
        end
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, anim, 2.0, -2.0, 1000.0, 16, 0.0, 0, 0, 0)
        Wait(1000)
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_idle", 2.0, -2.0, -1, 13, 0.0, 0, 0, 0)
    end

    -- None
    if eventData.event == "shuffleCards" then
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_shuffle", 2.0, -2.0, -1, 16, 0.0, 0, 0, 0)
        Wait(4000)
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_idle", 2.0, -2.0, -1, 13, 0.0, 0, 0, 0)
    end

    -- Needed: tableNum (1 or 2)
    if eventData.event == "clearCards" then
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_deal_self", 2.0, -2.0, -1, 16, 0.0, 0, 0, 0)
        Wait(1500)
        TriggerEvent("ev-poker:clearDealerCards", pokerTable)
        Wait(1000)
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_idle", 2.0, -2.0, -1, 13, 0.0, 0, 0, 0)
    end

    -- Needed: cards = {<cardjson>, <cardjson>, <cardjson>}
    if eventData.event == "dealFlop" then
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_deal_self", 2.0, -2.0, -1, 16, 0.0, 0, 0, 0)
        Wait(1000)
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_idle", 2.0, -2.0, -1, 13, 0.0, 0, 0, 0)
        local card1 = eventData.cards[1]
        local card2 = eventData.cards[2]
        local card3 = eventData.cards[3]
        local cardNum1 = getCardFromString(card1._rank .. card1._suit)
        local cardNum2 = getCardFromString(card2._rank .. card2._suit)
        local cardNum3 = getCardFromString(card3._rank .. card3._suit)

        pokerCardObjects[pokerTable]["flop"][1] = createCardAtOffsetPosition(tableVector, vector3(0.08 - 0.2, -0.3, -1.035), vector3(0, 0, tableVector.w), true, cardNum1)
        pokerCardObjects[pokerTable]["flop"][2] = createCardAtOffsetPosition(tableVector, vector3((0.08 * 2) - 0.2, -0.3, -1.035), vector3(0, 0, tableVector.w), true, cardNum2)
        pokerCardObjects[pokerTable]["flop"][3] = createCardAtOffsetPosition(tableVector, vector3((0.08 * 3) - 0.2, -0.3, -1.035), vector3(0, 0, tableVector.w), true, cardNum3)
    end

    -- Needed: cards = {<cardjson>}
    if eventData.event == "dealTurn" then
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_deal_self", 2.0, -2.0, -1, 16, 0.0, 0, 0, 0)
        Wait(1000)
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_idle", 2.0, -2.0, -1, 13, 0.0, 0, 0, 0)

        local card1 = eventData.cards[1]
        local cardNum1 = getCardFromString(card1._rank .. card1._suit)

        pokerCardObjects[pokerTable]["turn"][1] = createCardAtOffsetPosition(tableVector, vector3((0.08 * 4) - 0.2, -0.3, -1.035), vector3(0, 0, tableVector.w), true, cardNum1)
    end

    -- Needed: tableNum (1 or 2), cards = {<cardNum1>}
    if eventData.event == "dealRiver" then
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_deal_self", 2.0, -2.0, -1, 16, 0.0, 0, 0, 0)
        Wait(1000)
        TaskPlayAnim(dealerPed, dealerAnimDictPoker, "deck_idle", 2.0, -2.0, -1, 13, 0.0, 0, 0, 0)

        local card1 = eventData.cards[1]
        local cardNum1 = getCardFromString(card1._rank .. card1._suit)

        pokerCardObjects[pokerTable]["river"][1] = createCardAtOffsetPosition(tableVector, vector3((0.08 * 5) - 0.2, -0.3, -1.035), vector3(0, 0, tableVector.w), true, cardNum1)
    end
    FreezeEntityPosition(dealerPed, false)
end)

RegisterNetEvent("ev-poker:playPlayerEvent")
AddEventHandler("ev-poker:playPlayerEvent", function(eventData)
    local ped = PlayerPedId()

    -- Needed: betAmount (0 ~ 50,000 should work fine)
    if eventData.event == "placeBet" then
        -- Create bet object on table based on chip amount
        local betAmount = tonumber(eventData.betAmount)
        if betAmount == prevBetAmount then
            return
        end
        playPlayerAnimation(PokerPlayerAnims, "cards_bet")
        prevBetAmount = betAmount
        for _, prop in pairs(currentBetObjects) do
            if prop ~= nil then
                DeleteObject(prop)
            end
        end
        local objCoords = GetOffsetFromEntityInWorldCoords(ped, vector3(0.0, 0.63, 0.1875))
        local heading = GetEntityHeading(PlayerPedId())

        currentBetObjects = generateChipStackAtPosition(objCoords, heading, betAmount, true)
        -- RPC.execute("ev-poker:createNetworkedBet", objCoords.x, objCoords.y, objCoords.z, heading, betAmount, myTableId)
    end

    -- Deletes the player cards for you
    if eventData.event == "foldCards" then
        playPlayerAnimation(PokerPlayerAnims, "cards_fold")
        Wait(1000)
        TriggerEvent("ev-poker:clearPlayerCards")
    end

    -- Needed: cards = {<cardNum1>, <cardNum2>}
    if eventData.event == "showCards" then
        local card1 = eventData.cards[1]
        local card2 = eventData.cards[2]
        local cardNum1 = getCardFromString(card1._rank .. card1._suit)
        local cardNum2 = getCardFromString(card2._rank .. card2._suit)
        playPlayerAnimation(PokerPlayerAnims, "cards_play")
        TriggerEvent("ev-poker:givePlayerCard", 1, cardNum1, true)
        TriggerEvent("ev-poker:givePlayerCard", 2, cardNum2, true)
    end

    if eventData.event == "check" then
        playPlayerAnimation("anim_casino_b@amb@casino@games@blackjack@player", "request_card")
    end

    -- Needed: tableNum (1 or 2), chairObject (closest chair object)
    if eventData.event == "joinGame" then
        shouldForceIdleCardGames = false
        local pokerTable = tonumber(eventData.tableNum)
        local chairCoords = GetEntityCoords(currentChairObject)
        local chairRotation = GetEntityRotation(currentChairObject)
        local playerPos = tonumber(eventData.seatNum)
        myTableId = pokerTable
        RPC.execute("ev-casino:poker:joinGame", GetPlayerServerId(PlayerId()), pokerTable, playerPos)

        SetEntityCollision(ped, false, false)
        FreezeEntityPosition(ped, true)

        loadAnimations()
        local syncScene = NetworkCreateSynchronisedScene(chairCoords.x + 0.0, chairCoords.y + 0.0, chairCoords.z + 0.0, chairRotation.x + 0.0, chairRotation.y + 0.0, chairRotation.z + 90.0, 2, 1, 0, 1065353216, 0, 1065353216)
        NetworkAddPedToSynchronisedScene(ped, syncScene, "anim_casino_b@amb@casino@games@shared@player@", "sit_enter_left_side", 2.0, -2.0, 13, 16, 2.0, 0)
        NetworkStartSynchronisedScene(syncScene)

        RPC.execute("ev-poker:setChairActive", playerPos, pokerTable)
        Wait(3000)
        currentPlayerPos = playerPos

        isSittingAtPokerTable = true

        local taskCoords = GetOffsetFromEntityInWorldCoords(currentChairObject, 0.0, -0.15, 0.75)
        Citizen.CreateThread(function()
            while isSittingAtPokerTable do
                if not IsPedUsingScenario(ped, "PROP_HUMAN_SEAT_BENCH") then
                    TaskStartScenarioAtPosition(ped, "PROP_HUMAN_SEAT_BENCH", taskCoords.x + 0.0, taskCoords.y + 0.0, taskCoords.z + 0.0, chairRotation.z, -1, false, true)
                end
                Wait(100)
            end
        end)
        local chipCount = RPC.execute("ev-casino:getCurrentChipCount")
        TriggerEvent("ev-poker:setPlayerChips", chipCount)
        -- RPC.execute("ev-casino:poker:joinGame", PlayerId(), pokerTable, playerPos)
    end

    -- Should call this when player can exit the game, ie. on ESC or something not during a round
    if eventData.event == "leaveGame" then
        isSittingAtPokerTable = false
        shouldForceIdleCardGames = false

        RPC.execute("ev-casino:poker:playerAction", GetPlayerServerId(PlayerId()), myTableId, "leave", 0)
        myTableId = -1
        exports["ev-ui"]:sendAppEvent("poker", {show = false, active = false})
        exports["ev-ui"]:SetUIFocus(false, false)

        RequestAnimDict("anim_casino_b@amb@casino@games@shared@player@")
        while not HasAnimDictLoaded("anim_casino_b@amb@casino@games@shared@player@") do
            Wait(0)
        end
        local coords = GetEntityCoords(ped)
        local rotation = GetEntityRotation(ped)
        ClearPedTasksImmediately(ped)

        local syncScene = NetworkCreateSynchronisedScene(coords.x + 0.0, coords.y + 0.0, coords.z - 0.75, rotation.x + 0.0, rotation.y + 0.0, rotation.z + 90.0, 2, 1, 0, 1065353216, 0, 1065353216)
        NetworkAddPedToSynchronisedScene(ped, syncScene, "anim_casino_b@amb@casino@games@shared@player@", "sit_exit_left", 2.0, -2.0, 13, 16, 2.0, 0)
        NetworkStartSynchronisedScene(syncScene)

        for _, prop in ipairs(currentChipStacks) do
            if prop ~= nil then
                DeleteObject(prop)
            end
        end
        TriggerEvent("ev-poker:clearPlayerCards")
        currentChipStacks = {}
        prevChipCount = 0

        Wait(3000)
        SetEntityCollision(ped, true, false)
        FreezeEntityPosition(ped, false)
        ClearPedTasksImmediately(ped)

        currentChairObject = nil
        RPC.execute("ev-poker:leaveChair", tonumber(currentPlayerPos), tonumber(currentPokerTable))
        -- RPC.execute("ev-casino:poker:leaveGame", currentPokerTable, playerPos)
    end
end)

-- RegisterNetEvent("ev-poker:createNetworkCard")
-- AddEventHandler("ev-poker:createNetworkCard", function(position, rotation, cardNumber, tableNum)
--     local tableObj = pokerTable1
--     if tableNum == 2 then tableObj = pokerTable2 end
--     tableObj.networkedCards[#tableObj.networkedCards + 1] = createCardAtPosition(position, rotation, true, cardNumber, false)
-- end)

-- RegisterNetEvent("ev-poker:createNetworkBet")
-- AddEventHandler("ev-poker:createNetworkBet", function(position, heading, betAmount, tableNum)
--     local tableObj = pokerTable1
--     if tableNum == 2 then tableObj = pokerTable2 end
--     tableObj.networkedBets[#tableObj.networkedBets + 1] = generateChipStackAtPosition(position, heading, betAmount, false)
-- end)

-- RegisterNetEvent("ev-poker:createNetworkChips")
-- AddEventHandler("ev-poker:createNetworkChips", function(position, heading, betAmount, tableNum)
--     local tableObj = pokerTable1
--     if tableNum == 2 then tableObj = pokerTable2 end
--     pposition)
--     tableObj.networkedChips[#tableObj.networkedChips + 1] = generateChipStackAtPosition(position, heading, betAmount, false)
-- end)

-- RegisterNetEvent('ev-poker:clearNetworkCards')
-- AddEventHandler("ev-poker:clearNetworkCards", function(tableNum)
--     local tableObj = pokerTable1
--     if tableNum == 2 then tableObj = pokerTable2 end
--     for _, card in ipairs(tableObj.networkedCards) do if card ~= nil then DeleteObject(card) end end
--     tableObj.networkedCards = {}
-- end)

-- RegisterNetEvent('ev-poker:clearNetworkBets')
-- AddEventHandler("ev-poker:clearNetworkBets", function(tableNum)
--     local tableObj = pokerTable1
--     if tableNum == 2 then tableObj = pokerTable2 end
--     for _, betTable in ipairs(tableObj.networkedBets) do for _, prop in ipairs(betTable) do if prop ~= nil then DeleteObject(prop) end end end
--     tableObj.networkedBets = {}
-- end)

-- RegisterNetEvent('ev-poker:clearNetworkChips')
-- AddEventHandler("ev-poker:clearNetworkChips", function(tableNum)
--     local tableObj = pokerTable1
--     if tableNum == 2 then tableObj = pokerTable2 end
--     for _, chipTable in ipairs(tableObj.networkedChips) do for _, prop in ipairs(chipTable) do if prop ~= nil then DeleteObject(prop) end end end
--     tableObj.networkedChips = {}
-- end)

-- Loads casino anims we need
function loadAnimations()
    local animsToLoad = {"anim_casino_b@amb@casino@games@blackjack@player", "anim_casino_b@amb@casino@games@blackjack@dealer", "anim_casino_b@amb@casino@games@shared@player@", "anim_casino_b@amb@casino@games@shared@dealer@", PokerPlayerAnims}
    for k, v in pairs(animsToLoad) do
        RequestAnimDict(v)
        while not HasAnimDictLoaded(v) do
            Wait(0)
        end
    end
end

-- Creates a playing card based on table position and the offset
function createCardAtOffsetPosition(tableVec, offsetVec, rotationVec, bool1, cardNum)
    local pos = GetObjectOffsetFromCoords(tableVec.x, tableVec.y, tableVec.z, tableVec.w, offsetVec.x, offsetVec.y, offsetVec.z)
    return createCardAtPosition(pos, rotationVec, bool1, cardNum, false)
end

-- Creates a playing card at the given position/rotation
function createCardAtPosition(positionVec, rotationVec, bool1, cardNum, networked)
    -- local positionVec = type(coords) ~= "vector3" and vector3(coords.x, coords.y, coords.z) or coords
    -- local rotationVec = type(rotation) ~= "vector3" and vector3(rotation.x, rotation.y, rotation.z) or rotation
    -- if networked then
    --   RPC.execute("ev-poker:createNetworkedCard", cardNum, positionVec.x, positionVec.y, positionVec.z, rotationVec.x, rotationVec.y, rotationVec.z, myTableId)
    --   return
    -- end
    local card = getCardFromNumber(cardNum, bool1)
    cardHash = GetHashKey(card)
    RequestModel(cardHash)
    while not HasModelLoaded(cardHash) do
        Wait(0)
    end
    local cardObject = CreateObject(cardHash, positionVec, 0, 0, 0)
    SetEntityRotation(cardObject, rotationVec, 2, 1)
    -- if networked then SetNetworkIdCanMigrate(ObjToNet(cardObject), false) end
    return cardObject
end

-- Plays a network sync'd scene
function playPlayerAnimation(animDict, anim)
    -- shouldForceIdleCardGames = false
    -- local duration = dwDoAnim(animDict, anim)
    -- SetTimeout(duration, function()
    --     shouldForceIdleCardGames = true
    -- end)

    -- loadAnimations()
    -- local ped = PlayerPedId()
    -- local chairCoords = GetEntityCoords(ped)
    -- local chairRotation = GetEntityRotation(ped)

    -- local syncScene = NetworkCreateSynchronisedScene(chairCoords.x + 0.0, chairCoords.y + 0.0, chairCoords.z - 1.0, chairRotation.x + 0.0, chairRotation.y + 0.0, chairRotation.z + 90.0, 2, 1, 0, 1065353216, 0, 1065353216)
    -- NetworkAddPedToSynchronisedScene(ped, syncScene, animDict, anim, 2.0, -2.0, 13, 16, 2.0, 0)
    -- NetworkStartSynchronisedScene(syncScene)
end

-- Temp function, Can't play dealer functions networked i think
function playDealerAnimation(dealerPed, animDict, anim)
    loadAnimations()
    local entCoords = GetEntityCoords(dealerPed)
    local entRotation = GetEntityRotation(dealerPed)
    local syncScene = NetworkCreateSynchronisedScene(entCoords.x + 0.0, entCoords.y + 0.0, entRotation.z + 0.0, entRotation.x + 0.0, entRotation.y + 0.0, entRotation.z + 0.0, 2, 1, 0, 1065353216, 0, 1065353216)
    NetworkAddPedToSynchronisedScene(dealerPed, syncScene, animDict, anim, 2.0, -2.0, 13, 16, 2.0, 0)
    NetworkStartSynchronisedScene(syncScene)
end

-- Returns a vector4 object with the table info from the blackjack config
function getTableVector4(tableNum)
    local tableCfg = PokerTables[tableNum]
    return vector4(tableCfg.tablePos.x, tableCfg.tablePos.y, tableCfg.tablePos.z, tableCfg.tableHeading)
end

-- Gets nearest chair
function getNearestChair(coords)
    return GetClosestObjectOfType(coords, 5.0, GetHashKey("vw_prop_casino_chair_01a"), 0, 0, 0)
end

-- Hard coded chair locations to player positions
local table1Chairs = {
    [1] = vector3(1011.55,50.81,70.87),
    [2] = vector3(1009.76,51.61,70.87),
    [3] = vector3(1010.68,53.44,70.87),
    [4] = vector3(1011.45,53.63,70.87),
    [5] = vector3(1012.04,53.82,70.87),
    [6] = vector3(1012.55,54.08,70.87),
    [7] = vector3(1014.38,53.26,70.87),
    [8] = vector3(1013.44,51.42,70.87),
}
local table2Chairs = {
    [1] = vector3(1015.07,44.37,70.87),
    [2] = vector3(1016.66,43.77,70.87),
    [3] = vector3(1016.01,41.79,70.87),
    [4] = vector3(1015.4,41.49,70.87),
    [5] = vector3(1014.61,41.31,70.87),
    [6] = vector3(1013.87,41.01,70.87),
    [7] = vector3(1012.19,42.08,70.87),
    [8] = vector3(1012.97,43.75,70.87),
}
local table3Chairs = {
    [1] = vector3(995.72,74.72,69.67),
    [2] = vector3(997.36,73.65,69.67),
    [3] = vector3(996.49,71.93,69.67),
    [4] = vector3(995.68,71.75,69.67),
    [5] = vector3(994.96,71.57,69.67),
    [6] = vector3(994.11,71.4,69.67),
    [7] = vector3(992.52,72.51,69.67),
    [8] = vector3(993.57,74.31,69.67),
}
local table4Chairs = {
    [1] = vector3(996.98,77.57,69.67),
    [2] = vector3(998.28,79.5,69.67),
    [3] = vector3(1000.18,78.55,69.67),
    [4] = vector3(1000.42,77.77,69.67),
    [5] = vector3(1000.49,77.04,69.67),
    [6] = vector3(1000.7,76.35,69.67),
    [7] = vector3(999.53,74.65,69.67),
    [8] = vector3(997.84,75.67,69.67),
}
local table5Chairs = {
    [1] = vector3(992.77,77.84,69.67),
    [2] = vector3(991.08,79.06,69.67),
    [3] = vector3(992.02,80.77,69.67),
    [4] = vector3(992.87,80.95,69.67),
    [5] = vector3(993.58,81.06,69.67),
    [6] = vector3(994.39,81.31,69.67),
    [7] = vector3(996.02,80.03,69.67),
    [8] = vector3(994.92,78.34,69.67),
}
local table6Chairs = {
    [1] = vector3(991.48,74.15,69.67),
    [2] = vector3(990.24,72.43,69.67),
    [3] = vector3(988.57,73.26,69.67),
    [4] = vector3(988.45,74.16,69.67),
    [5] = vector3(988.24,74.87,69.67),
    [6] = vector3(988.1,75.65,69.67),
    [7] = vector3(989.14,77.31,69.67),
    [8] = vector3(990.97,76.29,69.67),
}

local tableChairs = {table1Chairs, table2Chairs, table3Chairs, table4Chairs, table5Chairs, table6Chairs}

-- Checks against the tables above to get player position from chair coords
function getPlayerPosFromChairCoords(coords)
    local closestChair = 99
    local chair = -1
    for tableIdx, tableChairs in ipairs(tableChairs) do
        for idx, chairCoord in ipairs(tableChairs) do
            local chairDist = #(chairCoord - coords)
            if chairDist < closestChair then
                closestChair = chairDist
                chair = idx
            end
        end
    end
    return chair
end

-- Generates the amount of chips in a radius around the given coords
function generateChipStackAtPosition(startcoords, heading, amount, networked)
    local coords = type(startcoords) ~= "vector3" and vector3(startcoords.x, startcoords.y, startcoords.z) or startcoords
    local stackProps = getChipStackFromAmount(amount)
    local tempChipStack = {}

    local radius = 0.05

    local offsetVectors = {}

    ::loopback::
    local iterations = 1000
    while iterations > 0 do
        local dir = math.rad(math.random(0, 360))
        local randRadius = math.random() * radius
        local offset = vector3(math.cos(dir), math.sin(dir), 0.0) * randRadius
        local isOverlapping = false
        for idx, otherVector in ipairs(offsetVectors) do
            local propOther = stackProps[idx]
            local curProp = stackProps[#offsetVectors]
            local minDist = 0.05

            if string.find(propOther, "plaq") then
                minDist = minDist + 0.025
            end
            if string.find(curProp, "plaq") then
                minDist = minDist + 0.025
            end

            if #(offset - otherVector) < minDist then
                isOverlapping = true
                break
            end
        end

        if not isOverlapping then
            offsetVectors[#offsetVectors + 1] = offset
            if #offsetVectors >= #stackProps then
                break
            end
        end
        iterations = iterations - 1
    end

    if #offsetVectors < #stackProps then
        radius = radius + 0.001
        goto loopback
    end

    for idx, offsetVector in ipairs(offsetVectors) do
        local propName = stackProps[idx]
        local stackHash = GetHashKey(propName)
        RequestModel(stackHash)
        while not HasModelLoaded(stackHash) do
            Wait(0)
        end
        if propName == "vw_prop_chip_10dollar_x1" then
            offsetVector = vector3(offsetVector.x, offsetVector.y, offsetVector.z + 0.01)
        end
        local objCoords = GetObjectOffsetFromCoords(coords, heading, offsetVector)

        tempChipStack[idx] = CreateObject(stackHash, objCoords, 0, 0, 0)
        -- if networked then
        --     SetNetworkIdCanMigrate(ObjToNet(tempChipStack[idx]), false)
        -- end
        SetEntityRotation(tempChipStack[idx], vector3(0.0, 0.0, heading), 2, 1)
    end
    return tempChipStack
end

local chipStackNames = {
    [5] = "vw_prop_vw_coin_01a",
    [10] = "vw_prop_chip_10dollar_x1",
    [50] = "vw_prop_chip_50dollar_x1",
    [100] = "vw_prop_chip_50dollar_st",
    [500] = "vw_prop_chip_100dollar_st",
    [1000] = "vw_prop_chip_500dollar_st",
    [5000] = "vw_prop_chip_1kdollar_st",
    [10000] = "vw_prop_plaq_5kdollar_st",
    [100000] = "vw_prop_plaq_10kdollar_st"
}

function getChipStackFromAmount(amount)
    amount = tonumber(amount)
    if amount < 1000000 then
        local denominations = {5, 10, 50, 100, 500, 1000, 5000, 10000, 100000}
        chips = {}
        local max = 9
        for k, v in ipairs(denominations) do
            while amount >= denominations[max] do
                chips[#chips + 1] = denominations[max]
                amount = amount - denominations[max]
            end
            max = max - 1
        end
        for k, v in ipairs(chips) do
            chips[k] = chipStackNames[v]
        end
        return chips
    elseif amount < 5000000 then
        return {"vw_prop_vw_chips_pile_01a"}
    elseif amount < 10000000 then
        return {"vw_prop_vw_chips_pile_02a"}
    else
        return {"vw_prop_vw_chips_pile_03a"}
    end
    return {"vw_prop_chip_500dollar_st"}
end

function getCardFromString(cs)
    -- don't bully, this took a while
    if cs == "Ac" then
        return 1
    end
    if cs == "2c" then
        return 2
    end
    if cs == "3c" then
        return 3
    end
    if cs == "4c" then
        return 4
    end
    if cs == "5c" then
        return 5
    end
    if cs == "6c" then
        return 6
    end
    if cs == "7c" then
        return 7
    end
    if cs == "8c" then
        return 8
    end
    if cs == "9c" then
        return 9
    end
    if cs == "Tc" then
        return 10
    end
    if cs == "Jc" then
        return 11
    end
    if cs == "Qc" then
        return 12
    end
    if cs == "Kc" then
        return 13
    end
    if cs == "Ad" then
        return 14
    end
    if cs == "2d" then
        return 15
    end
    if cs == "3d" then
        return 16
    end
    if cs == "4d" then
        return 17
    end
    if cs == "5d" then
        return 18
    end
    if cs == "6d" then
        return 19
    end
    if cs == "7d" then
        return 20
    end
    if cs == "8d" then
        return 21
    end
    if cs == "9d" then
        return 22
    end
    if cs == "Td" then
        return 23
    end
    if cs == "Jd" then
        return 24
    end
    if cs == "Qd" then
        return 25
    end
    if cs == "Kd" then
        return 26
    end
    if cs == "Ah" then
        return 27
    end
    if cs == "2h" then
        return 28
    end
    if cs == "3h" then
        return 29
    end
    if cs == "4h" then
        return 30
    end
    if cs == "5h" then
        return 31
    end
    if cs == "6h" then
        return 32
    end
    if cs == "7h" then
        return 33
    end
    if cs == "8h" then
        return 34
    end
    if cs == "9h" then
        return 35
    end
    if cs == "Th" then
        return 36
    end
    if cs == "Jh" then
        return 37
    end
    if cs == "Qh" then
        return 38
    end
    if cs == "Kh" then
        return 39
    end
    if cs == "As" then
        return 40
    end
    if cs == "2s" then
        return 41
    end
    if cs == "3s" then
        return 42
    end
    if cs == "4s" then
        return 43
    end
    if cs == "5s" then
        return 44
    end
    if cs == "6s" then
        return 45
    end
    if cs == "7s" then
        return 46
    end
    if cs == "8s" then
        return 47
    end
    if cs == "9s" then
        return 48
    end
    if cs == "Ts" then
        return 49
    end
    if cs == "Js" then
        return 50
    end
    if cs == "Qs" then
        return 51
    end
    if cs == "Ks" then
        return 52
    end
end

function getCardFromNumber(iParam0, bParam1)
    if bParam1 then
        if iParam0 == 1 then
            return "vw_prop_vw_club_char_a_a"
        elseif iParam0 == 2 then
            return "vw_prop_vw_club_char_02a"
        elseif iParam0 == 3 then
            return "vw_prop_vw_club_char_03a"
        elseif iParam0 == 4 then
            return "vw_prop_vw_club_char_04a"
        elseif iParam0 == 5 then
            return "vw_prop_vw_club_char_05a"
        elseif iParam0 == 6 then
            return "vw_prop_vw_club_char_06a"
        elseif iParam0 == 7 then
            return "vw_prop_vw_club_char_07a"
        elseif iParam0 == 8 then
            return "vw_prop_vw_club_char_08a"
        elseif iParam0 == 9 then
            return "vw_prop_vw_club_char_09a"
        elseif iParam0 == 10 then
            return "vw_prop_vw_club_char_10a"
        elseif iParam0 == 11 then
            return "vw_prop_vw_club_char_j_a"
        elseif iParam0 == 12 then
            return "vw_prop_vw_club_char_q_a"
        elseif iParam0 == 13 then
            return "vw_prop_vw_club_char_k_a"
        elseif iParam0 == 14 then
            return "vw_prop_vw_dia_char_a_a"
        elseif iParam0 == 15 then
            return "vw_prop_vw_dia_char_02a"
        elseif iParam0 == 16 then
            return "vw_prop_vw_dia_char_03a"
        elseif iParam0 == 17 then
            return "vw_prop_vw_dia_char_04a"
        elseif iParam0 == 18 then
            return "vw_prop_vw_dia_char_05a"
        elseif iParam0 == 19 then
            return "vw_prop_vw_dia_char_06a"
        elseif iParam0 == 20 then
            return "vw_prop_vw_dia_char_07a"
        elseif iParam0 == 21 then
            return "vw_prop_vw_dia_char_08a"
        elseif iParam0 == 22 then
            return "vw_prop_vw_dia_char_09a"
        elseif iParam0 == 23 then
            return "vw_prop_vw_dia_char_10a"
        elseif iParam0 == 24 then
            return "vw_prop_vw_dia_char_j_a"
        elseif iParam0 == 25 then
            return "vw_prop_vw_dia_char_q_a"
        elseif iParam0 == 26 then
            return "vw_prop_vw_dia_char_k_a"
        elseif iParam0 == 27 then
            return "vw_prop_vw_hrt_char_a_a"
        elseif iParam0 == 28 then
            return "vw_prop_vw_hrt_char_02a"
        elseif iParam0 == 29 then
            return "vw_prop_vw_hrt_char_03a"
        elseif iParam0 == 30 then
            return "vw_prop_vw_hrt_char_04a"
        elseif iParam0 == 31 then
            return "vw_prop_vw_hrt_char_05a"
        elseif iParam0 == 32 then
            return "vw_prop_vw_hrt_char_06a"
        elseif iParam0 == 33 then
            return "vw_prop_vw_hrt_char_07a"
        elseif iParam0 == 34 then
            return "vw_prop_vw_hrt_char_08a"
        elseif iParam0 == 35 then
            return "vw_prop_vw_hrt_char_09a"
        elseif iParam0 == 36 then
            return "vw_prop_vw_hrt_char_10a"
        elseif iParam0 == 37 then
            return "vw_prop_vw_hrt_char_j_a"
        elseif iParam0 == 38 then
            return "vw_prop_vw_hrt_char_q_a"
        elseif iParam0 == 39 then
            return "vw_prop_vw_hrt_char_k_a"
        elseif iParam0 == 40 then
            return "vw_prop_vw_spd_char_a_a"
        elseif iParam0 == 41 then
            return "vw_prop_vw_spd_char_02a"
        elseif iParam0 == 42 then
            return "vw_prop_vw_spd_char_03a"
        elseif iParam0 == 43 then
            return "vw_prop_vw_spd_char_04a"
        elseif iParam0 == 44 then
            return "vw_prop_vw_spd_char_05a"
        elseif iParam0 == 45 then
            return "vw_prop_vw_spd_char_06a"
        elseif iParam0 == 46 then
            return "vw_prop_vw_spd_char_07a"
        elseif iParam0 == 47 then
            return "vw_prop_vw_spd_char_08a"
        elseif iParam0 == 48 then
            return "vw_prop_vw_spd_char_09a"
        elseif iParam0 == 49 then
            return "vw_prop_vw_spd_char_10a"
        elseif iParam0 == 50 then
            return "vw_prop_vw_spd_char_j_a"
        elseif iParam0 == 51 then
            return "vw_prop_vw_spd_char_q_a"
        elseif iParam0 == 52 then
            return "vw_prop_vw_spd_char_k_a"
        end
    end
    return "vw_prop_casino_cards_single"
end

function getPokerTableFromCoords(pCoords)
    for idx, pTable in ipairs(PokerTables) do
        if #(pCoords - pTable.tablePos) < 3.5 then
            return idx
        end
    end
    return false
end

-- Shows the prompt to play
Citizen.CreateThread(function()
    local pokerTablePrompt = false
    local leaveTablePrompt = false
    while true do
        local coords = GetEntityCoords(PlayerPedId())
        currentPokerTable = getPokerTableFromCoords(coords)
        if not currentPokerTable then
            Wait(1000)
        end
        if currentPokerTable and isSittingAtPokerTable then
            if not leaveTablePrompt then
                exports["ev-ui"]:showInteraction("[E] Leave Table")
                leaveTablePrompt = true
            end
            if IsControlJustReleased(0, 38) then
                TriggerEvent("ev-poker:playPlayerEvent", {event = "leaveGame"})
            end
        elseif leaveTablePrompt then
            leaveTablePrompt = false
            exports["ev-ui"]:hideInteraction()
        end
        if currentPokerTable and not isSittingAtPokerTable then
            -- Get distance to nearest chair
            currentChairObject = getNearestChair(coords)
            local isHighRoller = PokerTables[currentPokerTable].highroller
            if #(GetEntityCoords(currentChairObject) - coords) < 2.0 and not pokerTablePrompt then
                local background = "info"
                if exports["ev-inventory"]:hasEnoughOfItem("casinomember", 1, false, true) and not isHighRoller then
                    background = "success"
                    canPlayAtCurrentTable = true
                elseif exports["ev-inventory"]:hasEnoughOfItem("casinovip", 1, false, true) then
                    background = "success"
                    canPlayAtCurrentTable = true
                else
                    background = "error"
                    canPlayAtCurrentTable = false
                end
                exports["ev-ui"]:showInteraction("[E] Play!", background)
                pokerTablePrompt = true
            end
            if IsControlJustPressed(0, 38) and canPlayAtCurrentTable then
                local chipCount = RPC.execute("ev-casino:getCurrentChipCount")
                if chipCount < buyIn then
                    TriggerEvent("DoLongHudText", "You don't have the required buy-in of $" .. buyIn .. ".")
                else
                    pokerTablePrompt = true
                    canPlayAtCurrentTable = false
                    local chairCoords = GetEntityCoords(currentChairObject)
                    local playerPos = getPlayerPosFromChairCoords(chairCoords)
                    local success = RPC.execute("ev-poker:requestChair", tonumber(playerPos), tonumber(currentPokerTable))
                    if success then
                        TriggerEvent("ev-poker:playPlayerEvent", {event = "joinGame", tableNum = currentPokerTable, seatNum = playerPos})
                    else
                        canPlayAtCurrentTable = true
                        TriggerEvent("DoLongHudText", "That seat is taken.")
                    end
                end
            end
        elseif pokerTablePrompt and not leaveTablePrompt then
            local background = "info"
            if exports["ev-inventory"]:hasEnoughOfItem("casinomember", 1, false, true) or exports["ev-inventory"]:hasEnoughOfItem("casinovip", 1, false, true) then
                background = "success"
            else
                background = "error"
            end
            exports["ev-ui"]:hideInteraction(background)
            pokerTablePrompt = false
        end
        CasinoWaitTimer()
    end
end)

-- RegisterCommand("leavepoker", function(source, args, rawCommand)
--     TriggerEvent("ev-poker:playPlayerEvent", {event = "leaveGame", tableNum = currentPokerTable and currentPokerTable or -1})
-- end, false)

-- Poker shit b/c we need some functions :)

-- RegisterCommand("PlayDealerAnim", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     TriggerEvent("ev-poker:playDealerEvent", {event = args[1], tableNum = 1})
-- end, false)

-- RegisterCommand("PlayPlayerAnim", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     TriggerEvent("ev-poker:playPlayerEvent", {event = args[1], tableNum = 1})
-- end, false)

-- RegisterCommand("DealToPlayer", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     local data = { event = "dealToPlayer", tableNum = 1, dealerPed = closestDealerPed, playerPos = args[1] }
--     TriggerEvent("ev-poker:playDealerEvent", data)
-- end, false)

-- RegisterCommand("CollectCards", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     local closestDealerPed, closestDealerPedDistance = getClosestDealer()
--     local data = { event = "collectCards",  tableNum = 1, playerPos = args[1] }
--     TriggerEvent("ev-poker:playDealerEvent", data)
-- end, false)

-- RegisterCommand("GivePlayerCard", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     TriggerEvent("ev-poker:givePlayerCard", args[1], 1, false)
-- end, false)

-- RegisterCommand("DealFlop", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     local data = { event = "dealFlop", tableNum = args[1], cards = {9, 10, 11} }
--     TriggerEvent("ev-poker:playDealerEvent", data)
-- end, false)

-- RegisterCommand("DealTurn", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     local data = { event = "dealTurn", tableNum = args[1], cards = {12} }
--     TriggerEvent("ev-poker:playDealerEvent", data)
-- end, false)

-- RegisterCommand("DealRiver", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     local data = { event = "dealRiver", tableNum = args[1], cards = {13} }
--     TriggerEvent("ev-poker:playDealerEvent", data)
-- end, false)

-- RegisterCommand("clearPlayerCards", function(source, args, rawCommand)
--     TriggerEvent("ev-poker:clearPlayerCards")
-- end, false)

-- RegisterCommand("clearDealerCards", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     TriggerEvent("ev-poker:clearDealerCards", args[1])
-- end, false)

-- RegisterCommand("BetAmount", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     TriggerEvent("ev-poker:playPlayerEvent", {event = "placeBet", betAmount = args[1]})
-- end, false)

-- RegisterCommand("PotAmount", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     TriggerEvent("ev-poker:setPotAmount", {tableNum = 1, potAmount = args[1]})
-- end, false)

-- RegisterCommand("ShowCards", function(source, args, rawCommand)
--     if not args[1] or args[1] == nil then return end
--     if not args[2] or args[2] == nil then return end
--     TriggerEvent("ev-poker:playPlayerEvent", {event = "showCards", cards = {args[1], args[2]}})
-- end, false)

local dealerPedSeeds = {}
Citizen.CreateThread(function()
    Wait(10000)
    dealerPedSeeds = RPC.execute("ev-casino:getDealerPedSeeds")
    --TriggerEvent("ev-casino:casinoEnteredEvent")
end)

AddEventHandler("ev-casino:casinoExitedEvent", function()
    for k, v in pairs(dealerPeds) do
        if DoesEntityExist(v) then
            DeleteEntity(v)
        end
    end
    for idx, deckObject in pairs(deckObjects) do
        if deckObject ~= nil then
            DeleteObject(deckObject)
        end
    end
    for k, v in pairs(swappedPeds) do
        if DoesEntityExist(v) then
            DeleteEntity(v)
        end
    end
    for idx, deckObject in pairs(swappedDecks) do
        if deckObject ~= nil then
            DeleteObject(deckObject)
        end
    end
    dealerPeds = {}
    deckObjects = {}
    swappedPeds = {}
    swappedDecks = {}
    TriggerEvent("ev-poker:clearPot", {tableNum = 1})
    TriggerEvent("ev-poker:clearPot", {tableNum = 2})
    TriggerEvent("ev-poker:clearPlayerCards")
    TriggerEvent("ev-poker:clearPlayerBet")
    TriggerEvent("ev-poker:clearDealerCards", 1)
    TriggerEvent("ev-poker:clearDealerCards", 2)
end)

AddEventHandler("ev-casino:casinoEnteredEvent", function()
    createDealerPeds(true)
end)

function createDealerPeds(onEnter)
    dealerAnimDict = "anim_casino_b@amb@casino@games@shared@dealer@"
    dealerAnimDictPoker = "anim_casino_b@amb@casino@games@threecardpoker@dealer"
    RequestAnimDict(dealerAnimDict)
    while not HasAnimDictLoaded(dealerAnimDict) do
        Wait(0)
    end
    RequestAnimDict(dealerAnimDictPoker)
    while not HasAnimDictLoaded(dealerAnimDictPoker) do
        Wait(0)
    end

    for i, pTable in ipairs(PokerTables) do
        if not isCasinoSwapped and pTable.swapped then
            goto continue
        end
        if onEnter then
            if i ~= 1 and i ~= 2 then
                goto continue
            end
        end
        if isCasinoSwapped and not onEnter then
            if i == 1 or i == 2 then
                goto continue
            end
        end
        if dealerPedSeeds[i + 1] == nil then 
            dealerPedSeeds = RPC.execute("ev-casino:getDealerPedSeeds")
        end
        local randomBlackShit = dealerPedSeeds[i + 1].seed
        local dealerModel = dealerPedSeeds[i + 1].model
        RequestModel(dealerModel)
        while not HasModelLoaded(dealerModel) do
            RequestModel(dealerModel)
            Wait(0)
        end
        local dealerEntity = CreatePed(26, dealerModel, PokerTables[i].dealerPos.x, PokerTables[i].dealerPos.y, PokerTables[i].dealerPos.z, PokerTables[i].dealerHeading, false, true)
        while not DoesEntityExist(dealerEntity) do
            Wait(0)
        end
        if isCasinoSwapped and not onEnter then
            swappedPeds[#swappedPeds+1] = dealerEntity
        else
            dealerPeds[#dealerPeds+1] = dealerEntity
        end

        SetModelAsNoLongerNeeded(dealerModel)
        SetEntityCanBeDamaged(dealerEntity, 0)
        SetPedAsEnemy(dealerEntity, 0)
        SetPedResetFlag(dealerEntity, 249, 1)
        SetPedConfigFlag(dealerEntity, 185, true)
        SetPedConfigFlag(dealerEntity, 108, true)
        SetPedCanEvasiveDive(dealerEntity, 0)
        SetPedCanRagdollFromPlayerImpact(dealerEntity, 0)
        SetPedConfigFlag(dealerEntity, 208, true)
        SetBlockingOfNonTemporaryEvents(dealerEntity, 1)
        TaskSetBlockingOfNonTemporaryEvents(dealerEntity, 1)
        setBlackjackDealerClothes(randomBlackShit, dealerEntity)
        SetEntityCoordsNoOffset(dealerEntity, PokerTables[i].dealerPos.x, PokerTables[i].dealerPos.y, PokerTables[i].dealerPos.z, 0, 0, 1)
        SetEntityHeading(dealerEntity, PokerTables[i].dealerHeading)
        if dealerModel == maleCasinoDealer then
            TaskPlayAnim(dealerEntity, dealerAnimDictPoker, "deck_idle", 1000.0, -2.0, -1, 2, 1148846080, 0) -- anim_name is idle or female_idle depending on gender
        else
            TaskPlayAnim(dealerEntity, dealerAnimDictPoker, "deck_idle", 1000.0, -2.0, -1, 2, 1148846080, 0) -- anim_name is idle or female_idle depending on gender
        end
        PlayFacialAnim(dealerEntity, "idle_facial", dealerAnimDict)
        RemoveAnimDict(dealerAnimDict)
        RemoveAnimDict(dealerAnimDictPoker)

        -- Create deck
        local deckProps = {["bone"] = GetPedBoneIndex(dealerEntity, 0x49D9), ["x"] = 0.09, ["y"] = 0.005, ["z"] = 0.02, ["xR"] = 190.0, ["yR"] = 10.0, ["zR"] = 125.0}

        local deckHash = GetHashKey(PokerTables[i].deckObject)
        RequestModel(deckHash)
        while not HasModelLoaded(deckHash) do
            Wait(0)
        end
        deckObject = CreateObject(deckHash, 1.0, 1.0, 1.0, 0, 0, 1)
        if isCasinoSwapped and not onEnter then
            swappedDecks[i] = deckObject
        else
            deckObjects[i] = deckObject
        end
        
        SetModelAsNoLongerNeeded(deckHash)
        SetEntityVisible(deckObjects[i], true, 0)
        AttachEntityToEntity(deckObjects[i], dealerEntity, deckProps.bone, deckProps.x, deckProps.y, deckProps.z, deckProps.xR, deckProps.yR, deckProps.zR, 1, 0, 0, 0, 2, 1)
        ::continue::
    end
end

function setBlackjackDealerClothes(randomNumber, dealerPed)
    if randomNumber == 0 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 1 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 2, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 2 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 3 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 4 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 4, 2, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 5 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 6 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 4, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 7 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 1, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 8 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 1, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 1, 1, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 9 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 2, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 10 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 2, 1, 0)
        SetPedComponentVariation(dealerPed, 3, 3, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 11 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 1, 0)
        SetPedComponentVariation(dealerPed, 4, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
        SetPedPropIndex(dealerPed, 1, 0, 0, false)
    elseif randomNumber == 12 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 3, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 1, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 1, 0)
        SetPedComponentVariation(dealerPed, 4, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 13 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 2, 1, 0)
        SetPedComponentVariation(dealerPed, 4, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
        SetPedPropIndex(dealerPed, 1, 0, 0, false)
    end
end

function format_int(number)
    local i, j, minus, int, fraction = tostring(number):find("([-]?)(%d+)([.]?%d*)")

    -- reverse the int-string and append a comma to all blocks of 3 digits
    int = int:reverse():gsub("(%d%d%d)", "%1,")

    -- reverse the int-string back remove an optional comma and put the 
    -- optional minus and fractional part back
    return minus .. int:reverse():gsub("^,", "") .. fraction .. ".00"
end

function ensureCardModelsLoaded()
    cardNum = 0;
    while cardNum < 52 do
        iVar1 = cardNum + 1
        iVar2 = getCardFromNumber(iVar1, true)
        if not HasModelLoaded(iVar2) then
            RequestModel(iVar2)
            while not HasModelLoaded(iVar2) do
                Wait(0)
            end
        end
        cardNum = cardNum + 1
    end
end
