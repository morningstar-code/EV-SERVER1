projectxOffice = {}
projectxType = {}

projectxPid = {}
projectxpName = {}

projectxCbcId = {}

projectxAction = {}
projectxOffices = {}
projectxCid = {}
projectxCurrentJob = {}

RegisterServerEvent("ev-cbc:RhodoOfficeInformation")
AddEventHandler("ev-cbc:RhodoOfficeInformation", function(pjxData)
    projectxOffice = pjxData.office
    projectxType = pjxData.type
end)

RPC.register("ev-cbc:doElevatorAction", function(src, pKey)
    TriggerClientEvent("ev-cbc:office", src, projectxOffice, projectxType) 
end)

RegisterServerEvent("ev-cbc:addBusinessToCenterRhodo")
AddEventHandler("ev-cbc:addBusinessToCenterRhodo", function(pjxDataTwo)
    projectxPid =  pjxDataTwo.office_type
    projectxpName = pjxDataTwo.business_id
end)

RegisterServerEvent("ev-cbc:deleteBusinessFromCenter")
AddEventHandler("ev-cbc:deleteBusinessFromCenter", function(pjxDataThree)
    projectxCbcId =  pjxDataThree
end)

RPC.register("ev-cbc:addBusinessToCenter", function(pSource)
    exports.oxmysql:execute("INSERT INTO cerberus_center (offices_business_id, offices_business_name) VALUES (@offices_business_id, @offices_business_name)", {
        ["offices_business_id"] = projectxPid,
        ["offices_business_name"] = projectxpName
    })
end)

RPC.register("ev-cbc:getCreatedOffices", function(pSource)
    local data = Await(SQL.executedynamicparam("SELECT * FROM cerberus_center", {}))
    if not data then return false, {} end
    return data
end)

RPC.register("ev-cbc:deleteBusinessFromCenter", function(pId)
    exports.oxmysql:execute("DELETE FROM cerberus_center WHERE offices_business_id = @offices_business_id", {['@offices_business_id'] = projectxCbcId})
    return true
end)

RegisterServerEvent("ev-cbc:actionOfficeInfo")
AddEventHandler("ev-cbc:actionOfficeInfo", function(action, office, cid, currentJob)
    projectxAction = action
    projectxOffices = office
    projectxCid = cid
    projectxCurrentJob = currentJob
end)

RPC.register("ev-cbc:actionOffice", function(src, action, office, cid, currentJob)
    local officeType = "preview"
    if projectxAction == "visit" then
        TriggerClientEvent("ev-cbc:office", src, office, officeType)
    else
     print(projectxAction, projectxOffices, projectxCid, projectxCurrentJob)
    end
end)