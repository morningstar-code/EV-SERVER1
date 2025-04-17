--This is awful coding dont judge thanks.

--TODO: When adding the patient we also need to update the CIDS override.
RPC.register("ev-healthcare:icu:rpc:addPatient", function(main, room, cid, wtf, citname)
    local src = source
    exports.oxmysql:execute("SELECT * FROM patients WHERE `cid` = @cid OR `room` = @room",{["@cid"] = cid, ["@room"] = room},function(result)
        if result[1] ~= nil then
            TriggerClientEvent("DoLongHudText", src, "This patient already exists or room is taken!", 2)
            return false
        else
            local result = exports.oxmysql:execute("INSERT INTO patients (cid, room, main, name) VALUES (@cid, @room, @main, @name)", 
            {
                ["@cid"] = cid,
                ["@room"] = room,
                ["@main"] = main,
                ["@name"] = citname
            }, 
            function(result)
                if result.affectedRows == 1 then
                    TriggerClientEvent("DoLongHudText", src, "Successfully added patient.", 1)
                    return true
                else
                    TriggerClientEvent("DoLongHudText", src, "Unable to add patient.", 2)
                    return false
                end
            end)
        end
    end) 
end) 

--TODO: Remove patient from room and reset there override. (room shouldnt be needed)
RPC.register("ev-healthcare:icu:rpc:removePatient", function(room, cid)
    local src = source
    exports.oxmysql:execute("SELECT * FROM patients WHERE `cid` = @cid",{["@cid"] = cid},function(result)
        if result[1] ~= nil then
            local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(cid))
            if user then
                user:clearCID()
            end
            exports.oxmysql:execute("DELETE FROM patients WHERE `cid` = @cid",{["@cid"] = cid},function(result)
                if result.affectedRows > 0 then
                    TriggerClientEvent("DoLongHudText", src, "Successfully removed patient.", 1)
                    return true
                else
                    TriggerClientEvent("DoLongHudText", src, "Unable to remove patient.", 2)
                    return false
                end
            end) 
        else
            TriggerClientEvent("DoLongHudText", src, "No patients with this CID.", 2)
            return false
        end
    end) 
end)

--TODO: Get the room passed then return all data and show in a menu.
RPC.register("ev-healthcare:icu:rpc:getPatients", function(room)
    local src = source
    exports.oxmysql:execute("SELECT * FROM patients WHERE `room` = @room",{["@room"] = room},function(result)
        if result[1] ~= nil then
            TriggerClientEvent("ev-healthcare:icu:client:showPatients", src, result)
            return true 
        else
            TriggerClientEvent("DoLongHudText", src, "No patients in this room.", 2)
            return false
        end
    end) 
end)

--TODO: Rooms are virtual not actual places.. Can have multiple members per room. 
--Send Room ID , Check the database for anyone in specific room then remove them and reset there override.
RPC.register("ev-healthcare:icu:rpc:clearPatients", function(room)
    local src = source
    exports.oxmysql:execute("SELECT * FROM patients WHERE `room` = @room",{["@room"] = room},function(result)
        if result[1] ~= nil then
            for k,v in pairs(result) do
                local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(v.cid))
                if user then 
                    user:clearCID()
                end
            end
            exports.oxmysql:execute("DELETE FROM patients WHERE `room` = @room",{["@room"] = room},function(result)
                if result.affectedRows > 0 then
                    TriggerClientEvent("DoLongHudText", src, "Successfully cleared patients.", 1)
                    return true
                else
                    TriggerClientEvent("DoLongHudText", src, "Unable to clear patients.", 2)
                    return false
                end
            end) 
        else
            TriggerClientEvent("DoLongHudText", src, "No patients in this room.", 2)
            return false
        end
    end) 
end)



