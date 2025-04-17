----- // Chains // --
---
local hasChainEquip = false
local equippingChain = false
local chainModels = {
  ["cgchain"] = "cg_chain",
  ["gsfchain"] = "gsf_chain",
  ["cerberuschain"] = "cerberus_chain",
  ["mdmchain"] = "mdm_chain",
  ["vagoschain"] = "esv_chain",
  ["koilchain"] = "koil_chain",
  ["nbcchain"] = "nbc_chain",
  ["seasidechain"] = "seaside_chain",
  ["ggchain"] = "gg_chain",
  ["rlchain"] = "rl_chain",
  ["cgchain2"] = "cg_chain2",
}
local storedpItem = false
local storedpInfo = false

AddEventHandler("ev-inventory:itemUsed", function(pItem, pInfo)
  storedpItem = pItem
  storedpInfo = pInfo
  local model = chainModels[pItem]
  print(model)
  if not model then return end
  if equippingChain then return end
  local info = json.decode(pInfo)
  equippingChain = true
  TriggerEvent("animation:PlayAnimation", "veston")
  Wait(2600)
  ClearPedTasks(PlayerPedId())
  if not hasChainEquip then
    hasChainEquip = true
    TriggerEvent("attachPropPerm", model, 10706, -0.02, 0.02, -0.06, -366.0, 19.0, -163.0, true, true)
  else
    hasChainEquip = false
    TriggerEvent("destroyPropPerm")
  end
  equippingChain = false
end)