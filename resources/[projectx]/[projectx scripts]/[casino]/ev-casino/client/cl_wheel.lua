AddEventHandler("ev-casino:wheel:toggleEnable", function()
  local characterId = exports["isPed"]:isPed("cid")
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = "casino" } })
  if not jobAccess then
    TriggerEvent("DoLHudText", 2, "casino-cannot-do-that", "You cannot do that")
    return
  end
  RPC.execute("ev-casino:wheel:toggleEnabled")
end)

AddEventHandler("ev-casino:wheel:spinWheel", function()
  if not hasMembership(false) then
    TriggerEvent("DoLHudText", 2, "You must have a membership")
    return
  end
  local info = (exports["ev-inventory"]:GetInfoForFirstItemOfName("casinoloyalty") or { information = "{}" })
  RPC.execute("ev-casino:wheel:spinWheel", false, json.decode(info.information).state_id)
end)

AddEventHandler("ev-casino:wheel:spinWheelTurbo", function()
  if not hasMembership(false) then
    TriggerEvent("DoLHudText", 2, "You must have a membership")
    return
  end
  local info = (exports["ev-inventory"]:GetInfoForFirstItemOfName("casinoloyalty") or { information = "{}" })
  RPC.execute("ev-casino:wheel:spinWheel", "turbo", json.decode(info.information).state_id)
end)

AddEventHandler("ev-casino:wheel:spinWheelOmega", function()
  if not hasMembership(false) then
    TriggerEvent("DoLHudText", 2, "You must have a membership")
    return
  end
  local info = (exports["ev-inventory"]:GetInfoForFirstItemOfName("casinoloyalty") or { information = "{}" })
  RPC.execute("ev-casino:wheel:spinWheel", "omega", json.decode(info.information).state_id)
end)

AddEventHandler("ev-casino:wheel:spinWheelInsane", function()
  if not hasMembership(false) then
    TriggerEvent("DoLHudText", 2, "You must have a membership")
    return
  end
  local info = (exports["ev-inventory"]:GetInfoForFirstItemOfName("casinoloyalty") or { information = "{}" })
  RPC.execute("ev-casino:wheel:spinWheel", "insane", json.decode(info.information).state_id)
end)

AddEventHandler("ev-casino:wheel:pickupWheelCash", function()
  RPC.execute("ev-casino:wheel:pickupWheelCash")
end)
