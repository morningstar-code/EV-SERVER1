RegisterNetEvent("ev-financials:cash")
AddEventHandler("ev-financials:cash", function(pCash, pChange)
  if not pCash then return false, "No cash" end
  exports["ev-ui"]:cashFlash(pCash, pChange)
end)