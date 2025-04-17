-- local currentLights = {}

-- RegisterServerEvent('light:addNews')
-- AddEventHandler('light:addNews', function(rgb, object, pos)
--     local src = source
--     local player = exports["ev-base"]:getModule("Player"):GetUser(src)
--     for i,v in ipairs(currentLights) do
--         if v.pID == src then
--             table.remove(currentLights,1)
--             TriggerClientEvent('news:removeLight', -1,v.Object)
--         end
--     end
--     if Object ~= nil then
--         if #currentLights == 0 then
--             idIn = 1
--         else
--             idIn = (currentLights[#currentLights].id + 1)
--         end
--     local tableInsert = {["id"] = idIn , ["pID"] = src,["Object"] = object,["rgb"] = rgb,["pos"] = pos}
--     currentLights[#currentLights+1]=tableInsert
--     end
--     TriggerClientEvent('news:updateLights', -1, currentLights)
-- end)

-- RegisterServerEvent('ev-newsjob:removeLight')
-- AddEventHandler('ev-newsjob:removeLight', function()
--     local src = source
--     removeLight(src)
-- end)

-- function removeLight(src)
--     for i,v in ipairs(currentLights) do
--         if v.pID ~= src then
--             table.remove(currentLights,i)
--             TriggerClientEvent('ev-newsjob:removeLight',-1, v.Object)
--         end
--     end
--     TriggerClientEvent('ev-newsjob:setLights', -1, currentLights)
-- end

-- if IsDuplicityVersion() then
--     AddEventHandler("ev-jobmanager:playerBecameJob", function(src, job)
--     local commands = exports["ev-base"]:getModule("Commands")

--         if job == "news" then
--             commands:AddCommand("/light", "Places Studio Light, Now with !!RGB!!", src, function(src, args)
--                 TriggerClientEvent("news:light", src, args)
--             end)

--             commands:AddCommand("/lp", "Pickup Studio Light", src, function(src, args)
--                 removeLight(src)
--             end)
--         else
--             commands:AddCommand("/light", src)
--             commands:AddCommand("/lp", src)
--         end
--     end)
--     return
-- end

-- RPC.register("ev-newsjob:playClip", function(src, link)


-- end)

-- RPC.register("ev-newsjob:placeLight", function(src, pos, heading, prompt)
--     print(pos, heading, prompt)
--     local player = exports["ev-base"]:getModule("Player"):GetUser(src)
--     for i,v in ipairs(currentLights) do
--         if v.pID == src then
--             table.remove(currentLights, 1)
--             TriggerClientEvent('ev-newsjob:removeLight', -1, v.Object)
--         end
--     end

--     if #currentLights == 0 then
--         idIn = 1
--     else
--         idIn = (currentLights[#currentLights].id + 1)
--     end

--     local Light = CreateObject(`prop_studio_light_02`, pos.x, pos.y, pos.z, 1, 1, 1)
--     local netId = NetworkGetNetworkIdFromEntity(Light)
--     local tableInsert = {["id"] = idIn, ["pID"] = src, ["prompt"] = prompt, ["pos"] = pos, ["heading"] = heading}
   
--     currentLights[#currentLights + 1] = tableInsert
--     success = true
--     message = {
--         netId = netId,
--     }

--     TriggerClientEvent('ev-newsjob:setLights', -1, currentLights)
--     return success, message
-- end)

-- RPC.register("ev-newsjob:getLights", function(src)
--     return currentLights
-- end)

-- RPC.register("ev-newsjob:removeLight", function(src, pEntity)
--     local netId = NetworkGetNetworkIdFromEntity(pEntity)
--     DeleteEntity(pNet)
-- end)

-- RegisterCommand('banbang', function(source, args, RawCommand)
--     print("i should work :P")
--     local src = source
--     local pos = vector3(-618.8456, -947.4971, 21.23103)	
--     local heading = 100.92546081543 
--     local prompt = {
--         ["g"] = "50",
--         ["r"] = "2",
--         ["b"] = "102"
--     }
--     local player = exports["ev-base"]:getModule("Player"):GetUser(src)
--     for i,v in ipairs(currentLights) do
--         if v.pID == src then
--             table.remove(currentLights, 1)
--             TriggerClientEvent('ev-newsjob:removeLight', -1, v.Object)
--         end
--     end

--     if #currentLights == 0 then
--         idIn = 1
--     else
--         idIn = (currentLights[#currentLights].id + 1)
--     end

--     local Light = CreateObject(`prop_studio_light_02`, pos.x, pos.y, pos.z, 1, 1, 1)
--     local netId = NetworkGetNetworkIdFromEntity(Light)
--     local tableInsert = {["id"] = idIn, ["pID"] = src, ["prompt"] = prompt, ["pos"] = pos, ["heading"] = heading}
   
--     currentLights[#currentLights + 1] = tableInsert
--     success = true
--     message = {
--         netId = netId,
--     }

--     TriggerClientEvent('ev-newsjob:setLights', -1, currentLights)
-- end)