function Login.playerLoaded() end

function Login.characterLoaded()
  -- Main events leave alone 
  TriggerEvent("ev-base:playerSpawned")
  TriggerEvent("playerSpawned")
  TriggerServerEvent('character:loadspawns')
  -- Main events leave alone 

  TriggerEvent("Relog")

  -- Everything that should trigger on character load 
  TriggerServerEvent('checkTypes')
  TriggerServerEvent('isVip')
  TriggerEvent('rehab:changeCharacter')
  TriggerEvent("resetinhouse")
  TriggerEvent("fx:clear")
  TriggerServerEvent('tattoos:retrieve')
  TriggerServerEvent('Blemishes:retrieve')
  TriggerServerEvent("currentconvictions")
  TriggerServerEvent("GarageData")
  TriggerServerEvent("Evidence:checkDna")
  TriggerEvent("banking:viewBalance")
  TriggerServerEvent("police:getLicensesCiv")
  TriggerServerEvent('ev-doors:requestlatest')
  TriggerServerEvent("item:UpdateItemWeight")
  TriggerServerEvent("ev-weapons:getAmmo")
  TriggerServerEvent("ReturnHouseKeys")
  TriggerServerEvent("requestOffices")
  Wait(500)
  TriggerServerEvent("Police:getMeta")
  TriggerServerEvent("SpawnEventsServer")
  TriggerServerEvent("ev-commands:buildCommands")
  -- Anything that might need to wait for the client to get information, do it here.
  Wait(3000)
  TriggerServerEvent("ev-npcs:location:fetch")
  TriggerServerEvent("ev-base:sessionStarted")
  TriggerEvent("apart:GetItems")
  TriggerEvent("ev-editor:readyModels")
  Wait(4000)
  TriggerServerEvent("ev-commands:buildCommands")
  TriggerServerEvent('distillery:getDistilleryLocation')
end

function Login.characterSpawned()
  local src = GetPlayerServerId(PlayerId())
  isNear = false
  TriggerServerEvent('ev-base:sv:player_control')
  TriggerServerEvent('ev-base:sv:player_settings')

  TriggerServerEvent("TokoVoip:clientHasSelecterCharacter")
  TriggerEvent("spawning", false)
  TriggerEvent("inSpawn", false)
  TriggerEvent("attachWeapons")
  TriggerEvent("tokovoip:onPlayerLoggedIn", true)

  exports["ev-ui"]:sendAppEvent("hud", { display = true })

  TriggerServerEvent("request-dropped-items")
  TriggerServerEvent("server-request-update", exports["isPed"]:isPed("cid"))
  TriggerServerEvent("stocks:retrieveclientstocks")

  

  if Spawn.isNew then
      Wait(4000)
      -- commands to make sure player is alive and full food/water/health/no injuries
      TriggerServerEvent("reviveGranted", src)
      TriggerEvent("Hospital:HealInjuries", src, true)
      TriggerServerEvent("ems:healplayer", src)
      TriggerEvent("heal", src)
      TriggerEvent("status:needs:restore", src)

      TriggerServerEvent("ev-spawn:newPlayerFullySpawned")
  end
  exports['ragdoll']:SetMaxHealth()
  exports['ragdoll']:SetMaxArmor()
  runGameplay() -- moved from ev-base 
  Spawn.isNew = false

  TriggerServerEvent("ev-infinityfix:fixchar", src)

end

RegisterNetEvent("ev-spawn:characterSpawned");
AddEventHandler("ev-spawn:characterSpawned", Login.characterSpawned)

RegisterNetEvent("ev-spawn:getStartingItems");
AddEventHandler("ev-spawn:getStartingItems", function(cid, information)
  TriggerServerEvent('server-inventory-give', cid, "idcard", 1, 1, true, {})
	TriggerServerEvent('server-inventory-give', cid, "mobilephone", 2, 1, false, {})
  TriggerServerEvent('server-inventory-give', cid, "newaccountbox", 3, 1, false, {})
  
end)

RegisterNetEvent("ev-spawn:getNewAccountBox");
AddEventHandler("ev-spawn:getNewAccountBox", function(cid) 
  TriggerServerEvent('server-inventory-give', cid, "newaccountbox", 3, 1, false, {})
end)