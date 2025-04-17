Citizen.CreateThread(function()
  exports["ev-keybinds"]:registerKeyMapping("","Gov", "MDW", "+openMdw", "-openMdw")
  RegisterCommand("+openMdw", function()
    TriggerEvent("ev-ui:openMDW", {})
  end, false)
  RegisterCommand("-openMdw", function() end, false)
  regCommand()
end)

AddEventHandler("ev-spawn:characterSpawned", function()
  regCommand()
end)

function regCommand()
  Citizen.Wait(5000)
  local result = RPC.execute("ev-ui:mdtApiRequest", {action = "hasConfigPermission", data = {}})
  if result and result.message and result.message.steam then
    RegisterCommand("mdw", function()
      TriggerEvent("ev-ui:openMDW", { fromCmd = true })
    end)
  end
end

RegisterCommand("useMdwNewUrl", function()
  exports["ev-ui"]:sendAppEvent("mdt", { useNewApi = true })
end, false)

RegisterCommand("useMdwNewUrlOff", function()
  exports["ev-ui"]:sendAppEvent("mdt", { useNewApi = false })
end, false)
