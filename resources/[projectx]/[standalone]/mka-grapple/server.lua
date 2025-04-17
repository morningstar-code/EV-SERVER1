RegisterServerEvent("mt-grapple:createRope")
AddEventHandler("mt-grapple:createRope", function(grappleId, dest)
    local src = source
    TriggerClientEvent("mt-grapple:ropeCreated", -1, src, grappleId, dest)
end)

RegisterServerEvent("mt-grapple:destroyRope")
AddEventHandler("mt-grapple:destroyRope", function(grappleId)
    local src = source
    TriggerClientEvent("mt-grapple:ropeDestroyed:" .. grappleId, src)
end)