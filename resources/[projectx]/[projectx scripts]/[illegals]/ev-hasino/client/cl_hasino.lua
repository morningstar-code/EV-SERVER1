ARE_EXEC_OFFICE_COMPUTERS_AVAILABLE = false
EXECUTIVE_KEYCARD_PICKED_UP = false

AddEventHandler("ev-hasino:thermiteSuccess", function(pLoc)
  TriggerServerEvent("ev-hasino:thermiteSuccessServer", pLoc)
end)

local MAZE_GAME_WON = nil
RegisterUICallback("ev-ui:mazeMinigameResult", function(data, cb)
  MAZE_GAME_WON = data.success
  cb({ data = {}, meta = { ok = true, message = "done" } })
end)
AddEventHandler("ev-heists:casino:backupGenerator", function(p1, p2, p3)
  local id = p3.zones.hasino_backupgenerator.id
  local canAttempt, message = RPC.execute("ev-hasino:canAttemptBackupGenerator", id)
  if not canAttempt then
    TriggerEvent("DoLongHudText", message, 2)
    return
  end
  MAZE_GAME_WON = nil
  exports["ev-ui"]:openApplication("minigame-maze", {
    show = true,
    gridSize = 7,
    withDebug = false,
  })
  while MAZE_GAME_WON == nil do
    Wait(1000)
    -- MAZE_GAME_WON = true
  end
  if not MAZE_GAME_WON then return end
  RPC.execute("ev-hasino:generatorSuccessful", id)
end)

local COMPUTER_HACK_SUCCESS = nil
RegisterUICallback("ev-ui:minigame:movingNumbersHasino", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "" } })
  COMPUTER_HACK_SUCCESS = data.success
end)
AddEventHandler("ev-hasino:secInnerDoor", function(p1, p2, p3)
  local id = p3.zones.hasino_sec_comp.id
  if id ~= "inner" then return end
  local canDoInnerComputer = RPC.execute("ev-hasino:registerTryForInnerComputer")
  if not canDoInnerComputer then return end
  TriggerEvent("animation:PlayAnimation", "type")
  COMPUTER_HACK_SUCCESS = nil
  exports["ev-ui"]:openApplication("minigame-serverroom", {
    numberTimeout = 10000,
    squares = 10,
    gameFinishedEndpoint = "ev-ui:minigame:movingNumbersHasino",
  })
  while COMPUTER_HACK_SUCCESS == nil do
    Wait(1000)
    -- if DEBUG_MODE then
      -- COMPUTER_HACK_SUCCESS = true
    -- end
  end
  Wait(1000)
  exports["ev-ui"]:closeApplication("minigame-serverroom")
  ClearPedTasks(PlayerPedId())
  if not COMPUTER_HACK_SUCCESS then return end
  local codes = RPC.execute("ev-hasino:getInnerDoorCodes")
  exports["ev-ui"]:openApplication("yacht-envelope", {
    textOnly = true,
    value = codes,
  })
end)

local codesCoords = {
  { vector3(984.8597, 75.78128, 111.25), 58, 58 },
  { vector3(992.5816, 69.3298, 111.25), 325, 325 },
  { vector3(987.583, 61.43615, 111.25), 325, 325 },
  { vector3(984.7398, 56.74736, 111.25), 325, 325 },
  { vector3(978.3659, 46.68446, 111.25), 325, 325 },
  { vector3(963.298, 22.46363, 111.25), 325, 325 },
  { vector3(953.1877, 6.324841, 111.25), 325, 325 },
  { vector3(941.0243, -0.57475, 111.25), 239, 239 },
}
local codesCoords2 = {
  { vector3(984.9888, 75.98792, 111.25), 58, 58 },
  { vector3(992.803, 69.19148, 111.25), 325, 325 },
  { vector3(987.8269, 61.28372, 111.25), 325, 325 },
  { vector3(984.9124, 56.63951, 111.25), 325, 325 },
  { vector3(978.6001, 46.53809, 111.25), 325, 325 },
  { vector3(963.4739, 22.35373, 111.25), 325, 325 },
  { vector3(953.3847, 6.201729, 111.25), 325, 325 },
  { vector3(940.8923, -0.78589, 111.25), 239, 239 },
}
local codesUsedIdx = {}
local magnetInProgress = false

AddEventHandler("ev-inventory:itemUsed", function(pItem)
  if pItem ~= "highpoweredmagnet" then return end
  if magnetInProgress then
    TriggerEvent("DoLongHudText", "Magnet in progress.", 2)
    return
  end
  magnetInProgress = true
  local loc, rotplus, panelIndex = nil, nil
  for pIdx, coords in pairs(codesCoords) do
    if #(coords[1] - GetEntityCoords(PlayerPedId())) < 2.0 then
      loc = { x = coords[1].x, y = coords[1].y, z = coords[1].z, h = coords[2] }
      rotplus = coords[3]
      panelIndex = pIdx
      if codesUsedIdx[panelIndex] then
        local coords2 = codesCoords2[panelIndex]
        loc = { x = coords2[1].x, y = coords2[1].y, z = coords2[1].z, h = coords2[2] }
        rotplus = coords2[3]
      end
    end
  end
  if not loc then
    magnetInProgress = false
    return
  end
  TriggerEvent("inventory:removeItem", "highpoweredmagnet", 1)
  local success = Citizen.Await(MagnetCharge(loc, 0, rotplus, {
    coloredSquares = 8,
    gameTimeoutDuration = 15000,
    gridSize = 5,
  }))
  if not success then
    magnetInProgress = false
    return
  end
  RPC.execute("ev-hasino:magnetSuccess", panelIndex, loc)
  codesUsedIdx[panelIndex] = true
  magnetInProgress = false
  Citizen.CreateThread(function()
    Citizen.Wait(10000)
    codesUsedIdx[panelIndex] = false
  end)
end)

RegisterNetEvent("ev-hasino:setExecOfficeComputerStatus", function(pStatus)
  ARE_EXEC_OFFICE_COMPUTERS_AVAILABLE = pStatus
end)

AddEventHandler("ev-hasino:accessExecOfficeComputer", function(p1, p2, p3)
  local id = p3.zones.hasino_exec_office_pc.id
  local success,message = RPC.execute('ev-hasino:getTryForExecPC', id)
  if not success then
    TriggerEvent("DoLongHudText", message, 2)
    return
  end
  MAZE_GAME_WON = nil
  exports["ev-ui"]:openApplication("minigame-maze", {
    show = true,
    gridSize = 7,
    withDebug = false,
    useChessPieces = true,
  })
  while MAZE_GAME_WON == nil do
    Wait(1000)
    -- MAZE_GAME_WON = true
  end
  if not MAZE_GAME_WON then return end
  RPC.execute("ev-hasino:execOfficerComputerSuccess", id)
end)

AddEventHandler("ev-hasino:accessCodeMiniVault", function()
  exports["ev-ui"]:openApplication("textbox", {
    callbackUrl = "ev-ui:hasino:innerVaultAccessCodes",
    inputKey = 1,
    items = {
      {
        icon = "user-secret",
        label = "Password",
        name = "password",
        type = "password",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-ui:hasino:innerVaultAccessCodes", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  exports["ev-ui"]:closeApplication("textbox")
  RPC.execute("ev-hasino:inputInnerVaultAccessCodes", data.values.password)
end)

AddEventHandler("ev-hasino:pickupExecutiveKeycard", function()
  RPC.execute("ev-hasino:pickupExecutiveKeycard")
end)

RegisterNetEvent('ev-hasino:executiveKeycardPickedUp', function()
  EXECUTIVE_KEYCARD_PICKED_UP = true
end)

AddEventHandler("ev-inventory:itemUsed", function(pItem)
  if pItem ~= "casinoexeckeycard" then return end
  TriggerServerEvent("ev-hasino:execCardUsed", GetEntityCoords(PlayerPedId()))
end)

AddEventHandler('ev-hasino:pickupUSB', function(pArgs, pEntity, pContext)
  TriggerServerEvent('ev-hasino:pickupUSB', pContext.meta.id)
end)
