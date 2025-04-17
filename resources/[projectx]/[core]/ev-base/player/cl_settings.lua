CPX.SettingsData = CPX.SettingsData or {}
CPX.Settings = CPX.Settings or {}

CPX.Settings.Current = {}
-- Current bind name and keys
CPX.Settings.Default = {
  ["tokovoip"] = {
    ["stereoAudio"] = true,
    ["localClickOn"] = true,
    ["localClickOff"] = true,
    ["remoteClickOn"] = true,
    ["remoteClickOff"] = true,
    ["clickVolume"] = 0.8,
    ["radioVolume"] = 0.8,
    ["phoneVolume"] = 0.8,
    ["releaseDelay"] = 200
  },
  ["hud"] = {

  }

}


function CPX.SettingsData.setSettingsTable(settingsTable, shouldSend)
  if settingsTable == nil then
    CPX.Settings.Current = CPX.Settings.Default
    TriggerServerEvent('ev-base:sv:player_settings_set',CPX.Settings.Current)
    CPX.SettingsData.checkForMissing()
  else
    if shouldSend then
      CPX.Settings.Current = settingsTable
      TriggerServerEvent('ev-base:sv:player_settings_set',CPX.Settings.Current)
      CPX.SettingsData.checkForMissing()
    else
       CPX.Settings.Current = settingsTable
       CPX.SettingsData.checkForMissing()
    end
  end

  TriggerEvent("event:settings:update",CPX.Settings.Current)

end

function CPX.SettingsData.setSettingsTableGlobal(self, settingsTable)
  CPX.SettingsData.setSettingsTable(settingsTable,true);
end

function CPX.SettingsData.getSettingsTable()
    return CPX.Settings.Current
end

function CPX.SettingsData.setVarible(self,tablename,atrr,val)
  CPX.Settings.Current[tablename][atrr] = val
  TriggerServerEvent('ev-base:sv:player_settings_set',CPX.Settings.Current)
end

function CPX.SettingsData.getVarible(self,tablename,atrr)
  return CPX.Settings.Current[tablename][atrr]
end

function CPX.SettingsData.checkForMissing()
  local isMissing = false

  for j,h in pairs(CPX.Settings.Default) do
    if CPX.Settings.Current[j] == nil then
      isMissing = true
      CPX.Settings.Current[j] = h
    else
      for k,v in pairs(h) do
        if  CPX.Settings.Current[j][k] == nil then
           CPX.Settings.Current[j][k] = v
           isMissing = true
        end
      end
    end
  end
  

  if isMissing then
    TriggerServerEvent('ev-base:sv:player_settings_set',CPX.Settings.Current)
  end


end

RegisterNetEvent("ev-base:cl:player_settings")
AddEventHandler("ev-base:cl:player_settings", function(settingsTable)
  CPX.SettingsData.setSettingsTable(settingsTable,false)
end)


RegisterNetEvent("ev-base:cl:player_reset")
AddEventHandler("ev-base:cl:player_reset", function(tableName)
  if CPX.Settings.Default[tableName] then
      if CPX.Settings.Current[tableName] then
        CPX.Settings.Current[tableName] = CPX.Settings.Default[tableName]
        CPX.SettingsData.setSettingsTable(CPX.Settings.Current,true)
      end
  end
end)