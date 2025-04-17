DroppedEvidence, IsAccumulating = {}, false

AddEventHandler("ev-evidence:dropEvidence", function (pCoords, pMeta, pSuffix)
    local uid = pCoords.x .. "-" .. pCoords.y .. "-" .. pCoords.z

    if pSuffix then
        uid = uid .. "-" .. pSuffix
    end

    DroppedEvidence[uid] = {
        ["x"] = pCoords.x,
        ["y"] = pCoords.y,
        ["z"] = pCoords.z,
        ["meta"] = pMeta
    }

    if IsAccumulating then return end

    IsAccumulating = true

    Citizen.SetTimeout(5000, function ()
        local dropped = DroppedEvidence

        DroppedEvidence = {}

        IsAccumulating = false

        RPC.execute("ev-evidence:addEvidence", dropped)
    end)
end)