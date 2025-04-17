local entranceDoorCoords = {
  ["front_door"] = {
    coords = vector3(-1306.12,-819.94,17.15),
    heading = 0,
    doorId = 555
  },
  ["back_door"] = {
    coords = vector3(-1308.01,-813.53,17.15),
    heading = 0,
    doorId = 556
  }
}

local gameSettings = {
  gameFinishedEndpoint = "ev-ui:heistsThermiteMinigameResult",
  gameTimeoutDuration = 14000,
  coloredSquares = 10,
  gridSize = 6,
}

function AttemptBayCityThermiteDoor()
  activeEntranceDoor = nil
  local playerCoords = GetEntityCoords(PlayerPedId())
  for door, conf in pairs(entranceDoorCoords) do
      if #(playerCoords - conf.coords) <= 1 then
          activeEntranceDoor = door
      end
  end

  if activeEntranceDoor == nil then return false end
  
  TriggerServerEvent("dispatch:svNotify", {
      dispatchCode = "10-90B",
      origin = entranceDoorCoords[activeEntranceDoor].coords,
  })

  local thermiteCoords = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0.0, 0.35, 0.0)
  local heading = GetEntityHeading(PlayerPedId())
  local thermiteCoordsWithHeading = {
    x = thermiteCoords.x,
    y = thermiteCoords.y,
    z = thermiteCoords.z,
    h = heading
  }

  TriggerEvent("inventory:removeItem", "thermitecharge", 1)

  local doorId = entranceDoorCoords[activeEntranceDoor].doorId
  local success = Citizen.Await(ThermiteCharge(thermiteCoordsWithHeading, nil, 0.0, gameSettings))

  -- If this is the first door let's `start` the robbery
  if success and activeEntranceDoor == "front_door" then
    RPC.execute("ev-heists:startMazeBankRobbery")
  elseif success then
    RPC.execute("ev-heists:mazeBankUnlockDoor", doorId)
  end

  return true
end

RegisterNetEvent("ev-heists:mazeBankSpawnTrolleys")
AddEventHandler("ev-heists:mazeBankSpawnTrolleys", function()
  local trolleyConfig = GetTrolleyConfig("mazebank_cash_1")
  SpawnTrolley(trolleyConfig.cashCoords, "cash", trolleyConfig.cashHeading)
end)


RegisterNetEvent("heists:mazeBankTrolleyGrab")
AddEventHandler("heists:mazeBankTrolleyGrab", function()
  local canGrab = RPC.execute("ev-heists:mazeBankCanRobTray")

  if canGrab then
      Loot("cash")
      TriggerEvent("DoLongHudText", "You discarded the counterfeit items", 1)
      RPC.execute("ev-heists:payoutTrolleyGrab", "mazebank", "cash")
      RPC.execute("ev-heists:mazeBankTrayRobbed")
  else
      TriggerEvent("DoLongHudText", "You can't do that yet...", 2)
  end
end)

RegisterNetEvent("ev-heists:client:bayCityVaultKeypad")
AddEventHandler("ev-heists:client:bayCityVaultKeypad", function()
  TriggerServerEvent("ev-heists:server:bayCityOpenVault")
end)
