-- CLOSE APP EVENT
RegisterNetEvent("financial:openUI")
AddEventHandler("financial:openUI", function()
  local isNearATM = isNearATM()
  if isNearATM then
    financialAnimation(isNearATM, true)
    Citizen.Wait(1400)
    exports["ev-ui"]:openApplication("atm", {
      isAtm = true,
    })
  end
end)

RegisterNetEvent("financial:openUIBank")
AddEventHandler("financial:openUIBank", function()
  exports["ev-ui"]:openApplication("atm", {
    isAtm = false,
  })
end)