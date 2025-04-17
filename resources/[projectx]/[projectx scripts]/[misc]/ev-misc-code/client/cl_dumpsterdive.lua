--[[ --666561306, -58485588, -206690185, 1511880420, 682791951
local searched = { 3423423424 }
local dumpsters = { -1096777189, 666561306, 1437508529, -1426008804, -228596739, 161465839, 651101403, -58485588, 1614656839, -58485588, 218085040 }
local searchCount = 0
local lastSearchTime = -1
local searchCountCooldown = -1

function checkforGarbage()
  for i = 1, #dumpsters do
    local objFound = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 5.0, dumpsters[i], 0, 0, 0)
    if DoesEntityExist(objFound) then
      return true
    end
  end
  return false
end

CreateThread(function()
  while true do
    Wait(5000)
    local currGameTime = GetGameTimer()
    if searchCountCooldown >= -1 then
      if searchCountCooldown < currGameTime then
        searchCountCooldown = -1
        searchCount = 0
      end
    end

    if searchCount > 0 then
      if lastSearchTime < currGameTime then
        searchCount = searchCount - 1
        lastSearchTime = currGameTime + 300000
      end
    end
  end
end)

local function SearchDumpster(pDumpster)
  local Ped = PlayerPedId()
  TriggerServerEvent('ev:giveDumpsterReward')
  TriggerServerEvent('ev:startDumpsterTimer', pDumpster)
  FreezeEntityPosition(Ped, false)
  ClearPedTasks(Ped)
  searchCount = searchCount + 1
  if searchCount >= 5 then
    searchCountCooldown = GetGameTimer() + 900000
  end
  lastSearchTime = GetGameTimer() + 300000
end

RegisterNetEvent('ev-dumpster:SearchDumpster', function()
  local currGameTime = GetGameTimer()
  if searchCountCooldown > currGameTime then
    TriggerEvent('DoLongHudText', 'You are searching too fast.. Go wash your hands and try again later.', 2)
    return
  end

  if searchCount >= 5 then
    TriggerEvent('DoLongHudText', 'You are searching too fast.. Go wash your hands and try again later.', 2)
    return
  end


  local ped = PlayerPedId()
  local pos = GetEntityCoords(ped)
  local dumpsterFound = false

  for i = 1, #dumpsters do
    local dumpster = GetClosestObjectOfType(pos.x, pos.y, pos.z, 1.0, dumpsters[i], false, false, false)
    local dumpPos = GetEntityCoords(dumpster)
    local dist = GetDistanceBetweenCoords(pos.x, pos.y, pos.z, dumpPos.x, dumpPos.y, dumpPos.z, true)

    if dist < 1.8 then
      for i = 1, #searched do
        if searched[i] == dumpster then
          dumpsterFound = true
        end
        if i == #searched and dumpsterFound then
          TriggerEvent('DoLongHudText', 'This dumpster has already been searched', 2)
        elseif i == #searched and not dumpsterFound then
          TriggerEvent('DoLongHudText', 'You begin to search the dumpster')
          local dict = 'amb@prop_human_bum_bin@base'
          LoadDict(dict)
          FreezeEntityPosition(PlayerPedId(), true)
          TaskPlayAnim(PlayerPedId(), dict, 'base', 3.0, -8, -1, 63, 0, 0, 0, 0)
          local finished = exports["ev-ui"]:taskBarSkill(5000, math.random(200, 400))
          ::skill::
          if (finished == 100) then
            local random = math.random(1, 2)
            if random == 2 then
              goto skill
            end
            local finished = exports['ev-taskbar']:taskBar(25000, 'Searching Dumpster')
            if (finished == 100) then
              SearchDumpster(dumpster)
            end
            table.insert(searched, dumpster)
          else
            FreezeEntityPosition(PlayerPedId(), false)
            ClearPedTasks(PlayerPedId())
          end
        end
      end
    end
  end
end)



RegisterNetEvent('ev:removeDumpster')
AddEventHandler('ev:removeDumpster', function(object)
  for i = 1, #searched do
    if searched[i] == object then
      table.remove(searched, i)
    end
  end
end)

-- Functions
function LoadDict(dict)
  RequestAnimDict(dict)
  while not HasAnimDictLoaded(dict) do
    Citizen.Wait(10)
  end
end

exports("checkforGarbage", checkforGarbage) ]]