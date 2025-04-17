-- Citizen.CreateThread(function()
--   local w = exports["ev-lib"]:getDui('https://i.imgur.com/qpY27Zg.gif', 512, 512)
--   AddReplaceTexture('ig_dw', 'teef_diff_002_a_uni', w.dictionary, w.texture)
-- end)

RegisterNetEvent("ev-helmet:changeDui", function(pUrl)
  local w = exports["ev-lib"]:getDui(pUrl, 512, 512)
  AddReplaceTexture('ig_dw', 'teef_diff_002_a_uni', w.dictionary, w.texture)
end, false)
